import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import UserDropdownMenu from './UserDropdownMenu'

const Header = () => {
  return (
    <header className='sticky top-0 header'>
        <div className="container header-wrapper">
            <Link  href={"/"}>
            <Image src={"/assets/icons/logo.svg"} alt='Signalist logo'   width={140} height={32} /> </Link>
            <nav className="hidden sm:block">
                <NavItems/>
            </nav>

            <UserDropdownMenu />
        </div>

    </header>
  )
}

export default Header