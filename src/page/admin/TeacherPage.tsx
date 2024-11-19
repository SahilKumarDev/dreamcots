import AddTeacher from "@/components/admin/_components/AddTeacher";
import ShowTeacherData from "@/components/admin/_components/ShowTeacherData";

const TeacherPage = () => {
  return (
    <div>
      <div>
        <h1>Teacher Page</h1>
        <AddTeacher />
      </div>

      <ShowTeacherData />
    </div>
  );
};

export default TeacherPage;
