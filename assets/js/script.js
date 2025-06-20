// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const navOverlay = document.querySelector(".nav-overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  navOverlay.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
});

navOverlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
  navOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
        hamburger.classList.remove("active");
      }
    }
  });
});

// Form Validation
const contactForm = document.querySelector(".contact-form");
const formInputs = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  message: document.getElementById("message"),
};

const errorElements = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  phone: document.getElementById("phone-error"),
  message: document.getElementById("message-error"),
};

// Validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  phone: /^\+?[\d\s-]{10,}$/,
};

// Validation messages
const messages = {
  name: {
    required: "Please enter your name",
    minLength: "Name must be at least 2 characters long",
  },
  email: {
    required: "Please enter your email",
    invalid: "Please enter a valid email address",
  },
  phone: {
    required: "Please enter your phone number",
    invalid: "Please enter a valid phone number",
  },
  message: {
    required: "Please enter your message",
    minLength: "Message must be at least 10 characters long",
  },
};

// Show error message
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = errorElements[input.id];

  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// Hide error message
function hideError(input) {
  const formGroup = input.parentElement;
  const errorElement = errorElements[input.id];

  input.classList.remove("error");
  errorElement.textContent = "";
  errorElement.classList.remove("show");
}

// Validate single input
function validateInput(input) {
  const value = input.value.trim();

  // First clear any existing errors
  hideError(input);

  // Check if empty
  if (!value) {
    showError(input, messages[input.id].required);
    return false;
  }

  // Specific validation for each input type
  switch (input.id) {
    case "name":
      if (value.length < 2) {
        showError(input, messages.name.minLength);
        return false;
      }
      break;

    case "email":
      if (!patterns.email.test(value)) {
        showError(input, messages.email.invalid);
        return false;
      }
      break;

    case "phone":
      if (!patterns.phone.test(value)) {
        showError(input, messages.phone.invalid);
        return false;
      }
      break;

    case "message":
      if (value.length < 10) {
        showError(input, messages.message.minLength);
        return false;
      }
      break;
  }

  return true;
}

// Add input event listeners for real-time validation
Object.values(formInputs).forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      validateInput(input);
    }
    updateSubmitButton();
  });

  input.addEventListener("blur", () => {
    validateInput(input);
    updateSubmitButton();
  });
});

// Update submit button state
function updateSubmitButton() {
  const submitButton = contactForm.querySelector(".submit-button");
  const isValid = Object.values(formInputs).every((input) => {
    const value = input.value.trim();
    return value && !input.classList.contains("error");
  });
  submitButton.disabled = !isValid;
}

// Form submission handler
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate form (you can add your validation logic here)
  const isValid = true; // Replace with actual validation

  if (isValid) {
    // Show success notification
    const successMessage = document.getElementById("success-message");
    successMessage.classList.add("show");

    // Reset form
    contactForm.reset();

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);
  }
});

// Close notification handler
document
  .querySelector(".close-notification")
  .addEventListener("click", function () {
    const successMessage = document.getElementById("success-message");
    successMessage.classList.remove("show");
  });

// Add active class to nav links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Trainer Modal Functionality
const trainerData = {
  "john-doe": {
    name: "John Doe",
    title: "Strength Training Specialist",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    bio: "John has been a strength training specialist for over 10 years, helping clients achieve their fitness goals through personalized workout programs. His approach combines traditional strength training with modern techniques to maximize results.",
    experience:
      "With a background in competitive powerlifting, John has trained athletes, bodybuilders, and everyday fitness enthusiasts. He has worked with professional sports teams and has been featured in several fitness magazines.",
    certifications: [
      "NASM Certified Personal Trainer",
      "CrossFit Level 2 Trainer",
      "USA Powerlifting Coach",
      "Precision Nutrition Coach",
    ],
    specialties: [
      "Powerlifting",
      "Strength Training",
      "Bodybuilding",
      "Athletic Performance",
      "Injury Prevention",
    ],
    social: [
      { platform: "instagram", url: "#", icon: "fab fa-instagram" },
      { platform: "twitter", url: "#", icon: "fab fa-twitter" },
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin-in" },
    ],
  },
  "jane-smith": {
    name: "Jane Smith",
    title: "Yoga & Flexibility Expert",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
    bio: "Jane is a certified yoga instructor with a passion for helping people improve their flexibility and mental well-being. She believes in the holistic approach of yoga, combining physical postures with breathing techniques and meditation.",
    experience:
      "Jane has been teaching yoga for 8 years and has studied various yoga styles including Vinyasa, Hatha, and Yin. She has led workshops and retreats internationally and has a loyal following of students who appreciate her detailed instruction and calming presence.",
    certifications: [
      "RYT-500 Yoga Alliance Certified",
      "Yin Yoga Certification",
      "Prenatal Yoga Instructor",
      "Meditation Teacher Certification",
    ],
    specialties: [
      "Vinyasa Flow",
      "Yin Yoga",
      "Meditation",
      "Breathwork",
      "Restorative Yoga",
      "Prenatal Yoga",
    ],
    social: [
      { platform: "instagram", url: "#", icon: "fab fa-instagram" },
      { platform: "facebook", url: "#", icon: "fab fa-facebook-f" },
      { platform: "youtube", url: "#", icon: "fab fa-youtube" },
    ],
  },
  "mike-johnson": {
    name: "Mike Johnson",
    title: "CrossFit Coach",
    image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955",
    bio: "Mike is a dedicated CrossFit coach with a background in competitive athletics. He brings energy and enthusiasm to every session, motivating his clients to push beyond their limits and achieve extraordinary results.",
    experience:
      "Mike has been coaching CrossFit for 6 years and has competed at the regional level. He has helped hundreds of clients transform their bodies and improve their overall fitness through high-intensity interval training and functional movements.",
    certifications: [
      "CrossFit Level 3 Trainer",
      "USA Weightlifting Coach",
      "First Aid and CPR Certified",
      "Nutrition Specialist",
    ],
    specialties: [
      "CrossFit",
      "High-Intensity Interval Training",
      "Olympic Weightlifting",
      "Gymnastics",
      "Endurance Training",
      "Nutrition Coaching",
    ],
    social: [
      { platform: "instagram", url: "#", icon: "fab fa-instagram" },
      { platform: "twitter", url: "#", icon: "fab fa-twitter" },
      { platform: "facebook", url: "#", icon: "fab fa-facebook-f" },
    ],
  },
};

// Modal Elements
const modal = document.getElementById("trainer-modal");
const modalClose = document.querySelector(".modal-close");
const modalTrainerImg = document.getElementById("modal-trainer-img");
const modalTrainerName = document.getElementById("modal-trainer-name");
const modalTrainerTitle = document.getElementById("modal-trainer-title");
const modalTrainerBio = document.getElementById("modal-trainer-bio");
const modalTrainerExperience = document.getElementById(
  "modal-trainer-experience"
);
const modalTrainerCertifications = document.getElementById(
  "modal-trainer-certifications"
);
const modalTrainerSpecialties = document.getElementById(
  "modal-trainer-specialties"
);
const modalTrainerSocial = document.getElementById("modal-trainer-social");

// Open Modal Function
function openTrainerModal(trainerId) {
  const trainer = trainerData[trainerId];
  if (!trainer) return;

  // Populate modal with trainer data
  modalTrainerImg.src = trainer.image;
  modalTrainerImg.alt = trainer.name;
  modalTrainerName.textContent = trainer.name;
  modalTrainerTitle.textContent = trainer.title;
  modalTrainerBio.textContent = trainer.bio;
  modalTrainerExperience.textContent = trainer.experience;

  // Clear previous lists
  modalTrainerCertifications.innerHTML = "";
  modalTrainerSpecialties.innerHTML = "";
  modalTrainerSocial.innerHTML = "";

  // Add certifications
  trainer.certifications.forEach((cert) => {
    const li = document.createElement("li");
    li.textContent = cert;
    modalTrainerCertifications.appendChild(li);
  });

  // Add specialties
  trainer.specialties.forEach((specialty) => {
    const li = document.createElement("li");
    li.textContent = specialty;
    modalTrainerSpecialties.appendChild(li);
  });

  // Add social links
  trainer.social.forEach((social) => {
    const a = document.createElement("a");
    a.href = social.url;
    a.setAttribute("aria-label", `${trainer.name}'s ${social.platform}`);
    a.innerHTML = `<i class="${social.icon}"></i>`;
    modalTrainerSocial.appendChild(a);
  });

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

// Close Modal Function
function closeTrainerModal() {
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Event Listeners
document.querySelectorAll(".trainer-card").forEach((card) => {
  card.addEventListener("click", () => {
    const trainerId = card.getAttribute("data-trainer-id");
    openTrainerModal(trainerId);
  });
});

modalClose.addEventListener("click", closeTrainerModal);

// Close modal when clicking outside the modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeTrainerModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeTrainerModal();
  }
});

// FAQ Accordion
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});

// BMI Calculator Functionality
document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("bmi-calculate-btn");
  const heightInput = document.getElementById("bmi-height");
  const weightInput = document.getElementById("bmi-weight");
  const bmiValue = document.getElementById("bmi-result-value");
  const bmiCategory = document.getElementById("bmi-result-category");
  const healthMessage = document.getElementById("bmi-health-message");

  // Add input validation for height and weight
  heightInput.addEventListener("input", function () {
    validateInput(this, 100, 250);
  });

  weightInput.addEventListener("input", function () {
    validateInput(this, 30, 300);
  });

  function validateInput(input, min, max) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < min || value > max) {
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  }

  calculateButton.addEventListener("click", function () {
    const height = parseFloat(heightInput.value) / 100; // Convert cm to m
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      showError("Please enter valid height and weight values");
      return;
    }

    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);
    const message = getHealthMessage(category);

    displayResults(bmi, category, message);

    // Add animation effect
    bmiValue.classList.add("highlight");
    setTimeout(() => {
      bmiValue.classList.remove("highlight");
    }, 1000);
  });

  function calculateBMI(weight, height) {
    return (weight / (height * height)).toFixed(1);
  }

  function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  }

  function getHealthMessage(category) {
    const messages = {
      Underweight:
        "You may need to gain some weight. Consider consulting a nutritionist.",
      Normal:
        "Great! You are in a healthy weight range. Keep up the good work!",
      Overweight:
        "Consider increasing physical activity and maintaining a balanced diet.",
      Obese:
        "It's recommended to consult a healthcare professional for guidance.",
    };
    return messages[category];
  }

  function displayResults(bmi, category, message) {
    bmiValue.textContent = bmi;
    bmiCategory.textContent = category;
    healthMessage.innerHTML = `<i class="fas fa-info-circle"></i><p>${message}</p>`;

    // Update health message color based on category
    healthMessage.className = "health-message";
    healthMessage.classList.add(category.toLowerCase());
  }

  function showError(message) {
    healthMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><p>${message}</p>`;
    healthMessage.className = "health-message error";
    bmiValue.textContent = "--";
    bmiCategory.textContent = "--";
  }
});

// Testimonial Carousel
document.addEventListener("DOMContentLoaded", function () {
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  if (testimonialCards.length > 0) {
    let currentIndex = 0;
    const maxVisible = window.innerWidth < 768 ? 1 : 3;

    // Hide all cards initially except the first maxVisible
    testimonialCards.forEach((card, index) => {
      if (index >= maxVisible) {
        card.style.display = "none";
      }
    });

    // Create navigation if needed
    if (testimonialCards.length > maxVisible) {
      const testimonialSection = document.querySelector(".testimonials-grid");
      const navContainer = document.createElement("div");
      navContainer.className = "testimonial-nav";
      navContainer.innerHTML = `
        <button class="nav-prev" aria-label="Previous testimonial"><i class="fas fa-chevron-left"></i></button>
        <button class="nav-next" aria-label="Next testimonial"><i class="fas fa-chevron-right"></i></button>
      `;
      testimonialSection.after(navContainer);

      // Add event listeners to navigation buttons
      const prevButton = navContainer.querySelector(".nav-prev");
      const nextButton = navContainer.querySelector(".nav-next");

      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateTestimonialDisplay();
        }
      });

      nextButton.addEventListener("click", () => {
        if (currentIndex < testimonialCards.length - maxVisible) {
          currentIndex++;
          updateTestimonialDisplay();
        }
      });

      // Function to update which testimonials are visible
      function updateTestimonialDisplay() {
        testimonialCards.forEach((card, index) => {
          if (index >= currentIndex && index < currentIndex + maxVisible) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });

        // Update button states
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled =
          currentIndex >= testimonialCards.length - maxVisible;
      }

      // Initial button state
      prevButton.disabled = true;
    }
  }
});

// Pricing toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const annualToggle = document.getElementById("annual-toggle");
  if (annualToggle) {
    annualToggle.addEventListener("change", function () {
      const isAnnual = this.checked;
      const priceElements = document.querySelectorAll(".discounted-price");
      const originalPrices = document.querySelectorAll(".original-price");
      const discountBadges = document.querySelectorAll(".discount-badge");

      priceElements.forEach((el, index) => {
        const originalPrice = parseFloat(
          originalPrices[index].textContent.replace("$", "")
        );
        let discount = 0;

        if (isAnnual) {
          // Apply annual discount (20% more than monthly discount)
          const currentDiscount = parseInt(
            discountBadges[index].textContent
              .replace("Save ", "")
              .replace("%", "")
          );
          discount = currentDiscount + 20;
          discountBadges[index].textContent = `Save ${discount}%`;
        } else {
          // Reset to monthly discount
          const planIndex = index % 3;
          const discounts = [10, 20, 30]; // Discounts for each plan
          discount = discounts[planIndex];
          discountBadges[index].textContent = `Save ${discount}%`;
        }

        // Calculate new price
        const newPrice = ((originalPrice * (100 - discount)) / 100).toFixed(2);
        el.textContent = `$${newPrice}`;
      });

      // Update period text
      const periodTexts = document.querySelectorAll(".period");
      periodTexts.forEach((el) => {
        el.textContent = isAnnual ? "per year" : "per month";
      });
    });
  }
});

// Add scroll to top button
document.addEventListener("DOMContentLoaded", function () {
  // Create the button element
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Scroll to top when clicked
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
