import Image from 'next/image';
export default function TopBar() {
    return (
        <div className="bg-secondary mt-4 p-4 rounded-xl flex h-[15vh]">
            <div className='bg-primary w-max p-6 rounded-xl'>
                <Image src="/icons/heart.svg" alt="TopBar" width={30} height={30} />
            </div>
            <div className='ml-6 mt-4'>
                <h1 className='text-dark text-4xl font-extrabold'>We STILL DON&apos;T TRUST YOU</h1>
                <p className='text-dark text-md font-medium'>8 songs</p>
            </div>
        </div>
    );
}