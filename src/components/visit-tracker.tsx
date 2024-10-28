'use client';

import { registerViewAction } from '@/app/actions/view';
import { LabelDto } from '@/data/label.dto';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';
import { SeriesDto } from '@/data/series.dto';
import { StudioDto } from '@/data/studio.dto';
import { useEffect } from 'react';

/**
 * Component that registers a view for the given item.
 * @param properties The properties for the visit tracker component.
 * @param properties.item The item to register the view for.
 * @param properties.differenciator The type of item to register the view for.
 * @returns The visit tracker component.
 */
export function VisitTracker({
  differenciator,
  item,
}: {
  differenciator: 'label' | 'movie' | 'person' | 'series' | 'studio';
  item: LabelDto | MovieDto | PersonDto | SeriesDto | StudioDto;
}) {
  useEffect(() => {
    const registerView = async () => {
      if (item?.id) {
        try {
          await registerViewAction(item.id, differenciator);
        } catch {
          // Just ignore the error, we don't want to block the page load
        }
      }
    };

    void registerView();
  }, [differenciator, item]);

  return null;
}
