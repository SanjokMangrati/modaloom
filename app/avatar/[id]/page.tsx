import React from 'react'
import { fetchAvatarById } from '@/lib/api'
import { PageProps } from '@/.next/types/app/avatar/[id]/page'
import AvatarConsole from './AvatarConsole';

export default async function Page({ params }: PageProps) {

    const { id } = await params;

    const initialAvatarConfigData = await fetchAvatarById(id);

    return (
        <div className='container'>
            <AvatarConsole initialAvatarConfig={initialAvatarConfigData} />
        </div>
    )
}