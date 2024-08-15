"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  agCategory,
  getCategory,
  agSales,
} from "@/app/redux/reducers/checkoutReducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function CategoryChart() {
  const dispatch = useDispatch();
  const category = useSelector(agCategory);
  const sales = useSelector(agSales);
  const [categories, setCategories] = useState({});
  const [totalShare, setTotalShare] = useState(0);

  useEffect(() => {
    dispatch(getCategory()); // Fetch the category data on component mount
  }, [dispatch]);

  useEffect(() => {
    if (sales.length > 0) {
      const total = sales
        .reduce((acc, curr) => acc + curr.totalSales, 0)
        .toFixed(2);
      setTotalShare(parseFloat(total));
    }
  }, [sales]);

  useEffect(() => {
    if (category.length > 0) {
      const result = category.reduce((acc, curr) => {
        acc[curr._id] = parseFloat(curr.totalSales.toFixed(2));
        return acc;
      }, {});

      setCategories(result);
    }
  }, [category]);

  // Check if totalShare is zero to avoid division by zero
  const hasData = totalShare > 0 && Object.keys(categories).length > 0;

  return (
    <Card className="max-w-xs">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Fragrances</div>
            <div className="flex items-baseline gap-1 text-xl font-bold leading-none tabular-nums">
              ₹{hasData ? (categories.fragrances / 1000).toFixed(2) : 0}
              <span className="text-sm font-normal text-muted-foreground">
                k
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Beauty</div>
            <div className="flex items-baseline gap-1 text-xl font-bold leading-none tabular-nums">
              ₹{hasData ? (categories.beauty / 1000).toFixed(2) : 0}
              <span className="text-sm font-normal text-muted-foreground">
                k
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Furniture</div>
            <div className="flex items-baseline gap-1 text-xl font-bold leading-none tabular-nums">
              ₹{hasData ? (categories.furniture / 1000).toFixed(2) : 0}
              <span className="text-sm font-normal text-muted-foreground">
                k
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            move: {
              label: "Move",
              color: "hsl(var(--chart-1))",
            },
            exercise: {
              label: "Exercise",
              color: "hsl(var(--chart-2))",
            },
            stand: {
              label: "Stand",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          {hasData && (
            <RadialBarChart
              margin={{
                left: -10,
                right: -10,
                top: -10,
                bottom: -10,
              }}
              data={[
                {
                  activity: "fragrances",
                  value:
                    (parseFloat(categories.fragrances) / totalShare) * 100 || 0,
                  fill: "var(--color-stand)",
                },
                {
                  activity: "beauty",
                  value:
                    (parseFloat(categories.beauty) / totalShare) * 100 || 0,
                  fill: "var(--color-exercise)",
                },
                {
                  activity: "furniture",
                  value:
                    (parseFloat(categories.furniture) / totalShare) * 100 || 0,
                  fill: "var(--color-move)",
                },
              ]}
              innerRadius="20%"
              barSize={24}
              startAngle={90}
              endAngle={450}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                dataKey="value"
                tick={false}
              />
              <RadialBar dataKey="value" background cornerRadius={5} />
            </RadialBarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
