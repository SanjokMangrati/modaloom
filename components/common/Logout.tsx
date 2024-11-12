"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <Button
      type="button"
      onClick={handleLogout}
      className="bg-destructive h-8 hover:bg-destructive/80"
    >
      Logout
    </Button>
  );
};

export default Logout;
