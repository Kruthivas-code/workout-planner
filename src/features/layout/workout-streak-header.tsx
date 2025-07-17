import { useMemo } from "react";

import { cn } from "@/shared/lib/utils";

const DEFAULT_STREAK_COUNT = 5;

/**
 * Props for WorkoutStreakHeader component
 */
export interface WorkoutStreakHeaderProps {
  className?: string;
  /** Number of days to display in the streak (default: 5) */
  streakCount?: number;
}

/**
 * WorkoutStreakHeader component displays a demo version of workout streak
 * In demo mode, this shows a static pattern without API calls
 *
 * @param props - Component props
 * @returns JSX element representing the workout streak
 */
export default function WorkoutStreakHeader({ className, streakCount = DEFAULT_STREAK_COUNT }: WorkoutStreakHeaderProps) {
  // Generate demo streak data (static pattern for demo)
  const demoStreak = useMemo(() => {
    return [...Array(streakCount)].map((_, i) => {
      // Create a demo pattern: some days have workouts, others don't
      const hasWorkout = i % 2 === 0; // Alternate pattern for demo
      return {
        hasWorkout,
        date: `Day ${i + 1}`,
      };
    });
  }, [streakCount]);

  return (
    <div
      aria-label="Demo workout streak"
      className={cn("flex gap-1 sm:mr-2", className)}
      role="img"
    >
      {demoStreak.map((day, index) => {
        const title = `${day.date}: ${day.hasWorkout ? "✅️" : "❌️"} (Demo)`;

        return (
          <div
            aria-label={`${day.date}: ${day.hasWorkout ? "Workout completed" : "No workout"} (Demo)`}
            className={`w-4 h-4 sm:w-6 sm:h-6 rounded-sm sm:rounded-md transition-all duration-200 ease-in-out tooltip tooltip-bottom hover:scale-110 cursor-pointer focus:ring-2 focus:ring-offset-1 focus:outline-none ${
              day.hasWorkout
                ? "bg-emerald-400 dark:bg-emerald-500 shadow-sm hover:shadow-md hover:brightness-110 focus:ring-emerald-300"
                : "bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-gray-500 hover:bg-gray-400 dark:hover:bg-gray-500 focus:ring-gray-300 dark:focus:ring-gray-400"
            }`}
            data-tip={title}
            key={index}
            role="button"
            tabIndex={0}
            title={title}
          />
        );
      })}
    </div>
  );
}
