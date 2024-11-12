import React from 'react'
import HomePage from './HomePage';
import SearchBar from '@/components/common/SearchBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Home | Modaloom",
    description: "Custom Avatar Builder",
};

const Page = () => {
    return (
        <div className='container flex flex-col items-center gap-10 p-4'>
            <img src='/logo.svg' alt='Modaloom' height={200} width={400} />
            <SearchBar />
            <HomePage />
        </div>
    );
}

export default Page