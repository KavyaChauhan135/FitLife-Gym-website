document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Check if user is logged in
  const userData = JSON.parse(localStorage.getItem("fitlife_user"));
  if (!userData) {
    window.location.href =
      "../../pages/auth/login.html?redirect=fitness-tracker.html";
    window.location.href = "../../index.html";
    return;
  }

  // DOM Elements
  const workoutForm = document.getElementById("workout-form");
  const workoutEntries = document.getElementById("workout-entries");
  const noWorkoutsMessage = document.getElementById("no-workouts");

  // Load saved workouts from localStorage
  let workouts = JSON.parse(localStorage.getItem("fitlife_workouts")) || [];

  // Display workouts
  displayWorkouts();

  // Initialize charts
  initCharts();

  // Event listener for form submission
  workoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const type = document.getElementById("workout-type").value;
    const date = document.getElementById("workout-date").value;
    const duration = parseInt(
      document.getElementById("workout-duration").value
    );
    const notes = document.getElementById("workout-notes").value;

    // Create new workout object
    const workout = {
      id: Date.now(),
      type,
      date,
      duration,
      notes,
      userId: userData.id || "user1", // In a real app, this would be the user's ID
    };

    // Add to workouts array
    workouts.unshift(workout); // Add to beginning of array

    // Save to localStorage
    localStorage.setItem("fitlife_workouts", JSON.stringify(workouts));

    // Reset form
    workoutForm.reset();

    // Update display
    displayWorkouts();
    updateCharts();

    // Show notification
    showNotification("Workout logged successfully!");
  });

  // Function to display workouts
  function displayWorkouts() {
    // Filter workouts for current user
    const userWorkouts = workouts.filter(
      (workout) => workout.userId === (userData.id || "user1")
    );

    if (userWorkouts.length === 0) {
      noWorkoutsMessage.style.display = "block";
      workoutEntries.innerHTML = "";
      return;
    }

    noWorkoutsMessage.style.display = "none";

    // Clear current entries
    workoutEntries.innerHTML = "";

    // Add workout entries
    userWorkouts.forEach((workout) => {
      const workoutEl = document.createElement("div");
      workoutEl.className = "workout-entry";

      // Format date
      const formattedDate = new Date(workout.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Get icon based on workout type
      let icon;
      switch (workout.type) {
        case "strength":
          icon = "dumbbell";
          break;
        case "cardio":
          icon = "running";
          break;
        case "hiit":
          icon = "bolt";
          break;
        case "yoga":
          icon = "om";
          break;
        default:
          icon = "heartbeat";
      }

      workoutEl.innerHTML = `
        <div class="workout-header">
          <h4><i class="fas fa-${icon}"></i> ${
        workout.type.charAt(0).toUpperCase() + workout.type.slice(1)
      } Workout</h4>
          <span class="workout-date">${formattedDate}</span>
        </div>
        <p><strong>Duration:</strong> ${workout.duration} minutes</p>
        ${
          workout.notes ? `<p><strong>Notes:</strong> ${workout.notes}</p>` : ""
        }
        <div class="workout-actions">
          <button class="delete-workout" data-id="${
            workout.id
          }"><i class="fas fa-trash"></i></button>
        </div>
      `;

      workoutEntries.appendChild(workoutEl);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-workout").forEach((button) => {
      button.addEventListener("click", function () {
        const workoutId = parseInt(this.getAttribute("data-id"));
        deleteWorkout(workoutId);
      });
    });
  }

  // Function to delete a workout
  function deleteWorkout(id) {
    workouts = workouts.filter((workout) => workout.id !== id);
    localStorage.setItem("fitlife_workouts", JSON.stringify(workouts));
    displayWorkouts();
    updateCharts();
    showNotification("Workout deleted");
  }

  // Charts
  let frequencyChart, durationChart;

  function initCharts() {
    // Workout frequency chart
    const frequencyCtx = document
      .getElementById("frequency-chart")
      .getContext("2d");
    frequencyChart = new Chart(frequencyCtx, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Workouts This Week",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 77, 77, 0.7)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    // Workout duration chart
    const durationCtx = document
      .getElementById("duration-chart")
      .getContext("2d");
    durationChart = new Chart(durationCtx, {
      type: "line",
      data: {
        labels: [], // Will be populated with dates
        datasets: [
          {
            label: "Workout Duration (minutes)",
            data: [], // Will be populated with durations
            borderColor: "rgba(255, 77, 77, 1)",
            backgroundColor: "rgba(255, 77, 77, 0.1)",
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    updateCharts();
  }

  function updateCharts() {
    // Filter workouts for current user
    const userWorkouts = workouts.filter(
      (workout) => workout.userId === (userData.id || "user1")
    );

    // Update frequency chart
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday

    const weekDays = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat

    userWorkouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      // Check if workout is in current week
      if (workoutDate >= startOfWeek && workoutDate <= today) {
        const dayOfWeek = workoutDate.getDay(); // 0 for Sunday, 6 for Saturday
        weekDays[dayOfWeek]++;
      }
    });

    frequencyChart.data.datasets[0].data = weekDays;
    frequencyChart.update();

    // Update duration chart (last 7 workouts)
    const recentWorkouts = userWorkouts.slice(0, 7).reverse(); // Get last 7 workouts

    const dates = recentWorkouts.map((workout) => {
      const date = new Date(workout.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const durations = recentWorkouts.map((workout) => workout.duration);

    durationChart.data.labels = dates;
    durationChart.data.datasets[0].data = durations;
    durationChart.update();
  }

  // Helper function for notifications
  function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector(".tracker-notification");
    if (!notification) {
      notification = document.createElement("div");
      notification.className = "tracker-notification";
      document.body.appendChild(notification);

      // Add styles
      notification.style.position = "fixed";
      notification.style.bottom = "20px";
      notification.style.right = "20px";
      notification.style.background = "var(--primary-color)";
      notification.style.color = "white";
      notification.style.padding = "1rem 1.5rem";
      notification.style.borderRadius = "5px";
      notification.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)";
      notification.style.transform = "translateY(100px)";
      notification.style.opacity = "0";
      notification.style.transition = "all 0.3s ease";
    }

    // Set message and show
    notification.textContent = message;
    notification.style.transform = "translateY(0)";
    notification.style.opacity = "1";

    // Hide after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateY(100px)";
      notification.style.opacity = "0";
    }, 3000);
  }

  // Logout functionality
  document.getElementById("logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("fitlife_user");
    window.location.href = "index.html";
  });
});
