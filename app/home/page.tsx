import React from 'react'
import HomePage from './HomePage';
import SearchBar from '@/components/common/SearchBar';

const page = () => {
    return (
        <div className='container flex flex-col items-center gap-10 p-4'>
            <h1 className='text-3xl mt-8 text-foreground'>Welcome To Modaloom</h1>
            <SearchBar />
            <HomePage />
        </div>
    );
}

export default page