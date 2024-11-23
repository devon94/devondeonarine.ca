import { FFT_SIZE } from "@devon94/devondeonarine.ca/constants/FFT_SIZE"

export const calculateBandEnergy = (audioContext: AudioContext, fftData: Float32Array, lowFreq: number, highFreq: number) => {
  const sampleRate = audioContext.sampleRate!
  let lowIndex = Math.floor((lowFreq / sampleRate) * FFT_SIZE)
  let highIndex = Math.ceil((highFreq / sampleRate) * FFT_SIZE)
  let energy = 0

  for (let i = lowIndex; i <= highIndex; i++) {
    const re = fftData[i * 2] // Real part
    const im = fftData[i * 2 + 1] // Imaginary part
    energy += re * re + im * im // Magnitude squared
  }

  return energy
}