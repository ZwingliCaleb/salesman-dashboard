// pages/index.tsx
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto">
      <header className="flex justify-center items-center py-10">
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
