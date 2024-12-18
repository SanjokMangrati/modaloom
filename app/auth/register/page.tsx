import React from "react";
import Register from "./Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Modaloom",
  description: "Custom Avatar Builder",
};

const Page = () => {
  return (
    <div className="min-h-screen bg-accent lg:bg-login lg:bg-cover lg:bg-center lg:bg-no-repeat flex items-center justify-end">
      <div className="flex flex-col gap-8 items-center justify-center w-full lg:w-1/2 lg:items-center lg:justify-center lg:h-full">
        <div className="text-2xl text-foreground font-semibold">Register</div>
        <Register />
      </div>
    </div>
  );
};

export default Page;
