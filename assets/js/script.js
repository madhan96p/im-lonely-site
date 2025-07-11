document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const pageContent = document.querySelector('.page-content');
    const toggleBtn = document.createElement('button');

    toggleBtn.classList.add('toggle-btn');
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(toggleBtn);

    // Show hamburger when closed, X when open
    function updateToggleIcon() {
        if (sidebar.classList.contains('active')) {
            toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
            toggleBtn.classList.add('close');
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            toggleBtn.classList.remove('close');
        }
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        pageContent.classList.toggle('full');
        updateToggleIcon();
    });

    // Close sidebar if clicked outside
    document.addEventListener('click', (e) => {
        if (
            window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !toggleBtn.contains(e.target)
        ) {
            sidebar.classList.remove('active');
            pageContent.classList.remove('full');
            updateToggleIcon();
        }
    });

    // Ensure correct icon on load
    updateToggleIcon();
});
