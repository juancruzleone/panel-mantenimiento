import NavPanel from '../components/NavPanel';
import MainH1 from '../components/MainH1';
import Link from 'next/link';

const Index = () => {
  return (
      <>
      <main className='flex'>
        <NavPanel />
        <div>
          <MainH1 title="Edificios"/>
          <div className='mt-7'>
            <Link href="/" className="bg-boton p-2 text-white font-montserrat text-center rounded-lg ml-[120px]">Crear</Link>
          </div>
          <div className='pl-[120px] mt-10'>
            <input type="text" className='p-3 rounded-full text-black font-montserrat' placeholder='Búsca por titulo'/>     
          </div>  
        </div>
        <div>
          
        </div>
      </main>
      </>
  );
}

export default Index;
