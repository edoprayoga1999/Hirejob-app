import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout1 from '../layouts/layout1';
import Layout2 from '../layouts/layout2';
import Layout3 from '../layouts/layout3';

const layouts = {
  L1: Layout1,
  L2: Layout2,
  L3: Layout3
}
function NoLayout({ children }) {
  return <>{ children }</>
}

function MyApp({ Component, pageProps }) {
  const Frame = layouts[Component.layout] || NoLayout
  return <Frame><Component {...pageProps} /></Frame>
}

export default MyApp
