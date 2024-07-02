'use client';
import { FreeMode, Mousewheel, Scrollbar, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './movie-card';

import { MovieWithImages } from '@/queries/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';

export default function MovieSlider({ movies }: { movies: MovieWithImages[] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[FreeMode, Mousewheel, Scrollbar, Virtual]}
        freeMode={true}
        mousewheel={{ forceToAxis: true }}
        scrollbar={{ draggable: true }}
        slidesPerGroup={1}
        slidesPerGroupAuto={true}
        slidesPerView={'auto'}
      >
        {movies.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="mb-2 mr-4 max-w-[100px] md:max-w-[200px]"
            virtualIndex={index}
          >
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
