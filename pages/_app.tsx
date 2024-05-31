import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSidebar = router.pathname !== '/';

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className="flex-grow p-6">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
