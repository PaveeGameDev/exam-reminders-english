import Share from "@/app/components/Share";
import { Class } from "@prisma/client";

type Props = {
  myClass: Class | null;
};
export default function MyClassId({ myClass }: Props) {
  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">Your class</h2>
        <p>{myClass?.name}</p>
        <p>Your class code</p>
        <p>{myClass?.id}</p>
        <div className="card-actions justify-center mt-4">
          <Share btnText="Share this website with your schoolmates" />
        </div>
      </div>
    </div>
  );
}
