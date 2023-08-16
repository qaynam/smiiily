import type { DropShadowType, GradientType, PaddingType, RoundnessType } from "../models/appStore";

export interface IAppStoreRepository {
  updateRoundness(roundness: RoundnessType): void;
  updatePadding(padding: PaddingType): void;
  updateDropShadow(dropShadow: DropShadowType): void;
  updateGradient(gradient: GradientType): void;
  updateSelectedImage(image: string): void;
  updateMainBlockDomImage(image: Blob): void;

  getImage(): string | null;
  getMainBlockElement(): Element | null;
}
