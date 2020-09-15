function map(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const styles = document.createElement('style');
document.head.appendChild(styles);

let homepageLocked = false
let homepageInitialized = false

let homepageAudioCtx: AudioContext
let homepageAudio: HTMLAudioElement
let homepageAudioSrc: MediaElementAudioSourceNode
let homepageAnalyser: AnalyserNode
let homepageFrequencyData: Uint8Array

function renderFrame() {
    requestAnimationFrame(renderFrame)
    // update data in frequencyData
    homepageAnalyser.getByteFrequencyData(homepageFrequencyData)
    // render frame based on values in frequencyData
    fuckShitUp()
}

function fuckShitUp() {
    const r0 = map(homepageFrequencyData[13], 0, 255, 50, 100)
    const g0 = map(homepageFrequencyData[8], 0, 255, 0, 200)
    const b0 = map(homepageFrequencyData[8], 0, 255, 50, 255)

    const r1 = map(homepageFrequencyData[3], 0, 255, 40, 255)
    const g1 = map(homepageFrequencyData[13], 0, 255, 25, 155)
    const b1 = map(homepageFrequencyData[8], 0, 255, 60, 155)

    const r2 = map(homepageFrequencyData[5], 0, 255, 40, 255)
    const g2 = map(homepageFrequencyData[11], 0, 255, 40, 255)
    const b2 = map(homepageFrequencyData[14], 0, 255, 40, 255)

    const topElem = document.getElementById('top-accent')!
    const midElem = document.getElementById('mid-accent')!
    const bottomElem = document.getElementById('bottom-accent')!
    const particleElem = document.getElementById('particleWrapper')!

    topElem.style.backgroundColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'
    midElem.style.backgroundColor = 'rgb(' + r0 + ',' + g0 + ',' + b0 + ')'
    bottomElem.style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'
    if (particleElem) particleElem.style.transform = `scale(${map(homepageFrequencyData[13], 0, 255, 1, 1.66)})`
}

function initialize() {
    if (!homepageInitialized) {
        // @ts-expect-error
        const AC = window.AudioContext || window.webkitAudioContext
        homepageAudioCtx = new AC()
        homepageAudio = document.getElementById('visualizerAudio')! as HTMLAudioElement
        homepageAudioSrc = homepageAudioCtx.createMediaElementSource(homepageAudio!)
        homepageAnalyser = homepageAudioCtx.createAnalyser()
        homepageAnalyser.fftSize = 32
        // we have to connect the MediaElementSource with the analyser
        homepageAudioSrc.connect(homepageAnalyser)
        homepageAudioSrc.connect(homepageAudioCtx.destination)
        homepageFrequencyData = new Uint8Array(homepageAnalyser.frequencyBinCount)
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
