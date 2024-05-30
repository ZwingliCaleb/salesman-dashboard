import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
