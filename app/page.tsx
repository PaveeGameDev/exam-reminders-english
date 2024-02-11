import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import DayView from "@/app/components/DayView";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  if (!user.classId) return "User needs to be in a class";

  const exams = await prisma.exam.findMany({
    where: { classId: user.classId! },
  });

  const days = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const filteredExams = exams.filter(
      (exam) => exam.date.getDate() === date.getDate(),
    );
    if (filteredExams[0])
      days.push(
        <DayView day={date} exams={filteredExams} key={i} user={user} />,
      );
  }

  return <main className="relative h-screen">{days}</main>;
}
