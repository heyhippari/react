'use client';
import ItemCard from '@/components/item-card';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';
import { FreeMode, Mousewheel, Scrollbar, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';

/**
 * A slider for movie or person items.
 * @param properties The properties of the component.
 * @param properties.items The items to display in the slider.
 * @returns The rendered component.
 */
export default function ItemSlider({
  items,
}: Readonly<{ items: (MovieDto | PersonDto)[] }>) {
  return (
    <div className="relative">
      <Swiper
        freeMode={true}
        modules={[FreeMode, Mousewheel, Scrollbar, Virtual]}
        mousewheel={{ forceToAxis: true }}
        scrollbar={{ draggable: true }}
        slidesPerGroup={1}
        slidesPerGroupAuto={true}
        slidesPerView={'auto'}
      >
        {items.map((item, index) => (
          <SwiperSlide
            className="mb-2 mr-4 max-w-[100px] md:max-w-[200px]"
            key={item?.id}
            virtualIndex={index}
          >
            <ItemCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
