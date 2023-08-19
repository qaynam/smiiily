import type {
  DropShadowType,
  GradientType,
  ImageTypes,
  PaddingType,
  RoundnessType
} from "../models/appStore";
import type { IAppStoreRepository } from "../repositories/appStoreRepository.interface";

export class AppService {
  constructor(private readonly appStoreRepository: IAppStoreRepository) {}

  updateRoundness(roundness: RoundnessType) {
    if (roundness !== this.appStoreRepository.getRoundness()) {
      this.appStoreRepository.updateRoundness(roundness);
    }
  }

  updatePadding(padding: PaddingType) {
    if (padding !== this.appStoreRepository.getPadding()) {
      this.appStoreRepository.updatePadding(padding);
    }
  }

  updateDropShadow(dropShadow: DropShadowType) {
    if (dropShadow !== this.appStoreRepository.getDropShadow()) {
      this.appStoreRepository.updateDropShadow(dropShadow);
    }
  }

  updateGradient(gradient: GradientType) {
    if (gradient !== this.appStoreRepository.getGradient()) {
      this.appStoreRepository.updateGradient(gradient);
    }
  }

  updateMainBlockElement(mainBlockElement: Element) {
    this.appStoreRepository.updateMainBlockElement(mainBlockElement);
  }

  updateImageType(imageType: ImageTypes) {
    if (imageType !== this.appStoreRepository.getImageType()) {
      this.appStoreRepository.updateImageType(imageType);
    }
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
