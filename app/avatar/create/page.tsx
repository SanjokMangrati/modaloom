import React from "react";
import AvatarConsole from "./AvatarConsole";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Avatar | Modaloom",
  description: "Custom Avatar Builder",
};

const Page = () => {
  return (
    <div className="container mt-10">
      <AvatarConsole />
    </div>
  );
};

export default Page;
