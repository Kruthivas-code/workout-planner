"use client";

import { LogIn, UserPlus, LogOut, User, Crown, CreditCard } from "lucide-react";

import { useI18n } from "locales/client";
import { LogoSvg } from "@/components/svg/LogoSvg";
import { LanguageSelector } from "@/widgets/language-selector/language-selector";
import { usePremiumStatus } from "@/shared/lib/premium/use-premium";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { ReleaseNotesDialog } from "@/features/release-notes";
import WorkoutStreakHeader from "@/features/layout/workout-streak-header";
import { useLogout } from "@/features/auth/model/useLogout";
import { useSession } from "@/features/auth/lib/auth-client";
import { Link } from "@/components/ui/link";

export const Header = () => {
  const session = useSession();
  const logout = useLogout();
  const t = useI18n();
  const { data: premiumStatus } = usePremiumStatus();

  // Get user initials for avatar
  const userAvatar = session.data?.user?.email?.substring(0, 2).toUpperCase() || "";
  const isPremium = premiumStatus?.isPremium ?? false;

  const handleSignOut = () => {
    logout.mutate();
  };

  const handleCloseDropdown = () => {
    const element = document.activeElement as HTMLElement;
    if (!element) return;
    element.blur();
  };

  return (
    <div className="navbar bg-base-100 dark:bg-black dark:text-gray-200 px-2 sm:px-4 rounded-tl-lg rounded-tr-lg">
      {/* Empty start section */}
      <div className="navbar-start"></div>

      {/* User Menu */}
      <div className="navbar-end">
        <WorkoutStreakHeader />
        <ReleaseNotesDialog />
        <ThemeToggle />
        <LanguageSelector />

        <div className="dropdown dropdown-end ml-1">
          <div className="tooltip tooltip-bottom" data-tip={t("commons.profile")}>
            <div className="btn btn-ghost btn-circle avatar relative" role="button" tabIndex={0}>
              <div className="w-8 rounded-full bg-primary text-primary-content !flex items-center justify-center text-sm font-medium">
                {userAvatar || <User className="w-4 h-4" />}
              </div>
              {isPremium && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full !flex items-center justify-center">
                  <Crown className="w-2.5 h-2.5 text-amber-900" />
                </div>
              )}
            </div>
          </div>

          <ul
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-black dark:text-gray-200 rounded-box w-52 border border-slate-200 dark:border-gray-800"
            onClick={handleCloseDropdown}
            tabIndex={0}
          >
            <li>
              <Link className="!no-underline" href="/profile" size="base" variant="nav">
                <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                {t("commons.profile")}
              </Link>
            </li>

            {/* Subscription Menu Item */}
            <li>
              <Link
                className="!no-underline"
                href={isPremium ? "/api/premium/billing-portal" : "/premium"}
                size="base"
                variant="nav"
                {...(isPremium && {
                  onClick: async (e) => {
                    e.preventDefault();
                    try {
                      const response = await fetch("/api/premium/billing-portal", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ returnUrl: window.location.origin + "/profile" }),
                      });
                      const data = await response.json();
                      if (data.success && data.url) {
                        window.location.href = data.url;
                      }
                    } catch (error) {
                      console.error("Error opening billing portal:", error);
                    }
                  },
                })}
              >
                {isPremium ? (
                  <>
                    <Crown className="w-4 h-4 text-amber-500" />
                    {t("commons.manage_subscription")}
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    {t("commons.become_premium")}
                  </>
                )}
              </Link>
            </li>

            <hr className="my-1 border-slate-200 dark:border-gray-800" />

            {!session.data && !session.isPending ? (
              <>
                <li>
                  <Link className="!no-underline" href="/auth/signin" size="base" variant="nav">
                    <LogIn className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    {t("commons.login")}
                  </Link>
                </li>
                <li>
                  <Link className="!no-underline" href="/auth/signup" size="base" variant="nav">
                    <UserPlus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    {t("commons.register")}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  {t("commons.logout")}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
