$(document).ready(function() {

    // --- CÓDIGO DO MENU MOBILE ---
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toggleClass('active');
        const icon = $(this).find('i');
        icon.toggleClass('fa-bars').toggleClass('fa-x');
    });

    const sections = $('section'); 
    const navItems = $('.nav-item'); 

    // --- INÍCIO DO EVENTO DE SCROLL ---
    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop();
        const headerHeight = header.outerHeight();

        // Sombra do Header
        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '0px 2px 5px rgba(0,0,0,0.1)');
        }

        let activeSectionIndex = 0;

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - (headerHeight + 1); 
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false; 
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    }); // <--- AQUI FECHA O SCROLL CORRETAMENTE

    
    // ADICIONAL - EFEITO SMOOTH - Pode ser aplicado normalmente no style.css, mas não está funcionando //

    // --- INÍCIO DO EVENTO DE CLIQUE (Fora do Scroll) ---
    $('.nav-item a, #mobile_menu a').on('click', function(e) {
        const href = $(this).attr('href');

        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetSection = $(href);
            const headerHeight = $('header').outerHeight();

            if (targetSection.length) {
                $('html, body').stop().animate({ // stop() evita acumular animações
                    scrollTop: targetSection.offset().top - headerHeight
                }, 800);
            }

            // Fecha o menu mobile ao clicar (boa prática)
            $('#mobile_menu').removeClass('active');
            $('#mobile_btn').find('i').addClass('fa-bars').removeClass('fa-x');
        }
    });

    ScrollReveal().reveal('#dishes', {
        origin: 'left',
        duration: 2000,
        distance: '15%'

    });


        ScrollReveal().reveal('#feedbacks', {
        origin: 'right',
        duration: 2500,
        distance: '5%'

    });



}); // Fim do Ready