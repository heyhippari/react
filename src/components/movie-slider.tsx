'use client';
import { ItemWithImages } from '@/queries/types';
import { FreeMode, Mousewheel, Scrollbar, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ItemCard from './item-card';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';

export default function MovieSlider({
  items,
}: Readonly<{ items: ItemWithImages[] }>) {
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
