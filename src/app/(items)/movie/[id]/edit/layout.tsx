import ItemHeader from '@/components/item-header';
import ItemNavbar from '@/components/item-navbar';
import SidebarMovieEdit from '@/components/sidebar-movie-edit';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { movieService } from '@/services/movie.service';

/**
 * Layout for the movie edit pages.
 * @param properties The component properties.
 * @param properties.children The children components.
 * @param properties.params The URL parameters, containing the movie ID.
 * @returns The movie edit layout.
 */
export default async function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const movie = await movieService.getMovie(Number(id));

  return (
    <>
      <ItemNavbar item={movie} />
      <ItemHeader item={movie} />
      <TwoColumnLayout
        sidebarContent={<SidebarMovieEdit movie={movie} />}
        sidebarTitle="Edit"
      >
        {children}
      </TwoColumnLayout>
    </>
  );
}
