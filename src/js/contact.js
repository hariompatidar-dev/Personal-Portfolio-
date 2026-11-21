const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");
const submitText = document.getElementById("submitText");

function showFormStatus(message, type) {
  formStatus.textContent = message;

  formStatus.classList.remove("hidden", "text-green-700", "text-red-600");

  formStatus.classList.add(
    type === "success" ? "text-green-700" : "text-red-600",
  );
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);

  const formValues = Object.fromEntries(formData.entries());

  // Include the selected subject in the email subject line.
  formValues._subject = `Portfolio Contact: ${formValues.topic}`;

  submitButton.disabled = true;
  submitText.textContent = "Sending...";

  formStatus.classList.add("hidden");

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/hariompatidar.prior@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formValues),
      },
    );

    const result = await response.json();

    if (!response.ok || result.success !== "true") {
      throw new Error(result.message || "Unable to send your message.");
    }

    showFormStatus(
      "Your message has been sent successfully. Thank you for reaching out!",
      "success",
    );

    contactForm.reset();
  } catch (error) {
    console.error("Contact form error:", error);

    showFormStatus(
      "Something went wrong. Please try again or email me directly at hariompatidar.prior@gmail.com.",
      "error",
    );
  } finally {
    submitButton.disabled = false;
    submitText.textContent = "Send Message";
  }
});
