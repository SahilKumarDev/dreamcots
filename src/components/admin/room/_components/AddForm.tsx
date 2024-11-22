"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FloatingInput from "@/components/admin/_components/FloatingInput";
import CheckBox from "@/components/admin/_components/CheckBox";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { IRoom, IGender, IStatus, IWhoIsUsing } from "@/types/admin/room-types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_ROOM } from "@/utils/routes";
import ImageUpload from "@/components/UploadImage";

const AddRoomForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<IRoom>>({
    dob: "",
    name: "",
    email: "",
    number: "",
    address: "",
    roomType: "",
    roomImage: "",
    roomPrice: "",
    profession: "",
    roomMember: "",
    profilePicture: "",
    gender: IGender.MALE,
    status: IStatus.PENDING,
    whoIsUsing: IWhoIsUsing.RENTER,
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

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value === IStatus.PENDING ? IStatus.PENDING : IStatus.APPROVED,
    }));
  };

  const handleWhoIsUsingChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      whoIsUsing:
        value === IWhoIsUsing.RENTER ? IWhoIsUsing.RENTER : IWhoIsUsing.OWNER,
    }));
  };

  const handleProfilePictureUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: url,
    }));
  };

  const handleRoomPictureUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      roomImage: url,
    }));
  };

  const resetForm = () => {
    setFormData({
      dob: "",
      name: "",
      email: "",
      number: "",
      address: "",
      roomType: "",
      roomImage: "",
      roomPrice: "",
      roomMember: "",
      profession: "",
      profilePicture: "",
      gender: IGender.MALE,
      status: IStatus.PENDING,
      whoIsUsing: IWhoIsUsing.RENTER,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const roomResponse = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!roomResponse.ok) {
        const error = await roomResponse.json();
        throw new Error(error.error);
      }

      toast({
        title: "Success",
        description: "Room created successfully",
      });

      resetForm();
      router.push(ADMIN_ROOM);
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
        <CardTitle>Add New Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full flex justify-center mb-6">
              <ImageUpload
                uploadName="Profile Picture"
                onUpload={handleProfilePictureUpload}
                className="w-full max-w-xs"
                imageId="profile-image"
              />
              <ImageUpload
                imageId="room-image"
                uploadName="Room Image"
                onUpload={handleRoomPictureUpload}
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
              placeholder="Room Type"
              id="roomType"
              name="roomType"
              type="text"
              value={formData.roomType}
              onChange={handleInputChange}
              required={false}
            />

            <FloatingInput
              placeholder="Room Price"
              id="roomPrice"
              name="roomPrice"
              type="text"
              value={formData.roomPrice}
              onChange={handleInputChange}
              required={false}
            />
            <FloatingInput
              placeholder="Room Member"
              id="roomMember "
              name="roomMember"
              type="text"
              value={formData.roomMember}
              onChange={handleInputChange}
              required={false}
            />
            <FloatingInput
              placeholder="Date Of Birth"
              id="dob "
              name="dob"
              type="text"
              value={formData.dob}
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
                { id: "owner", label: "Owner", value: IWhoIsUsing.OWNER },
                { id: "renter", label: "Renter", value: IWhoIsUsing.RENTER },
              ]}
              label="Who is using the property"
              value={formData.whoIsUsing}
              onChange={handleWhoIsUsingChange}
            />
            <CheckBox
              data={[
                { id: "approved", label: "Approved", value: IStatus.APPROVED },
                { id: "pending", label: "Pending", value: IStatus.PENDING },
              ]}
              label="Status"
              value={formData.status}
              onChange={handleStatusChange}
            />

            <div className="col-span-full mt-6 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(ADMIN_ROOM)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? "Adding Room..." : "Add Room"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRoomForm;
