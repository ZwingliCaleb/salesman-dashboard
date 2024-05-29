// pages/index.tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
//import logo from '../public/logo.svg';

const IndexPage = () => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto">
      <header className="flex justify-center items-center py-10">
        {/*<Image src={logo} alt="Logo" priority />*/}
      </header>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md" onClick={handleGoToDashboard}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
