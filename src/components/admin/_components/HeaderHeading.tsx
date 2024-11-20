import React from "react";
interface HeaderHeadingProps {
  title: string;
  description: string;
}

const HeaderHeading = ({ title, description }: HeaderHeadingProps) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
};

export default HeaderHeading;
