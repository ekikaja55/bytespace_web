import { useState } from 'react';
import Link from 'next/link';
export default function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button className=" cursor-pointer  hover:text-amber-600" onClick={() => setOpen(!open)}>
        explore ▼
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-zinc-800 shadow-lg rounded">
          <Link href="/" className="block px-4 py-2 hover:bg-gray-800 hover:text-amber-600">
            wiki
          </Link>
          <a href="/about" className="block px-4 py-2 hover:bg-gray-800 hover:text-amber-600 ">
            course
          </a>
        </div>
      )}
    </div>
  );
}
