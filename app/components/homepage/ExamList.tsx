import prisma from "@/prisma/client";
import DayViewWrap from "@/app/components/DayViewWrap";
import HorizontalLine1 from "@/app/components/decorations/HorizontalLine1";
import { Exam, User } from "@prisma/client";
import { MinMaxDate } from "@/app/types/types";
import AdvertisementManager from "@/app/components/homepage/AdvertisementManager";
import Advertisement from "@/app/components/homepage/Advertisement";
import randomIntFromInterval from "@/functions/randomIntFromInterval";

type Props = {
  user: User;
  exams: Exam[];
  datesToShow?: MinMaxDate;
};

export default async function ExamList({ exams, user, datesToShow }: Props) {
  const dayViewWrappers = [];

  const date = datesToShow?.minDate ? datesToShow.minDate : new Date();

  const datesToDisplay = datesToShow?.maxDate
    ? Math.round(
        (datesToShow.maxDate.getTime() - datesToShow.minDate.getTime()) /
          (1000 * 3600 * 24),
      ) + 1
    : 30;

  let plantedAdvert: boolean = false;

  if (
    exams.length === 0 &&
    !plantedAdvert &&
    randomIntFromInterval(1, 2) === 1
  ) {
    dayViewWrappers.push(
      <Advertisement
        header="No exams this week? Is it real?"
        actionButtonText="Add an exam"
        actionButtonRedirect="/write"
        showDownBar={true}
        key="addTestAdvert"
      >
        <ul className="list-disc ml-10">
          <li>Maybe your are lucky and there are really no exams ahead</li>
          <li>
            Maybe <p className="font-semibold inline">there is a test not written here</p>,
            add it.
          </li>
          <li>
            <p className="font-semibold inline">Invite your schoolmates</p> and write down upcoming exams together.
          </li>
        </ul>
      </Advertisement>,
    );
    plantedAdvert = true;
  }

  if (randomIntFromInterval(1, 2) === 1) {
    const users = await prisma.class
      .findUnique({ where: { id: user.classId! } })
      .users();
    if (users && users.length <= 10 && !plantedAdvert) {
      dayViewWrappers.push(
        <Advertisement
          header="It is fairly quiet here"
          actionButtonText="Share Exam Reminders"
          showDownBar={true}
          key="invitePeopleAdvert"
          extras="share"
        >
          <ul className="list-disc ml-10">
            <li>Exam Reminders work best with more people contributing.</li>
            <li>
              Your whole class can{" "}
              <p className="font-semibold inline">easily join</p>, just share them the link.
            </li>
            <li>
              <p className="font-semibold inline">Invite your schoolmates</p> and write down upcoming exams together.
            </li>
          </ul>
        </Advertisement>,
      );
      plantedAdvert = true;
    }
  }

  for (let i = 0; i < datesToDisplay; i++) {
    const examsOnTheDay = exams.filter(
      (exam) =>
        exam.date.getDate() === date.getDate() &&
        exam.date.getMonth() === date.getMonth(),
    );

    if (examsOnTheDay.length > 0) {
      if (date.getDay() == 5) {
        dayViewWrappers.push(
          <div key={i}>
            <DayViewWrap
              day={new Date(date)}
              exams={examsOnTheDay}
              user={user}
              key={i}
            />
            <HorizontalLine1 />
          </div>,
        );
      } else {
        dayViewWrappers.push(
          <DayViewWrap
            day={new Date(date)}
            exams={examsOnTheDay}
            user={user}
            key={i}
          />,
        );
      }
    } else {
      if (date.getDay() == 5) {
        dayViewWrappers.push(
          <div key={i}>
            <DayViewWrap
              day={new Date(date)}
              exams={examsOnTheDay}
              user={user}
              key={i}
            />
            <HorizontalLine1 />
          </div>,
        );
      } else if (date.getDay() == 6) {
      } else if (date.getDay() == 0) {
        if (!plantedAdvert && dayViewWrappers.length >= 4) {
          dayViewWrappers.push(<AdvertisementManager user={user} key={i} />);
          plantedAdvert = true;
        }
      } else {
        dayViewWrappers.push(
          <DayViewWrap
            day={new Date(date)}
            exams={examsOnTheDay}
            user={user}
            key={i}
          />,
        );
      }
    }

    date.setDate(date.getDate() + 1);
  }
  return <div>{dayViewWrappers}</div>;
}
