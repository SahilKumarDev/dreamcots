"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTeacherActions } from "@/hooks/admin/useTeacherAction";
import Heading from "@/components/admin/_components/Heading";
import { ITeacher } from "@/types/admin/teacher-types";
import { Separator } from "@/components/ui/separator";
import { ADMIN_TEACHER_EDIT } from "@/utils/routes";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import { Waypoints } from "lucide-react";
import Image from "next/image";

const ViewPage = ({ slugId }: { slugId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacher, setTeacher] = useState<ITeacher | null>(null);

  const { handleViewTeacher } = useTeacherActions({
    teacherId: slugId,
  });

  const router = useRouter();
  const teacherEdit = `${ADMIN_TEACHER_EDIT}${slugId}`;

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setIsLoading(true);
        const data = await handleViewTeacher(slugId);

        setTeacher(data);
      } catch (error) {
        console.error("View error:", error);
        setTeacher(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherData();
  }, [slugId]);

  const onEdit = async () => {
    try {
      setIsLoading(true);
      await handleViewTeacher(slugId);
      router.push(teacherEdit);
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!teacher) {
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
          Profile of <span className="underline">{teacher.name}</span>
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className=" ">
        <div className="flex-between h-fit">
          <div className="flex-center gap-2">
            <Image
              src={teacher.profilePicture}
              alt="profile"
              width={100}
              height={100}
              className="h-20 w-20 rounded-full "
            />
            <div>
              <h2 className="text-lg font-semibold">Name:- {teacher.name}</h2>
              <small className="text-sm font-medium leading-none">
                Email:- {teacher.email}
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
          <Heading text={`Name:- ${teacher.name}`} />
          <Heading text={`Number:- ${teacher.number}`} />
          <Heading text={`Experience:- ${teacher.experience}`} />
          <Heading text={`Qualification:- ${teacher.qualification}`} />
          <Heading text={`School or College:- ${teacher.schoolOrCollege}`} />
          <Heading text={`Coaching:- ${teacher.coaching}`} />
          <Heading text={`Teaching Language:- ${teacher.teachingLanguage}`} />
          <Heading text={`Teaching Subject:- ${teacher.teachingSubject}`} />
          <Heading text={`Gender:- ${teacher.gender}`} />
          <Heading text={`Address:- ${teacher.address}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewPage;
