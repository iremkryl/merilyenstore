
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });

    $(document).off('click', '.js-addcart-detail'); //ÇİFT EVENTİ ENGELLEMEK İÇİN



/* =========================
   SEPET SİSTEMİ
   ========================= */
(function($){
    const CART_KEY = "myCartData";

    // Kupon durumu
    let discountActive = false;

    updateMiniCart();
    updateCartIconCount();

    // Sepeti al
    function getCart(){
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch(e) {
            return [];
        }
    }

    // Sepeti kaydet
    function saveCart(cart){
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateMiniCart();
    }

    
    // Sepete ürün ekle {name, price, image, quantity}
    function addToCart(product){
        var cart = getCart();
        var existing = cart.find(item => item.name === product.name);

        if(existing){
            existing.quantity = parseInt(existing.quantity) + parseInt(product.quantity);
        } else {
            cart.push({
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: parseInt(product.quantity)
            });
        }

        saveCart(cart);
        updateCartIconCount();

        // Küçük görsel geri bildirimi
        if(typeof toastr !== 'undefined'){
            toastr.success("Ürün sepete eklendi");
        } else {
            console.log("Ürün sepete eklendi");
        }
    }

    // Sepet ikonundaki sayıyı güncelle
    function updateCartIconCount() {
    var cart = getCart(); // localStorage'dan sepetteki ürünleri al
    var totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    // Sepet ikonundaki tüm elementleri seç
    document.querySelectorAll('.icon-header-noti.js-show-cart').forEach(icon => {
        icon.setAttribute('data-notify', totalQuantity);
    });
}


    /* Sepetten ürün sil
    function removeFromCart(name){
        var cart = getCart().filter(item => item.name !== name);
        saveCart(cart);
    }*/

        function removeFromCart(name){
            if(!name) return;
            var norm = name.toString().trim().toLowerCase();
            var cart = getCart().filter(function(item){
                return item.name.toString().trim().toLowerCase() !== norm;
            });
            saveCart(cart);
        }


    /* Mini sepet güncelle
    function updateMiniCart(){
        var cart = getCart();
        var $cartList = $(".header-cart-wrapitem");
        var $totalEl = $(".header-cart-total");
        if($cartList.length === 0) return;

        $cartList.empty();
        var total = 0;
        cart.forEach(item => {
            var $li = $('<li class="header-cart-item flex-w flex-t m-b-12"></li>');
            var html = ''
                + '<div class="header-cart-item-img"><img src="'+item.image+'" alt="'+item.name+'"><i class="zmdi zmdi-close"></i></div>'
                + '<div class="header-cart-item-txt p-t-8">'
                + '<a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">'+item.name+'</a>'
                + '<span class="header-cart-item-info">'+item.quantity+' x ₺'+item.price.toFixed(2)+'</span>'
                + '</div>';
            $li.html(html);
            $cartList.append($li);
            total += item.price * item.quantity;
        });
        $totalEl.text('Toplam: ₺' + total.toFixed(2));
    } */

        // Mini sepet güncelle
        function updateMiniCart(){
            var cart = getCart();
            var $cartList = $(".header-cart-wrapitem");
            var $totalEl = $(".header-cart-total");
            if($cartList.length === 0) return;

            $cartList.empty();
            var total = 0;
            cart.forEach(item => {
                // li'ye data-name ekliyoruz (güvenli eşleme için)
                var $li = $('<li class="header-cart-item flex-w flex-t m-b-12" data-name="'+htmlEscape(item.name)+'"></li>');
                var html = ''
                    + '<div class="header-cart-item-img"><img src="'+item.image+'" alt="'+item.name+'"><i class="zmdi zmdi-close" title="Sil"></i></div>'
                    + '<div class="header-cart-item-txt p-t-8">'
                    + '<a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">'+item.name+'</a>'
                    + '<span class="header-cart-item-info">'+item.quantity+' x ₺'+item.price.toFixed(2)+'</span>'
                    + '</div>';
                $li.html(html);
                $cartList.append($li);
                total += item.price * item.quantity;
            });
            $totalEl.text('Toplam: ₺' + total.toFixed(2));
        }

        // küçük yardımcı: HTML için güvenli string (basit)
        function htmlEscape(str){
            return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        }


    // Shopping-cart sayfasını doldur
    function populateCartPage(){
        var $cartBody = $("#cart-body");
        if($cartBody.length === 0) return;

        var cart = getCart();
        $cartBody.empty();

        cart.forEach(item => {
            var $tr = $('<tr class="table_row"></tr>');
            $tr.html(`
                <td class="column-1"><div class="how-itemcart1"><img src="${item.image}" alt="${item.name}"></div>
                <span class="delete-cart-item" style="cursor:pointer; color:red; font-size:20px;">×</span></td>
                <td class="column-2">${item.name}</td>
                <td class="column-3">₺${item.price.toFixed(2)}</td>
                <td class="column-4">
                    <div class="wrap-num-product flex-w m-l-auto m-r-0">
                        <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">-</div>
                        <input class="mtext-104 cl3 txt-center num-product" type="number" value="${item.quantity}">
                        <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">+</div>
                    </div>
                </td>
                <td class="column-5">₺${(item.price * item.quantity).toFixed(2)}</td>
            `);
            $cartBody.append($tr);
        });

        bindCartPageEvents();
        updateCartTotalsOnPage();
    }

    // Shopping-cart sayfasındaki satırlara event bağla
    function bindCartPageEvents(){
        $("#cart-body .table_row").each(function(){
            var $row = $(this);
            var $qtyInput = $row.find('.num-product');
            var $plus = $row.find('.btn-num-product-up');
            var $minus = $row.find('.btn-num-product-down');

            $plus.off('click').on('click', function(){
                $qtyInput.val(parseInt($qtyInput.val()) + 1).trigger('change');
            });
            $minus.off('click').on('click', function(){
                var cur = parseInt($qtyInput.val()) || 0;
                if(cur > 1) $qtyInput.val(cur - 1).trigger('change');
            });

            $qtyInput.off('change').on('change', function(){
                var newQty = parseInt($(this).val()) || 1;
                $(this).val(newQty);

                var name = $row.find('.column-2').text().trim();
                var cart = getCart();
                for(var i=0;i<cart.length;i++){
                    if(cart[i].name === name){
                        cart[i].quantity = newQty;
                        break;
                    }
                }
                saveCart(cart);
                updateCartIconCount(); //adet değiştiğinde icon da değişecek

                var priceText = $row.find('.column-3').text();
                var price = parseFloat(priceText.replace(/[^0-9.]/g,'')) || 0;
                $row.find('.column-5').text('₺' + (price * newQty).toFixed(2));

                updateCartTotalsOnPage();
            });
                // Sepet sayfasından ürün silme
                $row.find('.delete-cart-item').on('click', function(){
                    var name = $row.find('.column-2').text().trim();
                    removeFromCart(name);
                    populateCartPage();
                    updateMiniCart();
                    updateCartIconCount();
                });
        });
    }

    // Shopping-cart sayfası toplamlarını güncelle
    function updateCartTotalsOnPage(){
        const cart = getCart();
        let subtotal = 0;
        cart.forEach(item => subtotal += item.price * item.quantity);

        let shippingCost = parseFloat(document.querySelector('.size-209[data-shipping]')?.dataset.shipping) || 0;

        // 2500 TL üstü ücretsiz kargo
		if(subtotal > 2500){
			shippingCost = 0;
			alert("Tebrikler! 2500 TL üzeri alışverişlerde kargo ücretsiz!");
		}
        let total = subtotal + shippingCost;
        if(discountActive) total = total / 2;

        const subtotalEl = document.querySelector('.flex-w.flex-t.bor12.p-b-13 .mtext-110');
        const totalEl = document.querySelector('.flex-w.flex-t.p-t-27.p-b-33 .mtext-110');
        if(subtotalEl) subtotalEl.textContent = `₺ ${subtotal.toFixed(2)}`;
        if(totalEl) totalEl.textContent = `₺ ${total.toFixed(2)}`;
    }

    // DOM yüklendiğinde
    $(function(){
        updateMiniCart();

        // Add to cart butonları
        $(document).on('click', '.add-to-cart-btn', function(e){
            e.preventDefault();
            var $btn = $(this);
            // Miktarı bul: aynı ürün satırındaki input
            var quantity = parseInt($btn.closest('.product-item').find('.product-quantity').val()) || 1;
            var product = {
                name: $btn.data('name') || $btn.attr('data-name') || 'Ürün',
                price: parseFloat($btn.data('price') || $btn.attr('data-price') || 0),
                image: $btn.data('image') || $btn.attr('data-image') || 'images/item-cart-01.jpg',
                quantity: quantity
            };
            addToCart(product);
            updateCartIconCount();
        });
        // shopping-cart.html sayfasındaysak sepeti populate et
        populateCartPage();

        //Alışverişi Tamamlama Butonu
        const finishBtn = document.querySelector('.flex-c-m.stext-101.cl0.size-116.bg3.bor14.hov-btn3.p-lr-15.trans-04.pointer');

        if(finishBtn){
            finishBtn.addEventListener('click', function(e){
                e.preventDefault();

                // Ülke seçimini al
                const countrySelect = document.querySelector('.size-209 select.js-select2');
                if(!countrySelect || countrySelect.value === "" || countrySelect.value === "Ülke Seçin..."){
                    alert("Lütfen ülke seçiniz. Kargo ücreti hesaplanmadan alışveriş tamamlanamaz!");
                    return; 
                }

                // Sepeti temizle ve tamamla
                localStorage.removeItem(CART_KEY);
                discountActive = false;
                populateCartPage();
                updateMiniCart();
                updateCartIconCount();
                alert("Alışverişiniz tamamlandı!");
            });
        }
});

        //Mini Sepetten silme- çalışmıyor
        $(document).on('click', '.zmdi-close[title="Sil"]', function(e){
            e.preventDefault();
            var $item = $(this).closest('.header-cart-item');
            var name = $item.find('.header-cart-item-name').text().trim();
            removeFromCart(name);
            updateMiniCart();
            populateCartPage();
            updateCartIconCount();
        });

    // Global erişim
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.getCart = getCart;
    window.saveCart = saveCart;
    window.updateCartTotalsOnPage = updateCartTotalsOnPage;

})(jQuery);


// Hash değiştiğinde filtreyi güncelle
function applyCategoryFilter() {
    const category = window.location.hash.replace('#', '');
    if (category) {
        // Isotope filtrele
        $('.isotope-grid').isotope({ filter: '.' + category });

        // Filtre butonlarında aktif class güncelle
        $('.filter-tope-group button').removeClass('how-active1');
        $(`.filter-tope-group button[data-filter=".${category}"]`).addClass('how-active1');
    }
}
// Sayfa ilk açıldığında çalışsın
document.addEventListener("DOMContentLoaded", applyCategoryFilter);
// Hash değişince çalışsın
window.addEventListener("hashchange", applyCategoryFilter);



// MODAL kodu:
$('.js-show-modal1').on('click', function (e) {
    e.preventDefault();

    var product = $(this).closest('.block2');

    // Ürün bilgilerini oku
    var name = product.data('name');
    var price = product.data('price');
    var desc = product.data('desc');
    var img1 = product.data('img1');
    var img2 = product.data('img2');
    var img3 = product.data('img3');

    // Modal içine ürün bilgilerini yerleştir
    $('.js-name-detail').text(name);
    $('.mtext-106').text(price);
    $('.stext-102').text(desc);

    // Resimleri güncelle
    var gallery = $('.slick3');
    gallery.slick('unslick'); // önce kapat
    gallery.html(''); // içerik temizle

    [img1, img2, img3].forEach(function (img) {
        if (img) {
            gallery.append(`
                <div class="item-slick3" data-thumb="${img}">
                    <div class="wrap-pic-w pos-relative">
                        <img src="${img}" alt="IMG-PRODUCT">
                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${img}">
                            <i class="fa fa-expand"></i>
                        </a>
                    </div>
                </div>
            `);
        }
    });
    // Slick slider tekrar başlat
    gallery.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true
    });
    $('.js-modal1').addClass('show-modal1');
});


})(jQuery);