/* eslint-disable no-nested-ternary */
import React from 'react'
// import axios from 'axios'

import Head from 'next/head'

// export async function getServerSideProps(context) {
//   const { token } = context.req.cookies
//   const getUserProfile = async () => {
//     try {
//       const response = await axios({
//         method: 'GET',
//         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/myprofile`,
//         headers: {
//           token
//         }
//       })
//       return {
//         data: response.data.data,
//         error: false
//       }
//     } catch (err) {
//       return {
//         data: [],
//         error: true
//       }
//     }
//   }
//   return {
//     props: {
//       data: [],
//       profileDetail: await getUserProfile(),
//       token
//     }
//   }
// }

function Chat() {
  return (<>
    <Head>
        <title>Hirejob - My Profile</title>
    </Head>
    <div style={{ width: '100%', height: '850px', backgroundColor: '#F6F7F8' }} />
    <div className='d-flex w-100 position-absolute' style={{top: '170px'}}>
      <div style={{ width: '30%', display: 'flex' }}>
        <div className='d-flex flex-column' style={{ width: '70%', height: '600px', backgroundColor: '#FFFFFF', marginLeft: 'auto', marginRight: '0px', padding: '20px 0px 20px 0px', borderRadius: '10px' }}>
          <h6 style={{ paddingLeft: '20px', marginBottom: '21px' }}>Chat</h6>
          <hr />
        </div>
      </div>
      <div style={{ width: '70%', paddingLeft: '30px' }}>
        <div className='d-flex flex-column' style={{ width: '90%', height: '600px', backgroundColor: '#FFFFFF', padding: '20px 0px 20px 0px', borderRadius: '10px' }}>
          <div className='d-flex align-items-center w-100' style={{paddingLeft: '30px'}}>
            <div style={{ height: '40px', width: '40px', backgroundImage: 'url(\'/navbarphoto.jpg\')', borderRadius: '999px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <h6 style={{margin: 'auto 0px auto 10px'}}>Jonas Adam</h6>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </>
  )
}
Chat.layout = 'L1'
export default Chat