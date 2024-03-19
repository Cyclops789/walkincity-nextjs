import Link from 'next/link';

export default function Custom404() {
    return (
        <div className={"w-full h-[100vh] flex justify-center items-center bg-black"}>
            <div className={"text-center text-white"}>
                <div className={"text-red-600 text-4xl"}>404</div>
                <div className={"text-xl"}>Page not found, Go back and take a tour <Link href="/" className={"text-red-600 underline"}>Here</Link></div>
            </div>
        </div>
    )
}