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

let cnv: HTMLCanvasElement = document.getElementById('canvas')! as HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let c: number, wx: number, wy: number, mx: number, my: number
let modRad = 0, i = 10

function renderFrame() {
    requestAnimationFrame(renderFrame)
    analyser.getByteFrequencyData(frequencyData)
    fuckShitUp()
}

function calculateC() {
    const asq = Math.pow((wx / 2), 2)
    const bsq = Math.pow((wy / 2), 2)

    const csq = asq + bsq
    c = Math.floor(Math.sqrt(csq))
}


function fuckShitUp() {
    const r0 = map(frequencyData[13], 0, 255, 50, 100)
    const g0 = map(frequencyData[8], 0, 255, 0, 200)
    const b0 = map(frequencyData[8], 0, 255, 50, 255)

    const r1 = map(frequencyData[3], 0, 255, 80, 255)
    const g1 = map(frequencyData[13], 0, 255, 25, 155)
    const b1 = map(frequencyData[8], 0, 255, 0, 155)


    ctx.fillStyle = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    mx = (i * Math.sin(i)) + wx / 2
    my = (i * Math.cos(i)) + wy / 2

    if (modRad <= c) {
        modRad += 2
    }

    if (modRad >= c) {
        calculateC()
        modRad = 0
        flip = !flip
        hasFlipped = true
    }

    if (hasFlipped) {
        const grd1 = ctx.createRadialGradient(mx, my, (modRad / 4), mx, my, modRad)
        const stop = !flip ? 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')' : 'rgb(' + r0 + ',' + g0 + ',' + b0 + ')'
        grd1.addColorStop(0, stop)
        grd1.addColorStop(1, stop)

        ctx.beginPath()
        ctx.fillStyle = grd1
        ctx.arc(mx, my, c, 0, 2 * Math.PI, false)
        ctx.fill()
    }

    // create radial gradient
    const grd = ctx.createRadialGradient(mx, my, (modRad / 4), mx, my, modRad)
    const stop = flip ? 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')' : 'rgb(' + r0 + ',' + g0 + ',' + b0 + ')'

    grd.addColorStop(0, stop)
    grd.addColorStop(1, stop)

    ctx.beginPath()
    ctx.fillStyle = grd
    ctx.arc(mx, my, modRad, 0, 2 * Math.PI, false)
    ctx.fill()


    const topElem = document.getElementById('top-waves')!
    const bottomElem = document.getElementById('bottom-waves')!

    topElem.style.height = `${map(frequencyData[12], 0, 255, 0, 240)}px`
    bottomElem.style.height = `${map(frequencyData[12], 0, 255, 0, 240)}px`
}

function init() {
    cnv = document.getElementById('canvas')! as HTMLCanvasElement

    wx = window.innerWidth
    wy = window.innerHeight
    ctx = cnv.getContext('2d')!
    cnv.width = wx
    cnv.height = wy
    calculateC()
    ctx.fillStyle = "#252627";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    document.body.appendChild(cnv);
}

function resizeCanvas() {
    wx = window.innerWidth
    wy = window.innerHeight
    calculateC()
    cnv.width = wx
    cnv.height = wy
}

export function startColorfulVisualizer() {
    if (!initialized) {
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

        frequencyData = new Uint8Array(analyser.frequencyBinCount)

        init()
        audio.play()
        renderFrame()

        window.addEventListener("resize", resizeCanvas)
        initialized = true
    }
}
