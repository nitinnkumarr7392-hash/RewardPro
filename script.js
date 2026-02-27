// App Economy Config
let totalCoins = 0;
const coinValueInRupees = 100; // 100 Coins = 1 Rupee
const minWithdrawRupees = 5; // Minimum 5 Rupees withdraw

// Function to update UI Balance
function updateBalance() {
    const rupees = (totalCoins / coinValueInRupees).toFixed(2);
    
    // Update Header
    document.getElementById('coin-count').innerText = totalCoins;
    document.getElementById('rupee-count').innerText = rupees;
    
    // Update Wallet Page
    document.getElementById('wallet-coins').innerText = totalCoins;
    document.getElementById('wallet-rupee').innerText = rupees;

    // Update Progress Bar
    const progressPercent = Math.min(((rupees / minWithdrawRupees) * 100), 100);
    document.getElementById('withdraw-progress').style.width = `${progressPercent}%`;

    // Change progress bar color if target reached
    if (progressPercent >= 100) {
        document.getElementById('withdraw-progress').style.background = "#00FF88"; // Green when ready
    }
}

// Function to switch Bottom Navigation Tabs
function switchTab(tabId, element) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    // Remove active style from all nav items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

// Task Completion Logic
function completeTask(coinsToReward, buttonElement, taskName) {
    // Prevent double clicking
    if(buttonElement.disabled) return;
    
    // Add coins
    totalCoins += coinsToReward;
    updateBalance();

    // Visual Feedback on Button
    buttonElement.innerText = "Completed ✔";
    buttonElement.style.background = "rgba(0, 255, 136, 0.2)";
    buttonElement.style.color = "#00FF88";
    buttonElement.disabled = true;

    // Show Success Modal
    showModal("Task Completed!", `+${coinsToReward} Coins added from ${taskName}`);
}

// Daily Check-In Specific Logic
function dailyCheckIn() {
    const btn = document.getElementById('checkin-btn');
    if(!btn.disabled) {
        totalCoins += 50;
        updateBalance();
        btn.innerText = "Claimed for Today ✔";
        btn.style.background = "rgba(255,255,255,0.1)";
        btn.classList.remove('pulse-anim');
        btn.disabled = true;
        showModal("Streak Maintained! 🔥", "+50 Coins added to your wallet.");
    }
}

// Lucky Spin Simulation
function spinWheel() {
    // Generate random coins between 5 and 50
    const randomCoins = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    totalCoins += randomCoins;
    updateBalance();
    showModal("Lucky Spin Winner! 🎡", `You won ${randomCoins} Coins!`);
}

// Withdrawal Logic
function requestWithdraw() {
    const currentRupees = totalCoins / coinValueInRupees;
    const paymentId = document.getElementById('payout-id').value;

    if(paymentId === "") {
        alert("Please enter your Paytm/UPI ID first!");
        return;
    }

    if (currentRupees >= minWithdrawRupees) {
        showModal("Withdrawal Successful! 💸", `₹${currentRupees.toFixed(2)} sent to ${paymentId}. Please wait 24 hours.`);
        // Reset balance
        totalCoins = 0;
        updateBalance();
        document.getElementById('payout-id').value = "";
    } else {
        alert(`Bhai, ₹5 minimum withdraw hai. Abhi aapke paas ₹${currentRupees.toFixed(2)} hain.`);
    }
}

// Modal Control Functions
function showModal(title, message) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-msg').innerText = message;
    document.getElementById('success-modal').style.display = "flex";
}

function closeModal() {
    document.getElementById('success-modal').style.display = "none";
}

// Initialize Dashboard
updateBalance();
