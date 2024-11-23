import { IAudioMetadata } from "music-metadata"

interface TrackInfoProps {
  metadata?: IAudioMetadata | null
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ metadata }) => {
  const artist = metadata?.common.artist || "-"
  const title = metadata?.common.title || "-"

  return (
    <div className="absolute left-8 bottom-8 w-96 h-16 rounded backdrop-blur-md px-4 flex flex-col p-2 tracking-tighter">
      <b><p>{artist}</p></b>
      <p className="truncate max-w-[224px] text-xs tracking-tighter">{title}</p>
    </div>
  )
}