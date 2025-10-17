// ------------------------------- NAVIGATION ---------------------------------- //
//DECLARE ELEMENTS
const dashboardSection = document.getElementById("dashboard-section") as HTMLElement;
const transactionsSection = document.getElementById("transactions-section") as HTMLElement;
const budgetsSection = document.getElementById("budgets-section") as HTMLElement;
const reportsSection = document.getElementById("reports-section") as HTMLElement;
const savingGoalsSection = document.getElementById("saving-goals-section") as HTMLElement;
const navContent = document.querySelector(".navigate-content") as HTMLElement;
const elements = [dashboardSection, transactionsSection, budgetsSection, reportsSection, savingGoalsSection];
function hideAll(elements: HTMLElement[]): void {
    elements.forEach(element => {
        element.classList.add("hidden");
    });
};

navContent?.addEventListener("click", (e: Event) => {
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
const addTransactionButton = document.getElementById("add-transaction") as HTMLButtonElement;
const closeModalButton = document.getElementById("close-modal-btn") as HTMLButtonElement;
const addTransactionModal = document.getElementById("add-transaction-modal") as HTMLDivElement;
const transactionForm = document.getElementById("transaction-form") as HTMLFormElement;
const transactionTable = document.getElementById("transaction-table") as HTMLTableElement;
const transactionTableBody = transactionTable?.querySelector("tbody") as HTMLTableSectionElement;
const filterForm = document.getElementById("filter") as HTMLFormElement;
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
function renderTransactions(trans:Transaction[]): void {
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
function filterTransactionByTime(t: Transaction,time: string ): boolean {
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
function filterTransaction(type: string, category: string, time: string): Transaction[] {
    return transactions.filter(t => {
        const typeMatch = type === "all" || t.type === type;
        const categoryMatch = category === "all" || t.category === category;
        const timeMatch = filterTransactionByTime(t,time);
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
    renderTransactions(transactions);
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
        renderTransactions(transactions);
    }
});

//Filter 
filterForm?.addEventListener("change", (e) => {
    e.preventDefault();
    const formData = new FormData(filterForm);
    const type = formData.get("transaction-type") as string;
    const category = formData.get("category-filter") as string;
    const time = formData.get("time-filter") as string;
    console.log(type, category, time);
    const filteredTransactions = filterTransaction(type, category, time);
    renderTransactions(filteredTransactions);
});


