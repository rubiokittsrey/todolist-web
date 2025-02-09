import Image from "next/image";
import Timer from "@/components/timer";

export default function Home() {
  return (
    <div className="bg-neutral-700 py-24 min-h-screen flex">
      <Timer/>
    </div>
  );
}
