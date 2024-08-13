import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5 mt-10 m-5">
      <h1 className="text-center text-6xl font-semibold">Exam Reminders</h1>
      <p className="text-center text-2xl">
        Exam Reminders is a web based application that will make your life easier. Whole class can use this place to share theirs notes about the upcoming exams and homework. <br />
        <br />You will never forget about an upcoming exam as everything will be accessible on Exam Reminders in an easy way.<br />
        <br />
        Exam Reminders is the easiest way to share your calendar with your whole class.
        <br />
        <br />
        Go for it.
      </p>
      <Link
        href="/api/auth/signin"
        className="btn btn-primary w-1/2 h-16 text-xl text-center max-w-72"
      >
        Log in / sign up
      </Link>
    </div>
  );
}
