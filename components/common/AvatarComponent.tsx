import { Avatar } from '@/types/avatar.types';
import React from 'react';

interface IAvatarComponentProps {
    avatar: Avatar;
    avatarRef: React.RefObject<HTMLDivElement>;
};

const AvatarComponent: React.FC<IAvatarComponentProps> = ({ avatar, avatarRef }) => {
    return (
        <div className='bg-svgBackground bg-cover bg-no-repeat border-[1px] border-secondary'>
            <div dangerouslySetInnerHTML={{ __html: avatar.avatarSvg }} className='w-28 h-28' ref={avatarRef} />
        </div>
    );
};

export default AvatarComponent;
