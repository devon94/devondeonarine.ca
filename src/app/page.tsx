"use client"

import React from 'react'
import { usePerlinVisualization } from '@devon94/devondeonarine.ca/app/usePerlinVisualization'
import Header from '@devon94/devondeonarine.ca/components/Header'
import { MusicControls } from '@devon94/devondeonarine.ca/components/MusicControls'
import { TrackInfo } from '@devon94/devondeonarine.ca/components/TrackInfo'

// Define a type for your theme colors for better type-checking
type ThemeType = {
  _darkred: number
}

const Home: React.FC = () => {
  const { isPlaying, isInitialized, metadata, reset, nextTrack, previousTrack, togglePlayPause } = usePerlinVisualization()

  return (
    <div id="container" className='h-full w-full relative overflow-hidden' >
      <Header />
      <MusicControls isPlaying={isPlaying} isInitialized={isInitialized} onPreviousTrack={previousTrack} onTogglePlayPause={togglePlayPause} onReset={reset} onNextTrack={nextTrack} />
      <TrackInfo metadata={metadata} />
    </div>
  )
}

export default Home