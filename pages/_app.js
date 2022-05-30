/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout1 from '../layouts/layout1';
import Layout2 from '../layouts/layout2';

// serversideprops
const layouts = {
  L1: Layout1,
  L2: Layout2,
}
function NoLayout({ children }) {
  return <>{ children }</>
}

function MyApp({ Component, pageProps }) {
  const Frame = layouts[Component.layout] || NoLayout
  return <Frame><Component {...pageProps} /></Frame>
}

export default MyApp
