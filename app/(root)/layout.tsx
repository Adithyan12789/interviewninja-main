import { isAuthenticated, getCurrentUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { 
  LayoutDashboard, 
  History, 
  BarChart3, 
  User 
} from "lucide-react";

const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();

  if(!isUserAuthenticated) redirect("/sign-in");

  const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/history", label: "History", icon: History },
    { href: "/statistics", label: "Statistics", icon: BarChart3 },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={38} height={32} />
            <h2 className="text-white hidden sm:block">Interview Ninja</h2>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <Link href="/profile" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden ring-2 ring-white/10">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-white text-sm">{user.name}</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50">
        <div className="flex items-center justify-around px-4 py-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pb-20 md:pb-0">
        {children}
      </div>
    </div>
  );
};

export default Rootlayout;
