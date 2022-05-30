import React from 'react'

export default function Footer() {
  return (
    <footer className='d-flex flex-column w-100' style={{ backgroundColor: '#5E50A1', color: '#FFFFFF', padding: '70px 150px 40px 150px' }}>
        <p style={{ width: '20%', marginBottom: '40px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
        <hr style={{ width: '100%', border: '2px solid #FFFFFF', marginBottom: '30px' }} />
        <div style={{ width: '100%', display: 'flex' }}>
          <p>2022 Pewworld. All right reserved</p>
          <p style={{marginLeft: 'auto', marginRight: '70px'}}>Telepon</p>
          <p>Email</p>
        </div>
      </footer>
  )
}
