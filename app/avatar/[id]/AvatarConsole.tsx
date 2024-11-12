'use client';
import React, { useState } from 'react'
import { Avatar } from '@/types/avatar.types'
import AvatarEditor from './AvatarEditor';
import AvatarPreview from './AvatarPreview';

interface IAvatarProps {
    initialAvatarConfig: Avatar;
}

const AvatarConsole = ({ initialAvatarConfig }: IAvatarProps) => {

    const [avatarConfig, setAvatarConfig] = useState<Avatar>(initialAvatarConfig)

    return (
        <div className='grid grid-cols-2 min-h-[90vh]'>
            <AvatarPreview avatarConfig={avatarConfig} />
            <AvatarEditor avatarConfig={avatarConfig} setAvatarConfig={setAvatarConfig} />
        </div>
    )
}

export default AvatarConsole