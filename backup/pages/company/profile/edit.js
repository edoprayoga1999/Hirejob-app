import React from 'react'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import style from '../../../styles/Edit.module.css'

function CompanyEdit() {
  return (<>
    <Head>
        <title>Hirejob - Edit Company Profile</title>
    </Head>
    <div style={{ width: '100%', height: '350px', backgroundColor: '#5E50A1' }} />
    <div style={{ width: '100%', height: '1050px', backgroundColor: '#F6F7F8' }} />
    <div className='d-flex w-100 position-absolute' style={{top: '170px'}}>
      <div style={{ width: '30%', display: 'flex' }}>
        <div className='d-flex flex-column' style={{ width: '70%', height: '450px', backgroundColor: '#FFFFFF', marginLeft: 'auto', marginRight: '0px', padding: '30px', borderRadius: '10px' }}>
          <div style={{
            width: '150px',
            height: '150px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '999px',
            backgroundImage: 'url(\'/louisphoto.jpg\')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginBottom: '25px'
          }} />
          <div className='d-flex align-items-center' style={{ color: '#9EA0A5', margin: '0px auto 20px auto' }}>
              <FontAwesomeIcon icon={faPencil} style={{ marginRight: '15px' }} /><h4 style={{ marginTop: 'auto', marginBottom: 'auto' }}>Edit</h4>
          </div>
          <h3>PT. Martabat Jaya Abadi</h3>
          <p>Financial</p>
           <div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
              <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>Purwokerto, Jawa Tengah</p>
          </div>
        </div>
      </div>
      <div className='d-flex flex-column' style={{ width: '70%', paddingLeft: '30px' }}>
        <div className='d-flex flex-column' style={{ width: '90%', backgroundColor: '#FFFFFF', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
          <h3>Data Diri</h3>
          <hr style={{ border: '1px solid #C4C4C4' }} />
          <small style={{ color: '#9EA0A5' }}>Nama Perusahaan</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama perusahan' style={{ width: '100%', marginBottom: '30px' }} />
          <small style={{ color: '#9EA0A5' }}>Bidang</small>
          <input type='text' className={style.inputClass} placeholder='Masukan bidang perusahaan ex : Financial' style={{ width: '100%', marginBottom: '30px' }} />
          <small style={{ color: '#9EA0A5' }}>Kota</small>
          <input type='text' className={style.inputClass} placeholder='Masukan kota' style={{ width: '100%', marginBottom: '30px' }} />
          <small style={{ color: '#9EA0A5' }}>Deskripsi singkat</small>
          <textarea className={style.inputClass} placeholder='Tuliskan deskripsi singkat' style={{ height: '150px', marginBottom: '30px' }} />
          <small style={{ color: '#9EA0A5' }}>Email</small>
          <input type='text' className={style.inputClass} placeholder='Masukan email' style={{ width: '100%', marginBottom: '30px' }} />
          <small style={{ color: '#9EA0A5' }}>Instagram</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama Instagram' style={{ width: '100%', marginBottom: '30px' }} />
          <small style={{ color: '#9EA0A5' }}>Nomor Telepon</small>
          <input type='number' className={style.inputClass} placeholder='Masukan nomor telepon' style={{ width: '100%', marginBottom: '30px' }} />
          <small style={{ color: '#9EA0A5' }}>Linkedin</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama Linkedin' style={{ width: '100%', marginBottom: '30px' }} />
          <button type='button' style={{padding: '15px', backgroundColor: '#FBB017', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Simpan</button>
        </div>
      </div>
    </div>
  </>
  )
}
CompanyEdit.layout = 'L1'
export default CompanyEdit