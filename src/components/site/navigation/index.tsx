"use client";

import type { User } from "@clerk/nextjs/server";
import type React from "react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";

type Props = {
  user?: null | User;
};

const Navigation: React.FC<Props> = ({ user }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP animation for the header
  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="w-full border-b-0 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm bg-amber-100 sticky top-0 z-50"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h3 className="font-bold text-3xl bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                Aevum.
              </h3>
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center gap-4"
        >
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                Hello, {user.firstName || "User"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                asChild
                className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                size="lg"
              >
                <Link href="/agency" className="flex items-center gap-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    Login
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </Link>
              </Button>
              {/* <div className="border border-border rounded-full p-2 shadow-sm">
                <UserButton />
              </div> */}
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default Navigation;
