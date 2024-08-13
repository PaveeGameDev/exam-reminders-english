import Link from "next/link";

export default function NoClass() {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-center text-4xl font-semibold">
          You are not in any class, let&apos;s fix it.
        </h1>
        <p className="text-center text-2xl">
          By joining a class, you can fully enjoy Exam Reminders. Do not hesitate and join one.
          <br />
          <br />
          Are you the first one from your class? Create a class and invite your schoolmates.
        </p>
        <Link
          href="/settings"
          className="btn btn-primary w-3/4 h-16 text-xl text-center max-w-72"
        >
          Join / Create a class
        </Link>
      </div>
    </div>
  );
}
