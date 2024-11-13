import { loadGoogleFont } from '@/core/utils/social';
import { viewsService } from '@/services/views.service';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Kanojo';

export const contentType = 'image/png';

/**
 * Generates an Open Graph image response for the Kanojo application.
 *
 * This function creates an image response with a styled div containing
 * a title and a description. The image is intended to be used as an
 * Open Graph image for social media sharing.
 * @returns An ImageResponse object.
 */
export default async function Image() {
  const counts = await viewsService.getCurrentCounts();

  return new ImageResponse(
    (
      <div tw="flex flex-row w-full h-full items-center justify-center bg-pink-200">
        <div tw="flex flex-col items-center justify-center mr-30">
          <h1 tw="self-center whitespace-nowrap border-l-8 border-l-pink-500 pl-3 text-9xl font-extrabold">
            Kanojo
          </h1>
          <p tw="text-4xl font-bold text-center mb-0">
            A community-run database
          </p>
          <p tw="text-4xl font-bold text-center mt-0">for gravure idols.</p>
        </div>
        <div tw="flex flex-col border-l-4 border-pink-500 pl-24 mr-8">
          <div tw="flex flex-col">
            <h2 tw="text-2xl font-bold mb-0">Movies</h2>
            <p tw="text-6xl font-black text-pink-600 mt-2">
              {counts?.movie_count}
            </p>
          </div>
          <div tw="flex flex-col">
            <h2 tw="text-2xl font-bold mb-0">People</h2>
            <p tw="text-6xl font-black text-pink-600 mt-2">
              {counts?.person_count}
            </p>
          </div>
          <div tw="flex flex-col">
            <h2 tw="text-2xl font-bold mb-0">Studios</h2>
            <p tw="text-6xl font-black text-pink-600 mt-2">
              {counts?.studio_count}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          data: await loadGoogleFont('Noto+Sans+JP', '700'),
          name: 'Noto Sans JP',
          style: 'normal',
        },
        {
          data: await loadGoogleFont('Noto+Sans+JP', '800'),
          name: 'Noto Sans JP',
          style: 'normal',
        },
        {
          data: await loadGoogleFont('Noto+Sans+JP', '900'),
          name: 'Noto Sans JP',
          style: 'normal',
        },
      ],
      height: 630,
      width: 1200,
    },
  );
}
