document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.querySelector('input[type="password"]');
  const emailInput = document.querySelector('input[type="email"]');

  // Toggle password visibility with improved accessibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle the eye icon
      const icon = this.querySelector("i");
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");

      // Update aria-label for accessibility
      this.setAttribute(
        "aria-label",
        type === "password" ? "Show password" : "Hide password"
      );
    });
  }

  // Add keyboard support for toggle button
  togglePassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePassword.click();
    }
  });

  // Form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // Email validation
    if (!email) {
      showError(emailInput, "Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError(emailInput, "Please enter a valid email");
      isValid = false;
    } else {
      hideError(emailInput);
    }

    // Password validation
    if (!password) {
      showError(passwordInput, "Password is required");
      isValid = false;
    } else if (password.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters");
      isValid = false;
    } else {
      hideError(passwordInput);
    }

    if (isValid) {
      // Show loading state
      const loginButton = loginForm.querySelector(".login-button");
      loginButton.innerHTML =
        "<i class='fas fa-spinner fa-spin'></i> Logging in...";
      loginButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        loginButton.innerHTML = "Log In";
        loginButton.disabled = false;
        window.location.href = "../../index.html";
      }, 2000);
    }
  });

  // Input focus effects
  const inputs = loginForm.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
    });
  });
});

// Helper functions
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement =
    formGroup.querySelector(".error-message") || createErrorElement(formGroup);
  formGroup.classList.add("error");
  errorElement.textContent = message;
  errorElement.style.opacity = "1";
}

function hideError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");
  if (errorElement) {
    formGroup.classList.remove("error");
    errorElement.style.opacity = "0";
  }
}

function createErrorElement(formGroup) {
  const errorElement = document.createElement("span");
  errorElement.className = "error-message";
  formGroup.appendChild(errorElement);
  return errorElement;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
