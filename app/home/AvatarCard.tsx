import AvatarComponent from '@/components/common/AvatarComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/types/avatar.types';
import React, { useRef, useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toPng } from 'html-to-image';
import Loader from '@/components/common/Loader';
interface IAvatarCardProps {
  avatar: Avatar;
}

const AvatarCard: React.FC<IAvatarCardProps> = ({ avatar }) => {

  const router = useRouter();

  const avatarRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!avatarRef.current) return;

    setLoading(true);

    const svgClone = avatarRef.current.cloneNode(true) as HTMLElement;
    svgClone.style.width = "500px";
    svgClone.style.height = "500px";

    document.body.appendChild(svgClone);

    try {
      const pngDataUrl = await toPng(svgClone, {
        pixelRatio: 2,
        filter: (node) => {
          return !(node instanceof HTMLStyleElement && node.sheet && node.sheet.cssRules);
        },
      });

      const link = document.createElement('a');
      link.href = pngDataUrl;
      link.download = `${avatar.name}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating PNG:", error);
      setLoading(false);
    } finally {
      document.body.removeChild(svgClone);
      setLoading(false);
    }
  };


  return (
    <Card className='shadow-sm shadow-foreground bg-foreground border-[1px] border-gray-300'>
      <CardHeader className='p-3'>
        <CardTitle className='font-medium w-full text-sm text-foreground bg-primary px-1.5 text-center rounded-sm'>{avatar.name}</CardTitle>
      </CardHeader>
      <CardContent className='p-2'>
        <AvatarComponent avatar={avatar} avatarRef={avatarRef} />
      </CardContent>
      <CardFooter className='flex items-center justify-between p-3'>
        <Button type='button' className='p-2 h-7 hover:bg-primary-hover' onClick={handleDownload}>
          {loading ? <Loader size='xs' /> : <MdFileDownload />}
        </Button>
        <Button type='button' className='p-2 h-7 hover:bg-primary-hover' onClick={() => router.push(`/avatar/${avatar.id}`)}>
          <MdModeEdit />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AvatarCard