import React from 'react'
import Image from 'next/image'

import style from '../styles/Auth.module.css'

export default function Sidebar() {
  return (
    <div className={`d-flex w-50 position-relative flex-column align-items-center ${style.leftSide}`}>
        <div style={{ width: '90%', display: 'flex', alignItems: 'center', zIndex: '99' }}>
          <Image src='/icon.svg' height={24} width={24} alt="" />
          <p style={{margin: 'auto 0px auto 10px', color: '#FFFFFF'}}>Peworld</p>
        </div>
        <div className='d-flex justify-content-center align-items-center' style={{ width: '80%', height: '100vh', zIndex: '99', paddingRight: '125px' }}>
          <h1 style={{color: '#FFFFFF', fontWeight: '700', lineHeight: '70px'}}>Temukan developer berbakat & terbaik di berbagai bidang keahlian</h1>
        </div>
      </div>
  )
}
