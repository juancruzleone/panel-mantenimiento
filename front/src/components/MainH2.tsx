type MainH2Props = {
    title: string;
};

const MainH2 = ({ title }: MainH2Props) => {
    return (
        <>
            <h2 className="font-montserrat font-bold text-3xl pt-24">{title}</h2>
        </>
    );
}

export default MainH2;

