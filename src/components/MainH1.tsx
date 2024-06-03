type MainH1Props = {
    title: string;
};

const MainH1 = ({ title }: MainH1Props) => {
    return (
        <>
            <h1 className="font-montserrat font-bold text-7xl text-center pt-24">{title}</h1>
        </>
    );
}

export default MainH1;

