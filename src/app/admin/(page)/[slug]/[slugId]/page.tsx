import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import PageNotFound from "@/page/not-found/PageNotFound";
import { subString } from "@/utils/sub-string-utils";

// Teacher Page
import AddTeacherForm from "@/components/admin/teacher/_components/AddForm";
import TeacherUpdatePage from "@/components/admin/teacher/UpdatePage";
import TeacherViewPage from "@/components/admin/teacher/ViewPage";

// Student Page
import AddStudentForm from "@/components/admin/student/_components/AddForm";
import StudentUpdatePage from "@/components/admin/student/UpdatePage";
import StudentViewPage from "@/components/admin/student/ViewPage";

// Room Page
import AddRoomForm from "@/components/admin/room/_components/AddForm";
import RoomUpdatePage from "@/components/admin/room/UpdatePage";
import RoomViewPage from "@/components/admin/room/ViewPage";

// School College Page
import AddSchoolCollegeForm from "@/components/admin/school-college/_components/AddForm";
import SchoolCollegeUpdatePage from "@/components/admin/school-college/UpdatePage";
import SchoolCollegeViewPage from "@/components/admin/school-college/ViewPage";



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

      // Room URL Routes
      case "add-room":
        return <AddRoomForm />;
      case `room-${subString(slugId, "-")}`:
        return <RoomViewPage slugId={subString(slugId, "-")} />;
      case `update_room-${subString(slugId, "-")}`:
        return <RoomUpdatePage slugId={subString(slugId, "-")} />;

      // School College URL Routes
      case "add-school-college":
        return <AddSchoolCollegeForm />;
      case `school_college-${subString(slugId, "-")}`:
        return <SchoolCollegeViewPage slugId={subString(slugId, "-")} />;
      case `update_school_college-${subString(slugId, "-")}`:
        return <SchoolCollegeUpdatePage slugId={subString(slugId, "-")} />;

      default:
        return <PageNotFound />;
    }
  };

  return <AdminPageWrapper>{renderPage()}</AdminPageWrapper>;
};

export default SlugIdPage;
