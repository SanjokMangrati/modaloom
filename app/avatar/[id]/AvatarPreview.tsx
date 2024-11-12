import { generateAvatar } from "@/lib/utils";
import { Avatar } from "@/types/avatar.types";
import React, { useEffect, useState } from "react";
import * as styles from "@dicebear/collection";
import AvatarLivePreviewComponent from "@/components/common/AvatarLivePreviewComponent";
import { useToast } from "@/hooks/use-toast";
import SkeletonComponent, { SkeletonType } from "@/components/common/Skeleton";

interface AvatarPreviewProps {
  avatarConfig: Avatar;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({ avatarConfig }) => {
  const [svg, setSvg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const avatarPreviewGenerator = async () => {
      try {
        setLoading(true);
        const avatarSvg = await generateAvatar({
          style: styles[avatarConfig.style as keyof typeof styles],
          seed: avatarConfig.seed,
          options: avatarConfig.options || {},
        });
        setSvg(avatarSvg);
        setLoading(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error generating avatar",
          description: error.message,
        });
        setLoading(false);
      }
    };

    avatarPreviewGenerator();
  }, [avatarConfig]);

  if (loading) return <SkeletonComponent type={SkeletonType.Preview} />;

  return (
    <div className="flex flex-col justify-center items-start">
      <p className="bg-primary text-center p-1.5 text-sm font-semibold rounded-t-sm mb-[-8px]">
        PREVIEW
      </p>
      <div className="bg-primary flex justify-center items-center w-fit h-fit p-3 rounded-b-md rounded-r-md">
        <AvatarLivePreviewComponent svg={svg} />
      </div>
    </div>
  );
};

export default AvatarPreview;
