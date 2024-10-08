import { Exam } from "@prisma/client";
import { getFancyDayName } from "@/functions/getFancyDayName";
import { getExamTypeById } from "@/functions/getExamTypeById";
import { getSubjectById } from "@/functions/getSubjectById";
import { getSubjectNameById } from "@/functions/getSubjectNameById";

type Props = {
  exam: Exam;
};
export default async function ExamOverviewHeader({ exam }: Props) {
  const subject = await getSubjectNameById(exam.subjectId);
  const type = await getExamTypeById(exam.examTypeId);

  return (
    <div className="flex flex-col items-center space-y-3 mb-3">
      <p className="text-4xl underline underline-offset-4">
        {getFancyDayName(exam.date, 'en-US' )} - {exam.date.getMonth() + 1}.
        {exam.date.getDate()}.
      </p>
      <p className="text-4xl font-bold">{subject}</p>
      <p className="text-3xl">
        {type?.englishName ? type.englishName : type?.name}
        {exam.followerId ? " (Private)" : ""}
      </p>
    </div>
  );
}
