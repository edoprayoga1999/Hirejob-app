import React, { useState } from 'react';
import axios from 'axios';

import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import style from '../../styles/Auth.module.css';

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    if (!form.email || !form.password) {
      swal.fire({
        title: 'Error!',
        text: 'Semua data harus diisi!',
        icon: 'error',
      });
      setLoading(false)
    } else {
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, form)
        .then((result) => {
          document.cookie = `token=${result.data.token};path=/`;
          document.cookie = `level=${result.data.data.level};path=/`;
          swal.fire({
            title: 'Success!',
            text: 'Login Berhasil',
            icon: 'success',
          })
            .then(() => {
              router.push('/home');
            });
        })
        .catch((err) => {
          swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
          });
        })
        .finally(() => {
          setLoading(false)
        })
    }
  };
  return (
    <div className="w-50 d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', overflow: 'auto' }}>
      <Head>
        <title>Hirejob - Login</title>
      </Head>
      <h1 style={{ width: '80%' }}>Halo, Pewpeople</h1>
      <p style={{
        fontSize: '18px', color: '#46505C', width: '80%', marginBottom: '50px',
      }}
      >
        Silahkan login dengan akun anda.
      </p>
      <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Email</small>
      <input className={style.inputForm} type="email" placeholder="Masukan alamat email" onChange={(e) => { setForm({ ...form, email: e.target.value }); }} />
      <small style={{ width: '80%', color: '#9EA0A5', marginBottom: '5px' }}>Kata Sandi</small>
      <input className={style.inputForm} type="password" placeholder="Masukan kata sandi" onChange={(e) => { setForm({ ...form, password: e.target.value }); }} />
      <div style={{ width: '80%', display: 'flex', marginBottom: '25px' }}>
        <p style={{
          fontSize: '16px', color: '#1F2A36', marginLeft: 'auto', marginRight: '0px',
        }}
        >
          Lupa kata sandi?
        </p>
      </div>
      <button type='button' className={style.loginButton} onClick={(e) => { loginSubmit(e); }}>
        {loading ? (<><FontAwesomeIcon icon={faSpinner} spin />&nbsp;Loading</>) : "Masuk sebagai jobseeker"}
      </button>
      <div className="d-flex">
        <p style={{ fontSize: '16px', color: '#1F2A36' }}>Anda belum punya akun?&nbsp;</p>
        <Link href="/register"><p className={style.cursorChange} style={{ fontSize: '16px', color: '#FBB017' }}>Daftar disini</p></Link>
      </div>
      <div className="d-flex">
        <p style={{ fontSize: '16px', color: '#1F2A36' }}>Masuk sebagai perekrut?&nbsp;</p>
        <Link href="/login/recruiter"><p className={style.cursorChange} style={{ fontSize: '16px', color: '#FBB017' }}>Masuk disini</p></Link>
      </div>
    </div>
  );
}
Login.layout = 'L2';
export default Login;
