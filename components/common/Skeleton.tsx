import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export enum SkeletonType {
    Avatars = "avatars",
    Home = "home",
}

interface SkeletonProps {
    type: SkeletonType;
}

const SkeletonComponent: React.FC<SkeletonProps> = ({ type }) => {

    switch (type) {
        case SkeletonType.Avatars:
            return (
                <Skeleton className="p-4 bg-foreground rounded-md">
                    <div className="mb-4">
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                    </div>
                    <div className="flex justify-center mb-4">
                        <Skeleton className="h-24 w-24 rounded-full" />
                    </div>
                    <div className="flex justify-between">
                        <Skeleton className="h-7 w-7 rounded-md" />
                        <Skeleton className="h-7 w-7 rounded-md" />
                    </div>
                </Skeleton>
            );

        case SkeletonType.Home:
            return (
                <div className="p-4">
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
            );

        default:
            return null;
    }
};

export default SkeletonComponent;
