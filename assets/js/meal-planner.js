document.addEventListener("DOMContentLoaded", () => {
  // Sample meal data - in a real app, this would come from a database
  const mealOptions = {
    breakfast: [
      {
        name: "Protein Oatmeal",
        calories: 350,
        protein: 20,
        carbs: 45,
        fat: 10,
      },
      {
        name: "Greek Yogurt Parfait",
        calories: 300,
        protein: 15,
        carbs: 40,
        fat: 8,
      },
      {
        name: "Veggie Omelette",
        calories: 280,
        protein: 18,
        carbs: 5,
        fat: 20,
      },
    ],
    lunch: [
      { name: "Chicken Salad", calories: 400, protein: 35, carbs: 20, fat: 15 },
      { name: "Quinoa Bowl", calories: 450, protein: 15, carbs: 65, fat: 12 },
      { name: "Turkey Wrap", calories: 380, protein: 25, carbs: 40, fat: 10 },
    ],
    dinner: [
      {
        name: "Salmon with Veggies",
        calories: 420,
        protein: 30,
        carbs: 15,
        fat: 25,
      },
      {
        name: "Stir Fry with Tofu",
        calories: 380,
        protein: 20,
        carbs: 45,
        fat: 12,
      },
      {
        name: "Lean Beef Pasta",
        calories: 520,
        protein: 35,
        carbs: 60,
        fat: 15,
      },
    ],
    snack: [
      { name: "Protein Shake", calories: 180, protein: 25, carbs: 10, fat: 3 },
      {
        name: "Apple with Almond Butter",
        calories: 200,
        protein: 5,
        carbs: 25,
        fat: 10,
      },
      { name: "Greek Yogurt", calories: 120, protein: 15, carbs: 8, fat: 0 },
    ],
  };

  // Initialize the meal planner
  function initMealPlanner() {
    // Populate meal options in sidebar
    populateMealOptions();

    // Generate meal days for the current week
    generateMealDays();

    // Set up event listeners
    setupEventListeners();
  }

  // Populate meal options in the sidebar
  function populateMealOptions() {
    for (const [category, meals] of Object.entries(mealOptions)) {
      const container = document.getElementById(`${category}-options`);
      if (!container) continue;

      meals.forEach((meal) => {
        const mealItem = document.createElement("div");
        mealItem.className = "meal-item";
        mealItem.innerHTML = `
          <h5>${meal.name}</h5>
          <p>${meal.calories} cal | ${meal.protein}g protein</p>
          <div class="meal-actions">
            <button class="add-meal" data-meal='${JSON.stringify(
              meal
            )}' data-category="${category}">Add to Plan</button>
          </div>
        `;
        container.appendChild(mealItem);
      });
    }
  }

  // Generate meal days for the week
  function generateMealDays() {
    const daysContainer = document.getElementById("meal-days");
    if (!daysContainer) return;

    // Clear existing content
    daysContainer.innerHTML = "";

    // Get current date and start of week (Sunday)
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday

    // Update week range display
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    document.getElementById("week-range").textContent = `${formatDate(
      startOfWeek
    )} - ${formatDate(endOfWeek)}`;

    // Generate days
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const dayElement = document.createElement("div");
      dayElement.className = "meal-day";
      dayElement.innerHTML = `
        <div class="meal-day-header">
          <h3>${getDayName(day.getDay())} - ${formatDate(day)}</h3>
          <div class="day-total">
            <span>Daily Total: <strong>0 cal</strong></span>
          </div>
        </div>
        <div class="meal-slots">
          <div class="meal-slot">
            <h4><i class="fas fa-coffee"></i> Breakfast</h4>
            <button class="add-meal-btn" data-day="${i}" data-meal-type="breakfast">
              <i class="fas fa-plus"></i>
              <span>Add Breakfast</span>
            </button>
          </div>
          <div class="meal-slot">
            <h4><i class="fas fa-utensils"></i> Lunch</h4>
            <button class="add-meal-btn" data-day="${i}" data-meal-type="lunch">
              <i class="fas fa-plus"></i>
              <span>Add Lunch</span>
            </button>
          </div>
          <div class="meal-slot">
            <h4><i class="fas fa-moon"></i> Dinner</h4>
            <button class="add-meal-btn" data-day="${i}" data-meal-type="dinner">
              <i class="fas fa-plus"></i>
              <span>Add Dinner</span>
            </button>
          </div>
          <div class="meal-slot">
            <h4><i class="fas fa-apple-alt"></i> Snacks</h4>
            <button class="add-meal-btn" data-day="${i}" data-meal-type="snack">
              <i class="fas fa-plus"></i>
              <span>Add Snack</span>
            </button>
          </div>
        </div>
      `;

      daysContainer.appendChild(dayElement);
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    // Week navigation
    document.getElementById("prev-week").addEventListener("click", () => {
      // In a real app, this would navigate to the previous week
      alert("Navigate to previous week");
    });

    document.getElementById("next-week").addEventListener("click", () => {
      // In a real app, this would navigate to the next week
      alert("Navigate to next week");
    });

    // Add meal buttons
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-meal-btn")) {
        const button = e.target.closest(".add-meal-btn");
        const day = button.dataset.day;
        const mealType = button.dataset.mealType;

        // In a real app, this would open a meal selection modal
        alert(`Add ${mealType} for day ${day}`);
      }
    });

    // Add meal from sidebar
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-meal")) {
        const mealData = JSON.parse(e.target.dataset.meal);
        const category = e.target.dataset.category;

        // In a real app, this would add the meal to the selected day/slot
        alert(`Add ${mealData.name} (${category}) to meal plan`);
      }
    });

    // Create custom meal
    document.getElementById("create-meal-btn").addEventListener("click", () => {
      // In a real app, this would open a form to create a custom meal
      alert("Create custom meal");
    });
  }

  // Helper function to format date
  function formatDate(date) {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  // Helper function to get day name
  function getDayName(dayIndex) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex];
  }

  // Initialize the meal planner
  initMealPlanner();
});
