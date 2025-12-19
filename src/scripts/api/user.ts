import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import type { User as FirebaseUser } from "firebase/auth";

export async function loadUserData(): Promise<User | null> {
  const user: FirebaseUser | null = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    console.log("No such document!");
    return null;
  }
}
