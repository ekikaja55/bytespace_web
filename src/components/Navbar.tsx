/* eslint-disable */
'use client';
import Link from 'next/link';
import styles from './styles/Navbar.module.css';
import Dropdown from './Dropdown';

export default function Navbar() {
  return (
    <nav className="bg-transparent text-amber-50 p-4 flex justify-evenly items-center-safe gap-5 h-30 min-w-dvh ">
      <Link href="/" className="text-4xl">
        ByteSpace
      </Link>
      <div className="flex gap-4 ">
        <Dropdown />
        <Link href="/">news</Link>
        <Link href="/">forums</Link>
        <Link href="/">about us</Link>
      </div>
      <div className="">
        <Link href="/">sign in</Link>
      </div>
    </nav>
  );
}
