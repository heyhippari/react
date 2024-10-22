'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis } from 'recharts';

const chartConfig = {
  ages: {
    label: 'Age',
    color: '#ec4899',
  },
} satisfies ChartConfig;

export default function ChartRolesByAge({
  data,
}: Readonly<{ data: { age: number | null; count: number | null }[] }>) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <XAxis
          dataKey="age"
          tick={{
            fill: 'currentColor',
          }}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="#ec4899" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
