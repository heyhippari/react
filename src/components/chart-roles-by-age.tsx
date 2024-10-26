'use client';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis } from 'recharts';

const chartConfig = {
  ages: {
    color: '#ec4899',
    label: 'Age',
  },
} satisfies ChartConfig;

/**
 * Chart that displays the roles by age.
 * @param props The props for the chart roles by age.
 * @param props.data The data for the chart.
 * @returns The chart roles by age component.
 */
export default function ChartRolesByAge({
  data,
}: Readonly<{ data: { age: null | number; count: null | number }[] }>) {
  return (
    <ChartContainer className="min-h-[200px] w-full" config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <XAxis
          axisLine={false}
          dataKey="age"
          tick={{
            fill: 'currentColor',
          }}
          tickLine={false}
          tickMargin={10}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="#ec4899" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
