import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getChangelogs } from '@/utils/sanity/query';

export default async function ChangelogPage() {
  const changelogs = await getChangelogs();

  return (
    <div className="container flex flex-col gap-4 p-4">
      <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-relaxed text-transparent">
        Changelog
      </h1>
      {changelogs.map((changelog: any) => (
        <Accordion type="single" collapsible>
          <AccordionItem value={changelog._id}>
            <AccordionTrigger>
              <h2 className="text-xl font-bold">{changelog.date}</h2>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                {changelog.changes.map((change: any) => (
                  <li>{change}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
