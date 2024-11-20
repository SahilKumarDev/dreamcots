"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FloatingInput from "@/components/admin/_components/FloatingInput";
import CheckBox from "@/components/admin/_components/CheckBox";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ITeacher, IGender, ICoaching } from "@/types/admin/teacher-types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_TEACHER } from "@/utils/routes";

const AddTeacherForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<ITeacher>>({
    name: "",
    email: "",
    number: "",
    address: "",
    gender: IGender.MALE,
    coaching: ICoaching.NO,
    experience: "",
    qualification: "",
    profilePicture: "",
    schoolOrCollege: "",
    teachingSubject: "",
    teachingLanguage: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value === IGender.MALE ? IGender.MALE : IGender.FEMALE,
    }));
  };

  const handleCoachingChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      coaching: value === ICoaching.YES ? ICoaching.YES : ICoaching.NO,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      number: "",
      address: "",
      gender: IGender.MALE,
      coaching: ICoaching.NO,
      experience: "",
      qualification: "",
      profilePicture: "",
      schoolOrCollege: "",
      teachingSubject: "",
      teachingLanguage: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const processedData: ITeacher = {
      ...formData,
    } as ITeacher;

    try {
      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      toast({
        title: "Success",
        description: "Teacher created successfully",
      });

      resetForm();
      router.push(ADMIN_TEACHER);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Teacher</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FloatingInput
              placeholder="Full Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required={true}
            />
            <FloatingInput
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required={true}
            />
            <FloatingInput
              placeholder="Phone Number"
              id="number"
              name="number"
              type="tel"
              value={formData.number}
              onChange={handleInputChange}
              required={true}
            />
            <FloatingInput
              placeholder="Address"
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              required={false}
            />
            <FloatingInput
              placeholder="Experience (in years)"
              id="experience"
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleInputChange}
              required={false}
            />
            <FloatingInput
              placeholder="Qualification"
              id="qualification"
              name="qualification"
              type="text"
              value={formData.qualification}
              onChange={handleInputChange}
              required={false}
            />
            <FloatingInput
              placeholder="School/College"
              id="schoolOrCollege"
              name="schoolOrCollege"
              type="text"
              value={formData.schoolOrCollege}
              onChange={handleInputChange}
              required={false}
            />
            <FloatingInput
              placeholder="Teaching Subject"
              id="teachingSubject"
              name="teachingSubject"
              type="text"
              value={formData.teachingSubject}
              onChange={handleInputChange}
              required={false}
            />
            <FloatingInput
              placeholder="Teaching Language"
              id="teachingLanguage"
              name="teachingLanguage"
              type="text"
              value={formData.teachingLanguage}
              onChange={handleInputChange}
              required={false}
            />

            <CheckBox
              data={[
                { id: "male", label: "Male", value: IGender.MALE },
                { id: "female", label: "Female", value: IGender.FEMALE },
              ]}
              label="Gender"
              value={formData.gender}
              onChange={handleGenderChange}
            />

            <CheckBox
              data={[
                { id: "coaching", label: "Yes", value: ICoaching.YES },
                { id: "no-coaching", label: "No", value: ICoaching.NO },
              ]}
              label="Available for Coaching"
              value={formData.coaching}
              onChange={handleCoachingChange}
            />
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(ADMIN_TEACHER)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Teacher</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTeacherForm;