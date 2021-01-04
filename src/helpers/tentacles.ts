import TWEEN, { Tween, Easing } from '@tweenjs/tween.js'
import { isFirefox } from 'react-device-detect'

const MAX_TENTACLES = isFirefox ? 24 : 8
const TAU = Math.PI * 2
const HPI = Math.PI / 2
const CLEAR_INTERVAL = 25.0
let cnv: HTMLCanvasElement
let ctx: CanvasRenderingContext2D | null
let c: number, wx: number, wy: number, mx: number, my: number

function map(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

let flip = false
let hasFlipped = false
let initialized = false

let audioCtx: AudioContext
let audio: HTMLAudioElement
let audioSrc: MediaElementAudioSourceNode
let analyser: AnalyserNode
let frequencyData: Uint8Array

class Random {
    float = (min: number, max?: number) => {
        if (!min) min = 0
        if (!max) {
            max = min
            min = 0
        }
        return min + Math.random() * (max - min)
    }
    int = (min: number, max: number) => Math.round(this.float(min, max))
    sign = (chance = 0.5) => Math.random() >= chance ? -1 : 1
    bool = (chance = 0.5) => Math.random() < chance
    bit = (chance = 0.5) => Math.random() < chance ? 0 : 1
    item = (list: number[]) => list[~~((Math.random()) * list.length)]
}

const random = new Random()


interface Segment {
    radius: number,
    scale: number,
    theta: number,
    px: number,
    py: number,
    x: number,
    y: number
}

class Tentacle {
    private x: number
    private y: number
    private angle: number
    public segments: Segment[] = []
    public fillColor: string = '#61b15a'
    public strokeColor: string = '#61b15a'
    public lineWidth: number = 0.25
    private segmentCount: number
    private thickness: number
    private spacing: number
    private curl: number
    private step: number
    private _length: number = 0

    get length() {
        return this._length
    }

    set length(value) {
        const limit = this.segments.length * value
        const power = Math.pow(value, 0.25)
        this.segments.forEach((segment, index) => {
            segment.scale = index < limit ?
                ((1 - (index / limit)) * power) :
                0
        })
        this._length = value
    }

    build() {
        let theta = this.angle
        let x = this.x
        let y = this.y
        let v = 0
        for (let s, c, i = 0; i < this.segmentCount; i++) {
            s = Math.sin(theta)
            c = Math.cos(theta)
            this.segments.push({
                radius: this.thickness / 2,
                scale: 0,
                theta,
                // Perpendicular unit vector for rendering outlines.
                px: -s,
                py: c,
                x,
                y
            })
            x += c * this.spacing
            y += s * this.spacing
            v += this.step * random.float(-1, 1)
            v *= 0.9 + this.curl * 0.1
            theta += v
        }
    }

    constructor(x?: number, y?: number, angle?: number) {
        this.x = x ?? 0
        this.y = y ?? 0
        this.angle = angle ?? random.float(Math.PI * 2)
        this.segmentCount = random.int(80, 150)
        this.thickness = random.float(15, 45)
        this.spacing = random.float(3.0, 5.0)
        this.curl = random.float(0.1, 0.15)
        this.step = random.float(0.01, 0.075)
        this.length = 0
        this.build()
    }
}

class Scene {
    width: number = 0
    height: number = 0
    tentacles: Tentacle[]


    constructor(width: number, height: number) {
        this.tentacles = []
        this.addTentacle = this.addTentacle.bind(this)
        this.setSize(width, height)
        this.addTentacle()
    }

    addTentacle() {
        const x = this.width / 2 + random.float(-5, 5)
        const y = this.height / 2 + random.float(-5, 5)
        const tentacle = new Tentacle(x, y)
        this.tentacles.push(tentacle)

        const duration = random.float(2.0, 5.0) * 1000
        const tween = new Tween(tentacle)
            .to({ length: 0.99 }, duration)
            .easing(Easing.Quadratic.InOut)
            .onComplete(() => {
                const index = this.tentacles.indexOf(tentacle)
                this.tentacles.splice(index, 1)
                this.addTentacle()
            })
            .start()

        if (this.tentacles.length < MAX_TENTACLES) {
            const delay = random.int(100, 1000)
            setTimeout(this.addTentacle, delay)
        }
    }

    setSize(width: number, height: number) {
        this.width = width
        this.height = height
    }
}

class Renderer {
    private clearAlpha: number
    private width: number = 0
    private height: number = 0

    constructor(width: number, height: number,) {
        this.setSize(width, height)
        this.clearAlpha = 0.01
    }

    render(scene: Scene) {
        const r0 = map(frequencyData[7], 0, 255, 0, 155)
        const g0 = map(frequencyData[3], 0, 255, 0, 40)
        const b0 = map(frequencyData[5], 0, 255, 0, 40)

        const container = document.getElementById('container')!
        container.style.backgroundColor = 'rgb(' + r0 + ',' + g0 + ',' + b0 + ')'

        scene.tentacles.forEach(tentacle => {
            const n = Math.floor(tentacle.segments.length * tentacle.length)
            const segments = tentacle.segments
            let a, b, sA, sB, lxA, lyA, rxA, ryA, lxB, lyB, rxB, ryB

            for (let i = 0; i < n - 1; i++) {
                a = segments[i]
                b = segments[i + 1]
                sA = a.radius * a.scale
                ctx?.beginPath()
                if (i === 0) {
                    ctx?.arc(a.x, a.y, sA, 0, TAU)
                } else {
                    sB = b.radius * b.scale
                    lxA = a.x - a.px * sA
                    lyA = a.y - a.py * sA
                    rxA = a.x + a.px * sA
                    ryA = a.y + a.py * sA
                    lxB = b.x - b.px * sB
                    lyB = b.y - b.py * sB
                    rxB = b.x + b.px * sB
                    ryB = b.y + b.py * sB
                    ctx?.moveTo(rxA, ryA)
                    ctx?.arc(a.x, a.y, sA, a.theta + HPI, a.theta - HPI)
                    ctx?.lineTo(lxB, lyB)
                    ctx?.lineTo(rxB, ryB)
                    ctx?.lineTo(rxA, ryA)
                }
                const r2 = map(frequencyData[11], 0, 255, 27, 97)
                const g2 = map(frequencyData[8], 0, 255, 50, 200)
                const b2 = map(frequencyData[5], 0, 255, 20, 90)

                if (ctx) ctx.fillStyle = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'
                if (ctx) ctx.strokeStyle = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'
                if (ctx) ctx.lineWidth = tentacle.lineWidth
                ctx?.fill()
                ctx?.stroke()
            }
        })

        const logo = document.getElementById('dm5_logo')!
        logo.style.height = `${map(frequencyData[3], 0, 255, 20, 30)}%`

        const r1 = map(frequencyData[13], 0, 255, 50, 255)
        const g1 = map(frequencyData[7], 0, 255, 0, 80)
        const b1 = map(frequencyData[7], 0, 255, 0, 80)
        
        const eyes = document.getElementById('eye_bg')!
        const mouth = document.getElementById('mouth_bg')!
        eyes.style.backgroundColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'
        mouth.style.backgroundColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'

    }

    setSize(width: number, height: number) {
        const scale = window.devicePixelRatio || 1
        this.width = width
        this.height = height
        cnv.width = width * scale
        cnv.height = height * scale
        cnv.style.width = width + 'px'
        cnv.style.height = height + 'px'
        ctx?.scale(scale, scale)
    }
}

// ——————————————————————————————————————————————————
// Bootstrap
// ——————————————————————————————————————————————————

export const initTentacles = () => {
    let width = window.innerWidth
    let height = window.innerHeight

    cnv = document.getElementById('canvas')! as HTMLCanvasElement
    ctx = cnv.getContext('2d')

    const renderer = new Renderer(width, height)
    const scene = new Scene(width, height)

    const update = () => {
        analyser.getByteFrequencyData(frequencyData)
        requestAnimationFrame(update)
        TWEEN.update()
        renderer.render(scene)
    }

    const resize = () => {
        width = window.innerWidth
        height = window.innerHeight
        renderer.setSize(width, height)
        scene.setSize(width, height)
    }

    window.addEventListener('resize', resize)
    resize()
    // @ts-expect-error
    const AC = window.AudioContext || window.webkitAudioContext
    audioCtx = new AC()
    audio = document.getElementById('visualizerAudio')! as HTMLAudioElement
    audioSrc = audioCtx.createMediaElementSource(audio!)
    analyser = audioCtx.createAnalyser()
    analyser.fftSize = 32
    // we have to connect the MediaElementSource with the analyser
    audioSrc.connect(analyser)
    audioSrc.connect(audioCtx.destination)

    wx = window.innerWidth
    wy = window.innerHeight
    ctx = cnv.getContext('2d')!
    cnv.width = wx
    cnv.height = wy

    frequencyData = new Uint8Array(analyser.frequencyBinCount)

    audio.play()

    initialized = true
    update()
}