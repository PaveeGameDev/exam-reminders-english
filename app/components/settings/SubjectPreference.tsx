"use client";
import {
  changeClassSubjectUserPreference,
  createClass,
} from "@/app/actions/actions";
import { ClassSubjects, Subject, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FormResponse } from "@/app/types/types";
import { useRouter } from "next/navigation";
import FormInputSubjectPart from "@/app/components/createClass/FormInputSubjectPart";
type Props = {
  user: User;
  activeSubjects: ClassSubjects[];
  disabledSubjects: ClassSubjects[];
};

export default function SubjectPreference({
  user,
  activeSubjects,
  disabledSubjects,
}: Props) {
  const router = useRouter();
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  const [activeSubjectsAfter, setActiveSubjectsAfter] =
    useState<ClassSubjects[]>(activeSubjects);

  const [disabledSubjectsAfter, setDisabledSubjectsAfter] =
    useState<ClassSubjects[]>(disabledSubjects);

  useEffect(() => {
    if (afterSubmit?.success) router.push("/settings");
  }, [afterSubmit]);

  const onDelete = (id: number): void => {
    setDisabledSubjectsAfter([
      ...disabledSubjectsAfter,
      activeSubjectsAfter.find((subject) => subject.id === id)!,
    ]);
    setActiveSubjectsAfter(
      activeSubjectsAfter?.filter((subject) => subject.id !== id),
    );
  };
  const onAdd = (id: number): void => {
    setActiveSubjectsAfter([
      ...activeSubjectsAfter,
      disabledSubjectsAfter.find((subject) => subject.id === id)!,
    ]);
    setDisabledSubjectsAfter(
      disabledSubjectsAfter?.filter((subject) => subject.id !== id),
    );
  };

  return (
    <form
      action={async (formData) => {
        setAfterSubmit(
          await changeClassSubjectUserPreference(
            user,
            activeSubjectsAfter.map((subject) => subject.id),
            disabledSubjectsAfter.map((subject) => subject.id),
          ),
        );
      }}
      className="flex flex-col space-y-4 bg-base-200 shadow-xl border border-gray-300 p-6 rounded-lg max-w-md w-full"
    >
      <h2 className="card-title justify-center w-full">Your subjects</h2>
      <p>Active subjects</p>
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1">
        {activeSubjectsAfter?.map((subject, index) => (
          <FormInputSubjectPart
            key={index}
            id={subject.id}
            content={subject.name}
            onDelete={(id: number) => onDelete(id)}
            isCreational={false}
          />
        ))}
      </div>
      <p>Disabled subjects</p>
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1">
        {disabledSubjectsAfter?.map((subject, index) => (
          <FormInputSubjectPart
            key={index}
            id={subject.id}
            content={subject.name}
            onDelete={(id: number) => onAdd(id)}
            isCreational={false}
            showCheck={true}
          />
        ))}
      </div>
      <button type="submit" className="btn btn-primary mt-5 w-full">
        Save
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
