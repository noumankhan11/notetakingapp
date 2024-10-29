"use client";

import * as React from "react";
import Link from "next/link";
import {
  Home,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Notebook,
  User,
  User2Icon,
  UserPlus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <nav className="border-b bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className=" flex h-16 items-center justify-between">
          <div className="flex space-x-4 sm:ml-6 w-fit">
            <Link href="/" className="flex items-center space-x-2">
              <Notebook className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                NoteNest
              </h1>
            </Link>
          </div>

          <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {status === "unauthenticated" ? (
              <div className="">
                <Link href="/login" className="mr-2">
                  <Button variant="ghost">
                    <LogIn className="mr-2 h-4 w-4" /> Log In
                  </Button>
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex">
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full ring-1 ring-black">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex-col items-start p-2 pt-0">
                    <div className=" font-semibold">User details</div>
                    <div className="text-sm py-2 items-center flex text-muted-foreground truncate w-full">
                      <User2Icon className="mr-2 h-4 w-4" />{" "}
                      {session?.user?.username}
                    </div>
                    <div className="text-sm py-2 items-center flex text-muted-foreground truncate w-full">
                      <Mail className="mr-2 h-4 w-4" />{" "}
                      {session?.user?.email}
                    </div>
                  </div>

                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
