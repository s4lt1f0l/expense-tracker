// ------------------------------- NAVIGATION ---------------------------------- //
const navDashboard = document.getElementById("dashboard") as HTMLLinkElement;
const navTransactions = document.getElementById("transactions") as HTMLLinkElement; 
const navBudgets = document.getElementById("budgets") as HTMLLinkElement;
const navReports = document.getElementById("reports") as HTMLLinkElement;
const navSavingGoals = document.getElementById("saving-goals") as HTMLLinkElement;

const dashboardSection = document.getElementById("dashboard-section") as HTMLElement;
const transactionsSection = document.getElementById("transactions-section") as HTMLElement;
const budgetsSection = document.getElementById("budgets-section") as HTMLElement;
const reportsSection = document.getElementById("reports-section") as HTMLElement;
const savingGoalsSection = document.getElementById("saving-goals-section") as HTMLElement;

const elements = [dashboardSection, transactionsSection, budgetsSection, reportsSection, savingGoalsSection];
function hideAll(elements: HTMLElement[]): void {
    elements.forEach(element => {
        element.classList.add("hidden");
    });
};

navDashboard.addEventListener("click", () => {
    hideAll(elements);
    dashboardSection.classList.remove("hidden");
})
navTransactions.addEventListener("click", () => {
    hideAll(elements);
    transactionsSection.classList.remove("hidden");
})
navBudgets.addEventListener("click", () => {
    hideAll(elements);
    budgetsSection.classList.remove("hidden");
})
navReports.addEventListener("click", () => {
    hideAll(elements);
    reportsSection.classList.remove("hidden");
})
navSavingGoals.addEventListener("click", () => {
    hideAll(elements);
    savingGoalsSection.classList.remove("hidden");
})


// ------------------------------- TRANSACTIONS ---------------------------------- //

//DECLARE VARIABLES & TYPES

const addTransactionButton = document.getElementById("add-transaction") as HTMLButtonElement;
const closeModalButton = document.getElementById("close-modal-btn") as HTMLButtonElement;
const addTransactionModal = document.getElementById("add-transaction-modal") as HTMLDivElement;
const transactionForm = document.getElementById("transaction-form") as HTMLFormElement;
const transactionTable = document.getElementById("transaction-table") as HTMLTableElement;
const transactionTableBody = transactionTable?.querySelector("tbody") as HTMLTableSectionElement;


type  TransactionCategory =   | 'Food' 
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

// Utility function to generate unique IDs
function generateUniqueId(): string {
    return Math.random().toString(36).substring(7);
}
//STATE MANAGEMENT
let transactions: Transaction[] = [];
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
    const newTransaction: Transaction = {
        id: generateUniqueId(),
        date: new Date(formValues["date"] as string),
        description: formValues["description"] as string,
        amount: parseFloat(formValues["amount"] as string),
        type: formValues["type"] as TransactionType,
        category: formValues["category"] as TransactionCategory
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


transactionTableBody?.addEventListener("click", (event: Event) => {
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

const filterForm = document.getElementById("filter-form") as HTMLFormElement;
