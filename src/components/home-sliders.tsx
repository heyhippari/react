import ItemSlider from '@/components/movie-slider';
import { viewsService } from '@/services/views.service';

/**
 * Slider sections used in the home page.
 * @returns The home sliders component.
 */
export default async function HomeSliders() {
  const recentMovies = await viewsService.getMostRecentMovies();
  const popularPersons = await viewsService.getMostPopularPersons();
  const informationNeeded = await viewsService.getInformationNeeded();
  const releasedOnThisDay = await viewsService.getReleasedOnThisDay();

  return (
    <>
      <h2 className="text-2xl font-semibold">Recently Released</h2>
      <ItemSlider items={recentMovies ?? []} />
      <h2 className="text-2xl font-semibold">Trending People</h2>
      <ItemSlider items={popularPersons ?? []} />
      <h2 className="text-2xl font-semibold">On This Day</h2>
      <ItemSlider items={releasedOnThisDay ?? []} />
      <h2 className="text-2xl font-semibold">Information Needed</h2>
      <ItemSlider items={informationNeeded ?? []} />
    </>
  );
}
