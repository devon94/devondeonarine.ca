function map(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

let flip = false
let hasFlipped = false

let homepageLocked = false
let homepageInitialized = false

let homepageAudioCtx: AudioContext
let homepageAudio: HTMLAudioElement
let homepageAudioSrc: MediaElementAudioSourceNode
let homepageAnalyser: AnalyserNode
let homepageFrequencyData: Uint8Array

let cnv: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let c: number, wx: number, wy: number, mx: number, my: number
let modRad = 0, i = 10

function calculateC() {
    const asq = Math.pow((wx / 2), 2)
    const bsq = Math.pow((wy / 2), 2)
    const csq = asq + bsq
    c = Math.floor(Math.sqrt(csq))
}

function renderFrame() {
    requestAnimationFrame(renderFrame)
    homepageAnalyser.getByteFrequencyData(homepageFrequencyData)
    fuckShitUp()
}

function fuckShitUp() {
    const r0 = map(homepageFrequencyData[13], 0, 255, 60, 200)
    const g0 = map(homepageFrequencyData[8], 0, 255, 60, 155)
    const b0 = map(homepageFrequencyData[8], 0, 255, 60, 200)

    const r1 = map(homepageFrequencyData[3], 0, 255, 40, 255)
    const g1 = map(homepageFrequencyData[13], 0, 255, 40, 155)
    const b1 = map(homepageFrequencyData[8], 0, 255, 40, 100)

    const r2 = map(homepageFrequencyData[5], 0, 255, 70, 155)
    const g2 = map(homepageFrequencyData[11], 0, 255, 40, 155)
    const b2 = map(homepageFrequencyData[14], 0, 255, 70, 200)


    const r3 = map(homepageFrequencyData[5], 0, 255, 70, 100)
    const g3 = map(homepageFrequencyData[11], 0, 255, 40, 100)
    const b3 = map(homepageFrequencyData[14], 0, 255, 70, 100)


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


    const topElem = document.getElementById('top-accent')!
    const midElem = document.getElementById('mid-accent')!
    const bottomElem = document.getElementById('bottom-accent')!
    const particleElem = document.getElementById('particleWrapper')!

    topElem.style.backgroundColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'
    midElem.style.backgroundColor = 'rgb(' + r0 + ',' + g0 + ',' + b0 + ')'
    bottomElem.style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'
    if (particleElem) particleElem.style.transform = `scale(${map(homepageFrequencyData[13], 0, 255, 1, 1.66)})`
}

function resizeCanvas() {
    wx = window.innerWidth
    wy = 800
    calculateC()
    cnv.width = wx
    cnv.height = wy
}


function initialize() {
    if (!homepageInitialized) {
        const styles = document.createElement('style');
        document.head.appendChild(styles);

        cnv = document.getElementById('canvas')! as HTMLCanvasElement
        
        wx = window.innerWidth
        wy = 800
        ctx = cnv.getContext('2d')!
        cnv.width = wx
        cnv.height = wy

        calculateC()
        ctx.fillStyle = "#252627";
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        
        // @ts-expect-error
        const AC = window.AudioContext || window.webkitAudioContext
        homepageAudioCtx = new AC()
        homepageAudio = document.getElementById('visualizerAudio')! as HTMLAudioElement
        homepageAudioSrc = homepageAudioCtx.createMediaElementSource(homepageAudio!)
        homepageAnalyser = homepageAudioCtx.createAnalyser()
        homepageAnalyser.fftSize = 32

        homepageAudioSrc.connect(homepageAnalyser)
        homepageAudioSrc.connect(homepageAudioCtx.destination)
        homepageFrequencyData = new Uint8Array(homepageAnalyser.frequencyBinCount)
        
        window.addEventListener("resize", resizeCanvas)
        homepageInitialized = true
    }
}

export function startVisualizer() {
    if (!homepageLocked) {

        initialize()
        homepageAudio.loop = true
        homepageAudio.play()
        renderFrame()
        homepageLocked = true
    }
}

export function stopVisualizer() {
    if (homepageLocked) {
        homepageAudio.pause()
        renderFrame()
        homepageLocked = false
    }
}
