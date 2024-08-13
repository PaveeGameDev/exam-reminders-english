import Link from "next/link";

export default function NoUser() {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-center text-4xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-center text-2xl">
          Try to login again.
          <br />
          <br />
          If the problem persist, please contact the developer.
        </p>
        <Link
          href="/api/auth/signin"
          className="btn btn-primary w-1/2 h-16 text-xl text-center max-w-72"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
