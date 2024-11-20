"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITeacher } from "@/types/admin/teacher-types";
import { useToast } from "@/hooks/use-toast";

const AddTeacher = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<ITeacher>>({
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    coaching: {
      time: "",
      location: "",
      isCoaching: false,
      fees: 0,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      coaching: {
        time: "",
        location: "",
        isCoaching: false,
        fees: 0,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      coaching: {
        ...formData.coaching,
      },
      isFullTime: Boolean(formData.isFullTime),
      yearsOfExperience: Number(formData.yearsOfExperience),
    };

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

      setIsOpen(false);
      resetForm();
      location.reload();
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={resetForm}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Teacher
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uniqueName">Unique Name</Label>
              <Input
                id="uniqueName"
                name="uniqueName"
                value={formData.uniqueName || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Address Fields */}
            <div className="col-span-2">
              <Label>Address</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="address.street"
                  placeholder="Street"
                  value={formData.address?.street || ""}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="address.city"
                  placeholder="City"
                  value={formData.address?.city || ""}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="address.state"
                  placeholder="State"
                  value={formData.address?.state || ""}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="address.country"
                  placeholder="Country"
                  value={formData.address?.country || ""}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="address.postalCode"
                  placeholder="Postal Code"
                  value={formData.address?.postalCode || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Coaching Information */}
            <div className="col-span-2">
              <Label>Coaching Details</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="coaching.time"
                  placeholder="Teaching Time"
                  value={formData.coaching?.time || ""}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="coaching.fees"
                  placeholder="Fees"
                  type="number"
                  value={formData.coaching?.fees || ""}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="coaching.location"
                  placeholder="Coaching Location"
                  value={formData.coaching?.location || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Profile Picture URL */}
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                value={formData.profilePicture || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Gender Select */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => handleSelectChange("gender", value)}
                defaultValue={formData.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Teacher
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacher;
