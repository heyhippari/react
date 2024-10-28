import CardGrid from '@/components/card-grid';
import ItemNavbar from '@/components/item-navbar';
import ItemPoster from '@/components/item-poster';
import { Badge } from '@/components/ui/badge';
import { VisitTracker } from '@/components/visit-tracker';
import { personService } from '@/services/person.service';
import { DateTime } from 'luxon';
import { redirect } from 'next/navigation';

/**
 * Server-side code for the person page.
 * @param properties The properties for the person page.
 * @param properties.params The URL parameters, containing the person ID.
 * @returns The person page.
 */
export async function generateMetadata(properties: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await properties.params;

  try {
    const person = await personService.getPerson(Number(id));

    return {
      description: `Information about ${person.display_name} from Kanojo.`,
      title: person.display_name,
    };
  } catch {
    return {
      description: 'Information about a person from Kanojo.',
      title: 'Person',
    };
  }
}

/**
 * Server-side code for the person page.
 * @param properties The properties for the person page.
 * @param properties.params The URL parameters, containing the person ID.
 * @returns The rendered person page.
 */
export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = await personService.getPerson(Number(id));
  const movie_count = await personService.getPersonMoviesCount(Number(id));

  // On initial load, register the visit
  /*useEffect(() => {
    const registerView = async () => {
      if (person) {
        try {
          await registerViewAction(person.id, 'person');
        } catch {
          // Just ignore the error, we don't want to block the page load
        }
      }
    };

    void registerView();
  }, [person]);*/

  if (!person) {
    return redirect('/404');
  }

  return (
    <>
      <VisitTracker differenciator="person" item={person} />
      <ItemNavbar item={person} />
      <div className="container flex grow flex-col gap-2 px-0 lg:flex-row">
        <div className="grow bg-pink-100 p-4 dark:bg-pink-950">
          <div className="container flex flex-col gap-6 px-4">
            <ItemPoster item={person} />
            <div className="flex w-full flex-col justify-start gap-4 align-top">
              <div className="flex flex-col gap-0">
                <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                  {person?.display_name}
                </h1>
                {person?.alternative_name ? (
                  <p className="line-clamp-2 text-ellipsis text-lg font-semibold">
                    {person?.alternative_name}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-row">
                <Badge
                  className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
                  variant="default"
                >
                  {person?.birth_date
                    ? DateTime.fromISO(person.birth_date).toLocaleString(
                        DateTime.DATE_FULL,
                        {
                          locale: 'en-US',
                        },
                      )
                    : null}
                </Badge>
              </div>
              {/*{person?.aliases.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">Aliases</h2>
                  {person?.aliases.map((alias) => (
                    <p key={alias.original_name}>
                      {alias.name
                        ? `${alias.name} (${alias.original_name})`
                        : alias.original_name}
                    </p>
                  ))}
                </div>
              ) : null}*/}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row gap-2">
            <h2 className="text-lg font-semibold">Movies</h2>
            <Badge
              className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
              variant="default"
            >
              {movie_count}
            </Badge>
          </div>
          <CardGrid
            items={
              person?.roles
                ?.map((role) => role.movie)
                .filter((movie) => !!movie) ?? []
            }
            sidebar
          />
        </div>
      </div>
    </>
  );
}
