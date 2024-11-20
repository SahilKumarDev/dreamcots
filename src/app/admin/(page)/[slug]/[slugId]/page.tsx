import AddTeacherForm from "@/components/admin/_components/AddTeacherForm";
import PageNotFound from "@/components/PageNotFound";

const SlugIdPage = async ({
  params,
}: {
  params: Promise<{ slugId: string }>;
}) => {
  const slugId = (await params).slugId;

  const subSlugId = (id: string) => {
    const subSlugId = id.substring(id.indexOf("-") + 1);
    return subSlugId;
  };

  const renderPage = () => {
    switch (slugId) {
      case "add-teacher":
        return <AddTeacherForm />;
      case `teacher-${subSlugId(slugId)}`:
        return <div>Teacher Page</div>;

      case `student-${subSlugId(slugId)}`:
        return <div>Sutdent Page</div>;

      default:
        return <PageNotFound />;
    }
  };

  return <>{renderPage()}</>;
};

export default SlugIdPage;
