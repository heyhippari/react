import { MovieWithImages } from '@/queries/types';
import Link from 'next/link';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import MovieCard from './movie-card';

export default function MovieGrid({ movies }: { movies: MovieWithImages[] }) {
  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    return (
      <div style={style}>
        <Link href={`/movie/${movies[rowIndex * 1000 + columnIndex]?.id}`}>
          <MovieCard movie={movies[rowIndex * 1000 + columnIndex]} />
        </Link>
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          columnCount={1000}
          columnWidth={100}
          height={height}
          rowCount={1000}
          rowHeight={35}
          width={width}
        >
          {Cell}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
}
