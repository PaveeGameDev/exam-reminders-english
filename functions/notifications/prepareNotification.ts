import { Exam, User } from "@prisma/client";
import { PrepareNotificationResponse } from "@/app/types/types";
import { getUpcomingExams } from "@/functions/getUpcomingExams";
import { getSubjectNameById } from "@/functions/getSubjectNameById";

export async function prepareNotification(
  user: User,
): Promise<PrepareNotificationResponse> {
  const title: string = "Your exams/homework for tomorrow";
  const tommorowDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
  );

  //This is required only for localhost, as it handles the dates weirdly, if working on localhost, set the number in   new Date().getDate() + 1, to 2 !important

  const theDayAfterTommorowDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
  );

  if (!user.classId) {
    return {
      title: title,
      text: "Join a class in order to get notifications.",
    };
  }

  const tommorowExams = await getUpcomingExams(user, {
    minDate: tommorowDate,
    maxDate: theDayAfterTommorowDate,
  });

  const tomorowOther: string[] = [];
  const tomorowHomework: string[] = [];

  if (tommorowExams && tommorowExams.length > 0) {
    for (const exam of tommorowExams) {
      const subjectName = await getSubjectNameById(exam.subjectId);
      if (exam.examTypeId === 2) {
        tomorowHomework.push(subjectName);
      } else {
        tomorowOther.push(subjectName);
      }
    }

    const textOther = `Exam${
      tomorowOther.length === 1 ? "" : "s"
    } from: ${tomorowOther.join(", ")}`;
    const textHomework = `Homework${
      tomorowHomework.length === 1 ? "" : ""
    } from: ${tomorowHomework.join(", ")}`;

    return {
      title: title,
      text: `${textOther.length > 0 ? textOther + "\n" : ""}${
        textHomework.length > 0 ? textHomework : ""
      }`,
    };
  }

  return { title: title, text: "You have a free day, enjoy!" };
}
