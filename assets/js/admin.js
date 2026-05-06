// Admin JS for MTRL Website
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Dashboard Loaded');
    
    // Simulate navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-links li');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            // In a real app, this would change the view
        });
    });

    // Mock Sync Function
    const syncBtn = document.querySelector('button:contains("Одоо синхрончлох")');
    if (syncBtn) {
        syncBtn.addEventListener('click', () => {
            syncBtn.textContent = 'Синхрончилж байна...';
            syncBtn.disabled = true;
            setTimeout(() => {
                alert('Google Drive-аас 3 шинэ файл амжилттай синхрончлогдлоо.');
                syncBtn.textContent = 'Одоо синхрончлох';
                syncBtn.disabled = false;
            }, 2000);
        });
    }
});

// Helper for selecting by text (for the mock)
// @ts-ignore
window.jQueryLikeSelect = (text) => {
    return Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes(text));
};
