"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dumbbell, Crown, User, Grid, Hammer } from "lucide-react";

import { useCurrentLocale, useI18n } from "locales/client";
import { cn } from "@/shared/lib/utils";
import { paths } from "@/shared/constants/paths";

export function ResponsiveNavigation() {
  const pathname = usePathname();
  const t = useI18n();
  const locale = useCurrentLocale();

  const tabs = [
    {
      id: "workout-builder",
      label: t("bottom_navigation.workouts"),
      shortLabel: t("bottom_navigation.workouts"),
      mobileLabel: t("bottom_navigation.workouts"),
      href: paths.root,
      icon: Dumbbell,
      emoji: "WorkoutCoolHappy.png",
      description: t("bottom_navigation.workouts_tooltip"),
      isActive: pathname === paths.root || pathname === `/${locale}`,
    },
    {
      id: "programs",
      label: t("bottom_navigation.programs"),
      shortLabel: t("bottom_navigation.programs"),
      mobileLabel: t("bottom_navigation.programs"),
      href: `${paths.programs}`,
      icon: Grid,
      emoji: "WorkoutCoolSwag.png",
      description: t("bottom_navigation.programs_tooltip"),
      isActive: pathname.includes(paths.programs),
    },
    {
      id: "tools",
      label: t("bottom_navigation.tools"),
      shortLabel: t("bottom_navigation.tools"),
      mobileLabel: t("bottom_navigation.tools"),
      href: `/${locale}/tools`,
      icon: Hammer,
      description: t("bottom_navigation.tools_tooltip"),
      isActive: pathname.includes("/tools"),
    },
    {
      id: "profile",
      label: t("bottom_navigation.profile"),
      shortLabel: t("bottom_navigation.profile"),
      mobileLabel: t("bottom_navigation.profile"),
      href: `/${locale}/profile`,
      icon: User,
      description: t("bottom_navigation.profile_tooltip"),
      isActive: pathname.includes("/profile"),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, shown on lg+ screens */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:left-0 lg:top-0 lg:h-full lg:bg-white/95 lg:backdrop-blur-xl lg:border-r lg:border-[#4F8EF7]/15 lg:z-50">
        {/* Sidebar header */}
        <div className="p-6 border-b border-[#4F8EF7]/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#4F8EF7] to-[#25CB78] rounded-lg">
              <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gray-800">MuscleMap</span>
          </div>
        </div>

        {/* Sidebar navigation */}
        <div className="flex-1 py-6 px-3 space-y-2">
          {tabs.map((tab) => {
            const isActive = tab.isActive;
            const isPremium = tab.id === "premium";
            const IconComponent = tab.icon;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isActive && isPremium
                    ? "bg-gradient-to-r from-[#FFD93D]/12 to-[#FFA500]/12 border border-[#FFD93D]/20 shadow-lg shadow-[#FFD93D]/10"
                    : isActive
                      ? "bg-gradient-to-r from-[#4F8EF7]/12 to-[#25CB78]/12 border border-[#4F8EF7]/20 shadow-lg shadow-[#4F8EF7]/10"
                      : isPremium
                        ? "hover:bg-[#FFD93D]/8 hover:shadow-md"
                        : "hover:bg-gray-50/80 hover:shadow-md",
                )}
              >
                {/* Active left indicator */}
                {isActive && (
                  <div
                    className={cn(
                      "absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full",
                      isPremium ? "bg-gradient-to-b from-[#FFD93D] to-[#FFA500]" : "bg-gradient-to-b from-[#4F8EF7] to-[#25CB78]",
                    )}
                  />
                )}

                {/* Icon container */}
                <div className="relative flex items-center justify-center">
                  {/* Active glow effect */}
                  {isActive && (
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full blur-sm scale-150",
                        isPremium
                          ? "bg-gradient-to-br from-[#FFD93D]/15 to-[#FFA500]/15"
                          : "bg-gradient-to-br from-[#4F8EF7]/15 to-[#25CB78]/15",
                      )}
                    />
                  )}

                  {/* Main icon */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ease-out",
                      isActive && isPremium
                        ? "bg-gradient-to-br from-[#FFD93D] to-[#FFA500] text-white scale-110"
                        : isActive
                          ? "bg-gradient-to-br from-[#4F8EF7] to-[#25CB78] text-white scale-110"
                          : isPremium
                            ? "text-[#FFD93D] dark:text-[#FFD93D] group-hover:text-[#FFA500] dark:group-hover:text-[#FFA500]"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300",
                    )}
                  >
                    <IconComponent size={isActive ? 18 : 16} strokeWidth={isActive ? 2.5 : 2} />

                    {/* Premium sparkle effect */}
                    {isPremium && !isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD93D] rounded-full opacity-80 animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-sm font-semibold transition-all duration-300 ease-out",
                    isActive && isPremium
                      ? "text-transparent bg-gradient-to-r from-[#FFD93D] to-[#FFA500] bg-clip-text"
                      : isActive
                        ? "text-transparent bg-gradient-to-r from-[#4F8EF7] to-[#25CB78] bg-clip-text"
                        : isPremium
                          ? "text-[#FFD93D] dark:text-[#FFD93D] group-hover:text-[#FFA500] dark:group-hover:text-[#FFA500]"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200",
                  )}
                >
                  {tab.label}
                </span>

                {/* Hover tooltip - only show on hover */}
                <div
                  className={cn(
                    "absolute left-full ml-3 px-3 py-2 bg-gray-900/90 text-white text-xs rounded-lg opacity-0 pointer-events-none transition-all duration-200 whitespace-nowrap z-50",
                    "after:content-[''] after:absolute after:left-0 after:top-1/2 after:transform after:-translate-y-1/2 after:-translate-x-1 after:border-4 after:border-transparent after:border-r-gray-900/90",
                    "group-hover:opacity-100 group-hover:translate-x-2",
                  )}
                >
                  {tab.description}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-[#4F8EF7]/10">
          <div className="text-xs text-gray-500 text-center">
            © 2025 MuscleMap
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Hidden on lg+ screens */}
      <nav className="lg:hidden relative bg-white/90 backdrop-blur-xl border-t border-[#4F8EF7]/15">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F8EF7]/3 via-transparent to-[#25CB78]/3 pointer-events-none" />

        <div className="relative px-1 sm:px-3 py-2">
          <div className="flex justify-center items-center gap-1 sm:gap-2 max-w-full mx-auto">
            {tabs.map((tab) => {
              const isActive = tab.isActive;
              const isPremium = tab.id === "premium";
              const IconComponent = tab.icon;

              return (
                <Link
                  className={cn(
                    "group relative flex flex-col items-center gap-0.5 sm:gap-1 flex-1 min-w-0 px-1 sm:px-4 py-1 rounded-2xl transition-all duration-300 ease-out",
                    "hover:scale-105 active:scale-95",
                    isActive && isPremium
                      ? "bg-gradient-to-br from-[#FFD93D]/8 to-[#FFA500]/8 border border-[#FFD93D]/20"
                      : isActive
                        ? "bg-gradient-to-br from-[#4F8EF7]/8 to-[#25CB78]/8 border border-[#4F8EF7]/20"
                        : isPremium
                          ? "hover:bg-[#FFD93D]/5"
                          : "hover:bg-gray-50/80",
                  )}
                  href={tab.href}
                  key={tab.id}
                >
                  {/* Active top indicator */}
                  {isActive && (
                    <div
                      className={cn(
                        "absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 h-0.5 rounded-full",
                        isPremium ? "bg-gradient-to-r from-[#FFD93D] to-[#FFA500]" : "bg-gradient-to-r from-[#4F8EF7] to-[#25CB78]",
                      )}
                    />
                  )}

                  {/* Icon container */}
                  <div className="relative flex items-center justify-center">
                    {/* Active glow effect */}
                    {isActive && (
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full blur-sm scale-150",
                          isPremium
                            ? "bg-gradient-to-br from-[#FFD93D]/15 to-[#FFA500]/15"
                            : "bg-gradient-to-br from-[#4F8EF7]/15 to-[#25CB78]/15",
                        )}
                      />
                    )}

                    {/* Main icon */}
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all duration-300 ease-out",
                        isActive && isPremium
                          ? "bg-gradient-to-br from-[#FFD93D] to-[#FFA500] text-white scale-110"
                          : isActive
                            ? "bg-gradient-to-br from-[#4F8EF7] to-[#25CB78] text-white scale-110"
                            : isPremium
                              ? "text-[#FFD93D] group-hover:text-[#FFA500]"
                              : "text-gray-500 group-hover:text-gray-700",
                      )}
                    >
                      <IconComponent size={isActive ? 15 : 13} strokeWidth={isActive ? 2.5 : 2} />

                      {/* Premium sparkle effect */}
                      {isPremium && !isActive && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD93D] rounded-full opacity-80 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Label - responsive text */}
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs font-semibold transition-all duration-300 ease-out leading-tight truncate max-w-full text-center",
                      isActive && isPremium
                        ? "text-transparent bg-gradient-to-r from-[#FFD93D] to-[#FFA500] bg-clip-text"
                        : isActive
                          ? "text-transparent bg-gradient-to-r from-[#4F8EF7] to-[#25CB78] bg-clip-text"
                          : isPremium
                            ? "text-[#FFD93D] dark:text-[#FFD93D] group-hover:text-[#FFA500] dark:group-hover:text-[#FFA500]"
                            : "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200",
                    )}
                  >
                    <span className="hidden sm:inline">{tab.shortLabel}</span>
                    <span className="inline sm:hidden">{tab.mobileLabel}</span>
                  </span>

                  {/* Hover tooltip - only on non-touch devices and larger screens */}
                  <div
                    className={cn(
                      "absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded-lg opacity-0 pointer-events-none transition-all duration-200 whitespace-nowrap z-50",
                      "after:content-[''] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900/90",
                      "hidden sm:block sm:group-hover:opacity-100 sm:group-hover:-translate-y-1",
                    )}
                  >
                    {tab.description}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}