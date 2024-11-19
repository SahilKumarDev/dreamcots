import AddTeacher from "@/components/admin/_components/AddTeacher";
import ShowTeacherData from "@/components/admin/_components/ShowTeacherData";
import DemoPage from "@/components/admin/tabel/page";

const TeacherPage = () => {
  return (
    <div>
      <div className="flex-between">
        <h1>Teacher Page</h1>
        <AddTeacher />
      </div>

      {/* <ShowTeacherData /> */}

      <DemoPage />
    </div>
  );
};

export default TeacherPage;
