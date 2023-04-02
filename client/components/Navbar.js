import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between py-4">
      <Link href="/">
        <Image src="/logo.png" alt="logo" height={80} width={80} />
      </Link>
      <div className="flex items-center bg-white gap-3 pl-3 rounded-md">
        <label>
          <BsSearch />
        </label>
        <input
          type="text"
          id="search"
          className=" outline-none"
          placeholder="Search..."
        />
      </div>
      <div className="flex justify-between items-center gap-6 font-semibold">
        <div className="avatar placeholder dropdown">
          <label
            tabIndex={0}
            className="bg-neutral-focus text-neutral-content rounded-full cursor-pointer"
          >
            <Image
              className="rounded-full"
              src="/1.jpg"
              alt="avatar"
              width={32}
              height={32}
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Post a Blog</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        <Link href="/about" className="">
          About
        </Link>
        <Link href="/contact" className="">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
