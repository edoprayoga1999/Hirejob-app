import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import style from '../styles/Landing.module.css'

export default function Navbar2() {
  return (
    <nav className='d-flex align-items-center' style={{width: '80%', paddingTop: '40px'}}>
        <Image src='/peworld.png' height={35} width={125} alt='' />
        <Link href='/login'><button type='button' className={style.navButton} style={{color: '#5E50A1', backgroundColor: '#FFFFFF', marginLeft: 'auto', marginRight: '15px'}}>Masuk</button></Link>
        <Link href='/register'><button type='button' className={style.navButton} style={{ color: '#FFFFFF', backgroundColor: '#5E50A1', marginRight: '0px' }}>Daftar</button></Link>
      </nav>
  )
}
