"use client";
import { writeExam } from "@/app/actions/actions";
import { ExamType, Subject, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FormResponse } from "@/app/types/types";
import Select from "@/app/components/Select";
import { useRouter } from "next/navigation";
type Props = {
  subjects: Subject[];
  user: User;
  examTypes: ExamType[];
  date: string | null;
};

export default function WriteExamForm({
  subjects,
  user,
  examTypes,
  date,
}: Props) {
  const router = useRouter();
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  useEffect(() => {
    if (afterSubmit?.success) router.push("/");
  }, [afterSubmit]);

  return (
    <form
      action={async (formData) => {
        setAfterSubmit(await writeExam(formData, user));
      }}
      className="flex flex-col space-y-4 bg-base-200 shadow-xl border border-gray-300 p-6 rounded-lg max-w-md w-full"
    >
      <Select options={subjects} id="subjectId" header="Subject" />
      <Select options={examTypes.map((type) => {
        return {id: type.id, name: type.englishName ? type.englishName : type.name};
      })} id="typeId" header="Type of the exam" />
      <div className="flex flex-row space-x-3 justify-between">
        <div className="w-1/2">
          <label htmlFor="date" className="font-semibold">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={
              date ? new Date(date).toISOString().substr(0, 10) : undefined
            }
            min={new Date().toISOString().substr(0, 10)}
            className="input input-bordered w-full text-black"
          />
        </div>
        <div className="flex flex-col items-end">
          <label htmlFor="isPublic" className="font-semibold text-right">
            Visible to everyone
          </label>
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            defaultChecked
            className="checkbox checkbox-primary block w-10 h-10"
          />
        </div>
      </div>
      <label htmlFor="content" className="font-semibold">
        Info about the exam
      </label>
      <textarea
        rows={4}
        id="content"
        name="content"
        placeholder="What is going to be in the exam?"
        maxLength={1000}
        required
        className="textarea input-bordered w-full text-lg"
      />

      <button type="submit" className="btn btn-primary mt-2">
        Write it down
      </button>
      {afterSubmit && afterSubmit.success && (
        <p className="text-success text-center">{afterSubmit.success}</p>
      )}
      {afterSubmit && afterSubmit.error && (
        <p className="text-error text-center">{afterSubmit.error}</p>
      )}
    </form>
  );
}
