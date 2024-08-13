"use client";
import { Exam, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  updateExamStateId,
  updateUserExamPreferencesStateId,
} from "@/app/actions/actions";
import DialogBox from "@/app/components/DialogBox";

type Props = { exam: Exam; user: User; isIndividual: boolean };
export default function IrrelevantButton({ exam, user, isIndividual }: Props) {
  const router = useRouter();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isIndividual) {
      //@ts-ignore
      document?.getElementById("irrelevant_modal_alone")?.showModal();
    } else {
      //@ts-ignore
      document?.getElementById("irrelevant_modal_all")?.showModal();
    }
  };

  const onConfirm = () => {
    if (isIndividual) {
      updateUserExamPreferencesStateId(user, exam.id, 2);
    } else {
      updateExamStateId(exam.id, 2);
    }
    router.push("/");
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="btn btn-outline btn-primary w-full bg-white"
      >
        <p className="text-black">
          {isIndividual ? "Delete for me" : "Delete for everyone"}
        </p>
      </button>
      <DialogBox
        header={isIndividual ? "Delete for me" : "Delete for everyone"}
        text={`Do you really want to delete this exam on ${exam.date.getMonth() + 1}.${
          exam.date.getDate() + '.'
        } ${isIndividual ? "for yourself" : "for everyone"}?`}
        confirmAction={onConfirm}
        id={isIndividual ? "irrelevant_modal_alone" : "irrelevant_modal_all"}
        cancelText="NO"
        confirmText={isIndividual ? "Delete for me" : "Delete for everyone"}
      />
    </div>
  );
}
