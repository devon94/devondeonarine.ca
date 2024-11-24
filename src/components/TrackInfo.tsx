import { IAudioMetadata } from "music-metadata"

interface TrackInfoProps {
  metadata?: IAudioMetadata | null
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ metadata }) => {
  const artist = metadata?.common.artist || "-"
  const title = metadata?.common.title || "-"

  return (
    <div className="absolute left-4 bottom-4 md:bottom-8 md:left-8 w-32 md:w-96 h-16 rounded backdrop-blur-sm px-4 flex flex-col p-2 tracking-tighter">
      <b><p className="text-white">{artist}</p></b>
      <p className="text-white truncate max-w-[224px] text-xs tracking-tighter">{title}</p>
    </div>
  )
}