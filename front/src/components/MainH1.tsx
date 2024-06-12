type MainH1Props = {
    title: string;
};

const MainH1 = ({ title }: MainH1Props) => {
    return (
        <>
            <h1 className="font-montserrat font-bold text-5xl pt-24 text-white">{title}</h1>
        </>
    );
}

export default MainH1;

