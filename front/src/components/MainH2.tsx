type MainH2Props = {
    title: string;
};

const MainH2 = ({ title }: MainH2Props) => {
    return (
        <>
            <h1 className="font-montserrat font-bold text-3xl text-center pt-24 pl-24">{title}</h1>
        </>
    );
}

export default MainH2;

