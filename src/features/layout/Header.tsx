"use client";

import { User } from "lucide-react";

import { useI18n } from "locales/client";
import { LanguageSelector } from "@/widgets/language-selector/language-selector";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { ReleaseNotesDialog } from "@/features/release-notes";
import WorkoutStreakHeader from "@/features/layout/workout-streak-header";

export const Header = () => {
  const t = useI18n();

  return (
    <div className="navbar bg-white px-2 sm:px-4 rounded-tl-lg rounded-tr-lg border-b border-gray-200">
      {/* Empty start section */}
      <div className="navbar-start"></div>

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
