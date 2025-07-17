import { ReactElement } from "react";

import { Header } from "@/features/layout/Header";
import { ResponsiveNavigation } from "@/features/layout/ResponsiveNavigation";

interface RootLayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {/* Main app container with responsive layout */}
      <div className="min-h-screen bg-gray-50">
        {/* Mobile layout - full-width gray background with centered content */}
        <div className="lg:hidden bg-gray-50 min-h-screen flex items-center justify-center p-4">
          <div className="card w-full max-w-3xl bg-white shadow-xl border border-base-200 flex flex-col overflow-hidden max-sm:rounded-none rounded-lg">
            <Header />
            <div className="flex-1 flex flex-col">{children}</div>
          </div>
        </div>

        {/* Desktop layout - full-width with sidebar */}
        <div className="hidden lg:block">
          {/* Desktop Header - full width */}
          <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#4F8EF7]/15">
            <div className="pl-64 pr-6 py-4">
              <Header />
            </div>
          </div>

          {/* Main content area - full width gray background with centered card */}
          <div className="pl-64 pt-20 min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-7xl">
              <div className="bg-white rounded-2xl shadow-xl border border-base-200 overflow-hidden">
                <div className="p-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Navigation - handles both mobile bottom nav and desktop sidebar */}
      <ResponsiveNavigation />
    </>
  );
}
