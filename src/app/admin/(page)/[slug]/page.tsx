import SchoolCollegePage from "@/page/admin/SchoolCollegePage";
import PageNotFound from "@/page/not-found/PageNotFound";
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

  const renderPage = () => {
    switch (slug) {
      case "rooms":
        return <RoomPage />;
      case "users":
        return <UserPage />;
      case "teachers":
        return <TeacherPage />;
      case "students":
        return <StudentPage />;
      case "dashboard":
        return <DashboardPage />;
      case "schools-colleges":
        return <SchoolCollegePage />;
      default:
        return <PageNotFound />;
    }
  };

  return <AdminPageWrapper>{renderPage()}</AdminPageWrapper>;
};

export default AdminSlugPage;
