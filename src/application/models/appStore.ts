export type PaddingType = "small" | "medium" | "large";
export type RoundnessType = "none" | "small" | "medium" | "large";
export type DropShadowType = RoundnessType | "extraLarge";
export type GradientType =
  | "violet-to-cyan-horizontal-gradient"
  | "fuchsia-to-red-diagonal-gradient-top-left"
  | "cyan-to-white-horizontal-gradient"
  | "green-to-purple-horizontal-gradient"
  | "indigo-to-purple-horizontal-gradient"
  | "cyan-to-indigo-vertical-gradient"
  | "rose-to-teal-horizontal-gradient"
  | "transparent-to-white-diagonal-gradient-bottom-right-with-orange-hint"
  | "dark-gray-to-black-horizontal-gradient";
export type ImageTypes = "image/png" | "image/jpeg" | "image/gif";

export interface IAppStore {
  roundness: RoundnessType;
  padding: PaddingType;
  gradient: GradientType;
  dropShadow: DropShadowType;
  imageType: ImageTypes;
  rotate: {
    x: number;
    y: number;
    z: number;
  };
  selectedImage: string | null;
  mainBlockRef: Element | null;
}
