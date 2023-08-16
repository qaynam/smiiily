import { domToBlob } from "~/lib/common";
import type { DropShadowType, PaddingType, RoundnessType, GradientType } from "../models/appStore";
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

  removeImage() {
    if (this.appStoreRepository.getImage()) {
      this.appStoreRepository.updateSelectedImage("");
    }
  }

  async updateSelectedImage(image: File) {
    const imageUrl = URL.createObjectURL(image);
    const mainBlockElement = this.appStoreRepository.getMainBlockElement();
    if (!mainBlockElement) {
      return;
    }
    const domImage = await domToBlob(mainBlockElement);
    this.appStoreRepository.updateSelectedImage(imageUrl);
    this.appStoreRepository.updateMainBlockDomImage(domImage);
  }
}
