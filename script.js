document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js with enhanced interactivity
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: ["#ff9580", "#4b6cb7", "#182848", "#ffc8c0"]
            },
            shape: {
                type: ["circle", "triangle"],
                stroke: {
                    width: 0,
                    color: "#000000"
                },
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffc8c0",
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                bubble: {
                    distance: 200,
                    size: 10,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 60,
                    duration: 1.2
                },
                push: {
                    particles_nb: 6
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Set the wedding date - November 23, 2025
    const weddingDateObj = new Date('November 23, 2025 00:00:00');
    const weddingDate = weddingDateObj.getTime();

    // Elements
    const elDays = document.getElementById('value-1');
    const elHours = document.getElementById('value-2'); // or Months value
    const elMinutes = document.getElementById('value-3'); // or Days value (if needed)
    const elSeconds = document.getElementById('value-4');

    const labelDays = document.getElementById('label-1');
    const labelHours = document.getElementById('label-2');
    const labelMinutes = document.getElementById('label-3');
    const labelSeconds = document.getElementById('label-4');

    const block3 = document.getElementById('block-3');
    const block4 = document.getElementById('block-4');

    // Update the countdown every second
    const countdown = setInterval(() => {
        // Get today's date and time
        const nowObj = new Date();
        const now = nowObj.getTime();

        // -------------------------
        // Monthly Celebration Check
        // -------------------------
        const celebrationContainer = document.getElementById('celebration-container');
        if (nowObj.getDate() === 23) {
            if (celebrationContainer && celebrationContainer.style.display === 'none') {
                celebrationContainer.style.display = 'block';
            }
        } else {
            if (celebrationContainer) celebrationContainer.style.display = 'none';
        }

        let targetDate = weddingDate;
        let isPostWedding = false;
        let targetDateObj = weddingDateObj;

        const nextAnnivTextEl = document.getElementById('next-anniversary-date');

        // processing for post-wedding
        if (now > weddingDate) {
            isPostWedding = true;

            // Update status text
            const statusText = document.getElementById('status-text');
            if (statusText) statusText.textContent = "Married Since";

            // Calculate duration
            const durationDiff = now - weddingDate;
            const yearsMarried = nowObj.getFullYear() - weddingDateObj.getFullYear();
            let monthsMarried = nowObj.getMonth() - weddingDateObj.getMonth();
            let daysMarried = nowObj.getDate() - weddingDateObj.getDate();

            // Adjust for negative days/months in duration calculation
            if (daysMarried < 0) {
                monthsMarried--;
                // Get days in previous month
                const prevMonth = new Date(nowObj.getFullYear(), nowObj.getMonth(), 0);
                daysMarried += prevMonth.getDate();
            }

            // Robust calculation for Total Duration Display
            // Let's use the robust 'tempDate' approach for accuracy
            let tempDate = new Date(weddingDateObj);
            let y = 0, m = 0, d = 0;
            while (true) {
                let nextYear = new Date(tempDate);
                nextYear.setFullYear(nextYear.getFullYear() + 1);
                if (nextYear > nowObj) break;
                tempDate = nextYear;
                y++;
            }
            while (true) {
                let nextMonth = new Date(tempDate);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                if (nextMonth > nowObj) break;
                tempDate = nextMonth;
                m++;
            }
            d = Math.floor((nowObj - tempDate) / (1000 * 60 * 60 * 24));

            const marriedDurationEl = document.getElementById('married-duration');
            if (marriedDurationEl) {
                let parts = [];
                if (y > 0) parts.push(`${y} Year${y !== 1 ? 's' : ''}`);
                if (m > 0) parts.push(`${m} Month${m !== 1 ? 's' : ''}`);
                parts.push(`${d} Day${d !== 1 ? 's' : ''}`);
                marriedDurationEl.textContent = `Happily married for: ${parts.join(', ')}`;
            }


            // Calculate Next Anniversary
            let currentYear = nowObj.getFullYear();
            let anniversaryDate = new Date(currentYear, 10, 23); // Month is 0-indexed (10 = Nov)

            // If anniversary for this year has passed, look for next year
            if (now > anniversaryDate.getTime()) {
                anniversaryDate.setFullYear(currentYear + 1);
            }
            targetDate = anniversaryDate.getTime();
            targetDateObj = anniversaryDate;

            // Calculate which Anniversary this is
            // Wedding Year: 2025.
            // If target is Nov 2026, it is the (2026 - 2025) = 1st Anniversary.
            const nthAnniversary = anniversaryDate.getFullYear() - 2025;

            // Helper for ordinal suffix (1st, 2nd, 3rd, 4th)
            const getOrdinal = (n) => {
                const s = ["th", "st", "nd", "rd"];
                const v = n % 100;
                return n + (s[(v - 20) % 10] || s[v] || s[0]);
            };

            // Show Next Anniversary Text and Context Heading
            if (nextAnnivTextEl) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                nextAnnivTextEl.textContent = `Next Anniversary: ${anniversaryDate.toLocaleDateString('en-US', options)}`;
                nextAnnivTextEl.style.opacity = 1;
            }

            const countdownHeading = document.getElementById('countdown-heading');
            if (countdownHeading) {
                countdownHeading.textContent = `TIME UNTIL ${getOrdinal(nthAnniversary)} ANNIVERSARY`;
                countdownHeading.style.opacity = 1;
            }
        } else {
            // Pre-wedding context
            const countdownHeading = document.getElementById('countdown-heading');
            if (countdownHeading) {
                countdownHeading.textContent = `COUNTDOWN TO THE BIG DAY`;
                countdownHeading.style.opacity = 1;
            }
        }

        // Find the distance between now and the target date
        const distance = targetDate - now;

        // Logic for Countdown Display Format
        const daysToTarget = Math.floor(distance / (1000 * 60 * 60 * 24));

        if (daysToTarget < 30) {
            // SHOW: Days, Hours, Minutes, Seconds
            block3.style.display = 'flex';
            block4.style.display = 'flex';

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            labelDays.textContent = "Days";
            labelHours.textContent = "Hours";
            labelMinutes.textContent = "Minutes";
            labelSeconds.textContent = "Seconds";

            elDays.textContent = days.toString().padStart(3, '0');
            elHours.textContent = hours.toString().padStart(2, '0');
            elMinutes.textContent = minutes.toString().padStart(2, '0');
            elSeconds.textContent = seconds.toString().padStart(2, '0');

        } else {
            // SHOW: Months, Days ONLY
            block3.style.display = 'none';
            block4.style.display = 'none';

            // Calculate Months and Days remaining from NOW to Target
            // We can reuse the logic we used for duration but reversed or simpler difference
            let tempNow = new Date(nowObj);
            let diffMonths = 0;
            let diffDays = 0;

            // Count months until we are less than a month away
            while (true) {
                let nextMonthTest = new Date(tempNow);
                nextMonthTest.setMonth(nextMonthTest.getMonth() + 1);
                if (nextMonthTest > targetDateObj) break;
                tempNow = nextMonthTest;
                diffMonths++;
            }

            // Remaining days
            diffDays = Math.floor((targetDate - tempNow) / (1000 * 60 * 60 * 24));

            labelDays.textContent = "Months";
            labelHours.textContent = "Days"; // Reusing block-2 for Days

            elDays.textContent = diffMonths.toString().padStart(2, '0');
            elHours.textContent = diffDays.toString().padStart(2, '0');
        }

    }, 1000);

    // Monthly Celebration Button Logic
    const celebrateBtn = document.getElementById('celebrate-btn');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', () => {
            // Trigger a realistic confetti celebration
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Since particles fall down, start a bit higher than random
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }, 250);

            // Also fire a center burst for good measure
            confetti({
                origin: { y: 0.7 },
                spread: 100,
                particleCount: 150,
                scalar: 1.2,
                shapes: ['circle', 'square'],
                colors: ['#ff9580', '#4b6cb7', '#FFC107', '#FFFFFF']
            });
        });
    }

    // Add subtle animation to the content on scroll - REMOVED/ADJUSTED to prevent disappearing
    const contentContainer = document.querySelector('.content-container');
    // We remove the opacity fade behavior. We only keep a slight parallax if desired, or just remove it entirely for stability.
    // User complaint: "main component is disappearing". So we remove the opacity logic.
    window.addEventListener('scroll', () => {
        // No-op or just simple parallax without fade
        // contentContainer.style.transform = `translateY(${window.scrollY * 0.1}px)`; 
        // For now, let's keep it static to be safe and responsive.
    });

    // Add proper touch support for mobile
    document.addEventListener('touchmove', function (e) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        // Create a mousemove event to make particles react to touch
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touchX,
            clientY: touchY
        });

        document.dispatchEvent(mouseEvent);
    }, { passive: true });

    document.addEventListener('touchstart', function (e) {
        // Create a click event when touch starts
        const mouseEvent = new MouseEvent('click', {
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        });

        document.dispatchEvent(mouseEvent);
    }, { passive: true });

    // Bee animation with glitter
    const beeIcons = document.querySelectorAll('.bee-icon');
    const glitterContainer = document.getElementById('glitter-container');

    // Counter to track the number of active flying bees
    let activeBees = 0;
    const MAX_BEES = 3; // Maximum number of bees allowed at a time

    beeIcons.forEach(bee => {
        bee.addEventListener('click', function (e) {
            // Check if we've reached the maximum number of bees
            if (activeBees >= MAX_BEES) {
                // Add a subtle shake animation to indicate the limit
                this.classList.add('shake-animation');
                setTimeout(() => {
                    this.classList.remove('shake-animation');
                }, 500);
                return;
            }

            // Increment active bees counter
            activeBees++;

            // Create a flying bee
            const flyingBee = document.createElement('div');
            flyingBee.className = 'flying-bee';
            flyingBee.innerHTML = this.innerHTML;

            // Position the bee at click position
            const rect = this.getBoundingClientRect();
            flyingBee.style.left = rect.left + 'px';
            flyingBee.style.top = rect.top + 'px';

            // Add to body
            document.body.appendChild(flyingBee);

            // Animate the bee randomly with realistic movement
            animateBeeRealistic(flyingBee);

            // Remove the bee after animation completes
            setTimeout(() => {
                // Gradual disappearance
                fadeOutBee(flyingBee);
            }, 8000);
        });
    });

    function fadeOutBee(bee) {
        let opacity = 1;
        const fadeInterval = setInterval(() => {
            opacity -= 0.05;
            bee.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(fadeInterval);
                document.body.removeChild(bee);
                // Decrement the active bees counter when a bee is removed
                activeBees--;
            }
        }, 50);
    }

    function animateBeeRealistic(bee) {
        // Screen dimensions
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;

        let posX = parseFloat(bee.style.left);
        let posY = parseFloat(bee.style.top);
        let velX = (Math.random() - 0.5) * 8;
        let velY = (Math.random() - 0.5) * 8;
        let rotation = 0;

        // Add random acceleration changes to simulate bee behavior
        let accX = 0;
        let accY = 0;

        // Create glitter along the path - more frequent for more sparkle
        const glitterInterval = setInterval(() => {
            // Create 2-4 glitter particles at once for more sparkle
            const glitterCount = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < glitterCount; i++) {
                createFallingGlitter(posX + 18, posY + 18);
            }

            // Occasionally create a special sparkle
            if (Math.random() < 0.2) {
                createSpecialSparkle(posX + 18, posY + 18);
            }
        }, 60); // More frequent glitter creation

        const animate = () => {
            // Random acceleration changes (bee-like erratic movement)
            if (Math.random() < 0.1) {
                accX = (Math.random() - 0.5) * 1.2;
                accY = (Math.random() - 0.5) * 1.2;
            }

            // Apply acceleration
            velX += accX;
            velY += accY;

            // Limit velocity
            velX = Math.max(Math.min(velX, 10), -10);
            velY = Math.max(Math.min(velY, 10), -10);

            // Update position
            posX += velX;
            posY += velY;

            // Boundary checks with bounce
            if (posX < 0) {
                posX = 0;
                velX *= -0.7;
            }
            if (posX > maxX) {
                posX = maxX;
                velX *= -0.7;
            }
            if (posY < 0) {
                posY = 0;
                velY *= -0.7;
            }
            if (posY > maxY) {
                posY = maxY;
                velY *= -0.7;
            }

            // Calculate rotation based on movement direction
            const targetRotation = Math.atan2(velY, velX) * 180 / Math.PI;
            // Smooth rotation
            rotation = rotation + (targetRotation - rotation) * 0.1;

            // Add a slight wobble for wing effect
            const wobble = Math.sin(Date.now() / 50) * 3;

            // Apply position and rotation
            bee.style.left = posX + 'px';
            bee.style.top = posY + 'px';
            bee.style.transform = `rotate(${rotation}deg) translateY(${wobble}px)`;

            beeAnimationId = requestAnimationFrame(animate);
        };

        let beeAnimationId = requestAnimationFrame(animate);

        // Stop animation after set time but keep the bee visible for fadeout
        setTimeout(() => {
            cancelAnimationFrame(beeAnimationId);
            clearInterval(glitterInterval);

            // Final burst of sparkles when animation stops
            for (let i = 0; i < 15; i++) {
                createSpecialSparkle(posX + 18, posY + 18);
            }
        }, 7800);
    }

    function createFallingGlitter(x, y) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';

        // Random size
        const size = 3 + Math.random() * 5;
        glitter.style.width = size + 'px';
        glitter.style.height = size + 'px';

        // Random initial position near the bee
        const offsetX = (Math.random() - 0.5) * 14;
        const offsetY = (Math.random() - 0.5) * 14;
        glitter.style.left = (x + offsetX) + 'px';
        glitter.style.top = (y + offsetY) + 'px';

        // Random horizontal velocity
        const velX = (Math.random() - 0.5) * 2;

        // Add to container
        document.body.appendChild(glitter);

        // Animate falling
        let posY = y + offsetY;
        let posX = x + offsetX;
        let opacity = 1;

        const animateGlitter = () => {
            // Fall down with gravity
            posY += 2 + Math.random();
            posX += velX;
            opacity -= 0.02;

            glitter.style.top = posY + 'px';
            glitter.style.left = posX + 'px';
            glitter.style.opacity = opacity;

            if (opacity > 0 && posY < window.innerHeight) {
                requestAnimationFrame(animateGlitter);
            } else {
                document.body.removeChild(glitter);
            }
        };

        requestAnimationFrame(animateGlitter);
    }

    // Special sparkles that expand and fade
    function createSpecialSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'special-sparkle';

        // Random initial position near the bee
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';

        // Random size and color
        const size = 4 + Math.random() * 8;
        const hue = 40 + Math.random() * 20; // Gold to yellow range

        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 75%, 1) 0%, hsla(${hue}, 100%, 60%, 0.8) 100%)`;

        // Add to container
        document.body.appendChild(sparkle);

        // Animate expansion and fade
        let scale = 0.1;
        let opacity = 1;

        const animateSparkle = () => {
            scale += 0.1;
            opacity -= 0.03;

            sparkle.style.transform = `scale(${scale})`;
            sparkle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animateSparkle);
            } else {
                document.body.removeChild(sparkle);
            }
        };

        requestAnimationFrame(animateSparkle);
    }
}); 