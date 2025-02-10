import Link from "next/link";

export default function SignUp() {
    return (
        <>
            <h1 className="heading2">This is the <span className="text-blue-800">Signup Page!</span></h1>
            <div className="mt-3">
                <Link href="/" className="btn">Home Page</Link>
            </div>
        </>
    )
}