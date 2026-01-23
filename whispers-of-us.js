// ========== Password Configuration ==========
// Current password: "forever"
// To change the password:
// 1. Open browser console (F12)
// 2. Run: await hashPassword("your-new-password")
// 3. Copy the hash output
// 4. Replace the STORED_PASSWORD_HASH value below with the new hash

const STORED_PASSWORD_HASH = "2070f725ff1c765b73c498de52bc419377979691f6100de3ed99794aeb40d988"; // "forever"

// ========== Password Hashing Function ==========
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// ========== Password Validation ==========
async function validatePassword() {
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const passwordScreen = document.getElementById('password-screen');
    const timelineContent = document.getElementById('timeline-content');
    const unlockBtn = document.getElementById('unlock-btn');

    const enteredPassword = passwordInput.value.trim();

    if (!enteredPassword) {
        errorMessage.textContent = 'Please enter the password';
        errorMessage.style.animation = 'shake 0.5s';
        setTimeout(() => errorMessage.style.animation = '', 500);
        return;
    }

    // Show loading state
    unlockBtn.textContent = 'Unlocking...';
    unlockBtn.disabled = true;

    // Hash the entered password
    const enteredHash = await hashPassword(enteredPassword);

    // Compare hashes
    if (enteredHash === STORED_PASSWORD_HASH) {
        errorMessage.textContent = '';

        // Hide password screen
        passwordScreen.classList.add('hidden');

        // Show timeline content
        timelineContent.classList.remove('hidden');

        // Store session
        sessionStorage.setItem('memoriesUnlocked', 'true');

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        errorMessage.textContent = 'Incorrect password. Try again...';
        errorMessage.style.animation = 'shake 0.5s';
        setTimeout(() => errorMessage.style.animation = '', 500);
        passwordInput.value = '';
        unlockBtn.textContent = 'Unlock Our Memories';
        unlockBtn.disabled = false;
        passwordInput.focus();
    }
}

// ========== Event Listeners ==========
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const passwordScreen = document.getElementById('password-screen');
    const timelineContent = document.getElementById('timeline-content');

    // Check if already unlocked in this session
    if (sessionStorage.getItem('memoriesUnlocked') === 'true') {
        passwordScreen.classList.add('hidden');
        timelineContent.classList.remove('hidden');
    }

    // Unlock button click
    unlockBtn.addEventListener('click', validatePassword);

    // Enter key press
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });

    // Focus input on load
    passwordInput.focus();

    // Scroll animations for timeline items
    observeTimelineItems();
});

// ========== Scroll Animations ==========
function observeTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item, .video-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ========== Helper Function for Generating New Password Hashes ==========
// Make this available in console for easy password changes
window.hashPassword = hashPassword;

// Add shake animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ========== Password Change Instructions ==========
// To change the password:
// 1. Open browser console (F12)
// 2. Run: await hashPassword("your-new-password")
// 3. Copy the hash output
// 4. Update the STORED_PASSWORD_HASH constant at the top of this file with the new hash
