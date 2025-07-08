let transactions = [];
let chart;

function addTransaction() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description === "" || isNaN(amount)) {
        alert("Please enter valid details.");
        return;
    }

    const transaction = { description, amount, type };
    transactions.push(transaction);

    document.getElementById('description').value = "";
    document.getElementById('amount').value = "";

    updateUI();
    updateCharts();
}

function updateUI() {
    const transactionList = document.getElementById('transaction-list');
    const balanceElement = document.getElementById('balance');
    transactionList.innerHTML = '';

    let totalBalance = 0;

    transactions.forEach((txn, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${txn.description} - $${txn.amount.toFixed(2)} (${txn.type})
            <button onclick="deleteTransaction(${index})">X</button>
        `;

        li.style.color = txn.type === 'income' ? 'green' : 'red';

        if (txn.type === 'income') {
            totalBalance += txn.amount;
        } else {
            totalBalance -= txn.amount;
        }

        transactionList.appendChild(li);
    });

    balanceElement.textContent = totalBalance.toFixed(2);
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
    updateCharts();
}

document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#28a745', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
});

function updateCharts() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    chart.data.datasets[0].data = [income, expense];
    chart.update();
}
