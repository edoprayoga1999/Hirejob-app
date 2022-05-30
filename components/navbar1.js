import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default function Navbar1(props) {
  const level = props.level || ''
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const logout = () => {
    document.cookie = `token=;path=/`;
    document.cookie = `level=;path=/`;
    router.push('/login')
  }

  const toggle = () => setDropdownOpen(!dropdownOpen)
  return (
    <nav className='d-flex align-items-center' style={{width: '80%', paddingTop: '35px', paddingBottom: '35px'}}>
        <Link href='/'><Image src='/peworld.png' height={35} width={125} alt='' /></Link>
        <div style={{marginLeft: 'auto', marginRight: '45px'}}><Image src='/bell.svg' height={24} width={24} alt='' /></div>
        <div style={{marginRight: '52px'}}><Image src='/mail.svg' height={24} width={24} alt='' /></div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle style={{backgroundColor: '#FFFFFF', border: 'none'}}>
        <div style={{width: '32px', height: '32px', borderRadius: '999px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.photo}')`}} />
        </DropdownToggle>
        <DropdownMenu>
          <Link href={level === '1' ? '/company/profile' : '/profile'}>
            <DropdownItem>
              My Profile
            </DropdownItem>
          </Link>
          <DropdownItem divider />
          <DropdownItem onClick={() => { logout() }}>Logout</DropdownItem>
        </DropdownMenu>
        </Dropdown>
      </nav>
  )
}
