import { PropertyStatus } from "../../../generated/prisma/enums";

export interface ICreateProperty {
  title: string;
  description?: string;

  rentAmount: number;

  bedrooms: number;
  bathrooms: number;
  areas?: number;

  address?: string;

  thumbnail?: string;
  images: string[];

  status?: PropertyStatus;

  landlordId?: string;
  categoryId: string;
}

export interface IUpdateProperty {
  title?: string;
  description?: string;

  rentAmount?: number;

  bedrooms?: number;
  bathrooms?: number;
  areas?: number;

  address?: string;

  thumbnail?: string;
  images?: string[];

  status?: PropertyStatus;

  categoryId?: string;
}