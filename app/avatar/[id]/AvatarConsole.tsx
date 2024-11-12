'use client';
import React, { useState } from 'react'
import { Avatar } from '@/types/avatar.types'
import AvatarEditor from './AvatarEditor';
import AvatarPreview from './AvatarPreview';
import BackButton from '@/components/common/BackButton';

interface IAvatarProps {
    initialAvatarConfig: Avatar;
}

const AvatarConsole = ({ initialAvatarConfig }: IAvatarProps) => {

    const [avatarConfig, setAvatarConfig] = useState<Avatar>(initialAvatarConfig)

    return (
        <div className='min-h-[85vh] flex flex-col justify-center gap-16'>
            <BackButton link="/home" />
            <div className='grid grid-cols-2 h-full'>
                <AvatarPreview avatarConfig={avatarConfig} />
                <AvatarEditor avatarConfig={avatarConfig} setAvatarConfig={setAvatarConfig} />
            </div>
        </div>
    )
}

export default AvatarConsole