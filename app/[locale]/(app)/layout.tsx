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
        {/* Mobile layout - original card-based design */}
        <div className="lg:hidden card w-full max-w-3xl min-h-[500px] max-h-[90vh] bg-white shadow-xl border border-base-200 flex flex-col justify-between overflow-hidden max-sm:rounded-none max-sm:h-full rounded-lg mx-auto">
          <Header />
          <div className="flex-1 overflow-auto flex flex-col">{children}</div>
        </div>

        {/* Desktop layout - full-width with sidebar */}
        <div className="hidden lg:block">
          {/* Desktop Header - full width */}
          <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#4F8EF7]/15">
            <div className="pl-64 pr-6 py-4">
              <Header />
            </div>
          </div>

          {/* Main content area - offset by sidebar width */}
          <div className="pl-64 pt-20 min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border border-base-200 min-h-[calc(100vh-6rem)] overflow-hidden">
                <div className="p-6 h-full">
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
