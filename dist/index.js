// ------------------------------- NAVIGATION ---------------------------------- //
//DECLARE ELEMENTS
const dashboardSection = document.getElementById("dashboard-section");
const transactionsSection = document.getElementById("transactions-section");
const budgetsSection = document.getElementById("budgets-section");
const reportsSection = document.getElementById("reports-section");
const savingGoalsSection = document.getElementById("saving-goals-section");
const navContent = document.querySelector(".navigate-content");
const elements = [dashboardSection, transactionsSection, budgetsSection, reportsSection, savingGoalsSection];
function hideAll(elements) {
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}
;
navContent?.addEventListener("click", (e) => {
    hideAll(elements);
    const target = e.target;
    if (!target)
        return;
    if (!(target instanceof HTMLElement))
        return;
    const link = target.closest("a");
    if (!link)
        return;
    switch (link.id) {
        case "dashboard":
            dashboardSection.classList.remove("hidden");
            break;
        case "transactions":
            transactionsSection.classList.remove("hidden");
            break;
        case "budgets":
            budgetsSection.classList.remove("hidden");
            break;
        case "reports":
            reportsSection.classList.remove("hidden");
            break;
        case "saving-goals":
            savingGoalsSection.classList.remove("hidden");
            break;
        default:
            return;
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
const filterForm = document.getElementById("filter");
// TYPE DEFINITIONS & STATE
let transactions = [];
// UTILITY FUNCTIONS
function generateUniqueId() {
    return Math.random().toString(36).substring(7);
}
function renderTransactions(trans) {
    transactionTableBody.innerHTML = "";
    trans.forEach(t => {
        const row = document.createElement("tr");
        row.setAttribute("data-transaction-id", t.id);
        row.innerHTML = `
            <td class="text-center">${t.date.toLocaleDateString()}</td>
            <td>${t.description}</td>
            <td class="text-center">${t.category}</td>
            <td class="text-center">${t.type === "income" ? "+" : "-"}</td>
            <td class="text-center">${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}</td>
            <td><button class="delete-button text-red-500 hover:underline">Delete</button></td>
        `;
        transactionTableBody.appendChild(row);
    });
}
function filterTransactionByTime(t, time) {
    const now = new Date();
    switch (time) {
        case "this-month":
            return t.date.getMonth() === now.getMonth() && t.date.getFullYear() === now.getFullYear();
        case "this-year":
            return t.date.getFullYear() === now.getFullYear();
        case "last-7-days":
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            return t.date >= sevenDaysAgo && t.date <= now;
        case "last-30-days":
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);
            return t.date >= thirtyDaysAgo && t.date <= now;
        case "last-month":
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            return t.date.getMonth() === lastMonth.getMonth() && t.date.getFullYear() === lastMonth.getFullYear();
        case "all":
        default:
            return true;
    }
}
function filterTransaction(type, category, time) {
    return transactions.filter(t => {
        const typeMatch = type === "all" || t.type === type;
        const categoryMatch = category === "all" || t.category === category;
        const timeMatch = filterTransactionByTime(t, time);
        return typeMatch && categoryMatch && timeMatch;
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
    renderTransactions(transactions);
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
        renderTransactions(transactions);
    }
});
//Filter 
filterForm?.addEventListener("change", (e) => {
    e.preventDefault();
    const formData = new FormData(filterForm);
    const type = formData.get("transaction-type");
    const category = formData.get("category-filter");
    const time = formData.get("time-filter");
    console.log(type, category, time);
    const filteredTransactions = filterTransaction(type, category, time);
    renderTransactions(filteredTransactions);
});
export {};
//# sourceMappingURL=index.js.map