"use client";
import { joinClassForm } from "@/app/actions/actions";
import { useEffect, useRef, useState } from "react";
import { FormResponse } from "@/app/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function JoinClass() {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  useEffect(() => {
    if (afterSubmit?.success) router.push("/");
  }, [afterSubmit]);

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center p-6">
      <div className="card-body">
        <form
          ref={ref}
          action={async (formData) => {
            ref.current?.reset();
            setAfterSubmit(await joinClassForm(formData));
          }}
          className="flex flex-col items-center"
        >
          <label htmlFor="classId" className="mb-2 text-xl font-semibold">
            Join / Create a class
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs text-center text-lg"
            type="number"
            id="classId"
            name="classId"
            placeholder="E.g. 123456"
            required
          />
          <button className="btn btn-primary mt-5 w-full max-w-xs">
            Join
          </button>
          <Link
            href="/createclass"
            className="btn btn-primary mt-5 w-full max-w-xs"
          >
            Create
          </Link>
          {afterSubmit && afterSubmit.success && (
            <p className="text-success text-center">{afterSubmit.success}</p>
          )}
          {afterSubmit && afterSubmit.error && (
            <p className="text-error text-center">{afterSubmit.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
