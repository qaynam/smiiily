export type PaddingType = "small" | "medium" | "large";
export type RoundnessType = "none" | "small" | "medium" | "large";
export type DropShadowType = RoundnessType | "extraLarge";

export const gradients = [
  "bg-gradient-to-l from-violet-700 via-indigo-300 to-cyan-400",
  "bg-gradient-to-tl from-fuchsia-300 via-blue-300 to-red-400",
  "bg-gradient-to-l from-cyan-100 via-purple-300 to-white",
  "bg-gradient-to-r from-green-300 to-purple-400",
  "bg-gradient-to-r from-indigo-300 to-purple-400",
  "bg-gradient-to-t from-cyan-600 via-cyan-400 to-indigo-100",
  "bg-gradient-to-r from-rose-100 to-teal-100",
  "bg-gradient-to-br from-transparent via-orange-100 to-white",
  "bg-gradient-to-r from-gray-700 via-gray-900 to-black"
];

export const paddingTypes = {
  small: "p-5",
  medium: "p-10",
  large: "p-20"
};

export const roundnessTypes = {
  none: "rounded-none",
  small: "rounded-md",
  medium: "rounded-xl",
  large: "rounded-[1.5rem]"
};

export const dropShadowTypes = {
  none: "shadow-none",
  small: "shadow-md shadow-zinc-800/70",
  medium: "shadow-lg shadow-zinc-800/70",
  large: "shadow-xl shadow-zinc-800/70",
  extraLarge: "shadow-2xl shadow-zinc-800/70"
};

export const paddingKeys = Object.keys(paddingTypes) as PaddingType[];
export const roundnessKeys = Object.keys(roundnessTypes) as RoundnessType[];
export const dropShadowKeys = Object.keys(dropShadowTypes) as RoundnessType[];
