import { ObjectId } from "mongodb";

export interface Product {
  _id: ObjectId;
  title: string;
  bangla: string;
  image: string;
  price: number;
  discount?: number;
  ratings: number;
  reviews: number;
  sold: number;
  youtube?: string;
  description?: string;
  percentage?: number;
}
