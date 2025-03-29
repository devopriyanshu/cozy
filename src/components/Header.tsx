import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex h-14 justify-between mx-auto px-4 items-center ">
        <Link to={"/"}>
          <img
            src={theme === "dark" ? "/logo.png" : "/logo2.png"}
            alt="cozy"
            className="h-14"
          />
        </Link>
        <div>
          <div
            onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              theme == "dark" ? "rotate-180" : "rotate-0"
            }`}
          >
            {theme == "dark" ? (
              <Sun className="h-6 w-6 text-yellow-400 " />
            ) : (
              <Moon className="h-6 w-6 text-blue-500" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
