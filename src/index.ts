// ------------------------------- NAVIGATION ---------------------------------- //
//DECLARE ELEMENTS
const dashboardSection = document.getElementById("dashboard-section") as HTMLElement;
const transactionsSection = document.getElementById("transactions-section") as HTMLElement;
const budgetsSection = document.getElementById("budgets-section") as HTMLElement;
const reportsSection = document.getElementById("reports-section") as HTMLElement;
const savingGoalsSection = document.getElementById("saving-goals-section") as HTMLElement;
const navContent = document.querySelector(".navigate-content") as HTMLElement;
const elements = [dashboardSection, transactionsSection, budgetsSection, reportsSection, savingGoalsSection];

// UTILITY FUNCTIONS
function hideAll(elements: HTMLElement[]): void {
    elements.forEach(element => {
        element.classList.add("hidden");
    });
};

// EVENT LISTENERS
// Default view
navContent?.addEventListener("click", (e: Event) => {
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
const addTransactionButton = document.getElementById("add-transaction") as HTMLButtonElement;
const closeModalButton = document.getElementById("close-modal-btn") as HTMLButtonElement;
const addTransactionModal = document.getElementById("add-transaction-modal") as HTMLDivElement;
const transactionForm = document.getElementById("transaction-form") as HTMLFormElement;
const transactionTable = document.getElementById("transaction-table") as HTMLTableElement;
const transactionTableBody = transactionTable?.querySelector("tbody") as HTMLTableSectionElement;


// TYPE DEFINITIONS & STATE
let transactions: Transaction[] = [];

type TransactionCategory = | 'Food'
    | 'Transportation'
    | 'Housing'
    | 'Utilities'
    | 'Entertainment'
    | 'Shopping'
    | 'Salary'
    | 'Freelance'
    | 'Investment'
    | 'Other';

type TransactionType = 'income' | 'expense';

interface Transaction {
    id: string;
    date: Date;
    description: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
}


// UTILITY FUNCTIONS
function generateUniqueId(): string {
    return Math.random().toString(36).substring(7);
}
function renderTransactions(): void {
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
    const newTransaction: Transaction = {
        id: generateUniqueId(),
        date: new Date(formValues["date"] as string),
        description: formValues["description"] as string,
        amount: parseFloat(formValues["amount"] as string),
        type: formValues["type"] as TransactionType,
        category: formValues["category"] as TransactionCategory
    };
    transactions.push(newTransaction);
    console.log("Transaction saved");
    renderTransactions();
    transactionForm.reset();
    addTransactionModal.classList.add("hidden");
});

// Delete Transaction
transactionTableBody?.addEventListener("click", (event: Event) => {
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



