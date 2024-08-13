"use client";
import { User } from "@prisma/client";
import { isPWA } from "@/functions/isPWA";
import Advertisement from "@/app/components/homepage/Advertisement";
import { ReactNode, useEffect, useState } from "react";
import { getOS } from "@/functions/getOS";

type Props = {
  user: User;
};
export default function AdvertisementManager({ user }: Props) {
  const hasNotifications = Boolean(user.notificationToken);

  const [isPwa, setIsPwa] = useState(false);
  const [os, setOS] = useState<string | null>(null);

  useEffect(() => {
    setIsPwa(isPWA());
    setOS(getOS());
  }, []);

  const advertisements: ReactNode[] = [];
  if (!user.classId || !user.email) return;
  if (
    //   ToDo - find a better way to differentiate between users from Opatov and from other schools
    [1, 100, 123].includes(user.classId) ||
    /^[\w.-]+@[\w.-]+\.gopat\.cz$/.test(user.email)
  ) {
    advertisements.push(
      <Advertisement
        header="Take a look at Burza Opatov"
        actionButtonText="Show it to me"
        actionButtonRedirect="https://burza.gymnazium-opatov.cz"
        showDownBar={true}
        key={1}
      >
        <ul className="list-disc">
          <li>
            Buy your books <p className="font-semibold inline">cheaply</p>
          </li>
          <li>
            Sell your books{" "}
            <p className="font-semibold inline">easily</p>
          </li>
          <li>Have it ready before the holidays</li>
        </ul>
      </Advertisement>,
    );
  }

  if (os !== "MacOS")
    advertisements.push(
      <Advertisement
        header="Download Neoneer"
        actionButtonText="Show it to me"
        actionButtonRedirect="https://play.google.com/store/apps/details?id=com.Pavee.NeonRush"
        showDownBar={true}
        key={0}
      >
        <ul className="list-disc ml-10">
          <li>
            Neoneer is a{" "}
            <p className="font-semibold inline">fantastic mobile game</p>.
          </li>
          <li>Discover handcrafted levels that change in front of your eyes.</li>
          <li>
            <p className="font-semibold inline">
              Support the author of Exam Reminders.
            </p>
          </li>
        </ul>
      </Advertisement>,
    );

  if (!isPwa) {
    return (
      <Advertisement
        header="Download Exam Reminders to your desktop"
        actionButtonText="Show it to me"
        actionButtonRedirect="/settings"
        showDownBar={true}
      >
        <ul className="list-disc">
          <li>
            <p className="font-semibold inline">Fastest</p> way to access Exam Reminders
          </li>
          <li>You will never forget your homework</li>
          <li>
            I takes <p className="font-semibold inline">no storage space</p> on your device
          </li>
        </ul>
      </Advertisement>
    );
  }
  if (!hasNotifications) {
    return (
      <Advertisement
        header="Activate notifications"
        actionButtonText="Show it to me"
        actionButtonRedirect="/settings"
        showDownBar={true}
      >
        <ul className="list-disc ml-10">
          <li>You will never forget any exam or homework</li>
          <li>Every day at 4:00 PM you will receive a notification</li>
          <li>It takes just two clicks to set it up</li>
        </ul>
      </Advertisement>
    );
  }
  return advertisements[Math.floor(Math.random() * advertisements.length)];
}
