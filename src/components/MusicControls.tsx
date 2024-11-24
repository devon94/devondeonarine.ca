import { SkipForward, SkipBack, Play, Square, Hourglass } from 'lucide-react'

interface MusicControlsProps {
  isPlaying: boolean
  isInitialized: boolean
  onPreviousTrack: () => void
  onTogglePlayPause: () => void
  onReset: () => void
  onNextTrack: () => void
}

export const MusicControls: React.FC<MusicControlsProps> = ({
  isPlaying,
  isInitialized,
  onPreviousTrack,
  onTogglePlayPause,
  onReset,
  onNextTrack
}) => {
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center w-40 h-16 absolute right-4 bottom-4 md:bottom-8 md:right-8 rounded backdrop-blur-sm px-4">
        <Hourglass className="animate-spin text-white" size={24} />
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center w-40 h-16 absolute right-4 bottom-4 md:bottom-8 md:right-8 rounded backdrop-blur-sm px-4">
      <SkipBack
        className="cursor-pointer text-white"
        size={24}
        onClick={onPreviousTrack}
      />
      {!isPlaying ? (
        <Play
          className="cursor-pointer text-white"
          size={24}
          onClick={onTogglePlayPause}
        />
      ) : (
        <Square
          className="cursor-pointer text-white"
          size={24}
          onClick={onReset}
        />
      )}
      <SkipForward
        className="cursor-pointer text-white"
        size={24}
        onClick={onNextTrack}
      />
    </div>
  )
}