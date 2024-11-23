"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/admin/_components/Heading";
import { Separator } from "@/components/ui/separator";
import { ADMIN_SCHOOL_COLLEGE_EDIT } from "@/utils/routes";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import { Waypoints } from "lucide-react";
import Image from "next/image";
import { useSchoolCollegeActions } from "@/hooks/admin/useSchoolCollegeAction";
import { ISchoolCollege } from "@/types/admin/school-college-types";

const SchoolCollegeViewPage = ({ slugId }: { slugId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [schoolColleges, setSchoolColleges] = useState<ISchoolCollege | null>(
    null
  );

  const { handleViewSchoolCollege } = useSchoolCollegeActions({
    schoolCollegeId: slugId,
  });

  const router = useRouter();
  const schoolCollegeEdit = `${ADMIN_SCHOOL_COLLEGE_EDIT}${slugId}`;

  useEffect(() => {
    const fetchSchoolCollegeData = async () => {
      try {
        setIsLoading(true);
        const data = await handleViewSchoolCollege(slugId);

        setSchoolColleges(data);
      } catch (error) {
        console.error("View error:", error);
        setSchoolColleges(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchoolCollegeData();
  }, [slugId]);

  const onEdit = async () => {
    try {
      setIsLoading(true);
      await handleViewSchoolCollege(slugId);
      router.push(schoolCollegeEdit);
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!schoolColleges) {
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
          Profile of <span className="underline">{schoolColleges.name}</span>
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className=" ">
        <div className="flex-between h-fit">
          <div className="flex-center gap-2">
            <Image
              src={schoolColleges.profilePicture}
              alt="profile"
              width={100}
              height={100}
              className="h-20 w-20 rounded-full "
            />
            <div>
              <h2 className="text-lg font-semibold">
                Name:- {schoolColleges.name}
              </h2>
              <small className="text-sm font-medium leading-none">
                Email:- {schoolColleges.email}
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
        <Heading text={`Name: ${schoolColleges?.name}`} /> 
        <Heading text={`Number: ${schoolColleges?.number}`} />
        <Heading text={`Address: ${schoolColleges?.address}`} />
        <Heading text={`Link: ${schoolColleges?.link}`} />
        <Heading text={`About: ${schoolColleges?.about}`} />
        <Heading text={`Year of Establishment: ${schoolColleges?.yearOfEstablishment}`} />
        <Heading text={`Parent Institution: ${schoolColleges?.parentInstitution}`} />
        <Heading text={`Mode of Study: ${schoolColleges?.modeOfStudy}`} />
        <Heading text={`Admission Process: ${schoolColleges?.admissionProcess}`} />
        <Heading text={`Teacher Count: ${schoolColleges?.teacherCount}`} />
        <Heading text={`Highest Education: ${schoolColleges?.highestEducation}`} />
        <Heading text={`Gender: ${schoolColleges?.gender}`} />
        <Heading text={`Type of Education: ${schoolColleges?.typeOfEducation}`} />
        <Heading text={`Facilities: ${schoolColleges?.facilities}`} />
        <Heading text={`Competitions: ${schoolColleges?.competitions}`} />
        <Heading text={`Events: ${schoolColleges?.events}`} />
        <Heading text={`Interests: ${schoolColleges?.interests}`} />
        <Heading text={`Sport and Fitness: ${schoolColleges?.sportAndFitness}`} />
        <Heading text={`Infrastructure: ${schoolColleges?.infrastructure}`} />
        <Heading text={`Advanced Facilities: ${schoolColleges?.advancedFacilities}`} />

        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolCollegeViewPage;
