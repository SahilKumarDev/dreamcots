import HeaderHeading from "@/components/admin/_components/HeaderHeading";
import TeacherData from "@/components/admin/teacher/table/page";

const TeacherPage = () => {
  return (
    <>
      <HeaderHeading
        title="Welcome Back, To Teacher!"
        description="Here you can add teacher or view teacher details and update teacher details also delete teacher."
      />
      <TeacherData />
    </>
  );
};

export default TeacherPage;
