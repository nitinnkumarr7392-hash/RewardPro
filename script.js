// --- 1. LOCAL STORAGE (Save Data Permanently) ---
let totalCoins = parseInt(localStorage.getItem('userCoins')) || 0;
let playtimeLimit = parseInt(localStorage.getItem('playLimit')) || 5; 
const coinValueInRupees = 100; // 100 Coins = 1 Rupee
let selectedWithdrawAmount = 5; // Default amount

// Check Login Status on Start
window.onload = function() {
    if(localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        updateBalance();
    }
}

function doLogin() {
    const mobile = document.getElementById('mobile-number').value;
    if(mobile.length >= 10) {
        // Save to Local Storage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userMobile', mobile);
        
        // Change screen
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        updateBalance();
    } else {
        alert("Bhai, sahi mobile number daalo (10 digits).");
    }
}

// --- 2. BALANCE & REFRESH FIX ---
function updateBalance() {
    // Save coins to storage so they don't disappear on refresh
    localStorage.setItem('userCoins', totalCoins);
    
    const rupees = (totalCoins / coinValueInRupees).toFixed(2);
    document.getElementById('coin-count').innerText = totalCoins;
    document.getElementById('rupee-count').innerText = rupees;
    document.getElementById('wallet-rupee').innerText = rupees;
}

// --- 3. SPIN WHEEL LOGIC (With Animation) ---
function openSpinModal() {
    document.getElementById('spin-modal').style.display = 'flex';
}

function closeSpinModal() {
    document.getElementById('spin-modal').style.display = 'none';
    document.getElementById('wheel').style.transform = `rotate(0deg)`; // reset
    document.getElementById('spin-btn').disabled = false;
}

function startSpin() {
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true; // Disable button while spinning
    
    const wheel = document.getElementById('wheel');
    // Rotate wheel 5 times (1800 deg) + random angle
    const randomDegree = 1800 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Wait for 3 seconds (duration of animation)
    setTimeout(() => {
        const wonCoins = Math.floor(Math.random() * 20) + 5; // Win 5 to 25 coins
        totalCoins += wonCoins;
        updateBalance();
        alert(`Mubarak ho! Aapne ${wonCoins} Coins jeete hain!`);
        closeSpinModal();
    }, 3000);
}

// --- 4. PLAYTIME GAMES (Limit Fix) ---
function playTimeGame(btn) {
    if(playtimeLimit > 0) {
        totalCoins += 25; // 5 mins worth of coins
        playtimeLimit--;
        localStorage.setItem('playLimit', playtimeLimit); // Save limit
        updateBalance();
        alert(`Bhai game khelne ke 25 coins mil gaye. Remaining limit: ${playtimeLimit}`);
    } else {
        btn.disabled = true;
        btn.innerText = "Limit Reached";
        alert("Aaj ki limit khatam! Kal wapas aana.");
    }
}

// --- 5. WITHDRAWAL SYSTEM (Amount + Bank details) ---
function selectAmount(amt, element) {
    selectedWithdrawAmount = amt;
    
    // UI Update
    document.querySelectorAll('.amt-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

function changePayoutFields() {
    const method = document.getElementById('payout-method').value;
    const inputsDiv = document.getElementById('dynamic-inputs');
    
    if(method === 'paytm') {
        inputsDiv.innerHTML = `<input type="number" class="input-field" id="payout-id" placeholder="Enter Paytm Number">`;
    } 
    else if(method === 'upi') {
        inputsDiv.innerHTML = `<input type="text" class="input-field" id="payout-id" placeholder="Enter UPI ID (e.g. 987@ybl)">`;
    } 
    else if(method === 'bank') {
        inputsDiv.innerHTML = `
            <input type="number" class="input-field" id="payout-acc" placeholder="Account Number">
            <input type="text" class="input-field" id="payout-ifsc" placeholder="IFSC Code">
        `;
    }
}

function requestWithdraw() {
    const currentRupees = totalCoins / coinValueInRupees;
    const method = document.getElementById('payout-method').value;
    
    // Checking inputs
    let isInputValid = false;
    if(method === 'bank') {
        const acc = document.getElementById('payout-acc').value;
        const ifsc = document.getElementById('payout-ifsc').value;
        if(acc !== "" && ifsc !== "") isInputValid = true;
    } else {
        const id = document.getElementById('payout-id').value;
        if(id !== "") isInputValid = true;
    }

    if(!isInputValid) {
        alert("Bhai, pehle poori Bank/UPI details toh daalo!");
        return;
    }

    // Checking Balance
    if (currentRupees >= selectedWithdrawAmount) {
        totalCoins -= (selectedWithdrawAmount * coinValueInRupees); // Deduct selected amount
        updateBalance();
        alert(`Success! ₹${selectedWithdrawAmount} ki request lag gayi hai. Paise 24 ghante mein aa jayenge.`);
    } else {
        alert(`Balance kam hai. Aapke paas ₹${currentRupees.toFixed(2)} hain, aur aap ₹${selectedWithdrawAmount} nikalna chahte hain.`);
    }
}

// Basic Tabs
function switchTab(tabId, element) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}
