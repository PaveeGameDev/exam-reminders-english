import Link from "next/link";

export default function NoLogin() {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-3">
        <h1 className="text-center text-6xl font-semibold">Exam Reminders</h1>
        <p className="text-center text-2xl">
          Share your notes about the upcoming exams with your whole class.
          <br /> Easily.
        </p>
        <Link
          href="/api/auth/signin"
          className="btn btn-primary w-1/2 h-16 text-xl text-center"
        >
          Log in / sign up
        </Link>
        <Link
          href="/about"
          className="btn btn-accent w-1/2 h-16 text-xl text-center"
        >
          More information
        </Link>
      </div>
    </div>
  );
}
