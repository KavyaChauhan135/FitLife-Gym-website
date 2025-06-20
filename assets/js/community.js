document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Forum category navigation
  const categoryLinks = document.querySelectorAll(".forum-categories a");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      categoryLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      link.classList.add("active");

      // Update forum header title
      const categoryName = link.textContent.trim();
      document.querySelector(".forum-header h3").textContent = categoryName;

      // In a real app, this would load discussions for the selected category
      // For now, we'll just show a message
      const discussionList = document.querySelector(".discussion-list");
      discussionList.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
          <p>Loading discussions for ${categoryName}...</p>
        </div>
      `;

      // Simulate loading delay
      setTimeout(() => {
        // In a real app, this would be replaced with actual data from the server
        discussionList.innerHTML = generateDiscussions(categoryName);

        // Add event listeners to the new discussion items
        addDiscussionEventListeners();
      }, 1000);
    });
  });

  // Generate sample discussions based on category
  function generateDiscussions(category) {
    const discussions = {
      "General Discussion": [
        {
          title: "Welcome to FitLife Community!",
          author: "Admin",
          replies: 15,
          views: 324,
        },
        {
          title: "Introduce yourself here",
          author: "JaneDoe",
          replies: 42,
          views: 567,
        },
        {
          title: "Gym etiquette tips for beginners",
          author: "FitPro",
          replies: 28,
          views: 412,
        },
      ],
      "Workout Tips": [
        {
          title: "Best exercises for core strength",
          author: "CoreMaster",
          replies: 32,
          views: 478,
        },
        {
          title: "How to improve your squat form",
          author: "LegDay",
          replies: 19,
          views: 356,
        },
        {
          title: "Upper body workout routine",
          author: "ArmGains",
          replies: 24,
          views: 401,
        },
      ],
      Nutrition: [
        {
          title: "Protein intake for muscle building",
          author: "NutritionExpert",
          replies: 37,
          views: 512,
        },
        {
          title: "Pre-workout meal ideas",
          author: "MealPrep101",
          replies: 21,
          views: 389,
        },
        {
          title: "How to track macros effectively",
          author: "MacroCounter",
          replies: 18,
          views: 342,
        },
      ],
      "Success Stories": [
        {
          title: "Lost 30 pounds in 6 months!",
          author: "WeightLossWinner",
          replies: 45,
          views: 623,
        },
        {
          title: "From skinny to strong - my journey",
          author: "GainzGetter",
          replies: 29,
          views: 478,
        },
        {
          title: "How I improved my marathon time",
          author: "RunnerPro",
          replies: 16,
          views: 312,
        },
      ],
      "Equipment & Gear": [
        {
          title: "Best budget-friendly home gym equipment",
          author: "HomeFitness",
          replies: 31,
          views: 467,
        },
        {
          title: "Workout shoes comparison",
          author: "ShoeExpert",
          replies: 23,
          views: 398,
        },
        {
          title: "Fitness trackers worth buying",
          author: "TechFit",
          replies: 27,
          views: 421,
        },
      ],
    };

    const categoryDiscussions =
      discussions[category] || discussions["General Discussion"];

    let html = "";
    categoryDiscussions.forEach((discussion) => {
      html += `
        <div class="discussion-item">
          <div class="discussion-avatar">
            <i class="fas fa-user-circle"></i>
          </div>
          <div class="discussion-content">
            <h4>${discussion.title}</h4>
            <div class="discussion-meta">
              <span><i class="fas fa-user"></i> ${discussion.author}</span>
              <span><i class="fas fa-comment"></i> ${discussion.replies} replies</span>
              <span><i class="fas fa-eye"></i> ${discussion.views} views</span>
            </div>
          </div>
          <div class="discussion-action">
            <button class="view-discussion">View</button>
          </div>
        </div>
      `;
    });

    return html;
  }

  // Add event listeners to discussion items
  function addDiscussionEventListeners() {
    document.querySelectorAll(".view-discussion").forEach((button) => {
      button.addEventListener("click", function () {
        const discussionTitle =
          this.closest(".discussion-item").querySelector("h4").textContent;
        alert(
          `Viewing discussion: ${discussionTitle}\n\nIn a real application, this would open the full discussion thread.`
        );
      });
    });
  }

  // Initialize with General Discussion
  document.querySelector(".forum-categories a").click();

  // New discussion button
  document
    .querySelector(".new-discussion-btn")
    .addEventListener("click", function () {
      alert(
        "In a real application, this would open a form to create a new discussion thread."
      );
    });
});
