import TeacherData from "@/components/admin/table/page";

const TeacherPage = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome Back, To Teacher!
        </h1>

        <p className="text-lg text-muted-foreground">
          Here you can add teacher or view teacher details and update teacher
          details also delete teacher.
        </p>
      </div>

      <TeacherData />
    </div>
  );
};

export default TeacherPage;
