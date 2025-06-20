document.addEventListener("DOMContentLoaded", () => {
  // Filter buttons
  const dayFilterButtons = document.querySelectorAll("[data-day]");
  const typeFilterButtons = document.querySelectorAll("[data-type]");
  const scheduleRows = document.querySelectorAll(".schedule-row");

  // Current filters
  let currentDayFilter = "all";
  let currentTypeFilter = "all";

  // Day filter functionality
  dayFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      dayFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Update current filter
      currentDayFilter = button.getAttribute("data-day");

      // Apply filters
      applyFilters();
    });
  });

  // Type filter functionality
  typeFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      typeFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Update current filter
      currentTypeFilter = button.getAttribute("data-type");

      // Apply filters
      applyFilters();
    });
  });

  // Apply both filters
  function applyFilters() {
    scheduleRows.forEach((row) => {
      const rowDay = row.getAttribute("data-day");
      const rowType = row.getAttribute("data-type");

      // Check if row matches both filters
      const matchesDay =
        currentDayFilter === "all" || rowDay === currentDayFilter;
      const matchesType =
        currentTypeFilter === "all" || rowType === currentTypeFilter;

      // Show/hide row based on filters
      if (matchesDay && matchesType) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    // Check if no classes match the filters
    const visibleRows = document.querySelectorAll(
      '.schedule-row[style="display: "]'
    );
    const noResultsRow = document.getElementById("no-results-row");

    if (visibleRows.length === 0) {
      // Create no results row if it doesn't exist
      if (!noResultsRow) {
        const tableBody = document.getElementById("schedule-body");
        const newRow = document.createElement("tr");
        newRow.id = "no-results-row";
        newRow.innerHTML = `<td colspan="5" style="text-align: center; padding: 2rem;">No classes match your current filters.</td>`;
        tableBody.appendChild(newRow);
      } else {
        noResultsRow.style.display = "";
      }
    } else if (noResultsRow) {
      noResultsRow.style.display = "none";
    }
  }

  // Book class functionality
  const bookButtons = document.querySelectorAll(".book-btn");
  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem("fitlife_user");

      if (!isLoggedIn) {
        // Redirect to login page with return URL
        window.location.href = `login.html?redirect=schedule.html`;
        return;
      }

      // Get class details
      const row = this.closest("tr");
      const time = row.cells[0].textContent;
      const className = row.querySelector(".class-details h4").textContent;
      const trainer = row.querySelector(".class-details p").textContent;
      const day = row.getAttribute("data-day");

      // Update button state
      this.innerHTML = '<i class="fas fa-check"></i> Booked';
      this.classList.remove("book-btn");
      this.classList.add("booked-btn");
      this.disabled = true;

      // Save booking to localStorage
      saveBooking({
        day,
        time,
        className,
        trainer,
        date: getNextDayDate(day),
      });

      // Show confirmation
      showBookingConfirmation(className, day, time);
    });
  });

  // Function to get the next date for a specific day of the week
  function getNextDayDate(dayName) {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    const todayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const targetIndex = days.indexOf(dayName.toLowerCase());

    let daysUntilTarget = targetIndex - todayIndex;
    if (daysUntilTarget <= 0) {
      daysUntilTarget += 7; // If the day has passed this week, get next week's date
    }

    const targetDate = new Date();
    targetDate.setDate(today.getDate() + daysUntilTarget);

    return targetDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  }

  // Save booking to localStorage
  function saveBooking(bookingData) {
    const userData = JSON.parse(localStorage.getItem("fitlife_user"));
    if (!userData) return;

    const userId = userData.id || userData.email;

    // Get existing bookings
    const bookings = JSON.parse(localStorage.getItem("fitlife_bookings")) || {};

    // Initialize user bookings if not exists
    if (!bookings[userId]) {
      bookings[userId] = [];
    }

    // Add new booking
    bookings[userId].push({
      ...bookingData,
      id: Date.now(), // Use timestamp as unique ID
      bookedOn: new Date().toISOString(),
    });

    // Save updated bookings
    localStorage.setItem("fitlife_bookings", JSON.stringify(bookings));
  }

  // Show booking confirmation
  function showBookingConfirmation(className, day, time) {
    // Create confirmation element
    const confirmation = document.createElement("div");
    confirmation.className = "booking-confirmation";
    confirmation.innerHTML = `
      <div class="confirmation-content">
        <i class="fas fa-check-circle"></i>
        <h3>Class Booked!</h3>
        <p>You've successfully booked <strong>${className}</strong> on <strong>${day}</strong> at <strong>${time}</strong>.</p>
        <p>This class has been added to your dashboard.</p>
        <button class="close-confirmation">Close</button>
      </div>
    `;

    // Add to page
    document.body.appendChild(confirmation);

    // Show with animation
    setTimeout(() => {
      confirmation.classList.add("show");
    }, 10);

    // Close button functionality
    confirmation
      .querySelector(".close-confirmation")
      .addEventListener("click", () => {
        confirmation.classList.remove("show");
        setTimeout(() => {
          confirmation.remove();
        }, 300);
      });

    // Auto close after 5 seconds
    setTimeout(() => {
      if (document.body.contains(confirmation)) {
        confirmation.classList.remove("show");
        setTimeout(() => {
          confirmation.remove();
        }, 300);
      }
    }, 5000);
  }

  // Check for already booked classes
  function checkBookedClasses() {
    const userData = JSON.parse(localStorage.getItem("fitlife_user"));
    if (!userData) return;

    const userId = userData.id || userData.email;
    const bookings = JSON.parse(localStorage.getItem("fitlife_bookings")) || {};
    const userBookings = bookings[userId] || [];

    // Mark booked classes
    scheduleRows.forEach((row) => {
      const day = row.getAttribute("data-day");
      const time = row.cells[0].textContent;
      const className = row.querySelector(".class-details h4").textContent;

      const isBooked = userBookings.some(
        (booking) =>
          booking.day === day &&
          booking.time === time &&
          booking.className === className
      );

      if (isBooked) {
        const bookBtn = row.querySelector(".book-btn");
        if (bookBtn) {
          bookBtn.innerHTML = '<i class="fas fa-check"></i> Booked';
          bookBtn.classList.remove("book-btn");
          bookBtn.classList.add("booked-btn");
          bookBtn.disabled = true;
        }
      }
    });
  }

  // Check for booked classes on page load
  checkBookedClasses();
});
