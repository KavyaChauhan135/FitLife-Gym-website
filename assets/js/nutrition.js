document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.querySelector(".calculator-form");
  const resultsDiv = document.getElementById("calculator-results");

  if (calculatorForm) {
    calculatorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const age = parseInt(document.getElementById("age").value);
      const gender = document.getElementById("gender").value;
      const weight = parseFloat(document.getElementById("weight").value);
      const height = parseFloat(document.getElementById("height").value);
      const activityLevel = parseFloat(
        document.getElementById("activity").value
      );
      const goal = document.getElementById("goal").value;

      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr;
      if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      // Calculate TDEE (Total Daily Energy Expenditure)
      let tdee = bmr * activityLevel;

      // Adjust based on goal
      let calories;
      if (goal === "lose") {
        calories = tdee - 500; // 500 calorie deficit for weight loss
      } else if (goal === "gain") {
        calories = tdee + 500; // 500 calorie surplus for muscle gain
      } else {
        calories = tdee; // Maintain weight
      }

      // Calculate macros (protein, carbs, fat)
      let protein, carbs, fat;

      if (goal === "lose") {
        // Higher protein for weight loss
        protein = weight * 2.2; // 2.2g per kg of bodyweight
        fat = weight * 1; // 1g per kg of bodyweight
        // Remaining calories from carbs
        const proteinCalories = protein * 4;
        const fatCalories = fat * 9;
        const remainingCalories = calories - proteinCalories - fatCalories;
        carbs = Math.max(remainingCalories / 4, 50); // Minimum 50g carbs
      } else if (goal === "gain") {
        // Higher carbs for muscle gain
        protein = weight * 2; // 2g per kg of bodyweight
        fat = weight * 0.8; // 0.8g per kg of bodyweight
        // Remaining calories from carbs
        const proteinCalories = protein * 4;
        const fatCalories = fat * 9;
        const remainingCalories = calories - proteinCalories - fatCalories;
        carbs = remainingCalories / 4;
      } else {
        // Balanced for maintenance
        protein = weight * 1.8; // 1.8g per kg of bodyweight
        fat = weight * 0.8; // 0.8g per kg of bodyweight
        // Remaining calories from carbs
        const proteinCalories = protein * 4;
        const fatCalories = fat * 9;
        const remainingCalories = calories - proteinCalories - fatCalories;
        carbs = remainingCalories / 4;
      }

      // Display results
      document.getElementById("result-calories").textContent =
        Math.round(calories);
      document.getElementById("result-protein").textContent =
        Math.round(protein);
      document.getElementById("result-carbs").textContent = Math.round(carbs);
      document.getElementById("result-fat").textContent = Math.round(fat);

      // Show results
      resultsDiv.style.display = "block";

      // Smooth scroll to results
      resultsDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});
