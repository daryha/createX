export interface Product {
  id: number; // или string, если API возвращает строку
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  sizes: string[];
  category: string;
  brand: string;
  article: string;
  composition: string;
  sizeOnModel: string;
  modelHeight: number;
  modelMeasurements: string;
  countryOfManufacture: string;
  modelFeatures: string;
  decorativeElements: string;
  materialTexture: string;
  fit: string;
  setComponents: string[];
  careInstructions: string;
}
