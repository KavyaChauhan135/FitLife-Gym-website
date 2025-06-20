document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".register-form");
  const togglePasswordButtons = document.querySelectorAll(".toggle-password");
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  // Toggle password visibility
  togglePasswordButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const input = passwordInputs[index];
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);

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

    // Add keyboard support
    button.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Form submission
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();
    const terms = document.getElementById("terms").checked;
    const selectedPlan = document.querySelector(
      'input[name="plan"]:checked'
    ).value;

    // Validation flags
    let isValid = true;

    // Validate fullname
    if (!fullname) {
      showError(document.getElementById("fullname"), "Full name is required");
      isValid = false;
    } else {
      hideError(document.getElementById("fullname"));
    }

    // Validate email
    if (!email) {
      showError(document.getElementById("email"), "Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError(document.getElementById("email"), "Please enter a valid email");
      isValid = false;
    } else {
      hideError(document.getElementById("email"));
    }

    // Validate phone
    if (!phone) {
      showError(document.getElementById("phone"), "Phone number is required");
      isValid = false;
    } else if (!isValidPhone(phone)) {
      showError(
        document.getElementById("phone"),
        "Please enter a valid phone number"
      );
      isValid = false;
    } else {
      hideError(document.getElementById("phone"));
    }

    // Validate password
    if (!password) {
      showError(document.getElementById("password"), "Password is required");
      isValid = false;
    } else if (password.length < 8) {
      showError(
        document.getElementById("password"),
        "Password must be at least 8 characters"
      );
      isValid = false;
    } else {
      hideError(document.getElementById("password"));
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      showError(
        document.getElementById("confirm-password"),
        "Passwords do not match"
      );
      isValid = false;
    } else {
      hideError(document.getElementById("confirm-password"));
    }

    // Validate terms
    if (!terms) {
      showError(
        document.getElementById("terms"),
        "You must agree to the terms"
      );
      isValid = false;
    } else {
      hideError(document.getElementById("terms"));
    }

    if (isValid) {
      // Show loading state
      const registerButton = registerForm.querySelector(".register-button");
      registerButton.innerHTML =
        "<i class='fas fa-spinner fa-spin'></i> Creating Account...";
      registerButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Store user data in localStorage (for demo purposes)
        const userData = {
          fullname,
          email,
          phone,
          plan: selectedPlan,
          joinDate: new Date().toISOString(),
        };

        localStorage.setItem("fitlife_user", JSON.stringify(userData));

        // Redirect to dashboard
        window.location.href = "../../pages/dashboard/dashboard.html";
      }, 2000);
    }
  });

  // Helper functions
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement =
      formGroup.querySelector(".error-message") ||
      createErrorElement(formGroup);
    formGroup.classList.add("error");
    errorElement.textContent = message;
  }

  function hideError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
    const errorElement = formGroup.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function createErrorElement(formGroup) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    formGroup.appendChild(errorElement);
    return errorElement;
  }

  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  function isValidPhone(phone) {
    const re = /^\+?[\d\s-]{10,15}$/;
    return re.test(phone);
  }
});
