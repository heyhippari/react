import { useWindowSize } from '@/utils/hooks';
import { useEffect, useRef } from 'react';
import {
  AutoSizer,
  Grid,
  GridCellProps,
  WindowScroller,
} from 'react-virtualized';
import MovieCard from './movie-card';

export function MovieGrid({ movies }: { movies: any[] }) {
  const gridRef = useRef<Grid>(null);
  const coontainerRef = useRef<HTMLDivElement>(null);
  const containerWidth = coontainerRef.current?.clientWidth;

  const windowSize = useWindowSize();

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  function calculateColumnCount(width: number) {
    return Math.floor(width / 200);
  }

  function calculateItemWidth(width: number, columnCount: number) {
    return width / columnCount;
  }

  return (
    <div className="flex">
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer defaultHeight={height}>
            {({ height, width }) => {
              const columnCount = calculateColumnCount(containerWidth || 0);
              const rowCount = Math.ceil(movies.length / columnCount);
              const itemWidth = calculateItemWidth(
                containerWidth || 0,
                columnCount,
              );

              return (
                <Grid
                  ref={gridRef}
                  autoHeight
                  columnCount={columnCount}
                  columnWidth={itemWidth}
                  width={width}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={300}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  onScroll={onChildScroll}
                  cellRenderer={({
                    columnIndex,
                    key,
                    rowIndex,
                    style,
                  }: GridCellProps) => {
                    const index = rowIndex * columnCount + columnIndex;
                    const movie = movies[index];
                    return (
                      <div key={key} style={style}>
                        <MovieCard movie={movie} />
                      </div>
                    );
                  }}
                />
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
}
