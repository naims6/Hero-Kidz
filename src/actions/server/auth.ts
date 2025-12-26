"use server"
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

interface User {
  name: string;
  email: string;
  password: string;
}

export const postUser = async (payload: User) => {
  const { email, password, name } = payload;
console.log(payload)
  // check user is already exist or not
  const isExist = await dbConnect(collections.USERS).findOne({ email });
  if (isExist) {
    return { error: "User already exists" };
  }

  // create new user
  const newUser = {
    provider: "credential",
    name,
    password: await bcrypt.hash(password, 14),
    email,
    role: "user",
  };

  // insert user in database
  const result = await dbConnect(collections.USERS).insertOne(newUser);

  if (result.acknowledged) {
    return {...result, insertedId: result.insertedId.toString()
    }
  }
};
