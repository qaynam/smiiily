import type { DropShadowType, GradientType, PaddingType, RoundnessType } from "../models/appStore";

export interface IAppStoreRepository {
  updateRoundness(roundness: RoundnessType): void;
  updatePadding(padding: PaddingType): void;
  updateDropShadow(dropShadow: DropShadowType): void;
  updateGradient(gradient: GradientType): void;
  updateImageType(imageType: string): void;
  updateSelectedImage(image: string | null): void;
  updateMainBlockElement(mainBlockElement: Element | null): void;

  getImage(): string | null;
  getImageType(): string;
  getMainBlockElement(): Element | null;
  getRoundness(): RoundnessType;
  getPadding(): PaddingType;
  getDropShadow(): DropShadowType;
  getGradient(): GradientType;
}
