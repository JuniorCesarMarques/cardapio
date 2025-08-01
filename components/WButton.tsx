import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function WButton() {
  return (
    <Link
      href="https://whatsa.me/5515996343275"
      className="flex justify-center items-center rounded-full p-3 bg-[#25D366] fixed bottom-4 right-4 cursor-pointer"
    >
      <FaWhatsapp size={40} className="text-white" />
    </Link>
  );
}
