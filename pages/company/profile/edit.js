import React, {useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

import Head from 'next/head'
import{useRouter} from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import style from '../../../styles/Edit.module.css'

export async function getServerSideProps(context) {
  const { token, level } = context.req.cookies
  const getCompanyProfile = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/recruiter/myprofile`,
        headers: {
          token
        }
      })
      return {
        data: response.data.data,
        error: false
      }
    } catch (err) {
      return {
        data: [],
        error: true
      }
    }
  }
  return {
    props: {
      data: [],
      profileDetail: await getCompanyProfile(),
      token,
      level
    }
  }
}

function CompanyEdit(props) {
  const router = useRouter()
  const companyData = props.profileDetail.data[0]
  const [userForm, setUserForm] = useState({
    loginId: companyData.login_id,
    name: companyData.name,
    email: companyData.email,
    company: companyData.company,
    occupation: companyData.occupation,
    phone: companyData.phone,
    city: companyData.city,
    bio: companyData.bio,
    instagram: companyData.instagram,
    linkedin: companyData.instagram
    
  })
  const [userPhoto, setUserPhoto] = useState('');
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const logout = () => {
    document.cookie = `token=;path=/`;
    document.cookie = `level=;path=/`;
    router.push('/login')
  }
  const photoSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('photo', userPhoto)
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recruiter/update/photo`, formData, {
      headers: {
        token: props.token
      }
    })
      .then(() => {
        swal.fire(
          'Sukses!',
          'Foto anda berhasil di update.',
          'success'
        ).then(() => {
          router.push('/company/profile/edit')
        })
      })
      .catch((err) => {
        swal.fire(
          'Gagal!',
          err.response.data.message,
          'error'
        ).then(() => {
          router.push('/company/profile/edit')
        })
      })
      .finally(() => {
        setButtonVisibility(!buttonVisibility)
        setLoading(false)
      })
  }
  const updateCompanyData = (e) => {
    e.preventDefault()
    setLoadingProfile(true)
    if (!userForm.name || !userForm.company || !userForm.occupation || !userForm.phone || !userForm.email) {
      swal.fire(
        'Error!',
        'data \'Nama lengkap\', \'Nomor telepon\', \'Nama Perusahaan\', \'Email\', dan \'Bidang\' harus diisi.',
        'error'
      )
      setLoadingProfile(false)
    }
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recruiter/update`, userForm, {
      headers: {
        token: props.token
      }
    })
      .then(() => {
        swal.fire(
          'Sukses!',
          'Data profil anda berhasil di update.',
          'success'
        ).then(() => {
          router.push('/company/profile/edit')
        })
      })
      .catch((err) => {
        swal.fire(
          'Gagal!',
          err.response.data.message,
          'error'
        ).then(() => {
          router.push('/company/profile/edit')
        })
      })
      .finally(() => {
        setLoadingProfile(false)
      })
  }
  return (<>
    <Head>
        <title>Hirejob - Edit Company Profile</title>
    </Head>
    <div style={{ width: '100%', height: '350px', backgroundColor: '#5E50A1' }} />
    <div style={{ width: '100%', height: '1050px', backgroundColor: '#F6F7F8' }} />
    <div className='d-flex w-100 position-absolute' style={{top: '170px'}}>
      <div style={{ width: '30%', display: 'flex' }}>
        <div className='d-flex flex-column' style={{ width: '70%', backgroundColor: '#FFFFFF', marginLeft: 'auto', marginRight: '0px', padding: '30px', borderRadius: '10px' }}>
          <div style={{
            width: '150px',
            height: '150px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '999px',
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${companyData.photo}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginBottom: '25px'
          }} />
          <form id="form" onSubmit={(e) => photoSubmit(e)}>
            <input type="file" id="photo" onChange={(e) => { setUserPhoto(e.target.files[0]); setButtonVisibility(!buttonVisibility); }} style={{ display: 'none' }} />
            <input type="submit" id="submit" style={{ display: 'none' }} />
          </form>
          <div className='d-flex justify-content-center align-items-center w-100'>
            {buttonVisibility ? (
                <button
                    type="button"
                    onClick={() => {
                      document.getElementById('submit').click();
                    }}
                    style={{ width: '50%', padding: '15px', backgroundColor: '#5E50A1', color: '#FFFFFF', borderRadius: '5px', border: 'none', marginBottom: '40px' }}>
                    {loading ? 'Loading..' : 'Confirm Upload'}
                  </button>
              ) : (
                <button
                    type="button"
                    onClick={() => {
                      document.getElementById('photo').click();
                    }}
                    style={{ width: '50%', padding: '15px', backgroundColor: '#5E50A1', color: '#FFFFFF', borderRadius: '5px', border: 'none', marginBottom: '40px' }}>
                    Select Photo
                  </button>
          )}
          </div>
          <h4>{companyData.name}</h4>
          <h3>{companyData.company}</h3>
          <p>{companyData.occupation}</p>
          {companyData.city ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{companyData.city}</p>
          </div>) : ""}
          {companyData.bio ? (<p style={{ color: '#9EA0A5', marginBottom: '40px' }}>{ companyData.bio }</p>) : ""}
          {companyData.email ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{companyData.email}</p>
          </div>) : ""}
          {companyData.instagram ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{companyData.instagram}</p>
          </div>) : ""}
          {companyData.phone ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{companyData.phone}</p>
          </div>) : ""}
          {companyData.linkedin ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{companyData.linkedin}</p>
          </div>) : ""}
          <button type='button' onClick={() => { logout() }} style={{ width: '100%', padding: '15px', backgroundColor: '#dc3545', color: '#FFFFFF', borderRadius: '5px', border: 'none', marginBottom: '40px', marginTop: '20px' }}>Logout</button>
        </div>
      </div>
      <div className='d-flex flex-column' style={{ width: '70%', paddingLeft: '30px' }}>
        <div className='d-flex flex-column' style={{ width: '90%', backgroundColor: '#FFFFFF', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
          <h3>Data Diri</h3>
          <hr style={{ border: '1px solid #C4C4C4' }} />
          <small style={{ color: '#9EA0A5' }}>Nama Lengkap</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama lengkap' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, name: e.target.value}) }} value={userForm.name} />
          <small style={{ color: '#9EA0A5' }}>Nama Perusahaan</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama perusahan' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, company: e.target.value}) }} value={userForm.company} />
          <small style={{ color: '#9EA0A5' }}>Bidang</small>
          <input type='text' className={style.inputClass} placeholder='Masukan bidang perusahaan ex : Financial' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, occupation: e.target.value}) }} value={userForm.occupation} />
          <small style={{ color: '#9EA0A5' }}>Kota</small>
          <input type='text' className={style.inputClass} placeholder='Masukan kota' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, city: e.target.value}) }} value={userForm.city} />
          <small style={{ color: '#9EA0A5' }}>Deskripsi singkat</small>
          <textarea className={style.inputClass} placeholder='Tuliskan deskripsi singkat' style={{ height: '150px', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, bio: e.target.value}) }} value={userForm.bio} />
          <small style={{ color: '#9EA0A5' }}>Email</small>
          <input type='text' className={style.inputClass} placeholder='Masukan email' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, email: e.target.value}) }} value={userForm.email} />
          <small style={{ color: '#9EA0A5' }}>Instagram</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama Instagram' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, instagram: e.target.value}) }} value={userForm.instagram} />
          <small style={{ color: '#9EA0A5' }}>Nomor Telepon</small>
          <input type='number' className={style.inputClass} placeholder='Masukan nomor telepon' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, phone: e.target.value}) }} value={userForm.phone} />
          <small style={{ color: '#9EA0A5' }}>Linkedin</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama Linkedin' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, linkedin: e.target.value}) }} value={userForm.linkedin} />
          <button type='button' onClick={(e) => { updateCompanyData(e) }} style={{ padding: '15px', backgroundColor: '#FBB017', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>
            {loadingProfile ? (<><FontAwesomeIcon icon={faSpinner} spin />&nbsp;Loading</>) : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  </>
  )
}
CompanyEdit.layout = 'L1'
export default CompanyEdit