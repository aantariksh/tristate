import { successMessage, failMessage } from "./index.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const db = getDatabase();
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formProps = new FormData(event.target);
  const formData = Object.fromEntries(formProps);

  const { name, email, message } = formData;

  if (
    !name ||
    !email ||
    !message ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the details correctly.",
    });
  } else {
    submitContactForm(formData);
  }
});

function submitContactForm(formData) {
  const id = new Date().getTime();

  set(ref(db, `tristate/contact/${id}`), {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  })
    .then(successMessage)
    .catch((err) => failMessage(err));
}
