import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * A layout with two columns, the first column is a sidebar and the second column is the main content.
 * @param properties The properties of the component.
 * @param properties.children The main content.
 * @param properties.sidebarContent The content to display in the sidebar.
 * @param properties.sidebarTitle The title to display at the top of the sidebar.
 * @returns The rendered component.
 */
export function TwoColumnLayout({
  children,
  sidebarContent,
  sidebarTitle,
}: {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  sidebarTitle: string;
}) {
  return (
    <div className="container flex flex-row gap-2 p-4">
      <Card className="hidden h-fit shrink-0 flex-col overflow-hidden bg-pink-50 dark:border-pink-900 dark:bg-pink-950 lg:flex lg:w-64">
        <CardHeader className="bg-pink-200 dark:bg-pink-700">
          <CardTitle className="capitalize">{sidebarTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-2 pt-3">
          {sidebarContent}
        </CardContent>
      </Card>
      <div className="container flex grow flex-col gap-4">{children}</div>
    </div>
  );
}
