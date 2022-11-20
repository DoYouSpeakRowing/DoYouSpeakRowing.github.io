//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };
    const trmenu = document.getElementById('translateDropdown');
    if (trmenu) 
        trmenu.addEventListener('click',function myTranslate(e) {
            console.log(e.target.id);
            if(e.target.id == "none") {
                VarRoot=document.documentElement.style;
                VarRoot.setProperty('--small-width-big',"100%");
                VarRoot.setProperty('--big-width-big',"83.333333333333%");
                VarRoot.setProperty('--cont-width-big',"16.666666666667%");

                const divs=document.getElementsByClassName('cont')
                Array.prototype.forEach.call(divs,div => {
                    div.children[1].style.display="none";
                });
            } else {
                VarRoot=document.documentElement.style;
                VarRoot.setProperty('--small-width-big',"50%");
                VarRoot.setProperty('--big-width-big',"66.666666666667%");
                VarRoot.setProperty('--cont-width-big',"33.333333333333%");

                const divs=document.getElementsByClassName('cont')
                Array.prototype.forEach.call(divs,div => {
                    div.children[1].style.display="";
                });
            }
        });
    else console.log("menu not found");
    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    
    responsiveNavItems.map(function (responsiveNavItem) {
        if(!responsiveNavItem.classList.contains("dropdown-toggle")) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        }
    });
    // Activate SimpleLightbox plugin for portfolio items
    //new SimpleLightbox({
    //    elements: '#portfolio a.portfolio-box'
    //});

});
