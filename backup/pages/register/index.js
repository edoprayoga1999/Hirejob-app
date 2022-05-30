import React, { useState } from 'react'
import axios from 'axios'

import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';

import swal from 'sweetalert2';
import style from '../../styles/Auth.module.css'

function Register() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const registerSubmit = (e) => {
    e.preventDefault()
    const newForm = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      level: 0
    }
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
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
              router.push('/login');
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
    <div className='w-50 d-flex flex-column align-items-center' style={{ height: '100vh', paddingTop: '50px', overflow: 'auto' }}>
      <Head>
        <title>Hirejob - Register</title>
      </Head>
        <h1 style={{ width: '80%' }}>Halo, Pewpeople</h1>
        <p style={{ fontSize: '18px', color: '#46505C', width: '80%', marginBottom: '50px' }}>Daftar sebagai jobseeker dan mulai dapatkan pekerjaan yang anda inginkan.</p>
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Name</small>
        <input className={style.inputForm} type='text' onChange={(e) => { setForm({...form, name: e.target.value}) }} placeholder='Masukan nama panjang' />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Email</small>
        <input className={style.inputForm} type='email' onChange={(e) => { setForm({...form, email: e.target.value}) }} placeholder='Masukan alamat email' />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>No handphone</small>
        <input className={style.inputForm} type='number' onChange={(e) => { setForm({...form, phone: e.target.value}) }} placeholder='Masukan no handphone' />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Kata Sandi</small>
        <input className={style.inputForm} type='password' onChange={(e) => { setForm({...form, password: e.target.value}) }} placeholder='Masukan kata sandi' />
        <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Konfirmasi kata sandi</small>
        <input className={style.inputForm} type='password' onChange={(e) => { setForm({...form, confirmPassword: e.target.value}) }} placeholder='Masukan konfirmasi kata sandi' />
        <button type='button' onClick={(e) => { registerSubmit(e) }} className={style.loginButton}>Daftar sebagai jobseeker</button>
        <div className='d-flex'>
          <p style={{ fontSize: '16px', color: '#1F2A36' }}>Anda sudah punya akun?&nbsp;</p>
          <Link href="/login"><p className={style.cursorChange} style={{ fontSize: '16px', color: '#FBB017' }}>Masuk disini</p></Link>
        </div>
        <div className='d-flex'>
          <p style={{ fontSize: '16px', color: '#1F2A36' }}>Daftar sebagai perekrut?&nbsp;</p>
          <Link href="/register/recruiter"><p className={style.cursorChange} style={{ fontSize: '16px', color: '#FBB017' }}>Daftar disini</p></Link>
        </div>
      </div>
  )
}
Register.layout = 'L3'
export default Register
