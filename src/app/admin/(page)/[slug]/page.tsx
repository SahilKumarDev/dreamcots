import AdminHeader from "@/components/admin/AdminHeader";
import PageNotFound from "@/components/PageNotFound";

const AdminSlugPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const slugItem = [
    "room",
    "user",
    "admin",
    "teacher",
    "student",
    "school-college",
  ];

  if (!slugItem.includes(slug)) return <PageNotFound />;

  return (
    <>
      <AdminHeader slug={slug} />
      <div>page: {slug}</div>
    </>
  );
};

export default AdminSlugPage;
