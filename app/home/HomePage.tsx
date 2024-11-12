'use client'
import AvatarCard from './AvatarCard';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa6'
import { useAvatarContext } from '@/context/avatar.context';
import SkeletonComponent, { SkeletonType } from '@/components/common/Skeleton';
import Link from 'next/link';

const HomePage = () => {

    const { loading, avatars } = useAvatarContext();

    if (!(avatars?.length > 0)) {
        return (
            <div className='flex flex-col gap-4 h-96 items-center justify-center text-foreground'>
                <p className='text-lg'>Woah! Looks empty</p>
                <Link href="/avatar/create">
                    <Button type='button' className='flex gap-2 items-center hover:bg-primary-hover'>
                        <FaPlus /> Create New
                    </Button>
                </Link>
            </div>
        )
    }

    if (loading) return (
        <div className="p-4">
            <h3 className="text-center text-xl font-medium text-foreground">Your Avatars</h3>
            <div className="p-4 rounded-md grid grid-cols-5 gap-4 mt-2">
                {avatars.map((_, index) => (
                    <SkeletonComponent key={index} type={SkeletonType.Avatars} />
                ))}
            </div>
        </div>
    )

    return (
        <div className="p-4">
            <h3 className="text-center text-xl font-medium">Your Avatars</h3>
            <div className="p-4 rounded-md grid grid-cols-5 gap-4 mt-2">
                {
                    avatars.map((avatar) => (
                        <AvatarCard key={avatar.id} avatar={avatar} />
                    ))
                }
            </div>
        </div>
    );
};

export default HomePage;
