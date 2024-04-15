'use client'
import { useState } from "react";

import { getDay } from "../firebase/firestore/crud"
import { onUserChange } from "../firebase/auth/info"
import styles from "./page.module.css";

export default function Home() {  
  const [user, setUser] = useState(null);

  return (
    <main>  
      
    </main>
  );
}
