import { User } from "@prisma/client";
import SignoutHandler from "@/app/components/SignoutHandler";

type Props = {
  user: User;
};
export default function UserInfo({ user }: Props) {
  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">Your info</h2>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <div className="card-actions justify-center mt-4">
          <SignoutHandler />
        </div>
      </div>
    </div>
  );
}
