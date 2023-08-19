import type { IAppStoreData } from "../stores/app";
import type { IAppStoreRepository } from "./appStoreRepository.interface";
import type {
  DropShadowType,
  GradientType,
  ImageTypes,
  PaddingType,
  RoundnessType
} from "../models/appStore";
import { get } from "svelte/store";

export class AppStoreRepository implements IAppStoreRepository {
  constructor(private readonly store: IAppStoreData) {}

  getImage() {
    return get(this.store).selectedImage;
  }

  getImageType() {
    return get(this.store).imageType;
  }

  getMainBlockElement() {
    return get(this.store).mainBlockRef;
  }

  getRoundness(): RoundnessType {
    return get(this.store).roundness;
  }

  getPadding(): PaddingType {
    return get(this.store).padding;
  }

  getDropShadow(): DropShadowType {
    return get(this.store).dropShadow;
  }

  getGradient(): GradientType {
    return get(this.store).gradient;
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

  updateSelectedImage(image: string | null): void {
    this.store.update((state) => {
      const newState = state;
      newState.selectedImage = image;

      return newState;
    });
  }

  updateImageType(imageType: ImageTypes): void {
    this.store.update((state) => {
      const newState = state;
      newState.imageType = imageType;

      return newState;
    });
  }

  updateMainBlockElement(mainBlockElement: Element | null): void {
    this.store.update((state) => {
      const newState = state;
      newState.mainBlockRef = mainBlockElement;

      return newState;
    });
  }
}
