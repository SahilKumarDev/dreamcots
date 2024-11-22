import HeaderHeading from "@/components/admin/_components/HeaderHeading";
import RoomData from "@/components/admin/room/table/page";

const RoomPage = () => {
  return (
    <>
      <HeaderHeading
        title="Welcome Back, To Room!"
        description="Here you can add room or view room details and update room details also delete room."
      />
      <RoomData />
    </>
  );
};

export default RoomPage;
