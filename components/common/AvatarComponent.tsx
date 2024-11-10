import { Avatar } from '@/types/avatar.types';
import React from 'react';

interface IAvatarComponentProps {
    avatar: Avatar;
};

const AvatarComponent: React.FC<IAvatarComponentProps> = ({ avatar }) => {
    return (
        <div className='bg-svgBackground bg-cover bg-no-repeat border-[1px] border-secondary'>
            <div dangerouslySetInnerHTML={{ __html: avatar.avatarSvg }} />
        </div>
    );
};

export default AvatarComponent;
