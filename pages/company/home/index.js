/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import React, {useState} from 'react'
import axios from 'axios'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass , faLocationDot } from '@fortawesome/free-solid-svg-icons'
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

import style from '../../../styles/Homes.module.css'

export async function getServerSideProps(context) {
  const page = context.query.page || '1'
  const search = context.query.search || ''
  const field = context.query.field || 'name'
  const fields = field === 'freelance' ? 'fulltime' : field
  const sortType = field === 'fulltime' ? 'DESC' : 'ASC'
  const { token, level } = context.req.cookies
  const getListWorker = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/allusers?name=${search}&field=${fields}&type=${sortType}&page=${page}&limit=3`,
        headers: {
          token
        }
      })
      return {
        data: response.data.data,
        pagination: response.data.pagination,
        error: false
      }
    } catch (err) {
      return {
        data: [],
        error: true
      }
      }
  }
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
      workerList: await getListWorker(),
      profileDetail: await getCompanyProfile(),
      query: { search, field, page },
      token,
      level
    }
  }
}

function Home(props) {
  const router = useRouter()
  const [search, setSearch] = useState(props.query.search)
  const [field, setField] = useState(props.query.field)
  const { page } = props.query
  const totalPage = props.workerList.pagination.total_page
  const listWorker = props.workerList.data
  const searchSubmit = (e) => {
    e.preventDefault()
    router.push(`/company/home?search=${search}&field=${field}&page=${page}`)
  }
  const goToPage = (event, index) => {
    event.preventDefault()
    router.push(`/company/home?search=${search}&field=${field}&page=${index}`)
  }
  return (<>
    <div className='d-flex flex-column w-100 align-items-center' style={{ backgroundColor: '#5E50A1', color: '#FFFFFF', padding: '40px 0px 40px 0px', marginBottom: '50px' }}>
      <Head>
        <title>Hirejob - Home</title>
      </Head>
        <h4 style={{ width: '80%', fontWeight: '700', fontSize: '28px'}}>Top Jobs</h4>
      </div>
      <div className='d-flex align-items-center' style={{ width: '80%', padding: '8px 8px 8px 20px', boxShadow: '0px 1px 20px rgba(197, 197, 197, 0.25)', borderRadius: '10px', color: '#9EA0A5', marginBottom: '50px' }}>
      <input className={style.inputClass} type='text' placeholder='Search for any name' value={search} onChange={(e) => { setSearch(e.target.value) }} />
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: 'auto', marginRight: '30px' }} />
        <hr style={{ width: '4%', border: '1px solid #9EA0A5', transform: 'rotate(90deg)' }} />
      <select className={style.inputSelect} style={{ height: '60px', width: 'auto', border: 'none', marginRight: '30px' }} onChange={(e) => { setField(e.target.value) }} value={field}>
          <option value="">Sort</option>
          <option value='name'>Sortir berdasarkan nama</option>
          <option value='location'>Sortir berdasarkan Lokasi</option>
          <option value='freelance'>Sortir berdasarkan freelance</option>
          <option value='fulltime'>Sortir berdasarkan fulltime</option>
        </select>
        <button type='button' onClick={(e) => { searchSubmit(e) }} style={{padding: '17px 34px', backgroundColor: '#5E50A1', color: '#FFFFFF', borderRadius: '4px', border:'none' }}>Search</button>
      </div>
    {/* start search */}
    {props.workerList.error ? (<div>Error</div>) : listWorker.length === 0 ? (<div>Data not found</div>) : listWorker.map((item, index) => (<div key={index} className='d-flex flex-column' style={{ width: '80%', boxShadow: '0px 1px 20px rgba(197, 197, 197, 0.25)', borderRadius: '10px', padding: '40px 20px 40px 20px', marginBottom: '10px' }}>
        <div className='d-flex align-items-center w-100'>
          <div style={{ width: '10%' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '999px', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.photo}')` }} />
          </div>
          <div className='d-flex flex-column' style={{ width: '80%' }}>
          <h3>{item.name}</h3>
          {item.fulltime === 1 ? (<p>Fulltime</p>) : item.fulltime === 0 ? (<p>Freelance</p>) : ""}
          <p style={{ color: '#9EA0A5' }}>{item.jobdesk? item.jobdesk : 'User belum menentukan jobdesk nya'}</p>
            <div className='d-flex align-items-center' style={{ color: '#9EA0A5', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px' }} /><p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{item.location? item.location : 'User belum menentukan lokasinya'}</p>
            </div>
          <div className='row' style={{width: '90%'}}>
            {item.skill.length === 0 ? (<div className='col-auto mb-3'>User tidak memiliki skill</div>) : item.skill.map((e, i) => (<div key={i} className='col-auto mb-3' style={{ background: 'rgba(251, 176, 23, 0.6)', border: '1px solid #FBB017', borderRadius: '4px', padding: '4px 23px', color: '#FFFFFF', marginRight: '10px' }}>{e.name}</div>))}
            </div>
          </div>
          <div className='d-flex' style={{ width: '10%' }}>
            <div style={{ width: '100%' }}>
            <Link href={`/profile/${item.id}`}>
              <button type='button' style={{ backgroundColor: '#5E50A1', color: '#FFFFFF', padding: '14px 24px', border: 'none', borderRadius: '5px', marginLeft: 'auto', marginRight: '0px' }}>Lihat Profile</button>
            </Link>
            </div>
          </div>
        </div>
      </div>))}
      {/* end search */}
      <Pagination aria-label="Page navigation example">
      {[...Array(totalPage)].map((e, i) =>
        <PaginationItem active={i+1 === parseInt(page)} key={i}>
          <PaginationLink onClick={(event) => { goToPage(event, i+1) }}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      )}
      </Pagination>
      <div style={{marginBottom: '50px'}} />
  </>
  )
}
Home.layout = 'L1'
export default Home