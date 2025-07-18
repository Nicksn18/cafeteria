document.addEventListener("DOMContentLoaded", () => {
    // Seleções únicas e limpas dos elementos
    const navbar = document.querySelector('.navbar');
    const searchForm = document.querySelector('.search-form');
    const cartContainer = document.querySelector('.cart-items-container');

    const menuBtn = document.getElementById('menu-btn');
    const searchBtn = document.getElementById('search-btn');
    const cartBtn = document.getElementById('cart-btn');
    const searchInput = document.getElementById('search-box');

    // Abre/fecha menu
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        cartContainer.classList.remove('active');
    });

    // Abre/fecha busca
    searchBtn.addEventListener('click', () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartContainer.classList.remove('active');
        searchInput.focus();
    });

    // Abre/fecha carrinho
    cartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    });

    // Fecha tudo ao rolar a página
    window.addEventListener('scroll', () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartContainer.classList.remove('active');
    });

    // Busca dinâmica nos menus e produtos
    searchInput.addEventListener('input', () => {
        const termo = searchInput.value.toLowerCase();
        const caixas = document.querySelectorAll('.menu .box, .products .box');

        caixas.forEach(caixa => {
            const titulo = caixa.querySelector('h3')?.textContent.toLowerCase() || "";
            const descricao = caixa.querySelector('.cafe')?.textContent.toLowerCase() || "";

            if (titulo.includes(termo) || descricao.includes(termo)) {
                caixa.style.display = "block";
            } else {
                caixa.style.display = "none";
            }
        });
    });

    // Adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll('.menu .btn, .products .btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const productBox = button.closest('.box');
            const imgSrc = productBox.querySelector('img').src;
            const title = productBox.querySelector('h3').textContent;
            const price = productBox.querySelector('.price')?.textContent.trim() || "R$0.00";

            addItemToCart(title, imgSrc, price);
        });
    });

    function addItemToCart(title, img, price) {
        // Verifica se item já está no carrinho
        const itemsInCart = cartContainer.querySelectorAll('.cart-item h3');
        for (let item of itemsInCart) {
            if (item.textContent === title) {
                alert("Este item já está no carrinho!");
                return;
            }
        }

        // Cria novo item no carrinho
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('cart-item');

        itemContainer.innerHTML = `
            <span class="fas fa-times"></span>
            <img src="${img}" alt="${title}">
            <div class="content">
                <h3>${title}</h3>
                <div class="price">${price}</div>
            </div>
        `;

        // Evento para remover item do carrinho
        itemContainer.querySelector('.fa-times').addEventListener('click', () => {
            itemContainer.remove();
            updateCartCount();
        });

        // Insere antes do botão checkout
        const checkoutBtn = cartContainer.querySelector('.btn');
        cartContainer.insertBefore(itemContainer, checkoutBtn);

        updateCartCount();
    }

    // Atualiza contador de itens no ícone do carrinho
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');

        const count = cartContainer.querySelectorAll('.cart-item').length;
        if (!cartCountElement) {
            // Cria o badge se não existir
            const cartIcon = document.getElementById('cart-btn');
            const badge = document.createElement('span');
            badge.id = 'cart-count';
            badge.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: var(--main-color);
                color: #fff;
                font-size: 1.2rem;
                padding: 2px 6px;
                border-radius: 50%;
                pointer-events: none;
            `;
            badge.textContent = count;
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(badge);
        } else {
            // Atualiza o texto do badge
            cartCountElement.textContent = count;
            if (count === 0) cartCountElement.remove();
        }
    }

    // Inicializa contador no carregamento
    updateCartCount();

});
