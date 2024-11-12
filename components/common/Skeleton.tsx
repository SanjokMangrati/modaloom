import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export enum SkeletonType {
  Avatars = "avatars",
  Preview = "preview",
}

interface SkeletonProps {
  type: SkeletonType;
}

const SkeletonComponent: React.FC<SkeletonProps> = ({ type }) => {
  switch (type) {
    case SkeletonType.Avatars:
      return (
        <Skeleton className="w-[131px] h-[225px] bg-foreground rounded-md" />
      );

    case SkeletonType.Preview:
      return (
        <Skeleton className="w-[344px] h-[344px] bg-foreground rounded-md" />
      );

    default:
      return null;
  }
};

export default SkeletonComponent;
