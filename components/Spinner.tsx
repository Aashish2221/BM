import FadeLoader from "react-spinners/FadeLoader";

export default function Spinner() {
    return (
        <div className=" h-[150px] w-full relative flex flex-col justify-center items-center px-5 text-sm overflow-hidden">
            <FadeLoader
                color="#303030"
                cssOverride={{}}
                height={25}
                margin={22}
                radius={100}
                speedMultiplier={1}
                width={25}
            />
        </div>
    )
}