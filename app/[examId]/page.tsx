import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import ExamOverviewHeader from "@/app/components/examOverview/ExamOverviewHeader";
import ExamOverviewDisplayNotes from "@/app/components/examOverview/ExamOverviewDisplayNotes";
import ExamOverviewAddNote from "@/app/components/examOverview/ExamOverviewAddNote";
import ExamOverviewFooter from "@/app/components/examOverview/ExamOverviewFooter";
import NoLogin from "@/app/components/Errors/NoLogin";
import NoUser from "@/app/components/Errors/NoUser";
import ErrorTemplate from "@/app/components/Errors/ErrorTemplate";

export default async function ExamOverview({
  params,
}: {
  params: { examId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return <NoLogin />;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <NoUser />;
  if (!parseInt(params.examId)) {
    return (
      <ErrorTemplate
        header="Do you have a correct URL?"
        buttonLink="/"
        buttonText="Back to the home page"
      >
        Make sure you have a correct URL. Maybe there are capital letters somewhere.
      </ErrorTemplate>
    );
  }
  const exam = await prisma.exam.findUnique({
    where: { id: parseInt(params.examId) },
  });
  if (!exam)
    return (
      <ErrorTemplate
        header="This test does not exist"
        buttonLink="/"
        buttonText="Back to the home page"
      >
        There is no exam with this id.
      </ErrorTemplate>
    );
  if (exam.classId !== user.classId)
    return (
      <ErrorTemplate
        header="This is not your exam"
        buttonLink="/"
        buttonText="Back to the home page"
      >
        This is not an exam in your class. Are you in a correct class?
      </ErrorTemplate>
    );

  const bestExamNote = await getBestExamNote(exam, user);

  if (!bestExamNote) return;

  const examNotes = await prisma.examNote.findMany({
    where: { examId: parseInt(params.examId) },
  });

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[50rem]">
        <div className="m-3">
          <ExamOverviewHeader exam={exam} />
          <ExamOverviewDisplayNotes exam={exam} user={user} />
          <ExamOverviewAddNote user={user} examId={exam.id} />
        </div>
        <ExamOverviewFooter
          exam={exam}
          user={user}
          bestExamNote={bestExamNote}
        />
      </div>
    </div>
  );
}
