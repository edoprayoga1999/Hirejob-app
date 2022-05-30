/* eslint-disable no-nested-ternary */
import React from 'react'
import axios from 'axios'

import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

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

function Profile(props) {
  const router = useRouter()
  const companyData = props.profileDetail.data[0]
  const logout = () => {
    document.cookie = `token=;path=/`;
    document.cookie = `level=;path=/`;
    router.push('/login')
  }
  return (<>
    <Head>
        <title>Hirejob - My Profile</title>
    </Head>
    <div className='d-flex flex-column align-items-center' style={{ width: '100%', backgroundColor: '#F6F7F8', paddingTop: '70px', paddingBottom: '180px' }}>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '85%', backgroundColor: '#FFFFFF', paddingBottom: '30px', borderRadius: '10px' }}>
        <div style={{width: '100%', height: '200px', backgroundColor: '#5E50A1', borderRadius: '10px 10px 0px 0px'}} />
        <div style={{
            width: '150px',
            height: '150px',
            margin: '-75px auto 25px auto',
            borderRadius: '999px',
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${companyData.photo}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
          <h4>{companyData.name}</h4>
          <h3>{companyData.company}</h3>
          <p>{companyData.occupation}</p>
          {companyData.city ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{companyData.city}</p>
          </div>) : ""}
          {companyData.bio ? (<p style={{ width: '40%', color: '#9EA0A5', marginBottom: '40px', textAlign: 'center' }}>{companyData.bio}</p>) : ""}
          <Link href='/company/profile/edit'>
            <button type='button' style={{ width: '20%', padding: '15px', backgroundColor: '#5E50A1', color: '#FFFFFF', borderRadius: '5px', border: 'none', marginBottom: '40px' }}>Edit Profile</button>
          </Link>
          <div className='d-flex flex-column'>
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
          </div>
          <button type='button' onClick={() => { logout() }} style={{ width: '20%', padding: '15px', backgroundColor: '#dc3545', color: '#FFFFFF', borderRadius: '5px', border: 'none', marginBottom: '40px', marginTop: '100px' }}>Logout</button>          
      </div>
    </div>
  </>
  )
}
Profile.layout = 'L1'
export default Profile