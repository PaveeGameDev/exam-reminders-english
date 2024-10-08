import { Exam, ExamNote, User } from "@prisma/client";
import { getDisplayName } from "@/functions/getDisplayName";
import DisplayExamNoteButton from "@/app/components/DisplayExamNoteButton";
import { getSubjectById } from "@/functions/getSubjectById";
import { getExamTypeById } from "@/functions/getExamTypeById";
import { getUser } from "@/functions/getUser";
import IrrelevantButton from "@/app/components/IrrelevantButton";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import { getDayName } from "@/functions/getDayName";
import { shortenName } from "@/functions/shortenName";
import Share from "@/app/components/Share";
import ExamOverviewChangeDate from "@/app/components/examOverview/ExamOverviewChangeDate";

type Props = {
  exam: Exam;
  user: User;
  bestExamNote: ExamNote;
};
export default async function ExamOverviewFooter({
  exam,
  user,
  bestExamNote,
}: Props) {
  const subject = await getSubjectById(exam.subjectId);
  const examType = await getExamTypeById(exam.examTypeId);
  const examNoteAuthor = await getUser(bestExamNote.userId);

  return (
    <div className="w-full bg-gray-300 px-5 py-7">
      <div className="grid-cols-2 grid gap-5">
        <IrrelevantButton exam={exam} user={user} isIndividual={true} />
        <IrrelevantButton exam={exam} user={user} isIndividual={false} />
        <ExamOverviewChangeDate exam={exam} />
        <Share
          btnText="Share this exam"
          text={`${subject?.name} ${examType?.englishName ? examType.englishName : examType?.name} ${new Date(
            exam.date,
          ).getMonth() + 1}.${
            new Date(exam.date).getDate()
          } ${capitalizeFirstLetter(getDayName(exam.date, "en-US"))}\n${
            bestExamNote.content
          }\nBy: ${shortenName(
            examNoteAuthor?.name!,
          )}\nFor more info, visit: \n`}
        />
      </div>
    </div>
  );
}
