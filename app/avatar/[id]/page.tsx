import React from 'react'
import { fetchAvatarById } from '@/lib/api'
import AvatarConsole from './AvatarConsole';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Edit Avatar | Modaloom",
    description: "Custom Avatar Builder",
};

export default async function Page({ params }: { params: { id: string } }) {

    const { id } = await params;

    const initialAvatarConfigData = await fetchAvatarById(id);

    return (
        <div className='container'>
            <AvatarConsole initialAvatarConfig={initialAvatarConfigData} />
        </div>
    )
}