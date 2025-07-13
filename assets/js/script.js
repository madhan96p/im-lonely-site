document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const pageContent = document.querySelector('.page-content');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn'); // New close button inside sidebar

    // --- Create and setup the main open/toggle button ---
    const sidebarOpenBtn = document.createElement('button');
    sidebarOpenBtn.setAttribute('id', 'sidebar-open-btn');
    sidebarOpenBtn.setAttribute('aria-label', 'Toggle sidebar');
    // Inner HTML (icon) will be set by updateSidebarOpenBtnIcon
    document.body.appendChild(sidebarOpenBtn);

    // Function to update the icon and state of the #sidebar-open-btn (main toggle)
    function updateSidebarOpenBtnIcon() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            if (sidebar.classList.contains('active')) {
                sidebarOpenBtn.innerHTML = '<i class="fas fa-times"></i>';
                sidebarOpenBtn.classList.add('mobile-close-icon');
                sidebarOpenBtn.setAttribute('aria-expanded', 'true');
            } else {
                sidebarOpenBtn.innerHTML = '<i class="fas fa-bars"></i>';
                sidebarOpenBtn.classList.remove('mobile-close-icon');
                sidebarOpenBtn.setAttribute('aria-expanded', 'false');
            }
        } else {
            // On desktop, this button is the "open" button (hamburger).
            // Its visibility is controlled by CSS (shows when body.sidebar-closed).
            sidebarOpenBtn.innerHTML = '<i class="fas fa-bars"></i>';
            sidebarOpenBtn.setAttribute('aria-expanded', body.classList.contains('sidebar-closed') ? 'false' : 'true');
        }
    }

    // --- Event Listeners ---

    // 1. Main Open/Toggle Button (#sidebar-open-btn)
    sidebarOpenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            sidebar.classList.toggle('active');
            pageContent.classList.toggle('full');
        } else {
            // Desktop: this button OPENS the sidebar
            body.classList.remove('sidebar-closed');
        }
        updateSidebarOpenBtnIcon();
    });

    // 2. Internal Sidebar Close Button (#sidebar-close-btn)
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Mobile: This button (internal 'X') closes the sidebar
                console.log("Internal close button clicked on MOBILE");
                sidebar.classList.remove('active');
                pageContent.classList.remove('full');
                // Update the top-left toggle button to show hamburger, as sidebar is now closed
                updateSidebarOpenBtnIcon();
            } else {
                // Desktop: This button closes the sidebar
                console.log("Internal close button clicked on DESKTOP");
                body.classList.add('sidebar-closed');
                // Update the top-left open button (which becomes visible now that sidebar is closed)
                updateSidebarOpenBtnIcon();
            }
        });
    }

    // 3. Click Outside to Close (Mobile Specific)
    document.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !sidebarOpenBtn.contains(e.target)) {
                sidebar.classList.remove('active');
                pageContent.classList.remove('full');
                updateSidebarOpenBtnIcon();
            }
        }
    });

    // --- Initial State Setup ---
    function setInitialSidebarState() {
        console.log("Setting initial sidebar state...");
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            console.log("Mobile view detected. Setting sidebar to open by default.");
            // Ensure any desktop-specific class that might hide it is removed
            body.classList.remove('sidebar-closed');

            // Add mobile active classes
            // sidebar.classList.add('active');
            // pageContent.classList.add('full');

            if (sidebarCloseBtn) {
                console.log("Showing internal close button for mobile as sidebar is open by default.");
                sidebarCloseBtn.style.display = 'flex'; // Should be visible on mobile if sidebar is open
            }
            console.log("Mobile sidebar should be active. Sidebar classes:", sidebar.className, "Body classes:", body.className);
        } else { // Desktop
            console.log("Desktop view detected. Setting sidebar to open by default.");
            body.classList.remove('sidebar-closed');
            sidebar.classList.remove('active'); // Ensure mobile class is not present
            if (sidebarCloseBtn) {
                console.log("Showing internal close button for desktop.");
                sidebarCloseBtn.style.display = 'flex';
            }
            console.log("Desktop sidebar should be open. Body classes:", body.className, "Sidebar classes:", sidebar.className);
        }
        updateSidebarOpenBtnIcon();
    }

    setInitialSidebarState();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setInitialSidebarState();
        }, 200);
    });
});

/**
 * Copies the UPI ID text to the clipboard.
 * This function is in the global scope to be accessible by onclick attributes.
 */
function copyUPI() {
    const upiIdElement = document.getElementById("upi-id-text");
    if (upiIdElement) {
        const upiText = upiIdElement.innerText;
        navigator.clipboard.writeText(upiText)
            .then(() => {
                alert("UPI ID copied: " + upiText);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert("Failed to copy UPI ID.");
            });
    }
}

/**
 * Toggles the visibility of the QR code container.
 * This function is in the global scope to be accessible by onclick attributes.
 */
function toggleQR(button) {
    const qrContainer = document.getElementById('qr-container');
    if (qrContainer) {
        const isNowShown = qrContainer.classList.toggle('show');
        button.textContent = isNowShown ? 'Hide QR Code' : 'Show QR Code';
    }
}
