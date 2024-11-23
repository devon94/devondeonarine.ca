"use client"

export const dynamic = "force-dynamic"
import { AUDIO_FILES } from '@devon94/devondeonarine.ca/constants/AUDIO_FILES'
import { DEFAULT_OPTIONS } from '@devon94/devondeonarine.ca/constants/DEFAULT_OPTIONS'
import { FFT_SIZE } from '@devon94/devondeonarine.ca/constants/FFT_SIZE'
import { calculateBandEnergy } from '@devon94/devondeonarine.ca/lib/calculateBandEnergy'
import { clamp } from '@devon94/devondeonarine.ca/lib/clamp'
import { type GUI } from 'dat.gui'
import { IAudioMetadata, parseBuffer } from 'music-metadata'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import webfft from 'webfft'

import fragmentShader from '!!raw-loader!../shaders/fragment_shader.cpp'
import vertexShader from '!!raw-loader!../shaders/vertex_shader.cpp'

let options = Object.assign({}, DEFAULT_OPTIONS)

// Define a type for your theme colors for better type-checking
type ThemeType = {
  _darkred: number
}

const theme: ThemeType = { _darkred: 0x000000 }

const fft = new webfft(FFT_SIZE / 2)

export const usePerlinVisualization = () => {
  const start = useRef(Date.now())
  const source = useRef<AudioBufferSourceNode | null>(null)
  const bassPeak = useRef(0)
  const highPeak = useRef(0)
  const midPeak = useRef(0)
  const container = useRef<HTMLElement | null>(null)
  const mat = useRef<THREE.ShaderMaterial | null>(null)
  const _primitive = useRef<THREE.Object3D | null>(null)
  const scene = useRef<THREE.Scene | null>(null)
  const camera = useRef<THREE.PerspectiveCamera | null>(null)
  const renderer = useRef<THREE.WebGLRenderer | null>(null)
  const gui = useRef<GUI | null>(null)
  const dataArray = useRef<Float32Array | null>(null)
  const analyser = useRef<AnalyserNode | null>(null)
  const audioContext = useRef<AudioContext | null>(null)

  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const audioResponse = useRef<Response | null>(null)
  const trackIndex = useRef(0)
  const [metadata, setMetadata] = useState<IAudioMetadata | null>(null)

  const initializeAudio = useCallback(async () => {
    setIsInitialized(false)
    audioContext?.current?.close()
    analyser?.current?.disconnect()

    audioContext.current = new AudioContext()
    analyser.current = audioContext.current?.createAnalyser()
    analyser.current!.fftSize = FFT_SIZE
    dataArray.current = new Float32Array(FFT_SIZE)

    try {
      const track = AUDIO_FILES[trackIndex.current]
      audioResponse.current = await fetch(track)
      const arrayBuffer = await audioResponse.current.arrayBuffer()
      const metadata = await parseBuffer(new Uint8Array(arrayBuffer), { mimeType: 'audio/mpeg' })

      const audioBuffer = await audioContext.current?.decodeAudioData(arrayBuffer)

      const src = audioContext.current?.createBufferSource()
      src.buffer = audioBuffer
      src.connect(analyser.current)
      src.connect(audioContext.current?.destination)
      src.loop = true
      source.current = src
      console.log('Audio loaded:', audioBuffer, source, src)
      setIsInitialized(true)
      setMetadata(metadata)
    } catch (error) {
      console.error('Error loading audio:', error)
    } finally {
      setIsInitialized(true)
    }
  }, [setIsInitialized, trackIndex])

  const createPrimitive = useCallback(() => {
    _primitive.current = new THREE.Object3D()

    mat.current = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        pointscale: { value: 0.0 },
        decay: { value: 0.0 },
        complex: { value: 0.0 },
        waves: { value: 0.0 },
        eqcolor: { value: 0.0 },
        saturation: { value: 0.5 },
        fragment: { value: true },
        alternatecolor: { value: true },
        rgb: { value: true },
        red: { value: 0.5 },
        green: { value: -0.5 },
        blue: { value: 0.01 },
        qnoisered: { value: false },
        qnoisegreen: { value: false },
        qnoiseblue: { value: true }

      },
      vertexShader,
      fragmentShader,
      wireframe: true,
    })

    const geo = new THREE.IcosahedronGeometry(2, 80)

    const mesh = new THREE.Points(geo, mat.current)
    _primitive.current?.add(mesh)
    scene.current?.add(_primitive.current)
  }, [])

  const resetScene = useCallback(() => {
    while ((scene.current?.children.length ?? 0) > 0) {
      scene.current?.remove(scene.current?.children[0])
    }

    camera.current?.position.set(0, 0, 8)
    camera.current?.rotation.set(0, 0, 0)

    scene.current!.background = new THREE.Color(theme._darkred)

    createPrimitive()

    bassPeak.current = 0
    highPeak.current = 0
    midPeak.current = 0

    start.current = Date.now()
  }, [])

  const createGUI = useCallback(async () => {
    const dat = await import('dat.gui')
    gui.current = new dat.GUI()
    gui.current.close()
    const camGUI = gui.current?.addFolder('Camera')!
    camGUI.add(camera.current?.position!, 'z', 1, 20).name('Zoom Out').listen()
    camGUI.add(options.perlin, 'vel', 0.0, 0.1).name('Velocity').listen()

    const mathGUI = gui.current?.addFolder('Maths')!
    mathGUI.add(options.spin, 'sinVel', 0.0, 0.50).name('Sine').listen()
    mathGUI.add(options.spin, 'ampVel', 0.0, 180.00).name('Amplitude').listen()

    const perlinGUI = gui.current?.addFolder('Perlin Noise')!
    perlinGUI.add(options.perlin, 'waves', 0.0, 40.0).name('Max Waves').listen()
    perlinGUI.add(options.perlin, 'eqcolor', 0.0, 5.0).name('Max Hue').listen()
    perlinGUI.add(options.perlin, 'saturation', 0.1, 5.0).name('Saturation').listen()
    perlinGUI.add(options.perlin, 'complexMin', 0.0, 1).name('Min Complexity').listen()
    perlinGUI.add(options.perlin, 'complexMax', 0.3, 2).name('Max Complexity').listen()

    perlinGUI.add(options.perlin, 'perlins', 1.0, 5.0).name('Size').step(1)
    perlinGUI.add(options.perlin, 'speed', 0.0, 0.00050).name('Speed').listen()
    perlinGUI.add(options.perlin, 'decay', 0.0, 1.0).name('Decay').listen()
    perlinGUI.add(options.perlin, 'fragment', true).name('Fragment').listen()
    perlinGUI.add(options.perlin, 'alternatecolor', false).name('Alternate Color').listen()
    perlinGUI.add(options.perlin, 'rgb', false).name('RGB').listen()

    perlinGUI.add(options.perlin, 'red', -1.0, 1.0).name('Red').listen()
    perlinGUI.add(options.perlin, 'green', -1.0, 1.0).name('Green').listen()
    perlinGUI.add(options.perlin, 'blue', -1.0, 1.0).name('Blue').listen()

    perlinGUI.add(options.perlin, 'qnoisered', false).name('Abs Red Noise').listen()
    perlinGUI.add(options.perlin, 'qnoisegreen', false).name('Abs Green Noise').listen()
    perlinGUI.add(options.perlin, 'qnoiseblue', true).name('Abs Blue Noise').listen()
  }, [])

  const onWindowResize = useCallback(() => {
    const _width = window.innerWidth
    const _height = window.innerHeight
    renderer.current?.setSize(_width, _height)
    camera.current!.aspect = _width / _height
    camera.current?.updateProjectionMatrix()
  }, [])

  const createWorld = useCallback(() => {
    const _width = window.innerWidth
    const _height = window.innerHeight

    scene.current = new THREE.Scene()
    scene.current.background = new THREE.Color(theme._darkred)

    camera.current = new THREE.PerspectiveCamera(55, _width / _height, 1, 1000)
    camera.current.position.z = 8

    renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.current?.setSize(_width, _height)

    container.current = document.getElementById('container')
    if (container) {
      container.current?.appendChild(renderer.current?.domElement)
    }

    window.addEventListener('resize', onWindowResize, false)
  }, [onWindowResize])

  useEffect(() => {
    const startAnimation = () => {
      const render = () => {
        requestAnimationFrame(render)

        const timeSinceStart = (Date.now() - start.current) * 0.003


        analyser.current?.getFloatTimeDomainData(dataArray.current!)

        // Perform FFT
        const fftData = fft.fft(dataArray.current!) // out will be a Float32Array of size 2048

        // Calculate energy and update uniforms based on audio data
        const bassEnergy = calculateBandEnergy(audioContext.current!, fftData, 50, 1500)
        const midEnergy = calculateBandEnergy(audioContext.current!, fftData, 1500, 8000)
        const highEnergy = calculateBandEnergy(audioContext.current!, fftData, 8000, 16000)
        // mat.current!.uniforms['eqcolor'].value = bassEnergy

        if (bassEnergy > bassPeak.current) {
          bassPeak.current = bassEnergy
        }

        if (midEnergy > midPeak.current) {
          midPeak.current = midEnergy
        }

        if (highEnergy > highPeak.current) {
          highPeak.current = highEnergy
        }

        // _primitive.rotation.y += options.perlin.vel 
        _primitive.current!.rotation.y += options.perlin.vel
        _primitive.current!.rotation.x = (Math.sin(timeSinceStart * options.spin.sinVel) * options.spin.ampVel * Math.PI / 180)

        mat.current!.uniforms['time'].value = options.perlin.speed * (Date.now() - start.current)
        mat.current!.uniforms['pointscale'].value = options.perlin.perlins
        mat.current!.uniforms['decay'].value = options.perlin.decay
        mat.current!.uniforms['fragment'].value = options.perlin.fragment
        mat.current!.uniforms['alternatecolor'].value = options.perlin.alternatecolor
        mat.current!.uniforms['saturation'].value = options.perlin.saturation

        mat.current!.uniforms['rgb'].value = options.perlin.rgb
        mat.current!.uniforms['red'].value = options.perlin.red
        mat.current!.uniforms['green'].value = options.perlin.green
        mat.current!.uniforms['blue'].value = options.perlin.blue

        mat.current!.uniforms['qnoiseblue'].value = options.perlin.qnoiseblue
        mat.current!.uniforms['qnoisegreen'].value = options.perlin.qnoisegreen
        mat.current!.uniforms['qnoisered'].value = options.perlin.qnoisered

        mat.current!.uniforms['waves'].value = clamp(bassEnergy, 0, bassPeak.current * 0.5, 0, options.perlin.waves)

        mat.current!.uniforms['complex'].value = clamp(highEnergy, 0, highPeak.current * 0.75, Math.min(options.perlin.complexMin, options.perlin.complexMax), options.perlin.complexMax)

        mat.current!.uniforms['eqcolor'].value = clamp(midEnergy, 0, midPeak.current * 0.75, 5, options.perlin.eqcolor)

        camera.current?.lookAt(scene.current?.position!)
        renderer.current?.render(scene.current!, camera.current!)
      }

      render()
    }

    initializeAudio()
    createWorld()
    createPrimitive()
    createGUI()
    startAnimation()

    return () => {
      if (container && container.current?.firstChild) {
        container.current?.removeChild(container.current?.firstChild)
      }
      options = DEFAULT_OPTIONS
      if (gui) {
        gui.current?.destroy()
      }
      source.current?.stop()
      source.current = null
      initializeAudio()
      setIsPlaying(false)
    }
  }, [])


  const resetTrack = useCallback(async () => {
    if (isPlaying) {
      setIsPlaying(false)
      source.current?.stop()
    }

    source.current = null
    await initializeAudio()
  }, [isPlaying, initializeAudio])

  const togglePlayPause = useCallback(async () => {
    if (isPlaying) {
      source.current?.stop()
      await initializeAudio()
    } else {
      source.current?.start()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, initializeAudio])

  const reset = useCallback(async () => {
    resetScene()
    await resetTrack()
  }, [resetScene, resetTrack])

  const nextTrack = useCallback(async () => {
    if (trackIndex.current >= AUDIO_FILES.length - 1) {
      trackIndex.current = 0
    } else {
      trackIndex.current += 1
    }
    resetScene()
    await resetTrack()
    if (isPlaying) {
      source.current?.start()
      setIsPlaying(true)
    }
  }, [trackIndex, resetScene, resetTrack])

  const previousTrack = useCallback(async () => {
    if (trackIndex.current <= 0) {
      trackIndex.current = AUDIO_FILES.length - 1
    } else {
      trackIndex.current -= 1
    }
    resetScene()
    await resetTrack()
    if (isPlaying) {
      source.current?.start()
      setIsPlaying(true)
    }
  }, [trackIndex, resetScene, resetTrack])

  return {
    isPlaying,
    isInitialized,
    metadata,
    reset,
    nextTrack,
    previousTrack,
    togglePlayPause,
  }
}