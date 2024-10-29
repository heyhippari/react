'use client';

import { cn } from '@/core/utils/ui';
import { ImageDto } from '@/data/image.dto';
import { DateTime } from 'luxon';
import Image from 'next/image';

import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';

/**
 * A cart component for displaying and managing images.
 * @param properties The properties of the image card component.
 * @param properties.image The image to display.
 * @param properties.priority Whether the image is a priority image and should be loaded first.
 * @param properties.wide Whether the image should be displayed in a wide format.
 * @returns The image card component.
 */
export default function ImageCard({
  image,
  priority = false,
  wide = false,
}: Readonly<{ image: ImageDto; priority?: boolean; wide?: boolean }>) {
  return (
    <Card>
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-t-lg bg-pink-200 dark:bg-pink-900',
          wide ? 'aspect-video' : 'aspect-[2/3]',
        )}
      >
        <Image
          alt="image"
          className="size-full object-cover"
          height={wide ? 188 : 369}
          priority={priority}
          src={(wide ? image.url.public : image.url.card) ?? ''}
          unoptimized
          width={wide ? 334 : 246}
        />
      </div>
      <Separator />
      <CardHeader className="px-4 py-3">
        <h2 className="text-base font-bold dark:text-pink-400">Info</h2>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex flex-col">
          <p className="text-sm text-pink-600 dark:text-pink-400">Added by</p>
          <p>{image.uploader?.username ?? 'Unknown'}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-pink-600 dark:text-pink-400">
            Upload date
          </p>
          {image.create_time && (
            <p>
              {DateTime.fromISO(image.create_time).toLocaleString(
                DateTime.DATE_FULL,
                {
                  locale: 'en-US',
                },
              )}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
