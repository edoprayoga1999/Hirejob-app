import React, { useState } from 'react'
import axios from 'axios'

import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import swal from 'sweetalert2'
import style from '../../styles/Auth.module.css'

function Recruiter() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    occupation: '',
    phone: ''
  })
  const registerSubmit = (e) => {
    e.preventDefault()
    const newForm = {
      name: form.name,
      email: form.email,
      password: form.password,
      company: form.company,
      occupation: form.occupation,
      phone: form.phone,
      level: 1
    }
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.company || !form.occupation || !form.phone) {
      swal.fire({
        title: 'Error!',
        text: 'Semua data harus diisi!',
        icon: 'error',
      });
    } else if (form.password !== form.confirmPassword) {
      swal.fire({
        title: 'Error!',
        text: 'Konfirmasi password tidak cocok, periksa kembali inputan anda',
        icon: 'error',
      });
    } else {
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, newForm)
        .then(() => {
        swal.fire({
            title: 'Success!',
            text: 'Register berhasil. Silahkan login',
            icon: 'success',
          })
            .then(() => {
              router.push('/login/recruiter');
            });
        })
        .catch((err) => {
        swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
          });
      })
    }
  }
  return (
    <div className='w-50 d-flex flex-column align-items-center ' style={{ height: '100vh', overflow: 'auto', paddingTop: '50px' }}>
      <Head>
        <title>Hirejob - Register</title>
      </Head>
        <h1 style={{ width: '80%' }}>Halo, Pewpeople</h1>
        <p style={{ fontSize: '18px', color: '#46505C', width: '80%', marginBottom: '50px' }}>Daftar sebagai perekrut dan mulai merekrut talent bertalenta.</p>
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Name</small>
        <input className={style.inputForm} type='text' placeholder='Masukan nama panjang' onChange={(e) => { setForm({...form, name: e.target.value}) }} />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Email</small>
        <input className={style.inputForm} type='email' placeholder='Masukan alamat email' onChange={(e) => { setForm({...form, email: e.target.value}) }} />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Perusahaan</small>
        <input className={style.inputForm} type='text' placeholder='Masukan nama perusahaan' onChange={(e) => { setForm({...form, company: e.target.value}) }} />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Jabatan</small>
        <input className={style.inputForm} type='text' placeholder='Posisi di perusahaan anda' onChange={(e) => { setForm({...form, occupation: e.target.value}) }} />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>No handphone</small>
        <input className={style.inputForm} type='number' placeholder='Masukan no handphone' onChange={(e) => { setForm({...form, phone: e.target.value}) }} />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Kata Sandi</small>
        <input className={style.inputForm} type='password' placeholder='Masukan kata sandi' onChange={(e) => { setForm({...form, password: e.target.value}) }} />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Konfirmasi kata sandi</small>
        <input className={style.inputForm} type='password' placeholder='Masukan konfirmasi kata sandi' onChange={(e) => { setForm({...form, confirmPassword: e.target.value}) }} />
        <button type='button' onClick={(e) => { registerSubmit(e) }} className={style.loginButton}>Daftar sebagai perekrut</button>
        <div className='d-flex'>
          <p style={{ fontSize: '16px', color: '#1F2A36' }}>Anda sudah punya akun perekrut?&nbsp;</p>
          <Link href="/login/recruiter"><p className={style.cursorChange} style={{ fontSize: '16px', color: '#FBB017' }}>Masuk disini</p></Link>
        </div>
        <div className='d-flex'>
          <p style={{ fontSize: '16px', color: '#1F2A36' }}>Daftar sebagai jobseeker?&nbsp;</p>
          <Link href="/register"><p className={style.cursorChange} style={{ fontSize: '16px', color: '#FBB017' }}>Daftar disini</p></Link>
        </div>
      </div>
  )
}
Recruiter.layout = 'L3'
export default Recruiter
