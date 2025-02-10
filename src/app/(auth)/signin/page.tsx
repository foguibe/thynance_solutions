import Link from "next/link";

export default function SignIn() {
    return (
        <>
            <h1 className="heading2">This is the <span className="text-blue-800">Signin Page!</span></h1>
            <div className="mt-3 flex space-x-3">
                <Link href="/" className="btn">Home Page</Link>
                <Link href="/dashboard/home" className="btn">Sign In</Link>
            </div>
        </>
    )
}