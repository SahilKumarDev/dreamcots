import ChartData from "@/components/admin/ChartData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between flex-wrap space-y-0 ">
            <Button>
              <h2>School College</h2>
              <h3>3</h3>
            </Button>
            <Button>
              <h2>School College</h2>
              <h3>3</h3>
            </Button>
            <Button>
              <h2>School College</h2>
              <h3>3</h3>
            </Button>
            <Button>
              <h2>School College</h2>
              <h3>3</h3>
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="grid grid-rows-4">
          <ChartData />
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <CardDescription>
            Built By <span className="hover:underline cursor-pointer">SahilKumarDev</span> ❤️{" "}
          </CardDescription>
        </CardFooter>
      </Card>
    </>
  );
};

export default DashboardPage;
