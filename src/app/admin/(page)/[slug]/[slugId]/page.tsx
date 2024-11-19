 
const SlugIdPage = async ({
  params,
}: {
  params: Promise<{ slugId: string }>;
}) => {
  const slugId = (await params).slugId;
 
  return (
    <>
      <div>Slug page: {slugId}</div>
    </>
  );
};

export default SlugIdPage;
