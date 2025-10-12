// ------------------------------- NAVIGATION ---------------------------------- //
const navDashboard = document.getElementById("dashboard");
const navTransactions = document.getElementById("transactions");
const navBudgets = document.getElementById("budgets");
const navReports = document.getElementById("reports");
const navSavingGoals = document.getElementById("saving-goals");
const dashboardSection = document.getElementById("dashboard-section");
const transactionsSection = document.getElementById("transactions-section");
const budgetsSection = document.getElementById("budgets-section");
const reportsSection = document.getElementById("reports-section");
const savingGoalsSection = document.getElementById("saving-goals-section");
const elements = [dashboardSection, transactionsSection, budgetsSection, reportsSection, savingGoalsSection];
function hideAll(elements) {
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}
;
navDashboard.addEventListener("click", () => {
    hideAll(elements);
    dashboardSection.classList.remove("hidden");
});
navTransactions.addEventListener("click", () => {
    hideAll(elements);
    transactionsSection.classList.remove("hidden");
});
navBudgets.addEventListener("click", () => {
    hideAll(elements);
    budgetsSection.classList.remove("hidden");
});
navReports.addEventListener("click", () => {
    hideAll(elements);
    reportsSection.classList.remove("hidden");
});
navSavingGoals.addEventListener("click", () => {
    hideAll(elements);
    savingGoalsSection.classList.remove("hidden");
});
export {};
//# sourceMappingURL=navigate.js.map