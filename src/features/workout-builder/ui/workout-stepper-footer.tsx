"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useI18n } from "locales/client";
import { Button } from "@/components/ui/button";

export function WorkoutBuilderFooter({
  currentStep,
  totalSteps,
  canContinue,
  onPrevious,
  onNext,
  onStartWorkout,
}: {
  currentStep: number;
  totalSteps: number;
  canContinue: boolean;
  onPrevious: VoidFunction;
  onNext: VoidFunction;
  onStartWorkout?: VoidFunction;
}) {
  const t = useI18n();
  const isFirstStep = currentStep === 1;
  const isFinalStep = currentStep === totalSteps;

  return (
    <div className="w-full">
      {/* Mobile layout - vertical stack */}
      <div className="flex flex-col gap-4 pb-2">
        {/* Center stats on top for mobile */}

        {/* Navigation buttons */}
        <div className="mt-4 min-h-12 flex items-center justify-between gap-3 bg-white w-full p-0.5 border border-slate-400 rounded-full">
          {/* Previous button */}
          <Button className="flex-1 rounded-full min-h-12" disabled={isFirstStep} onClick={onPrevious} size="default" variant="ghost">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">{t("workout_builder.navigation.previous")}</span>
            </div>
          </Button>

          {/* Next/Start Workout button */}
          <Button
            className="flex-1 rounded-full bg-slate-800 hover:bg-slate-900 min-h-12 dark:bg-slate-700 dark:hover:bg-slate-600"
            disabled={!canContinue}
            onClick={isFinalStep ? () => onStartWorkout?.() : onNext}
            size="default"
            variant="default"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold">{t("workout_builder.navigation.continue")}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
