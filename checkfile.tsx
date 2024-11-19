// import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
// import React from "react";

// const TeacherPage = () => {
//   return <h1>Teacher Page</h1>;
// };

// export default TeacherPage;

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { ITeacher, ITeacherGender } from "@/types/admin/teacher-types";

import { useToast } from "@/hooks/use-toast";

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<ITeacher | null>(null);

  const { toast } = useToast();

  const form = useForm<ITeacher>();
  const { register, handleSubmit, reset, setValue } = form;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers");
        const data = await response.json();
        setTeachers(data);
      } catch  {
        toast({
          title: "Error",
          description: "Failed to fetch teachers",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [toast]);

  const onSubmit = async (data: ITeacher) => {
    try {
      const url = editingTeacher
        ? `/api/teachers/${editingTeacher._id}`
        : "/api/teachers";

      const method = editingTeacher ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      toast({
        title: "Success",
        description: `Teacher ${
          editingTeacher ? "updated" : "created"
        } successfully`,
      });

      setIsOpen(false);
      reset();
      setEditingTeacher(null);
      fetchTeachers();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (teacher: ITeacher) => {
    setEditingTeacher(teacher);
    Object.entries(teacher).forEach(([key, value]) => {
      setValue(key as keyof ITeacher, value);
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete teacher");
      }

      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });

      fetchTeachers();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Teachers Management</CardTitle>
              <CardDescription>Manage your teaching staff</CardDescription>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingTeacher(null);
                    reset();
                  }}
                >
                  Add New Teacher
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" {...register("name")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="uniqueName">Unique Name</Label>
                      <Input
                        id="uniqueName"
                        {...register("uniqueName")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="number"
                        {...register("phoneNumber")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value) => setValue("gender", value)}
                        defaultValue={editingTeacher?.gender}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ITeacherGender).map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("availability", value)
                        }
                        defaultValue={editingTeacher?.availability}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full time">Full Time</SelectItem>
                          <SelectItem value="part time">Part Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Label htmlFor="isFullTime">Full Time</Label>
                    <Checkbox
                      id="isFullTime"
                      {...register("isFullTime")}
                      defaultChecked={editingTeacher?.isFullTime}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      {...register("skills")}
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teachingSubjects">
                      Teaching Subjects (comma-separated)
                    </Label>
                    <Input
                      id="teachingSubjects"
                      {...register("teachingSubjects")}
                      placeholder="Mathematics, Physics, Chemistry"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {editingTeacher ? "Update Teacher" : "Add Teacher"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher._id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phoneNumber}</TableCell>
                    <TableCell>{teacher.availability}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(teacher)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(teacher._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the ITeacher interface with all required fields
interface ITeacher {
  _id?: string;
  name: string;
  uniqueName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  availability: string;
  isFullTime: boolean;
  skills: string;
  teachingSubjects: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  highestTeachingClassOrDegree: string;
  teachingSchoolOrCollege: string;
  highestQualification: string;
  emergencyContact: string;
  yearsOfExperience: number;
  coaching: {
    subjects: string[];
    grades: string[];
  };
  profilePicture: string;
}

const AddTeacher = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<ITeacher | null>(null);
  const { toast } = useToast();

  // Create a state for form data
  const [formData, setFormData] = useState<Partial<ITeacher>>({
    address: { street: "", city: "", state: "", zipCode: "" },
    coaching: { subjects: [], grades: [] },
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("/api/teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch teachers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ITeacher],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert string arrays to actual arrays
    const processedData = {
      ...formData,
      coaching: {
        ...formData.coaching,
        subjects: formData.coaching?.subjects.toString().split(","),
        grades: formData.coaching?.grades.toString().split(","),
      },
      // Ensure isFullTime is boolean
      isFullTime: Boolean(formData.isFullTime),
      // Convert yearsOfExperience to number
      yearsOfExperience: Number(formData.yearsOfExperience),
    };

    try {
      const url = editingTeacher
        ? `/api/teachers/${editingTeacher._id}`
        : "/api/teachers";

      const response = await fetch(url, {
        method: editingTeacher ? "PUT" : "POST",
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
        description: `Teacher ${
          editingTeacher ? "updated" : "created"
        } successfully`,
      });

      setIsOpen(false);
      setFormData({
        address: { street: "", city: "", state: "", zipCode: "" },
        coaching: { subjects: [], grades: [] },
      });
      setEditingTeacher(null);
      fetchTeachers();
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
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setEditingTeacher(null);
              setFormData({
                address: { street: "", city: "", state: "", zipCode: "" },
                coaching: { subjects: [], grades: [] },
              });
            }}
          >
            <PlusIcon />
            New Teacher
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
            </DialogTitle>
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
                    name="address.zipCode"
                    placeholder="Zip Code"
                    value={formData.address?.zipCode || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Additional Required Fields */}
              <div className="space-y-2">
                <Label htmlFor="highestQualification">
                  Highest Qualification
                </Label>
                <Input
                  id="highestQualification"
                  name="highestQualification"
                  value={formData.highestQualification || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={formData.yearsOfExperience || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="highestTeachingClassOrDegree">
                  Highest Teaching Class/Degree
                </Label>
                <Input
                  id="highestTeachingClassOrDegree"
                  name="highestTeachingClassOrDegree"
                  value={formData.highestTeachingClassOrDegree || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teachingSchoolOrCollege">
                  Teaching School/College
                </Label>
                <Input
                  id="teachingSchoolOrCollege"
                  name="teachingSchoolOrCollege"
                  value={formData.teachingSchoolOrCollege || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Coaching Information */}
              <div className="col-span-2">
                <Label>Coaching Details</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="coaching.subjects"
                    placeholder="Subjects (comma-separated)"
                    value={formData.coaching?.subjects || ""}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="coaching.grades"
                    placeholder="Grades (comma-separated)"
                    value={formData.coaching?.grades || ""}
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

              {/* Selects and Checkboxes */}
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
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("availability", value)
                  }
                  defaultValue={formData.availability}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full time">Full Time</SelectItem>
                    <SelectItem value="part time">Part Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <Checkbox
                  id="isFullTime"
                  name="isFullTime"
                  checked={formData.isFullTime || false}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isFullTime: checked }))
                  }
                />
                <Label htmlFor="isFullTime">Full Time</Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {editingTeacher ? "Update Teacher" : "Add Teacher"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTeacher;
