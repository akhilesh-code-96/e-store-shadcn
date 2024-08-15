"use client";

import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { agSales } from "@/app/redux/reducers/checkoutReducers/orderReducer";
import { getDailySales } from "@/app/redux/reducers/checkoutReducers/orderReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function DailyUpdateChart() {
  const sales = useSelector(agSales);
  const dispatch = useDispatch();
  const [average, setAverage] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);

  useEffect(() => {
    if (sales.length > 0) {
      const result = (
        sales.reduce((acc, curr) => {
          return acc + curr.totalSales;
        }, 0) / sales.length
      ).toFixed(2);

      const weekResult = sales.reduce((acc, curr) => {
        return acc + curr.totalSales;
      }, 0);
      setWeekTotal(weekResult);
      // console.log(result);
      setAverage(result);
    }
  }, [sales]);

  useEffect(() => {
    dispatch(getDailySales());
  }, [dispatch]);

  console.log("sales from chart", sales);

  return (
    <Card className="lg:max-w-md">
      <CardHeader className="pb-2 space-y-0">
        <CardDescription>Today</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          ₹{((sales.length > 0 && sales[0].totalSales) / 1000).toFixed(2)}k{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            Ruppees
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            steps: {
              label: "Steps",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={sales}
          >
            <Bar
              dataKey="totalSales"
              fill="var(--color-steps)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="_id"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <ChartTooltip
              // defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
            {/* <ReferenceLine
              y={1200}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Sales"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={`${average}`}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have made{" "}
          <span className="font-medium text-foreground">
            ₹{(weekTotal / 1000).toFixed(2)}k
          </span>{" "}
          ruppees.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
