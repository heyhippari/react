'use client';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
  years: {
    color: '#ec4899',
    label: 'Year',
  },
} satisfies ChartConfig;

/**
 * Chart that displays the number of movies per year.
 * @param properties The properties for the chart movies per year.
 * @param properties.data The data for the chart.
 * @returns The chart movies per year component.
 */
export default function ChartMoviesPerYear({
  data,
}: Readonly<{
  data: { movie_count: null | number; release_year: null | number }[];
}>) {
  return (
    <ChartContainer className="min-h-[200px] w-full" config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <XAxis
          axisLine={false}
          dataKey="release_year"
          tick={{
            fill: 'currentColor',
          }}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          dataKey="movie_count"
          tick={{
            fill: 'currentColor',
          }}
          tickLine={false}
          tickMargin={10}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="movie_count" fill="#ec4899" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
