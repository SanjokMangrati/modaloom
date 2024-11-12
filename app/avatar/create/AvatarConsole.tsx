'use client';
import React, { useEffect, useState } from 'react'
import { AvatarCreation } from '@/types/avatar.types'
import AvatarEditor from './AvatarEditor';
import AvatarPreview from './AvatarPreview';
import { generateDefaultAvatarData } from '@/lib/utils';

const AvatarConsole = () => {

    const [avatarConfig, setAvatarConfig] = useState<AvatarCreation>(generateDefaultAvatarData());

    return (
        <div className='grid grid-cols-2 min-h-[90vh]'>
            <AvatarPreview avatarConfig={avatarConfig} />
            <AvatarEditor avatarConfig={avatarConfig} setAvatarConfig={setAvatarConfig} />
        </div>
    )
}

export default AvatarConsole