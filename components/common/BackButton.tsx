import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ link }: { link: string; }) => {
    return (
        <Link href={link}>
            <Button type='button' className='bg-primary hover:bg-primary-hover h-8'>
                <IoMdArrowRoundBack />
            </Button>
        </Link>
    )
}

export default BackButton