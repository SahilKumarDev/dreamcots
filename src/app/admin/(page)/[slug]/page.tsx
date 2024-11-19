import SchoolCollegePage from "@/page/admin/SchoolCollegePage";
import AdminHeader from "@/components/admin/AdminHeader";
import PageNotFound from "@/components/PageNotFound";
import StudentPage from "@/page/admin/StudentPage";
import TeacherPage from "@/page/admin/TeacherPage";
import UserPage from "@/page/admin/UserPage";
import RoomPage from "@/page/admin/RoomPage";
import DashboardPage from "@/page/admin/DashboardPage";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

const AdminSlugPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  // const slugItem = [
  //   "room",
  //   "user",
  //   "teacher",
  //   "student",
  //   "dashboard",
  //   "school-college",
  // ];

  // if(!slugItem.include(slug)) return <PageNotFound /> 

  const renderPage = () => {
    switch (slug) {
      case "room":
        return <RoomPage />;
      case "user":
        return <UserPage />;
      case "teacher":
        return <TeacherPage />;
      case "student":
        return <StudentPage />;
      case "dashboard":
        return <DashboardPage />;
      case "school-college":
        return <SchoolCollegePage />;
      default:
        return <PageNotFound />;
    }
  };

  return (
    <>
      <AdminHeader slug={slug} />
      <AdminPageWrapper>{renderPage()}</AdminPageWrapper>
    </>
  );
};

export default AdminSlugPage;
