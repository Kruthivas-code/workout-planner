"use server";

import { ExerciseAttributeNameEnum } from "@prisma/client";

import { actionClient } from "@/shared/api/safe-actions";

import { getExercisesSchema } from "../schema/get-exercises.schema";

// Mock exercise data for demo mode
const DEMO_EXERCISES = [
  {
    id: "demo-1",
    name: "Push-ups",
    slug: "push-ups",
    description: "Classic bodyweight exercise for chest, shoulders, and triceps",
    youtubeUrl: "https://youtube.com/watch?v=IODxDxX7oi4",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "CHEST" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "BODY_ONLY" }
      }
    ]
  },
  {
    id: "demo-2",
    name: "Squats",
    slug: "squats",
    description: "Fundamental lower body exercise targeting quads, glutes, and hamstrings",
    youtubeUrl: "https://youtube.com/watch?v=aclHkVaku9U",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "QUADS" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "BODY_ONLY" }
      }
    ]
  },
  {
    id: "demo-3",
    name: "Dumbbell Curls",
    slug: "dumbbell-curls",
    description: "Isolation exercise for biceps using dumbbells",
    youtubeUrl: "https://youtube.com/watch?v=ykJmrZ5v0Oo",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "BICEPS" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "DUMBBELL" }
      }
    ]
  },
  {
    id: "demo-4",
    name: "Barbell Rows",
    slug: "barbell-rows",
    description: "Compound pulling exercise for back and rear delts",
    youtubeUrl: "https://youtube.com/watch?v=kBWAon7ItDw",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "BACK" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "BARBELL" }
      }
    ]
  },
  {
    id: "demo-5",
    name: "Kettlebell Swings",
    slug: "kettlebell-swings",
    description: "Dynamic exercise for posterior chain and core",
    youtubeUrl: "https://youtube.com/watch?v=YSxHifyI6s8",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "GLUTES" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "KETTLEBELLS" }
      }
    ]
  },
  {
    id: "demo-6",
    name: "Pull-ups",
    slug: "pull-ups",
    description: "Compound pulling exercise for back and biceps",
    youtubeUrl: "https://youtube.com/watch?v=eGo4IYlbE5g",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "BACK" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "PULLUP_BAR" }
      }
    ]
  },
  {
    id: "demo-7",
    name: "Bench Press",
    slug: "bench-press",
    description: "Classic compound exercise for chest, shoulders, and triceps",
    youtubeUrl: "https://youtube.com/watch?v=rT7DgCr-3pg",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "CHEST" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "BENCH" }
      }
    ]
  },
  {
    id: "demo-8",
    name: "Resistance Band Rows",
    slug: "resistance-band-rows",
    description: "Portable pulling exercise using resistance bands",
    youtubeUrl: "https://youtube.com/watch?v=4I-jCIq3xCg",
    attributes: [
      {
        attributeName: { name: ExerciseAttributeNameEnum.PRIMARY_MUSCLE },
        attributeValue: { value: "BACK" }
      },
      {
        attributeName: { name: ExerciseAttributeNameEnum.EQUIPMENT },
        attributeValue: { value: "BANDS" }
      }
    ]
  }
];

// Utility function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const getExercisesAction = actionClient.schema(getExercisesSchema).action(async ({ parsedInput }) => {
  const { equipment, muscles, limit } = parsedInput;

  // Demo mode - return static exercises based on selected equipment and muscles
  const exercisesByMuscle = muscles.map((muscle) => {
    // Find exercises that match the muscle and equipment
    const matchingExercises = DEMO_EXERCISES.filter((exercise) => {
      const primaryMuscle = exercise.attributes.find(attr => 
        attr.attributeName.name === ExerciseAttributeNameEnum.PRIMARY_MUSCLE
      )?.attributeValue.value;
      
      const exerciseEquipment = exercise.attributes.find(attr => 
        attr.attributeName.name === ExerciseAttributeNameEnum.EQUIPMENT
      )?.attributeValue.value;
      
      return primaryMuscle === muscle && equipment.includes(exerciseEquipment);
    });

    // If no exact matches, return some demo exercises anyway
    const finalExercises = matchingExercises.length > 0 
      ? shuffleArray(matchingExercises).slice(0, limit)
      : shuffleArray(DEMO_EXERCISES).slice(0, Math.min(limit, 2)); // Fallback to 2 demo exercises

    return {
      muscle,
      exercises: finalExercises,
    };
  });

  // Filter muscles that have no exercises
  const filteredResults = exercisesByMuscle.filter((group) => group.exercises.length > 0);

  return filteredResults;
});
