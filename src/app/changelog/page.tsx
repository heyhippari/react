import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { sanityFetch } from '@/utils/sanity/lib/client';
import { GetChangelogsQueryResult } from '@/utils/sanity/sanity.types';
import { groq } from 'next-sanity';

export default async function ChangelogPage() {
  const getChangelogsQuery = groq`
            *[_type == "changelog"] | order(date desc) {
            _id,
            date,
            changes
            }
        `;

  const changelogs = await sanityFetch<GetChangelogsQueryResult>({
    query: getChangelogsQuery,
  });

  return (
    <div className="container flex flex-col gap-4 p-4">
      <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-relaxed text-transparent">
        Changelog
      </h1>
      <Accordion type="single" collapsible defaultValue="0">
        {changelogs.map((changelog, index: number) => (
          <AccordionItem key={changelog._id} value={index.toString()}>
            <AccordionTrigger>
              <h2 className="text-xl font-bold">{changelog.date}</h2>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                {changelog.changes?.map((change, index: number) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
