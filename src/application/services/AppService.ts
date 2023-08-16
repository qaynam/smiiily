import type { DropShadowType, GradientType, PaddingType, RoundnessType } from "../models/appStore";
import type { IAppStoreRepository } from "../repositories/appStoreRepository.interface";

export class AppService {
  constructor(private readonly appStoreRepository: IAppStoreRepository) {}

  updateRoundness(roundness: RoundnessType) {
    this.appStoreRepository.updateRoundness(roundness);
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

  async updateMainBlockElement(mainBlockElement: Element) {
    this.appStoreRepository.updateMainBlockElement(mainBlockElement);
  }

  async updateMainBlockDomImage(blob: Blob) {
    this.appStoreRepository.updateMainBlockDomImage(blob);
  }

  removeImage() {
    if (this.appStoreRepository.getImage()) {
      this.appStoreRepository.updateSelectedImage(null);
      this.appStoreRepository.updateMainBlockDomImage(null);
    }
  }

  async updateSelectedImage(image: File) {
    const imageUrl = URL.createObjectURL(image);
    this.appStoreRepository.updateSelectedImage(imageUrl);
  }
}
