/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import CreatableSelect from 'react-select/creatable';

import Head from 'next/head'
import {useRouter} from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons'
import style from '../../styles/Edit.module.css'

export async function getServerSideProps(context) {
  const { token, level } = context.req.cookies
  const getUserProfile = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/myprofile`,
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
      profileDetail: await getUserProfile(),
      token,
      level
    }
  }
}

function EditProfile(props) {
  const router = useRouter()
  const userData = props.profileDetail.data[0]
  const [userForm, setUserForm] = useState({
    name: userData.name,
    phone: userData.phone,
    jobdesk: userData.jobdesk,
    fulltime: userData.fulltime,
    location: userData.location,
    instagram: userData.instagram,
    github: userData.github,
    gitlab: userData.gitlab,
    company_name: userData.company,
    description: userData.description
  })
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState({
    position: '',
    company_name: '',
    start_date: '',
    end_date: '',
    description: '',
    photo: ''
  })
  const [portofolio, setPortofolio] = useState({
    title: '',
    project_link: '',
    platform: '',
    photo: ''
  })
  const [userPhoto, setUserPhoto] = useState('');
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingSkill, setLoadingSkill] = useState(false);
  const [loadingExperience, setLoadingExperience] = useState(false);
  const [loadingPortofolio, setLoadingPortofolio] = useState(false);
    const logout = () => {
    document.cookie = `token=;path=/`;
    document.cookie = `level=;path=/`;
    router.push('/login')
  }
  const addSkill = (e) => {
    e.preventDefault()
    setLoadingSkill(true)
    const skillsData = skills.map((item) => item.value)
    const skillForm = { name: skillsData }
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skill/add`, skillForm, {
      headers: {
        token: props.token
      }
    })
      .then(() => {
        swal.fire(
          'Sukses!',
          'Skill telah ditambahkan.',
          'success'
        ).then(() => {
          router.push('/profile/edit')
        })
      })
      .catch((err) => {
        swal.fire(
          'Gagal!',
          err.response.data.message,
          'error'
        )
      })
      .finally(() => {
        setLoadingSkill(false)
      })
  }
  const photoSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('photo', userPhoto)
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update/photo`, formData, {
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
          router.push('/profile/edit')
        })
      })
      .catch((err) => {
        swal.fire(
          'Gagal!',
          err.response.data.message,
          'error'
        ).then(() => {
          router.push('/profile/edit')
        })
      })
      .finally(() => {
        setButtonVisibility(!buttonVisibility)
        setLoading(false)
      })
  }
  const updateUserData = (e) => {
    e.preventDefault()
    setLoadingProfile(true)
    if (!userForm.name || !userForm.phone) {
      swal.fire(
        'Error!',
        'data \'Nama lengkap\' dan \'Nomor telepon\' harus diisi.',
        'error'
      )
      setLoadingProfile(false)
    }
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`, userForm, {
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
          router.push('/profile/edit')
        })
      })
      .catch((err) => {
        swal.fire(
          'Gagal!',
          err.response.data.message,
          'error'
        ).then(() => {
          router.push('/profile/edit')
        })
      })
      .finally(() => {
        setLoadingProfile(false)
      })
  }
  const addExperience = (e) => {
    e.preventDefault()
    setLoadingExperience(true)
    if (!experience.position || !experience.company_name || !experience.start_date || !experience.end_date || !experience.description) {
      swal.fire(
        'Error!',
        'Semua data harus diisi.',
        'error'
      )
      setLoadingExperience(false)
    } else {
      const experienceForm = new FormData()
      experienceForm.append('position', experience.position)
      experienceForm.append('company_name', experience.company_name)
      experienceForm.append('start_date', experience.start_date)
      experienceForm.append('end_date', experience.end_date)
      experienceForm.append('description', experience.description)
      experienceForm.append('photo', experience.photo)
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/add`, experienceForm, {
        headers: {
          token: props.token
        }
      })
      .then(() => {
        swal.fire(
          'Sukses!',
          'Pengalaman kerja berhasil ditambahkan',
          'success'
        ).then(() => {
          router.push('/profile')
        })
      })
      .catch((err) => {
        swal.fire(
          'Gagal!',
          err.response.data.message,
          'error'
        ).then(() => {
          router.push('/profile')
        })
      })
      .finally(() => {
        setLoadingExperience(false)
      })
    }
  }
  const addPortofolio = (e) => {
    e.preventDefault()
    setLoadingPortofolio(true)
    if (!portofolio.title || !portofolio.project_link || !portofolio.photo) {
      swal.fire(
        'Error!',
        'Semua data harus diisi.',
        'error'
      )
      setLoadingPortofolio(false)
    } else {
      const portofolioForm = new FormData()
      portofolioForm.append('title', portofolio.title)
      portofolioForm.append('project_link', portofolio.project_link)
      portofolioForm.append('platform', portofolio.platform)
      portofolioForm.append('photo', portofolio.photo)
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/portofolio/add`, portofolioForm, {
        headers: {
          token: props.token
        }
      })
      .then(() => {
        swal.fire(
          'Sukses!',
          'Portofolio berhasil ditambahkan',
          'success'
        ).then(() => {
          router.push('/profile')
        })
      })
      .catch((err) => {
        swal.fire(
          'Gagal!',
          err.response.data.message,
          'error'
        ).then(() => {
          router.push('/profile')
        })
      })
      .finally(() => {
        setLoadingPortofolio(false)
      })
    }
  }
  return (<>
    <Head>
      <title>Hirejob - Edit Profile</title>
    </Head>
    <div style={{ width: '100%', height: '350px', backgroundColor: '#5E50A1' }} />
    <div style={{ width: '100%', height: '3050px', backgroundColor: '#F6F7F8' }} />
    <div className='d-flex w-100 position-absolute' style={{top: '170px'}}>
      <div style={{ width: '30%', display: 'flex' }}>
        <div className='d-flex flex-column' style={{ width: '70%', height: '1600px', backgroundColor: '#FFFFFF', marginLeft: 'auto', marginRight: '0px', padding: '30px', borderRadius: '10px' }}>
          <div style={{
            width: '150px',
            height: '150px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '999px',
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData.photo}')`,
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
          <h3>{userData.name}</h3>
          {userData.jobdesk ? (<p>{userData.jobdesk}</p>) : ""}
          {userData.location ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{userData.location}</p>
          </div>) : ""}
          {userData.fulltime === 1 ? (<p style={{ color: '#9EA0A5' }}>Fulltime</p>) : userData.fulltime === 0 ? (<p style={{ color: '#9EA0A5' }}>Freelancer</p>) : ""}
          {userData.description ? (<p style={{ color: '#9EA0A5', marginBottom: '40px' }}>{ userData.description }</p>) : ""}
          <h3 style={{marginBottom: '24px'}}>Skill</h3>
          <div className='row' style={{ marginBottom: '50px' }}>
            {userData.skill.length > 0 ? userData.skill.map((item, index) => (<div key={index} className='col-auto mb-3' style={{ background: 'rgba(251, 176, 23, 0.6)', border: '1px solid #FBB017', borderRadius: '4px', padding: '4px 23px', color: '#FFFFFF', marginRight: '10px' }}>{item.name}</div>)) : (<div className='col-auto'>Skill belum ditambahkan</div>)}
          </div>
          {userData.email ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{userData.email}</p>
          </div>) : ""}
          {userData.instagram ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{userData.instagram}</p>
          </div>) : ""}
          {userData.github ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{userData.github}</p>
          </div>) : ""}
          {userData.gitlab ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
              <FontAwesomeIcon icon={faGitlab} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{userData.gitlab}</p>
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
          <small style={{ color: '#9EA0A5' }}>Nomor Telepon</small>
          <input type='number' className={style.inputClass} placeholder='Masukan nomor telepon' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, phone: e.target.value}) }} value={userForm.phone} />
          <small style={{ color: '#9EA0A5' }}>Job desk</small>
          <input type='text' className={style.inputClass} placeholder='Masukan job desk' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, jobdesk: e.target.value}) }} value={userForm.jobdesk} />
          <small style={{ color: '#9EA0A5' }}>Domisili</small>
          <input type='text' className={style.inputClass} placeholder='Masukan domisili' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, location: e.target.value}) }} value={userForm.location} />
          <small style={{ color: '#9EA0A5' }}>Tempat kerja</small>
          <input type='text' className={style.inputClass} placeholder='Masukan tempat kerja' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, company_name: e.target.value}) }} value={userForm.company_name} />
          <small style={{ color: '#9EA0A5' }}>Waktu kerja</small>
          <select className={style.inputClass} style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, fulltime: parseInt(e.target.value)}) }} value={userForm.fulltime}>
            <option value=''>Pilih waktu bekerja</option>
            <option value='1'>Fulltime</option>
            <option value='0'>Freelance</option>
          </select>
          <small style={{ color: '#9EA0A5' }}>Deskripsi singkat</small>
          <textarea className={style.inputClass} placeholder='Tuliskan deskripsi singkat' style={{ height: '150px', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, description: e.target.value}) }} value={userForm.description} />
          <small style={{ color: '#9EA0A5' }}>Instagram</small>
          <input type='text' className={style.inputClass} placeholder='Masukan link instagram' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, instagram: e.target.value}) }} value={userForm.instagram} />
          <small style={{ color: '#9EA0A5' }}>Github</small>
          <input type='text' className={style.inputClass} placeholder='Masukan link github' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, github: e.target.value}) }} value={userForm.github} />
          <small style={{ color: '#9EA0A5' }}>Gitlab</small>
          <input type='text' className={style.inputClass} placeholder='Masukan link gitlab' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setUserForm({...userForm, gitlab: e.target.value}) }} value={userForm.gitlab} />
          <div style={{ width: '100%', display: 'flex' }}>
            <button type='button' onClick={(e) => { updateUserData(e) }} style={{ padding: '15px', backgroundColor: '#FBB017', color: '#FFFFFF', border: 'none', borderRadius: '5px', marginLeft: 'auto', marginRight: '0px' }}>
              {loadingProfile ? (<><FontAwesomeIcon icon={faSpinner} spin />&nbsp;Loading</>) : "Simpan"}
            </button>
          </div>
        </div>
        <div className='d-flex flex-column' style={{ width: '90%', backgroundColor: '#FFFFFF', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
          <h3>Skill</h3>
          <hr style={{ border: '1px solid #C4C4C4' }} />
          <div className='d-flex align-items-center' style={{ width: '100%', marginBottom: '30px' }}>
            <div style={{ width: '85%' }}>
              <CreatableSelect isMulti onChange={(e) => { setSkills(e) }} />
            </div>
            <button type='button' onClick={(e) => { addSkill(e) }} style={{ padding: '15px', backgroundColor: '#FBB017', color: '#FFFFFF', border: 'none', borderRadius: '5px', marginLeft: 'auto', marginRight: '0px' }}>
              {loadingSkill ? (<><FontAwesomeIcon icon={faSpinner} spin />&nbsp;Loading</>) : "Tambahkan"}
            </button>
          </div>
        </div>
        <div className='d-flex flex-column' style={{ width: '90%', backgroundColor: '#FFFFFF', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
          <h3>Pengalaman Kerja</h3>
          <hr style={{ border: '1px solid #C4C4C4' }} />
          <small style={{ color: '#9EA0A5' }}>Posisi</small>
          <input type='text' className={style.inputClass} placeholder='Masukan posisi anda' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setExperience({...experience, position: e.target.value})}} />
          <small style={{ color: '#9EA0A5' }}>Nama perusahaan</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama perusahaan' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setExperience({...experience, company_name: e.target.value})}} />
          <div className='d-flex w-100'>
            <small style={{width: '50%'}}>Mulai bekerja</small>
            <small style={{width: '50%'}}>Selesai bekerja</small>
          </div>
          <div className='d-flex w-100'>
            <div style={{ width: '50%', marginBottom: '30px' }}>
              <input type='date' className={style.inputClass} style={{ width: '90%' }} onChange={(e) => { setExperience({...experience, start_date: e.target.value})}} />
            </div>
            <div style={{ width: '50%', marginBottom: '30px' }}>
              <input type='date' className={style.inputClass} style={{ width: '100%' }} onChange={(e) => { setExperience({...experience, end_date: e.target.value})}} />
            </div>
          </div>
          <small style={{ color: '#9EA0A5' }}>Upload gambar perusahaan</small>
          <div className='d-flex align-items-center' style={{ width: '100%', height: '70px', border: '1px dashed #9EA0A5', borderRadius: '10px', padding: '15px', marginBottom: '40px' }}>
            <input type='file' onChange={(e) => { setExperience({...experience, photo: e.target.files[0]})}} />
          </div>
          <small style={{ color: '#9EA0A5' }}>Deskripsi singkat</small>
          <textarea className={style.inputClass} placeholder='Deskripsikan pekerjaan anda' style={{ height: '150px', marginBottom: '30px' }} onChange={(e) => { setExperience({...experience, description: e.target.value})}} />
          <hr style={{ border: '1px solid #C4C4C4', marginBottom: '40px' }} />
          <button type='button' onClick={(e) => { addExperience(e) }} style={{ padding: '15px', color: '#FFFFFF', borderRadius: '5px', border: 'none', backgroundColor: '#FBB017' }}>
            {loadingExperience ? (<><FontAwesomeIcon icon={faSpinner} spin />&nbsp;Loading</>) : "Tambah Pengalaman Kerja"}
          </button>
        </div>
        <div className='d-flex flex-column' style={{ width: '90%', backgroundColor: '#FFFFFF', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
          <h3>Portofolio</h3>
          <hr style={{ border: '1px solid #C4C4C4' }} />
          <small style={{ color: '#9EA0A5' }}>Nama aplikasi</small>
          <input type='text' className={style.inputClass} placeholder='Masukan nama aplikasi' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setPortofolio({...portofolio, title: e.target.value}) }} />
          <small style={{ color: '#9EA0A5' }}>Link repository</small>
          <input type='text' className={style.inputClass} placeholder='Masukan link repository' style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => { setPortofolio({...portofolio, project_link: e.target.value}) }} />
          <small style={{ color: '#9EA0A5' }}>Type portofolio</small>
          <div className='d-flex w-100 align-items-center' style={{marginBottom: '30px'}}>
            <input type='radio' id='mobile' name='platform' value='mobile' style={{marginRight: '12px'}} onChange={() => { setPortofolio({...portofolio, platform: 1}) }} />
            <label htmlFor='mobile' style={{marginRight: '30px'}}>Aplikasi Mobile</label>
            <input type='radio' id='website' name='platform' value='website' style={{marginRight: '12px'}} onChange={() => { setPortofolio({...portofolio, platform: 0}) }} />
            <label htmlFor='website'>Aplikasi Web</label>
          </div>
          <small style={{ color: '#9EA0A5' }}>Upload gambar</small>
          <div className='d-flex align-items-center' style={{ width: '100%', height: '70px', border: '1px dashed #9EA0A5', borderRadius: '10px', padding: '15px', marginBottom: '40px' }}>
            <input type='file' onChange={(e) => { setPortofolio({...portofolio, photo: e.target.files[0]}) }}/>
          </div>
          <hr style={{ border: '1px solid #C4C4C4', marginBottom: '40px' }} />
          <button type='button' onClick={(e) => { addPortofolio(e) }} style={{ width: '100%', padding: '15px', color: '#FFFFFF', borderRadius: '5px', border: 'none', backgroundColor: '#FBB017' }}>
            {loadingPortofolio ? (<><FontAwesomeIcon icon={faSpinner} spin />&nbsp;Loading</>) : "Tambah Portofolio"}
          </button>
        </div>
      </div>
    </div>
  </>
  )
}
EditProfile.layout = 'L1'
export default EditProfile