document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const offcanvasNavbar = document.querySelector('#offcanvasNavbar');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasNavbar);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        });
    });
});
