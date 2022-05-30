/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'

import Head from 'next/head'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons'
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'

export async function getServerSideProps(context) {
  const { token } = context.req.cookies
  const userId = context.params.profileId
  const getUserDetail = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
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
      profileDetail: await getUserDetail()
    }
  }
}

function DetailProfile(props) {
  const userData = props.profileDetail.data[0]
  const [activeTab, setActiveTab] = useState('1')
  return (<>
    <Head>
      <title>Hirejob - {userData.name} Profile</title>
    </Head>
    <div style={{ width: '100%', height: '350px', backgroundColor: '#5E50A1' }} />
    <div style={{ width: '100%', height: '950px', backgroundColor: '#F6F7F8' }} />
    <div className='d-flex w-100 position-absolute' style={{top: '170px'}}>
      <div style={{ width: '30%', display: 'flex' }}>
        <div style={{ width: '70%', backgroundColor: '#FFFFFF', marginLeft: 'auto', marginRight: '0px', padding: '30px', position: 'relative', borderRadius: '10px' }}>
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
          <h3>{userData.name}</h3>
          {userData.jobdesk ? (<p>{userData.jobdesk}</p>) : ""}
          {userData.location ? (<div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{userData.location}</p>
          </div>) : ""}
          {userData.fulltime === 1 ? (<p style={{ color: '#9EA0A5' }}>Fulltime</p>) : userData.fulltime === 0 ? (<p style={{ color: '#9EA0A5' }}>Freelancer</p>) : ""}
          {userData.description ? (<p style={{ color: '#9EA0A5', marginBottom: '40px' }}>{ userData.description }</p>) : ""}
          <h3 style={{marginBottom: '24px'}}>Skill</h3>
          <div className='row' style={{marginBottom: '50px'}}>
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
        </div>
      </div>
      <div style={{ width: '70%', paddingLeft: '30px' }}>
        <div style={{ width: '90%', backgroundColor: '#FFFFFF', padding: '30px', borderRadius: '10px' }}>
          <div className='d-flex w-100' style={{ marginBottom: '25px' }}>
            <Nav tabs>
              <NavItem>
                <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                  <h3 style={{marginRight: '30px'}}>Portofolio</h3>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                  <h3>Pengalaman Kerja</h3>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
          <div className='row'>
            {userData.portofolio.length === 0 ? (<div className='col-auto'>Tidak ada portofolio</div>) : userData.portofolio.map((item, index) => (<div key={index} className='col-4 text-center'>
              <div style={{
              height: '250px',
              borderRadius: '5px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.photo}')`,
              }} />
              <a href={item.project_link} target="_blank" rel="noreferrer"><p>{item.title}</p></a>
            </div>))}
          </div>
            </TabPane>
            <TabPane tabId="2">
              <div className='d-flex flex-column w-100'>
                {userData.experience.length === 0 ? (<div>Tidak ada pengalaman</div>) : userData.experience.map((item, index) => (<div key={index} className='d-flex w-100'>
                  <div style={{ width: '10%' }}><Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.photo}`} width={75} height={75} alt='' /></div>
                  <div className='d-flex flex-column' style={{ width: '90%' }}>
                    <h4>{item.position}</h4>
                    <h5 style={{ fontWeight: '400' }}>{item.company_name}</h5>
                    <div style={{ display: 'flex', color: '#9EA0A5' }}>
                      <p>{moment(item.start_date).format('MMMM YYYY')} - {moment(item.end_date).format('MMMM YYYY')} &nbsp;&nbsp;</p>
                      <p>{moment.duration(moment(item.end_date).diff(moment(item.start_date))).months()} months</p>
                    </div>
                    <p style={{width: '90%'}}>{item.description}</p>
                    <hr style={{ width: '90%', border: '2px solid #E2E5ED'}}/>
                  </div>
                </div>))}
              </div>
            </TabPane>
            </TabContent>
        </div>
      </div>
    </div>
  </>
  )
}
DetailProfile.layout = 'L1'
export default DetailProfile