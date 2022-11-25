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
    
    async function switchTranslateLang(jsonFile) {
        try {
            fetch(jsonFile)
                .then(resp=>resp.json())
                .then(json=>{
                    console.log(json);
                    const divs=document.getElementsByClassName('cont')
                        Array.prototype.forEach.call(divs,div => {
                            let txt = div.children[1].children[0];
                            txt.innerHTML=json[txt.id].name;
                            div.children[1].style.display="";
                });
                });
        } catch (error) {
            console.log(error);
        }
    }
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
                switchTranslateLang(e.target.id.substring(3)+".json");
                VarRoot=document.documentElement.style;
                VarRoot.setProperty('--small-width-big',"50%");
                VarRoot.setProperty('--big-width-big',"66.666666666667%");
                VarRoot.setProperty('--cont-width-big',"33.333333333333%");

                
            }
        });
    else console.log("menu not found");
    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link,#navbarResponsive .dropdown-item')
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

    //manage active elements 

    document.body.querySelectorAll("#navbarResponsive .dropdown-item").forEach(dd=>{dd.addEventListener("click", function(e){
        e.target.parentElement.parentElement.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
     })
    });

    // Activate SimpleLightbox plugin for portfolio items
    //new SimpleLightbox({
    //    elements: '#portfolio a.portfolio-box'
    //});

});
