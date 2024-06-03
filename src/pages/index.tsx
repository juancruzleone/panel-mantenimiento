import NavPanel from '../components/NavPanel';
import MainH1 from '../components/MainH1';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="flex">
      <NavPanel />
      <MainH1 title="Edificios" />
    </div>
  );
}

export default Index;
