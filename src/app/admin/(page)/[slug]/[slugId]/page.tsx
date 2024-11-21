import AddTeacherForm from "@/components/admin/teacher/_components/AddForm";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import PageNotFound from "@/page/not-found/PageNotFound";
import { subString } from "@/utils/sub-string-utils";
import AddStudentForm from "@/components/admin/student/_components/AddForm";
import TeacherViewPage from "@/components/admin/teacher/ViewPage";
import TeacherUpdatePage from "@/components/admin/teacher/UpdatePage";
import StudentViewPage from "@/components/admin/student/ViewPage";
import StudentUpdatePage from "@/components/admin/student/UpdatePage";

const SlugIdPage = async ({
  params,
}: {
  params: Promise<{ slugId: string }>;
}) => {
  const slugId = (await params).slugId;

  const renderPage = () => {
    switch (slugId) {
      // Teacher URL Routes
      case "add-teacher":
        return <AddTeacherForm />;
      case `teacher-${subString(slugId, "-")}`:
        return <TeacherViewPage slugId={subString(slugId, "-")} />;
      case `update_teacher-${subString(slugId, "-")}`:
        return <TeacherUpdatePage slugId={subString(slugId, "-")} />;

      // Student URL Routes
      case "add-student":
        return <AddStudentForm />;
      case `student-${subString(slugId, "-")}`:
        return <StudentViewPage slugId={subString(slugId, "-")} />;
      case `update_student-${subString(slugId, "-")}`:
        return <StudentUpdatePage slugId={subString(slugId, "-")} />;

      default:
        return <PageNotFound />;
    }
  };

  return <AdminPageWrapper>{renderPage()}</AdminPageWrapper>;
};

export default SlugIdPage;
