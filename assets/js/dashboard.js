document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const userData = JSON.parse(localStorage.getItem("fitlife_user"));
  if (!userData) {
    window.location.href = "../pages/auth/login.html";
    return;
  }

  // Set user information
  document.getElementById("user-name").textContent = userData.fullname;
  document.getElementById("membership-type").textContent =
    userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1) + " Member";

  // Tab navigation
  const tabItems = document.querySelectorAll(".dashboard-menu li");
  const tabContents = document.querySelectorAll(".dashboard-tab");

  tabItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all tabs
      tabItems.forEach((tab) => tab.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab
      item.classList.add("active");
      const tabId = item.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Handle class booking/cancellation
  const cancelButtons = document.querySelectorAll(".btn-cancel");
  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const classCard = this.closest(".class-card");
      classCard.style.opacity = "0.5";
      this.textContent = "Cancelled";
      this.disabled = true;

      // Show notification
      showNotification("Class cancelled successfully");

      // In a real app, you would send this to the server
      setTimeout(() => {
        classCard.remove();
      }, 2000);
    });
  });

  // Logout functionality
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("fitlife_user");
    window.location.href = "../../pages/auth/login.html";
  });

  // Helper function for notifications
  function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector(".dashboard-notification");
    if (!notification) {
      notification = document.createElement("div");
      notification.className = "dashboard-notification";
      document.body.appendChild(notification);
    }

    // Set message and show
    notification.textContent = message;
    notification.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
});

// Add after the existing code

// Fitness Progress Chart
if (document.getElementById('fitness-chart')) {
  const ctx = document.getElementById('fitness-chart').getContext('2d');
  const fitnessChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Weight (kg)',
          data: [85, 84, 82, 81, 80, 78],
          borderColor: '#ff4d4d',
          backgroundColor: 'rgba(255, 77, 77, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Strength (max lift kg)',
          data: [60, 65, 68, 70, 75, 78],
          borderColor: '#4d79ff',
          backgroundColor: 'rgba(77, 121, 255, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// Workout Tracker
const workoutForm = document.getElementById('workout-form');
if (workoutForm) {
  workoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const workoutDate = document.getElementById('workout-date').value;
    const workoutType = document.getElementById('workout-type').value;
    const workoutDuration = document.getElementById('workout-duration').value;
    const workoutNotes = document.getElementById('workout-notes').value;
    
    // Create new workout entry
    const workoutList = document.getElementById('workout-list');
    const newWorkout = document.createElement('div');
    newWorkout.className = 'workout-item';
    newWorkout.innerHTML = `
      <div class="workout-date">${workoutDate}</div>
      <div class="workout-details">
        <h4>${workoutType}</h4>
        <p>${workoutDuration} minutes</p>
        <p class="workout-notes">${workoutNotes}</p>
      </div>
      <button class="btn-delete"><i class="fas fa-trash"></i></button>
    `;
    
    workoutList.prepend(newWorkout);
    workoutForm.reset();
    
    // Add delete functionality
    const deleteBtn = newWorkout.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function() {
      newWorkout.remove();
      showNotification('Workout deleted successfully');
    });
    
    showNotification('Workout added successfully');
  });
}

// Goal Setting
const goalForm = document.getElementById('goal-form');
if (goalForm) {
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const goalType = document.getElementById('goal-type').value;
    const goalTarget = document.getElementById('goal-target').value;
    const goalDeadline = document.getElementById('goal-deadline').value;
    
    // Create new goal entry
    const goalList = document.getElementById('goal-list');
    const newGoal = document.createElement('div');
    newGoal.className = 'goal-item';
    newGoal.innerHTML = `
      <div class="goal-info">
        <h4>${goalType}</h4>
        <p>Target: ${goalTarget}</p>
        <p>Deadline: ${goalDeadline}</p>
      </div>
      <div class="goal-actions">
        <button class="btn-complete"><i class="fas fa-check"></i></button>
        <button class="btn-delete"><i class="fas fa-trash"></i></button>
      </div>
    `;
    
    goalList.appendChild(newGoal);
    goalForm.reset();
    
    // Add complete and delete functionality
    const completeBtn = newGoal.querySelector('.btn-complete');
    completeBtn.addEventListener('click', function() {
      newGoal.classList.toggle('completed');
      showNotification('Goal marked as completed');
    });
    
    const deleteBtn = newGoal.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function() {
      newGoal.remove();
      showNotification('Goal deleted successfully');
    });
    
    showNotification('New goal added successfully');
  });
});
