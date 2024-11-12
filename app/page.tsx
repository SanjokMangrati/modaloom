import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Forbidden | Modaloom",
  description: "Custom Avatar Builder",
};
export default function App() {
  return (
    <div className="text-md font-medium p-4">
      <p>Uh-oh! Looks like the dev got a little too adventurous. If you&apos;re seeing this, something went awry! 🛠️</p>
      <p>
        Please report the issue to <a href="mailto:smangrati25@gmail.com" className="text-blue-600 underline">smangrati25@gmail.com</a> and we’ll get it sorted out.
      </p>
      <p>
        To resume your adventure, <Link href="/home" className="text-blue-600 underline">click here</Link> and continue exploring.
      </p>
    </div>
  );
}
