import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * A layout with two columns, the first column is a sidebar and the second column is the main content.
 * @param properties The properties of the component.
 * @param properties.children The main content.
 * @param properties.sidebarContent The content to display in the sidebar.
 * @param properties.sidebarTitle The title to display at the top of the sidebar.
 * @param properties.titleAction The action to display next to the title.
 * @returns The rendered component.
 */
export function TwoColumnLayout({
  children,
  sidebarContent,
  sidebarTitle,
  titleAction,
}: Readonly<{
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  sidebarTitle: string;
  titleAction?: React.ReactNode;
}>) {
  return (
    <div className="container flex flex-row gap-2 p-4">
      <Card className="hidden h-fit shrink-0 flex-col overflow-hidden bg-pink-50 dark:bg-pink-950 lg:flex lg:w-64">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-pink-200 p-4 dark:bg-pink-700">
          <CardTitle className="capitalize">{sidebarTitle}</CardTitle>
          {titleAction}
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-2 pt-3">
          {sidebarContent}
        </CardContent>
      </Card>
      <div className="container flex grow flex-col gap-4">{children}</div>
    </div>
  );
}
