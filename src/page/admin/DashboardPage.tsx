import ChartData from "@/components/admin/ChartData";
import DetailsCard from "@/components/admin/DetailsCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import React from "react";

const DashboardPage = async () => {
  return (
    <Card>
      <CardHeader>
        <DetailsCard />
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-rows-4">
        <ChartData />
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <CardDescription>
          Built By
          <span className="hover:underline cursor-pointer">SahilKumarDev</span>
          ❤️
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default DashboardPage;
