import ChartRolesByAge from '@/components/chart-roles-by-age';
import { getRolesByAge } from '@/queries/stats';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function StatsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: rolesByAge } = await getRolesByAge(supabase);

  if (!rolesByAge) {
    return null;
  }

  return (
    <div className="container flex flex-col gap-4 p-4">
      <h1>Stats</h1>
      <ChartRolesByAge data={rolesByAge} />
    </div>
  );
}
