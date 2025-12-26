"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AuthButtons = () => {
     const { data: session, status } = useSession()

    return (
        <div>
            {status === "authenticated" ? <button onClick={() => signOut()} className="btn btn-primary btn-outline">
          Logout
        </button> :  <Link href={"/login"} className="btn btn-primary btn-outline">
          Login
        </Link>}
        
        </div>
    );
};

export default AuthButtons;