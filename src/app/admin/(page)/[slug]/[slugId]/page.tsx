import AdminHeader from "@/components/admin/AdminHeader";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import AddTeacherForm from "@/components/admin/teacher/_components/AddForm";
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
      case "add-teacher":
        return <AddTeacherForm />;
      case `teacher-${subString(slugId, "-")}`:
        return (
          <div>
            Teacher Page {slugId}, sub slug id : {subString(slugId, "-")}
          </div>
        );

      case `student-${subString(slugId, "-")}`:
        return (
          <div>
            Student Page {slugId}, sub slug id : {subString(slugId, "-")}
          </div>
        );

      default:
        return <PageNotFound />;
    }
  };

  return (
    <>
      <AdminHeader slug={slugId} />

      <AdminPageWrapper>{renderPage()}</AdminPageWrapper>
    </>
  );
};

export default SlugIdPage;
