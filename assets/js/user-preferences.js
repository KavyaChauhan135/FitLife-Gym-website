// User Preferences Manager
const UserPreferences = {
  // Default preferences
  defaults: {
    theme: "light",
    notifications: true,
    units: "metric", // metric or imperial
    lastVisitedPage: null,
  },

  // Get all preferences
  getAll() {
    const stored = localStorage.getItem("fitlife_preferences");
    return stored ? JSON.parse(stored) : this.defaults;
  },

  // Get a specific preference
  get(key) {
    const prefs = this.getAll();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  },

  // Set a preference
  set(key, value) {
    const prefs = this.getAll();
    prefs[key] = value;
    localStorage.setItem("fitlife_preferences", JSON.stringify(prefs));
    return value;
  },

  // Track page visit
  trackPageVisit() {
    const currentPage = window.location.pathname.split("/").pop();
    this.set("lastVisitedPage", currentPage);
  },

  // Apply theme
  applyTheme() {
    const theme = this.get("theme");
    document.body.setAttribute("data-theme", theme);
  },
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Apply user preferences
  UserPreferences.applyTheme();
  UserPreferences.trackPageVisit();

  // Add theme toggle if it exists
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const currentTheme = UserPreferences.get("theme");
    themeToggle.checked = currentTheme === "dark";

    themeToggle.addEventListener("change", function () {
      const newTheme = this.checked ? "dark" : "light";
      UserPreferences.set("theme", newTheme);
      UserPreferences.applyTheme();
    });
  }
});
