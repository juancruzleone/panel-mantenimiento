import NavPanel from '../components/NavPanel';
import MainH1 from '../components/MainH1';
import Link from 'next/link';

const Index = () => {
  return (
      <>
      <section className='flex'>
        <NavPanel />
        <div>
          <MainH1 title="Edificios"/>
          <div className='mt-5'>
            <Link href="/" className="bg-orange-600 p-2 text-white font-montserrat text-center rounded-lg ml-24">Crear</Link>
          </div>        
        </div>
      </section>
      
      </>
  );
}

export default Index;
