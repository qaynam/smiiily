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

export const bgPattern =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23545454' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
