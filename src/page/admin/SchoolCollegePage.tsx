import HeaderHeading from "@/components/admin/_components/HeaderHeading";
import SchoolCollegeData from "@/components/admin/school-college/table/page";

const SchoolCollegePage = () => {
  return (
    <>
      <HeaderHeading
        title="Welcome Back, To School College!"
        description="Here you can add school college or view school college details and update school college details also delete school college."
      />
      <SchoolCollegeData />
    </>
  );
};

export default SchoolCollegePage;
