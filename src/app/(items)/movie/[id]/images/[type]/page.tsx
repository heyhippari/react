import { ButtonUploadMovieImage } from '@/components/button-upload-movie-image';
import ImageCard from '@/components/image-card';
import ItemGrid from '@/components/item-grid';
import ItemHeader from '@/components/item-header';
import ItemNavbar from '@/components/item-navbar';
import SidebarMovieImages from '@/components/sidebar-movie-images';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { movieService } from '@/services/movie.service';
import { redirect } from 'next/navigation';

/**
 * A page displaying the images of a movie and allowing the user to manage them.
 * @param properties The properties of the page component.
 * @param properties.params The URL parameters, containing the movie ID and the image type.
 * @returns The element to render.
 */
export default async function Image({
  params,
}: Readonly<{
  params: Promise<{ id: string; type: string }>;
}>) {
  const { id, type } = await params;

  if (!['backdrops', 'posters'].includes(type)) {
    return redirect(`/movie/${id}`);
  }

  const movie = await movieService.getMovie(Number(id));

  let imageType: 'front_cover' | 'full_cover' = 'front_cover';

  switch (type) {
    case 'backdrops': {
      imageType = 'full_cover';
      break;
    }
    case 'posters': {
      imageType = 'front_cover';
      break;
    }
  }

  const isWide = type === 'backdrops';

  const images =
    movie.movie_images
      ?.filter((movie_image) => movie_image.image?.type === imageType)
      .map((movie_image) => movie_image.image)
      .filter((image) => image !== null && image !== undefined) ?? [];

  return (
    <>
      <ItemNavbar item={movie} />
      <ItemHeader item={movie} />
      <TwoColumnLayout
        sidebarContent={<SidebarMovieImages movie={movie} />}
        sidebarTitle={type}
        titleAction={
          <ButtonUploadMovieImage imageType={imageType} item={movie} />
        }
      >
        <ItemGrid items={images} large sidebar wide={isWide}>
          {(image, index) => (
            <ImageCard
              image={image}
              item={movie}
              key={`image-${index}`}
              priority={index < 6}
              wide={isWide}
            />
          )}
        </ItemGrid>
      </TwoColumnLayout>
    </>
  );
}
