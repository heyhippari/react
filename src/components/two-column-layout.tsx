import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function TwoColumnLayout({
  children,
  sidebarTitle,
  sidebarContent,
}: {
  children: React.ReactNode;
  sidebarTitle: string;
  sidebarContent?: React.ReactNode;
}) {
  return (
    <div className="container flex flex-row gap-2 p-4">
      <Card className="hidden h-fit flex-shrink-0 flex-col overflow-hidden bg-pink-50 dark:border-pink-900 dark:bg-pink-950 lg:flex lg:w-64">
        <CardHeader className="bg-pink-200 dark:bg-pink-700">
          <CardTitle>{sidebarTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-2 pt-3">
          {sidebarContent}
        </CardContent>
      </Card>
      <div className="container flex flex-grow flex-col gap-4">{children}</div>
    </div>
  );
}
