import Image from "next/image";
export default function Logo() {
    return (
        <div className="flex items-center justify-center w-[95%] mx-auto h-[15vh] bg-tertiary rounded-xl">
            <Image src="/logo.png" alt="Logo" width={250} height={250} />
        </div>
    );
}