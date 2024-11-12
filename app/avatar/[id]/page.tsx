import React from 'react'
import { fetchAvatarById } from '@/lib/api'
import AvatarConsole from './AvatarConsole';

export default async function Page({ params }: { params: { id: string } }) {

    const { id } = params;

    const initialAvatarConfigData = await fetchAvatarById(id);

    return (
        <div className='container'>
            <AvatarConsole initialAvatarConfig={initialAvatarConfigData} />
        </div>
    )
}