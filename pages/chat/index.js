/* eslint-disable no-nested-ternary */
import React from 'react'
import axios from 'axios'

import Head from 'next/head'

export async function getServerSideProps(context) {
  const { token } = context.req.cookies
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
  const getChat = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`,
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
      userChat: await getChat(),
      token
    }
  }
}

function Chat(props) {
  const chat = props.userChat.data
  return (<>
    <Head>
        <title>Hirejob - My Profile</title>
    </Head>
    <div style={{ width: '100%', height: '850px', backgroundColor: '#F6F7F8' }} />
    <div className='d-flex w-100 position-absolute' style={{top: '170px'}}>
      <div style={{ width: '30%', display: 'flex' }}>
        <div className='d-flex flex-column' style={{ width: '70%', height: '600px', backgroundColor: '#FFFFFF', marginLeft: 'auto', marginRight: '0px', padding: '20px 0px 20px 0px', borderRadius: '10px' }}>
          <h6 style={{ paddingLeft: '20px' }}>Chat</h6>
          <hr />
          {chat.length === 0 ? "No Chat" : (<div className='d-flex align-items-center w-100' style={{paddingLeft: '30px', marginBottom: '30px'}}>
            <div style={{ height: '40px', width: '40px', backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${chat[0].photo}')`, borderRadius: '999px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <h6 style={{margin: 'auto 0px auto 10px'}}>{chat[0].name}</h6>
          </div>)}
        </div>
      </div>
      <div className='d-flex' style={{ width: '70%', paddingLeft: '30px' }}>
        <div className='d-flex flex-column' style={{ width: '90%', height: '600px', backgroundColor: '#FFFFFF', padding: '20px 0px 20px 0px', borderRadius: '10px' }}>
          {chat.length === 0 ? "" : (<div className='d-flex align-items-center w-100' style={{paddingLeft: '30px'}}>
            <div style={{ height: '40px', width: '40px', backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}/${chat[0].photo}')`, borderRadius: '999px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <h6 style={{margin: 'auto 0px auto 10px'}}>{chat[0].name}</h6>
          </div>)}
          <hr />
          {chat.length === 0 ? "" : (<h5 style={{ padding: '0px 30px 0px 30px' }}>{chat[0].message}</h5>)}
        </div>
      </div>
    </div>
  </>
  )
}
Chat.layout = 'L1'
export default Chat