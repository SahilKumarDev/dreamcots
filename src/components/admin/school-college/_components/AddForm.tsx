"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FloatingInput from "@/components/admin/_components/FloatingInput";
import CheckBox from "@/components/admin/_components/CheckBox";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_SCHOOL_COLLEGE } from "@/utils/routes";
import ImageUpload from "@/components/UploadImage";
import { IGender, ISchoolCollege } from "@/types/admin/school-college-types";

const AddSchoolCollegeForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<ISchoolCollege>>({
    name: "",
    link: "",
    email: "",
    about: "",
    number: "",
    events: "",
    address: "",
    interests: "",
    facilities: "",
    modeOfStudy: "",
    competitions: "",
    teacherCount: "",
    infrastructure: "",
    profilePicture: "",
    sportAndFitness: "",
    typeOfEducation: "",
    highestEducation: "",
    admissionProcess: "",
    parentInstitution: "",
    advancedFacilities: "",
    yearOfEstablishment: "",

    gender: IGender.MALE,
  });

  const [uploading, setUploading] = useState(false);

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

  const handleProfilePictureUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: url,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      link: "",
      email: "",
      about: "",
      number: "",
      events: "",
      address: "",
      interests: "",
      facilities: "",
      modeOfStudy: "",
      competitions: "",
      teacherCount: "",
      infrastructure: "",
      profilePicture: "",
      sportAndFitness: "",
      typeOfEducation: "",
      highestEducation: "",
      admissionProcess: "",
      parentInstitution: "",
      advancedFacilities: "",
      yearOfEstablishment: "",

      gender: IGender.MALE,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const schoolCollegeResponse = await fetch("/api/schools-colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!schoolCollegeResponse.ok) {
        const error = await schoolCollegeResponse.json();
        throw new Error(error.error);
      }

      toast({
        title: "Success",
        description: "School College created successfully",
      });

      resetForm();
      router.push(ADMIN_SCHOOL_COLLEGE);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New School College</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full flex justify-center mb-6">
              <ImageUpload
                onUpload={handleProfilePictureUpload}
                className="w-full max-w-xs"
              />
            </div>
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
              placeholder="Link"
              id="link"
              name="link"
              type="text"
              value={formData.link}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="About"
              id="about"
              name="about"
              type="text"
              value={formData.about}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Event"
              id="events"
              name="events"
              type="text"
              value={formData.events}
              onChange={handleInputChange}
              required={false}
            />

            <FloatingInput
              placeholder="interests"
              id="interests"
              name="interests"
              type="text"
              value={formData.interests}
              onChange={handleInputChange}
              required={false}
            />

            <FloatingInput
              placeholder="Facilities"
              id="facilities"
              name="facilities"
              type="text"
              value={formData.facilities}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Mode Of Study"
              id="modeOfStudy"
              name="modeOfStudy"
              type="text"
              value={formData.modeOfStudy}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Competitions"
              id="competitions"
              name="competitions"
              type="text"
              value={formData.competitions}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Teacher Count"
              id="teacherCount"
              name="teacherCount"
              type="text"
              value={formData.teacherCount}
              onChange={handleInputChange}
              required={false}
            />

            <FloatingInput
              placeholder="Infrastructure"
              id="infrastructure"
              name="infrastructure"
              type="text"
              value={formData.infrastructure}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Sport And Fitness"
              id="sportAndFitness"
              name="sportAndFitness"
              type="text"
              value={formData.sportAndFitness}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Type Of Education"
              id="typeOfEducation"
              name="typeOfEducation"
              type="text"
              value={formData.typeOfEducation}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Highest Education"
              id="highestEducation"
              name="highestEducation"
              type="text"
              value={formData.highestEducation}
              onChange={handleInputChange}
              required={false}
            />

            <FloatingInput
              placeholder="Admission Process"
              id="admissionProcess"
              name="admissionProcess"
              type="text"
              value={formData.admissionProcess}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Parent Institution"
              id="parentInstitution"
              name="parentInstitution"
              type="text"
              value={formData.parentInstitution}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Advanced Facilities"
              id="advancedFacilities"
              name="advancedFacilities"
              type="text"
              value={formData.advancedFacilities}
              onChange={handleInputChange}
              required={true}
            />

            <FloatingInput
              placeholder="Year Of Establishment"
              id="yearOfEstablishment"
              name="yearOfEstablishment"
              type="text"
              value={formData.yearOfEstablishment}
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

            <div className="col-span-full mt-6 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(ADMIN_SCHOOL_COLLEGE)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? "Adding School College..." : "Add School College"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSchoolCollegeForm;
