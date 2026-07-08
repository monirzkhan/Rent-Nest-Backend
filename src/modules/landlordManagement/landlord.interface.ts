import { EnumPropertyStatusFieldUpdateOperationsInput } from "../../../generated/prisma/models/Property";

export interface IProperty {
  title: string;
  description: string;

  rentAmount: number;

  bedrooms: number;
  bathrooms: number;
  area?: number;

  address: string;

  thumbnail?: string;
  images: string[];

  status: EnumPropertyStatusFieldUpdateOperationsInput;

  landlordId: string;
  categoryId: string;
}