import AvatarComponent from "@/components/common/AvatarComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/types/avatar.types";
import React, { useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import Loader from "@/components/common/Loader";
interface IAvatarCardProps {
  avatar: Avatar;
}

const AvatarCard: React.FC<IAvatarCardProps> = ({ avatar }) => {
  const router = useRouter();

  const avatarRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!avatarRef.current) {
      console.error('Avatar reference is null');
      return;
    }
    setLoading(true);
    const svgClone = avatarRef.current.cloneNode(true) as HTMLElement;
  
  svgClone.setAttribute('width', '500');
  svgClone.setAttribute('height', '500');
  
  if (svgClone instanceof SVGElement && !svgClone.getAttribute('viewBox')) {
    svgClone.setAttribute('viewBox', '0 0 500 500');
  }

  document.body.appendChild(svgClone);
  svgClone.style.position = 'fixed';
  svgClone.style.left = '-9999px';
  svgClone.style.top = '-9999px';
  svgClone.style.zIndex = '9999';
  svgClone.style.height = "500px";

console.log("Original SVG:", avatarRef.current.outerHTML);
  try {
    const images = Array.from(svgClone.querySelectorAll('image'));
    await Promise.all(
      images.map(img => new Promise<void>((resolve, reject) => {
        const loader = new Image();
        const href = img.getAttribute('href') || img.getAttribute('xlink:href');
        
        if (!href) {
          resolve();
          return;
        }

        loader.onload = () => resolve();
        loader.onerror = () => reject(new Error(`Failed to load image: ${href}`));
        loader.src = href;
      }))
    );

    const pngDataUrl = await toPng(svgClone, {
      pixelRatio: 2,
      filter: (node) => {
        return !(node instanceof HTMLStyleElement);
      },
      width: 500,
      height: 500
    });

    console.log("PNG Data URL starts with:", pngDataUrl.substring(0, 100));


    const link = document.createElement('a');
    link.download = `${avatar.name || 'avatar'}.png`;
    link.href = pngDataUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error('Error generating PNG:', err);
  } finally {
    if (svgClone.parentNode) {
      svgClone.parentNode.removeChild(svgClone);
    }
    setLoading(false);
  }
  };

  return (
    <Card className="shadow-sm shadow-foreground bg-foreground border-[1px] border-gray-300">
      <CardHeader className="p-3">
        <CardTitle className="font-medium w-full text-sm text-foreground bg-primary px-1.5 text-center rounded-sm">
          {avatar.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <AvatarComponent avatar={avatar} avatarRef={avatarRef} />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3">
        <Button
          type="button"
          className="p-2 h-7 hover:bg-primary-hover"
          onClick={handleDownload}
        >
          {loading ? <Loader size="xs" /> : <MdFileDownload />}
        </Button>
        <Button
          type="button"
          className="p-2 h-7 hover:bg-primary-hover"
          onClick={() => router.push(`/avatar/${avatar.id}`)}
        >
          <MdModeEdit />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AvatarCard;
