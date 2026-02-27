// Current Balance
let currentBalance = 50.00;

// Function to switch tabs (Bottom Navigation)
function switchTab(tabId, element) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show the selected page
    document.getElementById(tabId).classList.add('active');

    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Add active class to clicked nav item
    element.classList.add('active');
}

// Function to simulate earning money from a task
function addMoney(amount, buttonElement) {
    // Update balance
    currentBalance += amount;
    
    // Update UI
    document.getElementById('balance').innerText = currentBalance.toFixed(2);
    document.getElementById('wallet-balance-big').innerText = currentBalance.toFixed(2);

    // Change button to show success
    buttonElement.innerText = "Claimed ✓";
    buttonElement.style.backgroundColor = "#ccc";
    buttonElement.disabled = true;

    // Small popup alert
    alert(`Mubarak ho! ₹${amount} aapke wallet mein add ho gaye hain.`);
}

// Function to handle withdrawal
function withdraw() {
    if (currentBalance >= 100) {
        alert("Withdrawal request lag gayi hai! Paise 24 ghante mein aapke account mein aa jayenge.");
        currentBalance = 0; // Reset balance after withdraw
        document.getElementById('balance').innerText = "0.00";
        document.getElementById('wallet-balance-big').innerText = "0.00";
    } else {
        alert("Bhai, minimum withdrawal ₹100 hai. Abhi aur tasks pure karo!");
    }
}
