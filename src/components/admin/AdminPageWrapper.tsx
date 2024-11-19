import React from "react";

const AdminPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {children}
    </main>
  );
};

export default AdminPageWrapper;
