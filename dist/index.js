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
// ------------------------------- TRANSACTIONS ---------------------------------- //
//DECLARE VARIABLES & TYPES
const addTransactionButton = document.getElementById("add-transaction");
const closeModalButton = document.getElementById("close-modal-btn");
const addTransactionModal = document.getElementById("add-transaction-modal");
const transactionForm = document.getElementById("transaction-form");
const transactionTable = document.getElementById("transaction-table");
const transactionTableBody = transactionTable?.querySelector("tbody");
// Utility function to generate unique IDs
function generateUniqueId() {
    return Math.random().toString(36).substring(7);
}
//STATE MANAGEMENT
let transactions = [];
// EVENT LISTENERS
addTransactionButton?.addEventListener("click", () => {
    addTransactionModal.classList.remove("hidden");
});
closeModalButton?.addEventListener("click", () => {
    addTransactionModal.classList.add("hidden");
});
transactionForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(transactionForm);
    const formValues = Object.fromEntries(formData.entries());
    if (!formValues["description"] || !formValues["amount"] || !formValues["date"]) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return; // Dừng hàm nếu thiếu thông tin
    }
    const newTransaction = {
        id: generateUniqueId(),
        date: new Date(formValues["date"]),
        description: formValues["description"],
        amount: parseFloat(formValues["amount"]),
        type: formValues["type"],
        category: formValues["category"]
    };
    console.log("Transaction saved (not really, just a placeholder)");
    //log all info
    console.log(newTransaction);
    transactionForm.reset();
    const row = document.createElement("tr");
    const dateDataCell = document.createElement("td");
    const descriptionDataCell = document.createElement("td");
    const categoryDataCell = document.createElement("td");
    const typeDataCell = document.createElement("td");
    const amountDataCell = document.createElement("td");
    const deleteButtonCell = document.createElement("td");
    dateDataCell.innerHTML = `${newTransaction.date.toLocaleDateString()}`;
    descriptionDataCell.innerHTML = `${newTransaction.description}`;
    categoryDataCell.innerHTML = `${newTransaction.category}`;
    typeDataCell.innerHTML = `${newTransaction.type === "income" ? "+" : "-"}`;
    amountDataCell.innerHTML = `${newTransaction.type === 'income' ? '+' : '-'}$${newTransaction.amount.toFixed(2)}`;
    deleteButtonCell.innerHTML = `<button class="delete-button text-red-500 hover:underline">Delete</button>`;
    dateDataCell.classList.add("text-center");
    categoryDataCell.classList.add("text-center");
    typeDataCell.classList.add("text-center");
    amountDataCell.classList.add("text-center");
    row.appendChild(dateDataCell);
    row.appendChild(descriptionDataCell);
    row.appendChild(categoryDataCell);
    row.appendChild(typeDataCell);
    row.appendChild(amountDataCell);
    row.appendChild(deleteButtonCell);
    transactionTableBody.appendChild(row);
    addTransactionModal.classList.add("hidden");
});
transactionTableBody?.addEventListener("click", (event) => {
    const target = event.target;
    console.log(target);
    if (!target)
        return;
    if (!(target instanceof HTMLElement))
        return;
    // Kiểm tra xem có click vào nút delete không
    if (target.classList.contains("delete-button")) {
        // tìm dòng cha gần nhất của nút delete
        const row = target.closest("tr");
        if (row)
            row.remove();
    }
});
// FILTER TRANSACTIONS
const filterForm = document.getElementById("filter-form");
export {};
//# sourceMappingURL=index.js.map