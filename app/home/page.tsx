import React from 'react'
import HomePage from './HomePage';
import SearchBar from '@/components/common/SearchBar';

const page = () => {
    return (
        <div className='container flex flex-col items-center gap-10 p-4'>
            <img src='/logo.svg' alt='Modaloom' height={200} width={400} />
            <SearchBar />
            <HomePage />
        </div>
    );
}

export default page