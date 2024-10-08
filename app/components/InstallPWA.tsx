"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { isPWA } from "@/functions/isPWA";
import { getOS } from "@/functions/getOS";

export default function InstallPWA() {
  const [isPwa, setIsPwa] = useState(false);
  const [os, setOS] = useState<string | null>(null);

  useEffect(() => {
    setIsPwa(isPWA());
    setOS(getOS());
  }, []);

  if (isPwa) return null;

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">
          Add Exam-reminders to your desktop.
        </h2>
        <p>
          An easy accessible application will be created from this website.
        </p>

        {os === "MacOS" ? (
          <Image
            src="/images/ShareIOS.jpg"
            alt="Download this page to your desktop"
            width={500}
            height={200}
            className="w-full h-full"
          />
        ) : (
          <Image
            src="/images/ShareAndroid.jpg"
            alt="Download this page to your desktop"
            width={500}
            height={200}
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
