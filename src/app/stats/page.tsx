import ChartRolesByAge from '@/components/chart-roles-by-age';
import { viewsService } from '@/services/views.service';

/**
 * Statistics page.
 * @returns The page content.
 */
export default async function StatsPage() {
  const rolesByAge = await viewsService.getRolesByAge();

  return (
    <div className="container flex flex-col gap-4 p-4">
      <h1>Stats</h1>
      {rolesByAge ? <ChartRolesByAge data={rolesByAge} /> : null}
    </div>
  );
}
