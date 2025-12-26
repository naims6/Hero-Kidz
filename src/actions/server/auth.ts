"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";


interface User {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email?: string;
  password?: string;
}

export const postUser = async (payload: User) => {
  const { email, password, name } = payload;

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
    return { ...result, insertedId: result.insertedId.toString() };
  }
};


export const loginUser = async (payload: LoginPayload) => {
  const { email, password } = payload;

  if (!email || !password) {
    return { error: "Missing email or password" };
  }

  const user = await dbConnect(collections.USERS).findOne({ email });
  if (!user) {
    return { error: "User is not exist" };
  }
  console.log("user is" ,user)
  const isMatched = await bcrypt.compare(password, user.password);

  if (isMatched) {
    return user;
  } else {
    return { error: "Wrong credential" };
  }
};
