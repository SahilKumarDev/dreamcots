"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentActions } from "@/hooks/admin/useStudentAction";
import Heading from "@/components/admin/_components/Heading";
import { IStudent } from "@/types/admin/student-types";
import { Separator } from "@/components/ui/separator";
import { ADMIN_STUDENT_EDIT } from "@/utils/routes";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import { Waypoints } from "lucide-react";
import Image from "next/image";

const StudentViewPage = ({ slugId }: { slugId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<IStudent | null>(null);

  const { handleViewStudent } = useStudentActions({
    studentId: slugId,
  });

  const router = useRouter();
  const studentEdit = `${ADMIN_STUDENT_EDIT}${slugId}`;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setIsLoading(true);
        const data = await handleViewStudent(slugId);

        setStudent(data);
      } catch (error) {
        console.error("View error:", error);
        setStudent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [slugId]);

  const onEdit = async () => {
    try {
      setIsLoading(true);
      await handleViewStudent(slugId);
      router.push(studentEdit);
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!student) {
    return (
      <div className="h-full w-full flex-center">
        <p className="text-lg text-gray-500">
          No Record found for this ID:- {slugId}
        </p>
      </div>
    );
  }

  return (
    <Card className="px-2 py-2 ">
      <CardHeader className="text-center text-2xl ">
        <CardTitle className="font-normal">
          Profile of <span className="underline">{student.name}</span>
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className=" ">
        <div className="flex-between h-fit">
          <div className="flex-center gap-2">
            <Image
              src={student.profilePicture}
              alt="profile"
              width={100}
              height={100}
              className="h-20 w-20 rounded-full "
            />
            <div>
              <h2 className="text-lg font-semibold">Name:- {student.name}</h2>
              <small className="text-sm font-medium leading-none">
                Email:- {student.email}
              </small>
            </div>
          </div>

          <Button onClick={onEdit} disabled={isLoading}>
            <Waypoints className="h-4 w-4" />
            <span>Update</span>
          </Button>
        </div>

        <Separator className="my-8" />

        <div className="grid-layout">
          <Heading text={`Name:- ${student.name}`} />
          <Heading text={`Number:- ${student.number}`} />
          <Heading text={`Age:- ${student.age}`} />
          <Heading text={`Qualification:- ${student.qualification}`} />
          <Heading text={`School or College:- ${student.schoolOrCollege}`} />
          <Heading text={`Gender:- ${student.gender}`} />
          <Heading text={`Address:- ${student.address}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentViewPage;
