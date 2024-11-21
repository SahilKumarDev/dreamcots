import AddTeacherForm from "@/components/admin/teacher/_components/AddForm";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import UpdatePage from "@/components/admin/teacher/UpdatePage";
import ViewPage from "@/components/admin/teacher/ViewPage";
import PageNotFound from "@/page/not-found/PageNotFound";
import { subString } from "@/utils/sub-string-utils";

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
        return <ViewPage slugId={subString(slugId, "-")} />;
      case `update-${subString(slugId, "-")}`:
        return <UpdatePage slugId={subString(slugId, "-")} />;

      // Teacher URL Routes
      case "add-student":
        return <AddTeacherForm />;
      case `student-${subString(slugId, "-")}`:
        return <ViewPage slugId={subString(slugId, "-")} />;
      case `update-${subString(slugId, "-")}`:
        return <UpdatePage slugId={subString(slugId, "-")} />;

      default:
        return <PageNotFound />;
    }
  };

  return <AdminPageWrapper>{renderPage()}</AdminPageWrapper>;
};

export default SlugIdPage;
