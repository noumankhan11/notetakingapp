"use client";

import * as React from "react";
import Link from "next/link";
import {
  Home,
  LogIn,
  Menu,
  Notebook,
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

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="border-b bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:hidden">
                <nav className="flex flex-col gap-4">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* <div className="flex flex-shrink-0 items-center">
              <X className="block sm:hidden h-8 w-auto text-gray-700" />
            </div> */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2">
                  <Notebook className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    NoteNest
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!session?.user ? (
              <div className="hidden sm:block">
                <Link href="/login" className="mr-2">
                  <Button variant="ghost">
                    <LogIn className="mr-2 h-4 w-4" /> Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5 ">
                <div>logedIn with: {session?.user?.email}</div>
                <div>
                  <Button onClick={() => signOut()}>logout</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
