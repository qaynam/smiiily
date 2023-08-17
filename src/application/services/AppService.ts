import type { DropShadowType, GradientType, PaddingType, RoundnessType } from "../models/appStore";
import type { IAppStoreRepository } from "../repositories/appStoreRepository.interface";

export class AppService {
  constructor(private readonly appStoreRepository: IAppStoreRepository) {}

  updateRoundness(roundness: RoundnessType) {
    if (roundness !== this.appStoreRepository.getRoundness()) {
      this.appStoreRepository.updateRoundness(roundness);
    }
  }

  updatePadding(padding: PaddingType) {
    this.appStoreRepository.updatePadding(padding);
  }

  updateDropShadow(dropShadow: DropShadowType) {
    this.appStoreRepository.updateDropShadow(dropShadow);
  }

  updateGradient(gradient: GradientType) {
    this.appStoreRepository.updateGradient(gradient);
  }

  updateMainBlockElement(mainBlockElement: Element) {
    this.appStoreRepository.updateMainBlockElement(mainBlockElement);
  }

  removeImage() {
    if (this.appStoreRepository.getImage()) {
      this.appStoreRepository.updateSelectedImage(null);
    }
  }

  async updateSelectedImage(image: File) {
    const imageUrl = URL.createObjectURL(image);
    this.appStoreRepository.updateSelectedImage(imageUrl);
  }
}
