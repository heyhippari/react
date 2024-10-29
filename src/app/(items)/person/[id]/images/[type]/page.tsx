import { ButtonUploadPersonImage } from '@/components/button-upload-person-image';
import ImageCard from '@/components/image-card';
import ItemGrid from '@/components/item-grid';
import ItemHeader from '@/components/item-header';
import ItemNavbar from '@/components/item-navbar';
import SidebarPersonImages from '@/components/sidebar-person-images';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { personService } from '@/services/person.service';
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

  if (!['profiles'].includes(type)) {
    return redirect(`/movie/${id}`);
  }

  const person = await personService.getPerson(Number(id));

  const imageType = 'profile';

  const images =
    person.person_images
      ?.filter((person_images) => person_images.image?.type === imageType)
      .map((person_images) => person_images.image)
      .filter((image) => image !== null && image !== undefined) ?? [];

  return (
    <>
      <ItemNavbar item={person} />
      <ItemHeader item={person} />
      <TwoColumnLayout
        sidebarContent={<SidebarPersonImages person={person} />}
        sidebarTitle={type}
        titleAction={
          <ButtonUploadPersonImage imageType={imageType} item={person} />
        }
      >
        {images.length === 0 ? (
          <p className="text-center text-lg text-pink-600 dark:text-pink-400">
            No images found.
          </p>
        ) : (
          <ItemGrid items={images} large sidebar>
            {(image, index) => (
              <ImageCard
                image={image}
                key={`image-${index}`}
                priority={index < 6}
              />
            )}
          </ItemGrid>
        )}
      </TwoColumnLayout>
    </>
  );
}
