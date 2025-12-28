"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Test = () => {
  const session = useSession();
  console.log("client session", session);
  return <div>{JSON.stringify(session)}</div>;
};

export default Test;
