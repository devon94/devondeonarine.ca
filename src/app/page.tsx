"use client"

export const dynamic = "force-dynamic"
import { DEFAULT_OPTIONS } from '@devon94/devondeonarine.ca/constants/DEFAULT_OPTIONS'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNext from '@mui/icons-material/SkipNext'
import SkipPrevious from '@mui/icons-material/SkipPrevious'
import React from 'react'

import { usePerlinVisualization } from '@devon94/devondeonarine.ca/app/usePerlinVisualization'
import { MusicControls } from '@devon94/devondeonarine.ca/components/MusicControls'
import { TrackInfo } from '@devon94/devondeonarine.ca/components/TrackInfo'
import Header from '@devon94/devondeonarine.ca/components/Header'

let options = Object.assign({}, DEFAULT_OPTIONS)

// Define a type for your theme colors for better type-checking
type ThemeType = {
  _darkred: number
}

const Home: React.FC = () => {
  const { isPlaying, isInitialized, metadata, reset, nextTrack, previousTrack, togglePlayPause } = usePerlinVisualization()

  return (
    <div id="container" style={{ width: '100%', height: '100vh' }} >
      <Header />
      <MusicControls isPlaying={isPlaying} isInitialized={isInitialized} onPreviousTrack={previousTrack} onTogglePlayPause={togglePlayPause} onReset={reset} onNextTrack={nextTrack} />
      <TrackInfo metadata={metadata} />
    </div>
  )
}

export default Home