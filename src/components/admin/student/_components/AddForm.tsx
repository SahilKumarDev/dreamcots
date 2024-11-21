"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FloatingInput from "@/components/admin/_components/FloatingInput";
import CheckBox from "@/components/admin/_components/CheckBox";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_STUDENT } from "@/utils/routes";
import ImageUpload from "@/components/UploadImage";
import { IGender, IStudent } from "@/types/admin/student-types";

const AddStudentForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<IStudent>>({
    age: "",
    name: "",
    email: "",
    number: "",
    address: "",
    gender: IGender.MALE,
    qualification: "",
    profilePicture: "",
    schoolOrCollege: "",
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
      age: "",
      name: "",
      email: "",
      number: "",
      address: "",
      gender: IGender.MALE,
      qualification: "",
      profilePicture: "",
      schoolOrCollege: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const studentResponse = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!studentResponse.ok) {
        const error = await studentResponse.json();
        throw new Error(error.error);
      }

      toast({
        title: "Success",
        description: "Student created successfully",
      });

      resetForm();
      router.push(ADMIN_STUDENT);
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
        <CardTitle>Add New Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Image Upload Component */}
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
              placeholder="Age"
              id="age"
              name="age"
              type="text"
              value={formData.age}
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
                onClick={() => router.push(ADMIN_STUDENT)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? "Adding Student..." : "Add Student"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStudentForm;
