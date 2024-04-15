'use client'
import { useState } from "react";
import UserForm from "./components/UserForm";

import { auth } from "@/firebase/app";
import { getDay } from "../firebase/firestore/crud"
import { onUserChange } from "../firebase/auth/info"

import styles from "./page.module.css";

export default function Home() {  
  const [user, setUser] = useState(null);
  onUserChange((e : string) => {
    console.log(e);
  });

  return (
    <main>  
      <UserForm />
    </main>
  );
}
