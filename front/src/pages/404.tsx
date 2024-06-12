import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Página no encontrada</h1>
        <p className="text-lg text-white mb-8">La página que buscas no existe o ha sido eliminada.</p>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
