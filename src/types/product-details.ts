import { ObjectId } from "mongodb";

export interface ProductDetails {
  _id: ObjectId;
  title: string;
  bangla: string;
  image: string;
  price: number;
  discount: number;
  ratings: number;
  reviews: number;
  sold: number;
  info: string[];
  description: string;
  qna: {
    question: string;
    answer: string;
  }[];
}
