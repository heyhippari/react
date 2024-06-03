import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './movie-card';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';

export default function MovieSlider({ movies }: { movies: any[] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[FreeMode, Mousewheel, Scrollbar]}
        freeMode={true}
        mousewheel={{ forceToAxis: true }}
        scrollbar={{ draggable: true }}
        slidesPerGroup={1}
        slidesPerGroupAuto={true}
        slidesPerView={'auto'}
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="mb-2 mr-4 max-w-[100px] md:max-w-[200px]"
          >
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
