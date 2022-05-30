import React from 'react'
import axios from 'axios'

import Image from 'next/image'
import Head from 'next/head'

import style from '../styles/Landing.module.css'

export async function getStaticProps() {
  const fetchApi1 = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/info`
      })
      return {
        data: response.data.data,
        error: false
      }
    } catch (error) {
      return {
        data: [],
        error: true
      }
    }
  }
  return {
    props: {
      data: [],
      api1: await fetchApi1()
    },
    revalidate: 10
  }
}

function Landing(props) {
  const dataApi = props.api1
  return (<>
    <div className='d-flex' style={{ width: '80%', paddingTop: '135px', marginBottom: '180px' }}>
      <Head>
        <title>Hirejob - Landing Page</title>
      </Head>
        <div className='d-flex flex-column' style={{ width: '50%', paddingTop: '85px'}}>
          <h1 style={{fontWeight: '600', fontSize: '44px', lineHeight: '70px', color: '#1F2A36', marginBottom: '20px', width: '70%'}}>Talenta terbaik negri untuk perubahan revolusi 4.0</h1>
        <p style={{ fontSize: '18px', color: '#46505C', marginBottom: '50px', width: '70%' }}>{dataApi.error ? "Error" : dataApi.data[0].description}</p>
          <button type='button' className={style.heroButton}>Mulai Dari Sekarang</button>
        </div>
        <div className='d-flex align-items-center' style={{ width: '50%', paddingLeft: '50px' }}>
          <Image src='/backgroundpic.jpg' height={500} width={500} alt="" />
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center' style={{width: '80%', marginBottom: '100px'}}>
      <div className='d-flex align-items-center w-100' style={{backgroundColor: '#5E50A1', padding: '60px', borderRadius: '40px 8px'}}>
        <div style={{width: '50%'}}>
          <h2 style={{fontWeight: '600', fontSize: '36', lineHeight: '56px', color: '#FFFFFF'}}>Lorem ipsum dolor sit amet</h2>
        </div>
        <div style={{width: '50%', display: 'flex'}}>
          <button type='button' style={{backgroundColor: '#FFFFFF', color: '#796EAF', padding: '21px 23px', border: 'none', fontSize: '16px', fontWeight: '700', marginLeft: 'auto', marginRight: '0px'}}>Mulai Dari Sekarang</button>
        </div>
        </div>
      </div>
  </>
  )
}
Landing.layout = 'L1'
export default Landing
