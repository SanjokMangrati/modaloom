'use client';
import React, { useState } from 'react'
import { AvatarCreation } from '@/types/avatar.types'
import AvatarEditor from './AvatarEditor';
import AvatarPreview from './AvatarPreview';
import { generateDefaultAvatarData } from '@/lib/utils';
import BackButton from '@/components/common/BackButton';

const AvatarConsole = () => {

    const [avatarConfig, setAvatarConfig] = useState<AvatarCreation>(generateDefaultAvatarData());

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