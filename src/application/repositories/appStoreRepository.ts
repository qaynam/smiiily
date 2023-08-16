import type { IAppStoreData } from "../stores/app";
import type { IAppStoreRepository } from "./appStoreRepository.interface";
import type { GradientType, PaddingType, RoundnessType } from "../models/appStore";

export class AppStoreRepository implements IAppStoreRepository {
  constructor(private readonly store: IAppStoreData) {}

  getImage() {
    return this.store.get("selectedImage");
  }

  getMainBlockElement() {
    return this.store.get("mainBlockRef");
  }

  updateRoundness(roundness: RoundnessType): void {
    this.store.update((state) => {
      const newState = state;
      newState.roundness = roundness;

      return newState;
    });
  }

  updatePadding(padding: PaddingType): void {
    this.store.update((state) => {
      const newState = state;
      newState.padding = padding;

      return newState;
    });
  }

  updateDropShadow(dropShadow: RoundnessType): void {
    this.store.update((state) => {
      const newState = state;
      newState.dropShadow = dropShadow;

      return newState;
    });
  }

  updateGradient(gradient: GradientType): void {
    this.store.update((state) => {
      const newState = state;
      newState.gradient = gradient;

      return newState;
    });
  }

  updateSelectedImage(image: string): void {
    this.store.update((state) => {
      const newState = state;
      newState.selectedImage = image;

      return newState;
    });
  }

  updateMainBlockDomImage(image: Blob): void {
    this.store.update((state) => {
      const newState = state;
      newState.mainBlockDomImage = image;

      return newState;
    });
  }
}
