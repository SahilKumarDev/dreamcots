import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SchoolCollege from "@/models/admin/school-college-model";
import Student from "@/models/admin/student-model";
import Teacher from "@/models/admin/teacher-model";
import { connectDB } from "@/database/connectDB";
import Room from "@/models/admin/room-model";

const DetailsCard = async () => {
  let totalSchoolCollege = 0;
  let totalStudents = 0;
  let totalTeachers = 0;
  let totalRooms = 0;

  try {
    await connectDB();
    totalSchoolCollege = await SchoolCollege.countDocuments();
    totalTeachers = await Teacher.countDocuments();
    totalRooms = await Room.countDocuments();
    totalStudents = await Student.countDocuments();
  } catch (error) {
    console.error("Error fetching counts:", error);
  } 

  const detailData = [
    {
      title: "Total School College",
      value: totalSchoolCollege,
    },
    {
      title: "Total Students",
      value: totalStudents,
    },

    {
      title: "Total Teachers",
      value: totalTeachers,
    },
    {
      title: "Total Rooms",
      value: totalRooms,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {detailData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-center space-y-0 ">
            <CardTitle className="text-sm font-medium">
              {item.title} :- {item.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default DetailsCard;
