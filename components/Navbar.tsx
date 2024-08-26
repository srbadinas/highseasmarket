"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ApplicationLogo from "./ApplicationLogo";
import Container from "./Container";
import Button from "./Button";
import InputText from "./InputText";
import { useRouter } from "next/navigation";
import { List } from "@phosphor-icons/react";

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(evt: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(evt.target as Node)) {
        setShowMenu(false);
      };
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const onHandleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    router.push(`/listings?q=${searchText}`)
  }

  return (
    <nav className="sticky top-0 left-0 flex flex-col w-full bg-gray-600 z-[9997]">
      <Container className="min-h-[90.6px] flex">
        <div className="w-full flex justify-between items-center">
          <ApplicationLogo href="/" className="w-[140px] md:w-[230px] !text-lg sm:!text-3xl lg:!w-auto" />
          <div className="w-[calc(100%-140px)] md:w-[calc(100%-230px)] flex justify-end ">
            <div className="flex flex-col py-5">
              {
                session?.user ? <>
                  <Link
                    href="/dashboard"
                    className="btn btn-default justify-center !rounded-full w-[150px]">
                    Dashboard
                  </Link>
                </> : <>
                  <div className="mb-1">
                    <Link
                      href="/login"
                      className="btn btn-default justify-center !rounded-full w-[150px]">
                      Login
                    </Link>
                  </div>
                  <h6 className="w-full text-xs">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-default-1">
                      Apply
                    </Link>
                  </h6>
                </>
              }
            </div>
          </div>
        </div>
      </Container>
      <div className="block h-[70px] bg-gradient-to-b from-default-1 to-default-2 shadow-md">
        <Container className="relative flex items-center h-[70px]">
          <div className="w-[51.1px]">
            <Button
              type="button"
              className="h-[42px] text-xl"
              onClick={(e) => setShowMenu((prev) => !prev)}>
              <List />
            </Button>
          </div>
          <form className="w-[calc(100%-51.1px)] pl-4" method="GET" onSubmit={(e) => onHandleSubmit(e)}>
            <div className="flex w-full">
              <InputText
                name="keyword"
                value={searchText}
                className="w-full rounded-none border-0 px-4 py-3 focus-visible:outline-0"
                placeholder="Search products..."
                onValueChange={setSearchText}
              />
              <Button className="!bg-white px-3 py-0 !border-0 !text-black !rounded-none text-sm focus:ring-0">
                <i className="fas fa-search"></i>
              </Button>
            </div>
          </form>
          <div
            className={
              "absolute w-full h-0 top-[70px] left-[0px] px-3 invisible opacity-0 transition-all delay-0 duration-300 ease-in-out z-[9997]" +
              (showMenu ? " !visible opacity-100 h-[64px]" : "")
            } ref={menuRef}>
            <div className="bg-gradient-to-b from-default-2 to-default-1 rounded-b shadow">
              <ul className="text-white px-4 py-2">
                <li>
                  <Link
                    href="/"
                    className="block px-2 transition ease-in-out hover:bg-blue-700" onClick={() => setShowMenu(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings"
                    className="block px-2 transition ease-in-out hover:bg-blue-700" onClick={() => setShowMenu(false)}>
                    Listings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
