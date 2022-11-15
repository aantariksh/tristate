import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwBp3AN9CB_ErkntIAVQ1Lkm-lWkCYvwg",
  authDomain: "formdata-prd.firebaseapp.com",
  databaseURL:
    "https://formdata-prd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "formdata-prd",
  storageBucket: "formdata-prd.appspot.com",
  messagingSenderId: "137229941775",
  appId: "1:137229941775:web:e73f88adad9209abd6f77a",
};
initializeApp(firebaseConfig);

const auth = getAuth();

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formProps = new FormData(event.target);
    const formData = Object.fromEntries(formProps);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => (location.href = "/admin/contact.html"))
      .catch(() => failMessage());
  });
}

const loginOutButton = document.getElementById("loginOutButton");
if (loginOutButton) {
  loginOutButton.addEventListener("click", () => signOut(auth));
}

onAuthStateChanged(auth, (user) => {
  const index = "/admin/index";
  const contact = "/admin/contact";
  const currentPage = location.pathname;

  if (user) {
    if (user.uid != "qnm8U1i9MIgEcl4GdIHaJsp5wR42") signOut(auth);
    if (currentPage.startsWith(index)) {
      location.pathname = contact + ".html";
    }
  } else {
    if (!currentPage.startsWith(index)) {
      location.pathname = index + ".html";
    }
  }
});

export function failMessage() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Login Failed",
  }).then(() => location.reload());
}
