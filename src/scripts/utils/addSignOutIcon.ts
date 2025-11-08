import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { logoutUser } from "../api/auth";

export function addSignOutIcon() {
  const wrapper = document.querySelector<HTMLDivElement>("#nav-right");
  if (!wrapper) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const singOutBtn = document.createElement("button");
      singOutBtn.classList.add("btn-icon");
      singOutBtn.type = "button";
      singOutBtn.id = "sign-out";
      singOutBtn.innerHTML = `
<i class="fa-solid fa-right-from-bracket"></i>
      `;
      singOutBtn.addEventListener("click", () => {
        logoutUser();
        window.location.href = "index";
      });
      wrapper.append(singOutBtn);
    } else {
      const singOutBtn = document.querySelector<HTMLButtonElement>("#sign-out");
      singOutBtn?.remove();
    }
  });
}
