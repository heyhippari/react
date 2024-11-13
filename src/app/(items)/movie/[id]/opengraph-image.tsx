/* eslint-disable jsx-a11y/alt-text -- The entire response is an image */
/* eslint-disable @next/next/no-img-element -- The entire response is an image */
import { loadGoogleFont } from '@/core/utils/social';
import { movieService } from '@/services/movie.service';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Kanojo';

export const contentType = 'image/png';

/**
 * Generates an OpenGraph image for a movie.
 * @param properties - The properties passed to the image.
 * @param properties.params - The parameters passed to the image.
 * @param properties.params.id - The ID of the movie to generate the image for.
 * @returns The generated image response.
 * @async
 */
export default async function Image({ params }: { params: { id: string } }) {
  const movie = await movieService.getMovie(Number(params.id));

  // If there are roles, get the first 3 ones into an array.
  const roles = movie.roles?.slice(0, 3).map((role) => role);
  // If there are more than 3 roles, get a count of the remaining ones.
  const remainingRoles =
    movie.roles && movie.roles?.length > 3 ? movie.roles.length - 3 : 0;

  return new ImageResponse(
    (
      <div tw="flex flex-row w-full h-full items-center justify-center bg-pink-200">
        <div tw="flex flex-col items-center justify-center mr-6">
          {movie.front_cover_url?.poster ? (
            <img
              alt={movie.display_name}
              src={movie?.front_cover_url?.poster}
              style={{ height: '600px', objectFit: 'cover', width: '400px' }}
              tw="rounded-lg border-4 border-pink-300"
            />
          ) : (
            <div
              style={{ height: '600px', objectFit: 'cover', width: '400px' }}
              tw="flex items-center justify-center rounded-lg border-4 border-pink-300 bg-pink-100"
            >
              <p tw="text-6xl text-center font-black text-pink-300">No Image</p>
            </div>
          )}
        </div>
        <div
          style={{ height: '600px', maxWidth: '740px' }}
          tw="flex flex-col h-full justify-between"
        >
          <div tw="flex flex-col items-start justify-start">
            <div tw="flex flex-row items-center justify-between mb-1">
              <div tw="flex items-center justify-between bg-pink-800 pt-0 pb-0 pr-2 pl-2 rounded-lg mr-2">
                <p tw="text-lg font-bold text-white mt-0 mb-0">
                  {movie.dvd_id}
                </p>
              </div>
              {movie.format && (
                <div tw="flex items-center justify-between bg-pink-800 pt-0 pb-0 pr-2 pl-2 rounded-lg">
                  <p tw="text-lg font-bold text-white mt-0 mb-0">
                    {movie.format}
                  </p>
                </div>
              )}
            </div>
            <h1 tw="text-4xl font-black mb-0 mt-0 line-clamp-2 ellipsis text-pink-900">
              {movie.display_name}
            </h1>
            {movie.alternative_name && (
              <p tw="text-2xl font-bold mb-2 mt-0 line-clamp-1 ellipsis text-pink-700">
                {movie.alternative_name}
              </p>
            )}
          </div>
          <div tw="flex flex-row">
            {roles?.map((role) => (
              // Make small cards for each role.
              <div
                key={role.id}
                tw="flex flex-col items-center justify-center mr-4"
              >
                <img
                  alt={role.person?.display_name}
                  src={role.person?.profile_url?.poster ?? ''}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    width: '150px',
                  }}
                  tw="rounded-lg border-2 border-pink-300"
                />
                <p tw="text-xl font-bold text-center mt-2 mb-0 line-clamp-1 ellipsis text-pink-900">
                  {role.person?.display_name}
                </p>
                <p tw="text-lg text-center -mt-1 mb-0 line-clamp-1 ellipsis text-pink-700">
                  {role.age} years old
                </p>
              </div>
            ))}
            {remainingRoles > 0 && (
              // Make a card for the remaining roles count.
              <div tw="flex flex-col items-center justify-start mr-4">
                <div
                  style={{ height: '200px', width: '150px' }}
                  tw="flex flex-col h-full justify-center items-center rounded-lg border-2 border-pink-300 bg-pink-100"
                >
                  <p tw="text-6xl font-black text-center text-pink-300 mt-2">{`+${remainingRoles}`}</p>
                </div>
              </div>
            )}
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
/* eslint-enable jsx-a11y/alt-text -- The entire response is an image */
/* eslint-enable @next/next/no-img-element -- The entire response is an image */
