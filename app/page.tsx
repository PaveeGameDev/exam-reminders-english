import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { getUpcomingExams } from "@/functions/getUpcomingExams";
import GoToWriteButton from "@/app/components/GoToWriteButton";
import NoLogin from "@/app/components/Errors/NoLogin";
import NoClass from "@/app/components/Errors/NoClass";
import NoUser from "@/app/components/Errors/NoUser";
import ExamList from "@/app/components/homepage/ExamList";
import ErrorTemplate from "@/app/components/Errors/ErrorTemplate";
import { MinMaxDate } from "@/app/types/types";
import HistoryButtons from "@/app/components/homepage/HistoryButtons";

type Props = {
  searchParams: { [param: string]: string };
};

export default async function Home({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return <NoLogin />;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <NoUser />;
  if (!user.classId) return <NoClass />;

  if (
    (searchParams.from && !searchParams.to) ||
    (!searchParams.from && searchParams.to)
  )
    return (
      <ErrorTemplate
        header="Do you have a correct URL?"
        buttonLink="/"
        buttonText="Back to the home page"
      >
        {`Make sure you have a correct URL. Maybe the parameter "to" is filled in and
        the parameter "from" is not. Maybe the other way around?`}
      </ErrorTemplate>
    );

  if (searchParams.wholeHistory && searchParams.wholeHistory !== "1")
    return (
      <ErrorTemplate
        header="Do you have the correct URL?"
        buttonLink="/?wholeHistory=1"
        buttonText="See whole history"
      >
        Make sure you have the correct URL. Something weird happened, click the button and I will fit it for you.
      </ErrorTemplate>
    );

  if (searchParams.wholeHistory && searchParams.from)
    return (
      <ErrorTemplate
        header="Do you have a correct URL?"
        buttonLink="/"
        buttonText="Back to the home page"
      >
        Make sure you have a correct URL. You are trying to access individual dates and whole history at the same time. We do not allow it. :)
      </ErrorTemplate>
    );

  let datesToShow: undefined | MinMaxDate = undefined;

  if (searchParams.wholeHistory && searchParams.wholeHistory === "1") {
    const everyUsersExam = await getUpcomingExams(user, {
      minDate: new Date("2024-01-01"),
      maxDate: new Date(`${new Date().getFullYear() + 1}-01-01`),
    });
    if (everyUsersExam?.length !== undefined && everyUsersExam.length > 0) {
      datesToShow = {
        minDate: everyUsersExam[0].date,
        maxDate: everyUsersExam[everyUsersExam.length - 1].date,
      };
    }
  } else if (searchParams.from) {
    datesToShow = {
      minDate: new Date(searchParams.from),
      maxDate: new Date(searchParams.to),
    };
  }

  const exams = await getUpcomingExams(user, datesToShow);

  if (!exams) return;

  return (
    <main className="relative h-screen m-3 flex flex-col items-center">
      <div className="w-full max-w-[50rem]">
        <HistoryButtons
          relevantQueryParams={{
            from: searchParams.from,
            to: searchParams.to,
            wholeHistory: searchParams.wholeHistory,
          }}
        />
        <ExamList user={user} exams={exams} datesToShow={datesToShow} />
        <GoToWriteButton />
      </div>
    </main>
  );
}