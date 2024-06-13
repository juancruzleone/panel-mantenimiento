type MainH1Props = {
    title: string;
    className?: string; // Prop opcional para clases adicionales
};

const MainH1 = ({ title, className }: MainH1Props) => {
    return (
        <>
            <h1 className={`font-montserrat font-bold text-5xl text-white ${className}`}>
                {title}
            </h1>
        </>
    );
}

export default MainH1;
