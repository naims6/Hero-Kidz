import { ObjectId } from "mongodb";

export interface CartMongoType {
  _id: ObjectId;
  productId: string;
  email: string;
  title: string;
  quantity: number;
  image: string;
  price: number;
}
