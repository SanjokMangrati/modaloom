import React from 'react'
import Logo from './Logo'
import Logout from './Logout'
import { Button } from '../ui/button'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='w-full shadow-sm shadow-foreground'>
            <nav className='container flex items-center justify-between h-12'>
                <Logo />
                <div className='flex items-center gap-4'>
                    <Link href={'/avatar/create'}>
                        <Button type='button' className='h-8 hover:bg-primary-hover'>Create New</Button>
                    </Link>
                    <Logout />
                </div>
            </nav>
        </div>
    )
}

export default Navbar