import HeaderHeading from "@/components/admin/_components/HeaderHeading";
import StudentData from "@/components/admin/student/table/page";

const StudentPage = () => {
  return (
    <>
      <HeaderHeading
        title="Welcome Back, To Student!"
        description="Here you can add student or view student details and update student details also delete student."
      />
      <StudentData />
    </>
  );
};

export default StudentPage;
