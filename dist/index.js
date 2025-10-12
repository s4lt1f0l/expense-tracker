// ------------------------------- NAVIGATION ---------------------------------- //
//DECLARE ELEMENTS
const dashboardSection = document.getElementById("dashboard-section");
const transactionsSection = document.getElementById("transactions-section");
const budgetsSection = document.getElementById("budgets-section");
const reportsSection = document.getElementById("reports-section");
const savingGoalsSection = document.getElementById("saving-goals-section");
const navContent = document.querySelector(".navigate-content");
const elements = [dashboardSection, transactionsSection, budgetsSection, reportsSection, savingGoalsSection];
// UTILITY FUNCTIONS
function hideAll(elements) {
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}
;
// EVENT LISTENERS
// Default view
navContent?.addEventListener("click", (e) => {
    hideAll(elements);
    const target = e.target;
    if (!target)
        return;
    if (!(target instanceof HTMLElement))
        return;
    if (target.tagName !== "A")
        return;
    if (target.id === "dashboard") {
        dashboardSection.classList.remove("hidden");
    }
    else if (target.id === "transactions") {
        transactionsSection.classList.remove("hidden");
    }
    else if (target.id === "budgets") {
        budgetsSection.classList.remove("hidden");
    }
    else if (target.id === "reports") {
        reportsSection.classList.remove("hidden");
    }
    else if (target.id === "saving-goals") {
        savingGoalsSection.classList.remove("hidden");
    }
});
// ------------------------------- TRANSACTIONS ---------------------------------- //
//DECLARE ELEMENTS
const addTransactionButton = document.getElementById("add-transaction");
const closeModalButton = document.getElementById("close-modal-btn");
const addTransactionModal = document.getElementById("add-transaction-modal");
const transactionForm = document.getElementById("transaction-form");
const transactionTable = document.getElementById("transaction-table");
const transactionTableBody = transactionTable?.querySelector("tbody");
// TYPE DEFINITIONS & STATE
let transactions = [];
// UTILITY FUNCTIONS
function generateUniqueId() {
    return Math.random().toString(36).substring(7);
}
function renderTransactions() {
    transactionTableBody.innerHTML = "";
    transactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.setAttribute("data-transaction-id", transaction.id);
        row.innerHTML = `
            <td class="text-center">${transaction.date.toLocaleDateString()}</td>
            <td>${transaction.description}</td>
            <td class="text-center">${transaction.category}</td>
            <td class="text-center">${transaction.type === "income" ? "+" : "-"}</td>
            <td class="text-center">${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</td>
            <td><button class="delete-button text-red-500 hover:underline">Delete</button></td>
        `;
        transactionTableBody.appendChild(row);
    });
}
// EVENT LISTENERS
// Open/Close Modal
addTransactionButton?.addEventListener("click", () => {
    addTransactionModal.classList.remove("hidden");
});
closeModalButton?.addEventListener("click", () => {
    addTransactionModal.classList.add("hidden");
});
// Add Transaction
transactionForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(transactionForm);
    const formValues = Object.fromEntries(formData.entries());
    if (!formValues["description"] || !formValues["amount"] || !formValues["date"]) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    const newTransaction = {
        id: generateUniqueId(),
        date: new Date(formValues["date"]),
        description: formValues["description"],
        amount: parseFloat(formValues["amount"]),
        type: formValues["type"],
        category: formValues["category"]
    };
    transactions.push(newTransaction);
    console.log("Transaction saved");
    renderTransactions();
    transactionForm.reset();
    addTransactionModal.classList.add("hidden");
});
// Delete Transaction
transactionTableBody?.addEventListener("click", (event) => {
    const target = event.target;
    if (!target)
        return;
    if (!(target instanceof HTMLElement))
        return;
    if (target.classList.contains("delete-button")) {
        const row = target.closest("tr");
        const transactionId = row?.dataset['transaction-id'];
        if (!transactionId)
            return;
        transactions = transactions.filter(t => t.id !== transactionId);
        renderTransactions();
    }
});
export {};
//# sourceMappingURL=index.js.map