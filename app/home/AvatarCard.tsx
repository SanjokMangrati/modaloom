import AvatarComponent from '@/components/common/AvatarComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/types/avatar.types';
import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { useRouter } from 'next/navigation';


interface IAvatarCardProps {
  avatar: Avatar;
}

const AvatarCard: React.FC<IAvatarCardProps> = ({ avatar }) => {

  const router = useRouter();

  return (
    <Card className='shadow-sm shadow-foreground bg-foreground border-[1px] border-gray-300'>
      <CardHeader className='p-3'>
        <CardTitle className='font-medium w-full text-sm text-foreground bg-primary px-1.5 text-center rounded-sm'>{avatar.name}</CardTitle>
      </CardHeader>
      <CardContent className='p-2'>
        <AvatarComponent avatar={avatar} />
      </CardContent>
      <CardFooter className='flex items-center justify-between p-3'>
        <Button type='button' className='p-2 h-7 hover:bg-accent-hover'>
          <MdFileDownload />
        </Button>
        <Button type='button' className='p-2 h-7 hover:bg-accent-hover' onClick={() => router.push(`/avatar/${avatar.id}`)}>
          <MdModeEdit />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AvatarCard