"use client";

import { User, Crown } from "lucide-react";
import Link from "next/link";

import { useI18n, useCurrentLocale } from "locales/client";
import { LanguageSelector } from "@/widgets/language-selector/language-selector";
import { ReleaseNotesDialog } from "@/features/release-notes";
import WorkoutStreakHeader from "@/features/layout/workout-streak-header";

export const Header = () => {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <div className="navbar bg-white px-2 sm:px-4 rounded-tl-lg rounded-tr-lg border-b border-gray-200">
      {/* Left side - Premium button */}
      <div className="navbar-start">
        <Link href={`/${locale}/premium`}>
          <button className="btn btn-primary rounded-full font-bold text-sm px-4 py-2 min-h-[2.5rem] h-10 bg-gradient-to-r from-[#FFD93D] to-[#FFA500] hover:from-[#FFC107] hover:to-[#FF9800] border-none text-black shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
            <Crown className="w-4 h-4 mr-1" />
            {t("bottom_navigation.premium")}
          </button>
        </Link>
      </div>

      {/* User Menu */}
      <div className="navbar-end">
        <WorkoutStreakHeader />
        <ReleaseNotesDialog />
        <LanguageSelector />

        <div className="dropdown dropdown-end ml-1">
          <div className="tooltip tooltip-bottom" data-tip={t("commons.profile")}>
            <div className="btn btn-ghost btn-circle avatar relative" role="button" tabIndex={0}>
              <div className="w-8 rounded-full bg-primary text-primary-content !flex items-center justify-center text-sm font-medium">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          <ul
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 border border-slate-200"
            tabIndex={0}
          >
            <li>
              <span className="flex items-center gap-2 text-base text-gray-500 cursor-not-allowed">
                <User className="w-4 h-4" />
                {t("commons.profile")} ({t("commons.demo_mode")})
              </span>
            </li>
            <li>
              <span className="flex items-center gap-2 text-base text-gray-500 cursor-not-allowed">
                Demo Mode - No Authentication
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
