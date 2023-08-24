import type {
  DropShadowType,
  ImageTypes as ImageTypes,
  GradientType,
  PaddingType,
  RoundnessType
} from "~/application/models/appStore";

export const gradients: Record<GradientType, string> = {
  "violet-to-cyan-horizontal-gradient":
    "bg-gradient-to-l from-violet-700 via-indigo-300 to-cyan-400",
  "fuchsia-to-red-diagonal-gradient-top-left":
    "bg-gradient-to-tl from-fuchsia-300 via-blue-300 to-red-400",
  "cyan-to-white-horizontal-gradient": "bg-gradient-to-l from-cyan-100 via-purple-300 to-white",
  "green-to-purple-horizontal-gradient": "bg-gradient-to-r from-green-300 to-purple-400",
  "indigo-to-purple-horizontal-gradient": "bg-gradient-to-r from-indigo-300 to-purple-400",
  "cyan-to-indigo-vertical-gradient": "bg-gradient-to-t from-cyan-600 via-cyan-400 to-indigo-100",
  "rose-to-teal-horizontal-gradient": "bg-gradient-to-r from-rose-100 to-teal-100",
  "transparent-to-white-diagonal-gradient-bottom-right-with-orange-hint":
    "bg-gradient-to-br from-transparent via-orange-100 to-white",
  "dark-gray-to-black-horizontal-gradient": "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
  "mesh-gradient-1": "mesh-gradient-1",
  "mesh-gradient-2": "mesh-gradient-2",
  "mesh-gradient-3": "mesh-gradient-3",
  "mesh-gradient-4": "mesh-gradient-4"
};

export const paddings = {
  small: "p-5",
  medium: "p-10",
  large: "p-20"
};

export const roundness = {
  none: "rounded-none",
  small: "rounded-md",
  medium: "rounded-xl",
  large: "rounded-[1.5rem]"
};

export const dropShadows = {
  none: "shadow-none",
  small: "shadow-md shadow-zinc-800/70",
  medium: "shadow-lg shadow-zinc-800/70",
  large: "shadow-xl shadow-zinc-800/70",
  extraLarge: "shadow-2xl shadow-zinc-800/70"
};

export const paddingTypes = Object.keys(paddings) as PaddingType[];
export const roundnessTypes = Object.keys(roundness) as RoundnessType[];
export const dropShadowTypes = Object.keys(dropShadows) as DropShadowType[];
export const gradientTypes = Object.keys(gradients) as GradientType[];
export const imageTypes: ImageTypes[] = ["image/png", "image/jpeg", "image/gif"];
