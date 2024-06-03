import Image from 'next/image';
import { Badge } from './ui/badge';

export default function MovieCard({ movie }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[2/3] w-full">
        <Image
          className="rounded-lg object-cover shadow-md"
          src={`https://images.kanojodb.com/${movie.thumb_url}`}
          alt={movie.name}
          layout="fill"
        />
        <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between">
          <div />
          <div className="p-2">
            <Badge variant="default">{movie.dvd_id}</Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-md line-clamp-1 font-semibold text-white">
          {movie.name}
        </h3>
        <p className="line-clamp-1 text-xs font-medium text-white opacity-75">
          {movie.original_name}
        </p>
      </div>
    </div>
  );
}
