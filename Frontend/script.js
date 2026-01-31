// --- DATA ---
let user = null; 
let db = { balance: 0, points: 0, streak: 0, xp: 0, level: 1, txs: [], completedArticles: [], tasks: [], email: "", phone: "", avatar: "👨‍🎓", lastCheckIn: null };
let chartTimeRange = 'weekly';
let activeCourse = null;
let currentPage = 0;

const mockRewards = [
    { id: 1, name: "Spotify Premium", cost: 5000, desc: "1 Month Individual", icon: "fab fa-spotify", color: "#1DB954", brandClass: "brand-spotify" },
    { id: 2, name: "Netflix Mobile", cost: 8000, desc: "1 Month Subscription", icon: "fas fa-film", color: "#E50914", brandClass: "brand-netflix" },
    { id: 3, name: "Zomato Gold", cost: 4500, desc: "3 Months Membership", icon: "fas fa-utensils", color: "#cb202d", brandClass: "brand-zomato" },
    { id: 4, name: "Amazon Voucher", cost: 10000, desc: "₹500 Gift Card", icon: "fab fa-amazon", color: "#ff9900", brandClass: "brand-amazon" },
    { id: 5, name: "Uber Credit", cost: 3500, desc: "₹200 Ride Voucher", icon: "fab fa-uber", color: "#ffffff", brandClass: "brand-uber" },
    { id: 6, name: "Domino's", cost: 3000, desc: "Free Regular Pizza", icon: "fas fa-pizza-slice", color: "#006491", brandClass: "brand-dominos" },
    { id: 7, name: "Myntra", cost: 7000, desc: "Fashion Voucher", icon: "fas fa-tshirt", color: "#E6007E", brandClass: "brand-myntra" },
    { id: 8, name: "Steam", cost: 12000, desc: "₹500 Wallet Code", icon: "fab fa-steam", color: "#171a21", brandClass: "brand-steam" }
];

const mockAcademy = [
    { 
        id: 1, 
        title: "Budgeting 101", 
        desc: "The 50/30/20 Rule Explained", 
        xp: 250, 
        tag: "Basics", 
        icon: "💰",
        pages: [
            "Welcome to Budgeting 101! In this course, we will explore the foundational rule of personal finance: The 50/30/20 Rule. This rule helps you organize your spending habits.",
            "The Rule is simple: Divide your income into three buckets.<br>1. 50% for Needs (Rent, Food, Fees)<br>2. 30% for Wants (Movies, Outings)<br>3. 20% for Savings (Emergency Fund, Investments).",
            "For a student, this might look different. If you get ₹5000 allowance:<br>- ₹2500 for Canteen/Books<br>- ₹1500 for Fun<br>- ₹1000 Saved.",
            "Start tracking today using Flux. Categorize every transaction to see if you are sticking to these percentages. Consistency is key!",
            "Congratulations! You now understand the basics. Click 'Claim Points' to finish this lesson and earn your reward."
        ]
    },
    { 
        id: 2, 
        title: "Stock Market Basics", 
        desc: "Safe investing for students", 
        xp: 400, 
        tag: "Investing", 
        icon: "📈", 
        pages: [
            "Investing isn't gambling. It's owning a piece of a business. When you buy a stock, you become a partial owner of that company.",
            "Don't start with day trading. As a student, your best friend is the 'Index Fund'. These funds track the top 50 companies (Nifty 50) and are safer than picking individual stocks.",
            "The magic word is 'Compounding'. ₹500 invested every month at 12% return for 10 years grows significantly more than money kept in a bank savings account.",
            "Always research before buying. Look at the company's profit, debt, and future plans. Never invest money you need for next month's rent.",
            "You are ready to start your investment journey! Remember: Time in the market > Timing the market."
        ]
    },
    { 
        id: 3, 
        title: "Crypto Explained", 
        desc: "Blockchain & Bitcoin", 
        xp: 300, 
        tag: "Crypto", 
        icon: "₿",
        pages: [
            "What is Crypto? It is digital money that isn't controlled by any bank or government. It uses a technology called Blockchain.",
            "Bitcoin is the first and biggest cryptocurrency. It is often called 'Digital Gold'. Ethereum is another popular one that allows 'Smart Contracts'.",
            "Warning: Crypto is highly volatile. Prices can drop 50% in a single day. Never put your tuition fees or food money into crypto.",
            "To start, use a reputed exchange. Enable 2-Factor Authentication. And remember: Not your keys, not your coins.",
            "Lesson Complete! You now know the basics of the crypto world. Tread carefully!"
        ]
    },
    { 
        id: 4, 
        title: "Taxes for Students", 
        desc: "Why file ITR?", 
        xp: 350, 
        tag: "Adulting", 
        icon: "🧾",
        pages: [
            "Do students need to file taxes? Usually no, unless you earn above ₹2.5 Lakhs a year. However, filing a 'Nil Return' is very useful.",
            "Why file? It serves as proof of income for Visa applications, Education Loans, and Credit Card applications in the future.",
            "If you freelance or do internships, you might have TDS deducted. Filing an ITR allows you to claim that money back as a refund!",
            "Learn about Section 80C. You can save tax by investing in PPF, ELSS Mutual Funds, and paying tuition fees.",
            "You are now tax-smart! Filing taxes is a sign of financial maturity. Claim your points now."
        ]
    }
];

const mockLeaderboard = [
    { name: "Aditya Roy", uni: "IIT Bombay", points: 15400, streak: 45 },
    { name: "Sneha Kapoor", uni: "BITS Pilani", points: 12250, streak: 30 },
    { name: "Rohan Das", uni: "SRCC", points: 9800, streak: 12 }
];

// --- LOGIC ---
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const i = document.querySelector('.theme-toggle i');
    if(document.body.classList.contains('light-mode')){ i.className='fas fa-sun'; localStorage.setItem('theme','light'); }
    else { i.className='fas fa-moon'; localStorage.setItem('theme','dark'); }
}
if(localStorage.getItem('theme')==='light') toggleTheme();

function checkAuth(){ const s=sessionStorage.getItem('fluxUser'); if(s){ user=JSON.parse(s); loadData(); showApp(); } }
function openAuth(m){ document.getElementById('auth-overlay').style.display='flex'; if(m==='signup') toggleAuthMode(true); else toggleAuthMode(false); }
function closeAuth(){ document.getElementById('auth-overlay').style.display='none'; }
function toggleAuthMode(){ const l=document.getElementById('login-form'); const s=document.getElementById('signup-form'); if(l.style.display==='none'){l.style.display='block';s.style.display='none'}else{l.style.display='none';s.style.display='block'} }

function handleSignup(){ 
    const u=document.getElementById('s-user').value.trim(); const p=document.getElementById('s-pass').value.trim(); const uni=document.getElementById('s-uni').value.trim(); 
    if(!u||!p||!uni)return alert('Please fill all fields'); 
    const uid=u.toLowerCase(); 
    localStorage.setItem('flux_'+uid, JSON.stringify({id:uid, name:u, pass:p, uni:uni, data:db})); 
    loginUser({id:uid, name:u, pass:p, uni:uni, data:db}); 
}
function handleLogin(){ const u=document.getElementById('l-user').value.trim(); const p=document.getElementById('l-pass').value.trim(); const stored=localStorage.getItem('flux_'+u.toLowerCase()); if(stored){ const obj=JSON.parse(stored); if(obj.pass===p) loginUser(obj); else alert('Incorrect Password'); } else alert('User not found'); }
function loginUser(o){ user=o; sessionStorage.setItem('fluxUser', JSON.stringify(o)); loadData(); showApp(); }
function logout(){ sessionStorage.removeItem('fluxUser'); location.reload(); }
function loadData(){ const f=JSON.parse(localStorage.getItem('flux_'+user.id)); if(f) user.data=f.data; calculateLevel(); }
function saveData(){ localStorage.setItem('flux_'+user.id, JSON.stringify(user)); updateUI(); }
function showApp(){ document.getElementById('landing-page').style.display='none'; document.getElementById('auth-overlay').style.display='none'; document.getElementById('app-container').style.display='flex'; updateUI(); initAllFeatures(); setTimeout(initCharts, 500); }

function calculateLevel() {
    const xp = user.data.xp || 0;
    const level = Math.floor(xp / 1000) + 1;
    user.data.level = level;
    const barWidth = (xp % 1000) / 10;
    if(document.querySelector('.level-fill')) {
        document.querySelector('.level-fill').style.width = barWidth + "%";
        document.querySelector('.level-text').innerHTML = `<span>Level ${level} Saver</span><span>${xp} / ${(level)*1000} XP</span>`;
    }
}

function addXp(amount) {
    user.data.xp = (user.data.xp || 0) + amount;
    user.data.points = (user.data.points || 0) + amount; 
    calculateLevel();
    saveData();
}

function nav(id){ document.querySelectorAll('.section').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active')); document.getElementById('btn-'+id).classList.add('active'); }

function initAllFeatures() {
    document.getElementById('u-name').innerText = user.name;
    document.getElementById('user-avatar').innerText = user.data.avatar || "👨‍🎓";
    
    // Render Tasks
    const tasks = user.data.tasks || [];
    document.querySelectorAll('.quest-card').forEach(card => {
        const id = card.id.replace('task-', '');
        if(tasks.includes(id)) card.classList.add('completed');
    });

    // Check Check-in Button
    const today = new Date().toDateString();
    if(user.data.lastCheckIn === today) {
        const btn = document.getElementById('checkin-btn');
        btn.disabled = true; btn.innerText = "Checked In ✓"; btn.style.background = "#333";
    }

    document.getElementById('rewards-grid').innerHTML = mockRewards.map(r=>`
        <div class="reward-card ${r.brandClass}">
            <div class="reward-badge">NEW</div>
            <div class="reward-icon-bg" style="background: linear-gradient(135deg, ${r.color}22, ${r.color}66);">
                <i class="${r.icon}" style="color:${r.color};"></i>
            </div>
            <div class="reward-info">
                <h3 style="color:var(--text-main); margin-bottom:5px;">${r.name}</h3>
                <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:15px;">${r.desc}</p>
                <h4 style="color:var(--primary); margin-bottom:15px;">${r.cost} Pts</h4>
                <button class="btn-glow" style="width:100%; font-size:0.8rem;" onclick="redeem(${r.cost}, '${r.name}')" ${user.data.points < r.cost ? 'disabled' : ''}>${user.data.points >= r.cost ? 'Redeem Now' : 'Need Points'}</button>
            </div>
        </div>`).join('');
    
    document.getElementById('academy-grid').innerHTML = mockAcademy.map(a => {
        const done = user.data.completedArticles && user.data.completedArticles.includes(a.id);
        return `
        <div class="course-card ${done ? 'completed' : ''}" onclick="${done ? '' : `openCourse(${a.id})`}">
            <div class="course-thumb">${a.icon}</div>
            <div class="course-content">
                <span class="course-tag">${a.tag}</span>
                <h3 style="color:var(--text-main); margin-bottom:10px;">${a.title}</h3>
                <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">${a.desc}</p>
                <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center;">
                    <span style="color:var(--success); font-weight:bold;">+${a.xp} Points</span>
                    ${done ? '<span style="color:var(--success); font-weight:bold;">Completed ✓</span>' : '<span style="color:var(--primary); font-size:0.8rem;">Start &rarr;</span>'}
                </div>
            </div>
        </div>`
    }).join('');
    switchRank('Global');
}

function switchRank(type, el) {
    if(el) { document.querySelectorAll('.rank-tab').forEach(b=>b.classList.remove('active')); el.classList.add('active'); }
    let list = [...mockLeaderboard, {name: "You", uni: user.uni || "Unknown", points: user.data.points, streak: user.data.streak || 0, isMe: true}];
    if(type === 'Weekly') list = list.map(u => ({...u, points: Math.floor(u.points / 10)}));
    if(type === 'Uni') list = list.filter(u => u.isMe || u.uni === user.uni);
    list.sort((a,b) => b.points - a.points);
    document.getElementById('rank-body').innerHTML = list.map((u, i) => `<tr class="rank-row" style="${u.isMe ? 'background:rgba(99,102,241,0.1); border-left:3px solid var(--primary);' : ''}"><td style="padding-left:40px;"><span class="rank-badge" style="${i<3?'background:#FFD700; color:black;':''}">${i+1}</span></td><td style="color:${u.isMe?'var(--primary)':'var(--text-main)'}; font-weight:600;">${u.name} ${u.streak > 3 ? '🔥' : ''}</td><td style="color:var(--text-muted);">${u.uni}</td><td style="color:var(--cyan); font-weight:bold;">${u.points}</td><td style="color:var(--text-muted);">${u.streak} Days</td></tr>`).join('');
}

function updateUI() {
    // Update Main Balance Display
    document.getElementById('main-balance').innerText = user.data.balance.toLocaleString();
    
    document.getElementById('pts').innerText = user.data.points;
    document.getElementById('streak-disp').innerText = (user.data.streak || 0) + " Day Streak!";
    
    // Calculate Limit (40% of Income)
    const totalIncome = user.data.txs.filter(tx => tx.type === 'income').reduce((acc, curr) => acc + curr.amt, 0);
    const limit = Math.floor(totalIncome * 0.40);
    document.getElementById('safe-limit').innerText = limit.toLocaleString();
    
    const hist = document.getElementById('tx-history');
    if(user.data.txs.length === 0) hist.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:20px;">No transactions yet.</p>';
    else hist.innerHTML = user.data.txs.slice(0, 10).map(t => `<div class="tx-item"><div><div style="color:var(--text-main); font-weight:600;">${t.desc}</div><small style="color:var(--text-muted);">${t.cat}</small></div><div class="${t.type==='income'?'tx-income':'tx-expense'}">${t.type==='income'?'+':'-'}₹${t.amt}</div></div>`).join('');
    
    initAllFeatures();
}

// --- QUESTS LOGIC ---
function handleCheckIn() {
    const today = new Date().toDateString();
    if(user.data.lastCheckIn !== today) {
        user.data.lastCheckIn = today;
        user.data.streak = (user.data.streak || 0) + 1;
        addXp(50);
        alert("✅ Daily Check-in Complete! +50 XP");
        updateUI();
    }
}

function completeTask(taskId, xp) {
    if(!user.data.tasks) user.data.tasks = [];
    if(user.data.tasks.includes(taskId)) return;
    
    alert("Redirecting to task...");
    setTimeout(() => {
        user.data.tasks.push(taskId);
        addXp(xp);
        alert(`✅ Task Completed! +${xp} XP`);
        updateUI();
    }, 1000);
}

function openAddMoney(){ document.getElementById('add-money-overlay').style.display='flex'; }
function closeAddMoney(){ document.getElementById('add-money-overlay').style.display='none'; }
function confirmAddMoney(){ 
    const a = parseInt(document.getElementById('add-amt').value); 
    if(a>0) { 
        user.data.balance += a; 
        user.data.txs.unshift({desc:"Deposit", cat:"Income", amt:a, type:"income", date: new Date().toISOString()}); 
        addXp(50); 
        saveData(); closeAddMoney(); updateChartsData(); 
    } 
}

// --- 40% RULE LOGIC (STRICT) ---
function addEx(){ 
    const t=document.getElementById('tx-type').value; const d=document.getElementById('ex-desc').value; const c=document.getElementById('ex-cat').value; const a=parseInt(document.getElementById('ex-amt').value); 
    if(d && a) { 
        if(t==='income') {
            user.data.balance += a;
            addXp(10);
        } else { 
            // Calculate Total Income
            const totalIncome = user.data.txs.filter(tx => tx.type === 'income').reduce((acc, curr) => acc + curr.amt, 0);
            const currentExpense = user.data.txs.filter(tx => tx.type === 'expense').reduce((acc, curr) => acc + curr.amt, 0);
            const limit = totalIncome * 0.40; // 40% Limit

            // WARNING LOGIC
            if (totalIncome > 0 && (currentExpense + a) > limit) {
                const confirmSpend = confirm(`⚠️ SPENDING ALERT ⚠️\n\nYou are about to exceed 40% of your total income (Limit: ₹${limit.toLocaleString()}).\n\nIf you proceed:\n1. You will lose 50 XP.\n2. You MUST save 50% of your remaining balance.\n\nDo you still want to spend?`);
                if(!confirmSpend) return;
                
                addXp(-50); // Penalty
                alert("⚠️ Strict Mode Activated: Please save 50% of your remaining funds to recover your Financial Score.");
            }

            user.data.balance -= a; 
            addXp(10); 
        } 
        user.data.txs.unshift({desc:d, cat:c, amt:a, type:t, date: new Date().toISOString()}); 
        saveData(); updateChartsData(); checkBurnRate(); 
        document.getElementById('ex-desc').value=''; document.getElementById('ex-amt').value=''; 
    } 
}

function checkBurnRate() { const recent = user.data.txs.filter(t => t.type === 'expense').slice(0, 3); const total = recent.reduce((sum, t) => sum + t.amt, 0); const alertBox = document.getElementById('burn-alert'); if(total > 1000) { document.getElementById('burn-amt').innerText = Math.round(total / 3); alertBox.style.display = 'flex'; } }
function redeem(cost, name) { 
    if(user.data.points >= cost){ 
        user.data.points -= cost; 
        addXp(200); 
        saveData(); confetti({particleCount:150, spread:100}); 
        alert(`🎉 Redeemed ${name}! Check your email.`); 
    } 
}

// --- MULTI-PAGE COURSE LOGIC ---
function openCourse(id) {
    const course = mockAcademy.find(c => c.id === id);
    if (!course) return;
    activeCourse = course;
    currentPage = 0;
    document.getElementById('course-title').innerText = course.title;
    updateCourseModal();
    document.getElementById('course-overlay').style.display = 'flex';
}

function updateCourseModal() {
    const contentDiv = document.getElementById('course-content');
    const pageSpan = document.getElementById('page-indicator');
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const completeBtn = document.getElementById('btn-complete');

    contentDiv.innerHTML = `<p style="font-size:1.1rem; line-height:1.8;">${activeCourse.pages[currentPage]}</p>`;
    pageSpan.innerText = `Page ${currentPage + 1} of ${activeCourse.pages.length}`;

    // Button Logic
    prevBtn.style.display = currentPage === 0 ? 'none' : 'block';
    
    if (currentPage === activeCourse.pages.length - 1) {
        nextBtn.style.display = 'none';
        completeBtn.style.display = 'block';
        completeBtn.innerText = `Claim ${activeCourse.xp} Points`;
    } else {
        nextBtn.style.display = 'block';
        completeBtn.style.display = 'none';
    }
}

function nextPage() {
    if (currentPage < activeCourse.pages.length - 1) {
        currentPage++;
        updateCourseModal();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateCourseModal();
    }
}

function closeCourse() { document.getElementById('course-overlay').style.display = 'none'; }
function finishCourse() {
    if(!user.data.completedArticles) user.data.completedArticles = [];
    if(!user.data.completedArticles.includes(activeCourse.id)) {
        user.data.completedArticles.push(activeCourse.id); 
        addXp(activeCourse.xp); 
        confetti({particleCount: 50, origin:{y:0.8}});
        alert(`✅ Course Completed! +${activeCourse.xp} Points.`);
    } else { alert("You've already completed this course!"); }
    closeCourse();
    initAllFeatures(); // To update visual completed state
}

// --- SETTINGS ---
function openSettings() {
    document.getElementById('set-name').value = user.name;
    document.getElementById('set-email').value = user.data.email || "";
    document.getElementById('set-phone').value = user.data.phone || "";
    document.getElementById('settings-overlay').style.display = 'flex';
}
function closeSettings() { document.getElementById('settings-overlay').style.display = 'none'; }
function selectAvatar(emoji) { user.data.avatar = emoji; document.getElementById('user-avatar').innerText = emoji; }
function saveSettings() {
    user.name = document.getElementById('set-name').value;
    user.data.email = document.getElementById('set-email').value;
    user.data.phone = document.getElementById('set-phone').value;
    saveData();
    document.getElementById('u-name').innerText = user.name;
    closeSettings();
    alert("Settings Saved!");
}

// --- CHARTS (DYNAMIC) ---
let lineChart, pieChart;
function initCharts() {
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    lineChart = new Chart(lineCtx, { type: 'line', data: { labels: [], datasets: [{ label: 'Spending', data: [], borderColor: '#6366f1', tension: 0.4, fill: true, backgroundColor: 'rgba(99, 102, 241, 0.1)' }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false }, ticks: { color: '#9ca3af' } } } } });
    pieChart = new Chart(pieCtx, { type: 'doughnut', data: { labels: [], datasets: [{ data: [], backgroundColor: ['#6366f1', '#8b5cf6', '#06b6d4', '#fbbf24', '#10b981', '#ef4444'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', boxWidth: 10, padding: 15 } } }, cutout: '75%' } });
    updateChartsData();
}

function updateChartsData() {
    // Dynamic Pie Chart Logic
    let cats = {};
    user.data.txs.forEach(t => { 
        if(t.type==='expense') {
            cats[t.cat] = (cats[t.cat] || 0) + t.amt;
        }
    });
    
    pieChart.data.labels = Object.keys(cats).length > 0 ? Object.keys(cats) : ['No Data'];
    pieChart.data.datasets[0].data = Object.keys(cats).length > 0 ? Object.values(cats) : [1]; 
    pieChart.update();
    
    // Line Logic (Sorted)
    const now = new Date();
    let labels = [], data = [];
    
    if (chartTimeRange === 'daily') {
        labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        data = new Array(7).fill(0);
        user.data.txs.forEach(t => { if(t.type==='expense') data[new Date(t.date).getDay()] += t.amt; });
    } else if (chartTimeRange === 'weekly') {
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = new Array(4).fill(0);
        user.data.txs.forEach(t => { if(t.type==='expense') data[Math.min(Math.floor(new Date(t.date).getDate() / 7), 3)] += t.amt; });
    } else {
        labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        data = new Array(12).fill(0);
        user.data.txs.forEach(t => { if(t.type==='expense') data[new Date(t.date).getMonth()] += t.amt; });
    }
    
    lineChart.data.labels = labels;
    lineChart.data.datasets[0].data = data;
    lineChart.update();
}
function updateTimeRange(r, el) { 
    chartTimeRange = r;
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); el.classList.add('active'); updateChartsData(); 
}

function openReviews() { document.getElementById('reviews-overlay').style.display = 'flex'; }
function closeReviews() { document.getElementById('reviews-overlay').style.display = 'none'; }
function openInfoModal(type) { 
    const t = document.getElementById('info-title'); const c = document.getElementById('info-content');
    const texts = {
        'privacy': { t: "Privacy Policy", c: "<p><strong>1. Introduction</strong><br>Welcome to Flux. We value your privacy and are committed to protecting your personal data. This policy outlines how we handle your information.</p><p><strong>2. Local-First Architecture</strong><br>Flux is built on a privacy-first model. Unlike traditional finance apps, we do not store your transaction history, account balance, or spending habits on our servers. All this data lives exclusively in your browser's LocalStorage. If you clear your cache, your data is wiped.</p><p><strong>3. Data Collection</strong><br>We only collect the username and university name you provide during sign-up to personalize the interface. No biometric, banking, or sensitive personal data is ever requested or stored.</p><p><strong>4. Third-Party Sharing</strong><br>Since we do not host your data, we cannot (and do not) share, sell, or rent your financial information to advertisers, banks, or third-party agencies.</p>" },
        'terms': { t: "Terms & Conditions", c: "<p><strong>1. Acceptance of Terms</strong><br>By accessing or using Flux, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not use the service.</p><p><strong>2. Educational Purpose</strong><br>Flux is a financial literacy tool designed for educational and entertainment purposes. The 'rewards' and 'points' system in this demo version are simulations.</p><p><strong>3. User Conduct</strong><br>You agree not to misuse the platform, attempt to hack the gamification system, or use the service for illegal activities.</p><p><strong>4. Limitation of Liability</strong><br>Flux is not responsible for any financial decisions made based on the app's data. You are responsible for your own financial well-being.</p>" },
        'cookie': { t: "Cookie Policy", c: "<p><strong>1. What are cookies?</strong><br>Cookies are small text files stored on your device. Flux uses LocalStorage, a modern alternative to cookies, to save your progress.</p><p><strong>2. How we use them</strong><br>We use LocalStorage to keep you logged in and remember your theme preference (Light/Dark mode). We do not use third-party tracking cookies.</p>" },
        'about': {t:"About Flux", c:"<p>Flux was founded by students, for students. We realized that traditional banking apps are boring and intimidating. Flux aims to solve the 'end-of-month broke' crisis by making saving money as addictive as a video game.</p>"},
        'contact': {t:"Contact Support", c:"<p>Need help? Reach out to us anytime.</p><p><strong>Email:</strong> support@flux.app</p><p><strong>Phone:</strong> +91 98765 43210</p><p><strong>HQ:</strong> Innovation Hub, IIT Bombay Campus, Mumbai.</p>"},
        'features': {t:"Features", c:"<ul><li><strong>Smart Ledger:</strong> Track expenses with visual graphs.</li><li><strong>Burn Rate Alert:</strong> Get warned if you are spending too fast.</li><li><strong>University Battle:</strong> Compete with other colleges to see who saves more.</li><li><strong>Rewards Store:</strong> Redeem savings points for Netflix, Spotify, and more.</li></ul>"},
        'security': {t:"Security", c:"<p>Your data never leaves your device. We use client-side encryption for session management.</p>"},
        'discord': {t:"Discord", c:"<p>Join 50,000+ students on our Discord server to discuss investing, crypto, and saving hacks.</p>"},
        'blog': {t:"Student Blog", c:"<p>Read our latest articles: 'How to save ₹5000/month in Bangalore', 'Best Student Credit Cards 2025', and more.</p>"}
    };
    if(texts[type]){ t.innerText = texts[type].t; c.innerHTML = texts[type].c; } else { t.innerText = "Info"; c.innerHTML = "Loading..."; }
    document.getElementById('info-overlay').style.display = 'flex'; 
}
function closeInfo() { document.getElementById('info-overlay').style.display = 'none'; }

function toggleChat(){ const w=document.getElementById('chat-win'); w.style.display=w.style.display==='flex'?'none':'flex'; }
function sendChat(){
    const i=document.getElementById('chat-input'); if(!i.value)return;
    const c=document.getElementById('chat-content');
    c.innerHTML+=`<div style="background:var(--primary); padding:10px; border-radius:10px; align-self:flex-end; max-width:80%; margin-bottom:10px; color:white;">${i.value}</div>`;
    setTimeout(()=>{ c.innerHTML+=`<div style="background:rgba(255,255,255,0.1); padding:10px; border-radius:10px; align-self:flex-start; max-width:80%; margin-bottom:10px; color:var(--text-main);">I'm analyzing your request... Try checking the Knowledge tab for tips!</div>`; c.scrollTop=c.scrollHeight; }, 500);
    i.value=''; c.scrollTop=c.scrollHeight;
}

// Scroll Reveal
window.addEventListener('scroll', reveal);
function reveal(){
    var reveals = document.querySelectorAll('.reveal');
    for(var i=0; i<reveals.length; i++){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;
        if(revealtop < windowheight - revealpoint){ reveals[i].classList.add('active'); }
    }
}

checkAuth();
function sendChat() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  const chatBox = document.getElementById("chat-content");

  // User bubble
  chatBox.innerHTML += `
    <div style="
      align-self:flex-end;
      background:var(--primary);
      padding:10px;
      border-radius:10px;
      max-width:80%;
      margin-bottom:10px;
      color:white;">
      ${msg}
    </div>
  `;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Typing indicator
  const typingId = "typing-" + Date.now();
  chatBox.innerHTML += `
    <div id="${typingId}" style="
      background:rgba(255,255,255,0.1);
      padding:10px;
      border-radius:10px;
      align-self:flex-start;
      max-width:80%;
      margin-bottom:10px;
      color:var(--text-main);">
      AI is thinking...
    </div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;

  fetch(`${BACKEND_URL}/api/ai/motivate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "adi",
      message: msg
    })
  })
    .then(res => res.json())
    .then(data => {
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();

      chatBox.innerHTML += `
        <div style="
          background:rgba(255,255,255,0.1);
          padding:10px;
          border-radius:10px;
          align-self:flex-start;
          max-width:80%;
          margin-bottom:10px;
          color:var(--text-main);">
          ${data.message}
        </div>
      `;
      chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(err => {
      console.error(err);
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();

      chatBox.innerHTML += `
        <div style="color:red;">AI unavailable</div>
      `;
    });
}
document.addEventListener("DOMContentLoaded", () => {
  fetch(`${BACKEND_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "adi",
      name: "Adi",
      university: "Flux University",
      allowance: 10000
    })
  }).catch(() => {});
});

