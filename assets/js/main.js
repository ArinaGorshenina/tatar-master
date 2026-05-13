"use strict"
document.addEventListener('DOMContentLoaded', function () {

    // ── Бургер / мобильное меню ──────────────────────────────
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('active');
            burger.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // ── Мобильный каталог ────────────────────────────────────
    const mobileCatalog   = document.getElementById('mobileCatalog');
    const mobileCatalogBack  = document.getElementById('mobileCatalogBack');
    const mobileCatalogClose = document.getElementById('mobileCatalogClose');
    const mobCatalogBtn   = document.getElementById('mobileCatalogOpen');

    function resetAccordions() {
        document.querySelectorAll('.mob-cat-content.visible').forEach(c => {
            c.classList.remove('visible');
        });
        document.querySelectorAll('.mob-cat-toggle.rotate').forEach(btn => {
            btn.classList.remove('rotate');
            const rect = btn.querySelector('svg rect');
            const path = btn.querySelector('svg path');
            if (rect) rect.setAttribute('fill', '#F5F5F5');
            if (path) path.setAttribute('stroke', 'black');
        });
    }

    function openMobileCatalog() {
        if (mobileCatalog) mobileCatalog.classList.add('active');
    }

    function closeMobileCatalog() {
        if (mobileCatalog) mobileCatalog.classList.remove('active');
        resetAccordions();
    }

    function closeAll() {
        closeMobileCatalog();
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (burger) burger.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobCatalogBtn)      mobCatalogBtn.addEventListener('click', openMobileCatalog);
    if (mobileCatalogBack)  mobileCatalogBack.addEventListener('click', closeMobileCatalog);
    if (mobileCatalogClose) mobileCatalogClose.addEventListener('click', closeAll);

    // ── Аккордеон категорий ──────────────────────────────────
 

});

// Аккордеон категорий
document.querySelectorAll('.mob-cat-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = document.getElementById(btn.dataset.target);
        if (!content) return;

        const isOpen = content.classList.contains('visible');

        content.classList.toggle('visible', !isOpen);
        btn.classList.toggle('rotate', !isOpen);

        const rect = btn.querySelector('svg rect');
        const path = btn.querySelector('svg path');

        if (!isOpen) {
            if (rect) rect.setAttribute('fill', '#054F2A');
            if (path) path.setAttribute('stroke', 'white');
        } else {
            if (rect) rect.setAttribute('fill', '#F5F5F5');
            if (path) path.setAttribute('stroke', 'black');
        }
    });
});
//скрытие верхней шапки
document.addEventListener('DOMContentLoaded', function () {
    const headerUp = document.querySelector('.h-up');
    const headerDown = document.querySelector('.h-down');
    const burger = document.querySelector('.burger');
    let lastScrollTop = 0;
    let ticking = false;
    let isHidden = false;

    // Порог скролла для срабатывания
    const scrollThreshold = 50;

    // Функция для обновления позиции бургера
    function updateBurgerPosition(hidden) {
        if (!burger) return;

        if (hidden) {
            burger.classList.add('header-up-hidden');
        } else {
            burger.classList.remove('header-up-hidden');
        }
    }

    // Функция для плавного скрытия/показа
    function toggleHeaderUp(show) {
        if (show && isHidden) {
            headerUp.classList.remove('header-up-hidden');
            updateBurgerPosition(false);
            isHidden = false;

            // Добавляем анимацию появления
            headerUp.style.animation = 'slideDown 0.45s cubic-bezier(0.4, 0.0, 0.2, 1)';
            setTimeout(() => {
                headerUp.style.animation = '';
            }, 450);

        } else if (!show && !isHidden) {
            headerUp.classList.add('header-up-hidden');
            updateBurgerPosition(true);
            isHidden = true;
        }
    }

    // Обработчик скролла
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Определяем направление скролла
                if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                    // Скроллим вниз и проскроллили достаточно - прячем
                    toggleHeaderUp(false);
                }

                // Всегда показываем у самого верха
                if (scrollTop < 10) {
                    toggleHeaderUp(true);
                }

                lastScrollTop = Math.max(0, scrollTop);
                ticking = false;
            });

            ticking = true;
        }
    });

    // Если страница загружена не в самом верху, скрываем верхнюю панель
    if (window.pageYOffset > 10) {
        headerUp.classList.add('header-up-hidden');
        updateBurgerPosition(true);
        isHidden = true;
    }
});

/* слайдер */
document.addEventListener('DOMContentLoaded', function () {
    // ========== ФУНКЦИЯ ДЛЯ ИНИЦИАЛИЗАЦИИ ОТДЕЛЬНОГО СЛАЙДЕРА ==========
    function initSwiper(container) {
        if (!container) return null;

        // Находим кнопки внутри этого конкретного слайдера
        const sliderBlock = container.closest('.cat-slider');
        if (!sliderBlock) return null;

        const prevButton = sliderBlock.querySelector('.swiper-button-prev-custom');
        const nextButton = sliderBlock.querySelector('.swiper-button-next-custom');

        if (!prevButton || !nextButton) return null;

        // Функция для обновления состояния стрелок
        function updateNavigationState(swiperInstance) {
            if (!prevButton || !nextButton) return;

            // Проверяем, находится ли слайдер в начале
            if (swiperInstance.isBeginning) {
                prevButton.classList.add('swiper-button-disabled');
                prevButton.style.opacity = '0.5';
                prevButton.style.cursor = 'not-allowed';
                prevButton.style.pointerEvents = 'none';
            } else {
                prevButton.classList.remove('swiper-button-disabled');
                prevButton.style.opacity = '1';
                prevButton.style.cursor = 'pointer';
                prevButton.style.pointerEvents = 'auto';
            }

            // Проверяем, находится ли слайдер в конце
            if (swiperInstance.isEnd) {
                nextButton.classList.add('swiper-button-disabled');
                nextButton.style.opacity = '0.5';
                nextButton.style.cursor = 'not-allowed';
                nextButton.style.pointerEvents = 'none';
            } else {
                nextButton.classList.remove('swiper-button-disabled');
                nextButton.style.opacity = '1';
                nextButton.style.cursor = 'pointer';
                nextButton.style.pointerEvents = 'auto';
            }
        }

        // Создаем экземпляр Swiper
        const swiper = new Swiper(container, {
            slidesPerView: 1.1,
            spaceBetween: 12,

            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
                disabledClass: 'swiper-button-disabled',
            },

            breakpoints: {
                320: { slidesPerView: 1.1, spaceBetween: 12 },
                480: { slidesPerView: 1.3, spaceBetween: 12 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
                1440: { slidesPerView: 5, spaceBetween: 24 }
            },

            on: {
                init: function () {
                    updateNavigationState(this);
                },
                slideChange: function () {
                    updateNavigationState(this);
                },
                reachBeginning: function () {
                    updateNavigationState(this);
                },
                reachEnd: function () {
                    updateNavigationState(this);
                },
                fromEdge: function () {
                    updateNavigationState(this);
                },
                resize: function () {
                    updateNavigationState(this);
                }
            }
        });

        return swiper;
    }

    // ========== ИНИЦИАЛИЗАЦИЯ ВСЕХ СЛАЙДЕРОВ ==========
    const allSwiperContainers = document.querySelectorAll('.cat-items.swiper');

    allSwiperContainers.forEach(container => {
        initSwiper(container);
    });
});

// Функция фильтрации блога
function initBlogFilters() {
    // Находим все кнопки фильтров
    const filterButtons = document.querySelectorAll('.blog-filter-btn');

    // Находим все блоки с контентом
    const blogContents = document.querySelectorAll('.blog-box');

    // Находим последний элемент в хлебных крошках
    const breadcrumbLast = document.querySelector('.breadcrumb-box .bread:last-child');

    // Объект с соответствием названий
    const filterNames = {
        'all': 'всё',
        'culture': 'культура',
        'events': 'события',
        'articles': 'полезные статьи'
    };

    // Если нет ни кнопок, ни контента, выходим
    if (!filterButtons.length || !blogContents.length) return;

    // Функция для показа выбранной категории
    function filterBlog(category) {
        // Скрываем все блоки
        blogContents.forEach(content => {
            content.style.display = 'none';
        });

        // Показываем блок с выбранной категорией
        const selectedContent = document.querySelector(`.blog-box[data-category="${category}"]`);
        if (selectedContent) {
            selectedContent.style.display = 'grid';
        }

        // Обновляем активный класс на кнопках
        filterButtons.forEach(button => {
            if (button.getAttribute('data-filter') === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Обновляем последний элемент в хлебных крошках
        if (breadcrumbLast && filterNames[category]) {
            breadcrumbLast.textContent = filterNames[category];
        }
    }

    // Добавляем обработчики на все кнопки
    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-filter');
            if (category) {
                filterBlog(category);
            }
        });
    });

    // Показываем первый таб по умолчанию (первую категорию)
    const firstCategory = filterButtons[0]?.getAttribute('data-filter');
    if (firstCategory) {
        filterBlog(firstCategory);
    }
}

// Запускаем фильтрацию после полной загрузки страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogFilters);
} else {
    initBlogFilters();
}

// ========================
// ВЫДВИГАЮЩИЙСЯ ПОИСК
// ========================

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchExpandOverlay = document.getElementById('searchExpandOverlay');
    const main = document.querySelector('.main');
    const searchExpandInput = document.getElementById('searchExpandInput');
    const searchExpandBtn = document.getElementById('searchExpandBtn');
    const originalSearchBox = document.querySelector('.input-box-h');

    // Функция для открытия поиска
    function openSearch() {
        searchExpandOverlay.classList.add('active');
        // Синхронизируем значение из обычного инпута
        if (searchInput && searchInput.value) {
            searchExpandInput.value = searchInput.value;
        }
        // Фокусируемся на поле ввода
        setTimeout(() => {
            searchExpandInput.focus();
        }, 100);

        // Опционально: скрываем обычный поиск
        if (originalSearchBox) {
            originalSearchBox.classList.add('hidden-search');
        }

        // Блокируем скролл body
        document.body.style.overflow = 'hidden';
    }

    // Функция для закрытия поиска
    function closeSearch() {
        searchExpandOverlay.classList.remove('active');

        // Возвращаем обычный поиск
        if (originalSearchBox) {
            originalSearchBox.classList.remove('hidden-search');
        }

        // Разблокируем скролл
        document.body.style.overflow = '';

        // Синхронизируем значение обратно в обычный инпут (если нужно)
        if (searchInput && searchExpandInput.value) {
            searchInput.value = searchExpandInput.value;
        }
    }


    // Открываем поиск при вводе текста в обычное поле
    if (searchInput) {
        searchInput.addEventListener('focus', function () {
            openSearch();
        });

        // Также открываем при начале ввода (если поле пустое)
        searchInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                openSearch();
            }
        });
    }

    if (main) {
        main.addEventListener('click', function (e) {
            if (searchExpandOverlay && searchExpandOverlay.classList.contains('active')) {
                // Не закрываем, если клик был по инпуту или кнопке в поиске
                if (!searchExpandInput.contains(e.target)) {
                    closeSearch();
                }
            }
        });
    }


    // Закрытие по клавише ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchExpandOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    // Синхронизация значений между полями поиска
    if (searchInput && searchExpandInput) {
        searchInput.addEventListener('input', function () {
            if (searchExpandOverlay.classList.contains('active')) {
                searchExpandInput.value = this.value;
            }
        });

        searchExpandInput.addEventListener('input', function () {
            if (searchInput) {
                searchInput.value = this.value;
            }
        });
    }
});


/* каталог список */
document.addEventListener('DOMContentLoaded', function () {
    const catalogBtn = document.getElementById('catalogBtn');
    const catalogDropdown = document.getElementById('catalogDropdown');
    const catalogOverlay = document.getElementById('catalogOverlay');

    // Функция открытия каталога
    function openCatalog() {
        if (!catalogDropdown || !catalogOverlay) return;
        catalogDropdown.classList.add('active');
        catalogOverlay.classList.add('active');
        if (catalogBtn) catalogBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия каталога
    function closeCatalog() {
        if (!catalogDropdown || !catalogOverlay) return;
        catalogDropdown.classList.remove('active');
        catalogOverlay.classList.remove('active');
        if (catalogBtn) catalogBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Переключение каталога
    if (catalogBtn) {
        catalogBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (catalogDropdown.classList.contains('active')) {
                closeCatalog();
            } else {
                openCatalog();
            }
        });
    }

    // Закрытие по клику на оверлей
    if (catalogOverlay) {
        catalogOverlay.addEventListener('click', function () {
            closeCatalog();
        });
    }

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && catalogDropdown && catalogDropdown.classList.contains('active')) {
            closeCatalog();
        }
    });

    // Закрытие при скролле
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (catalogDropdown && catalogDropdown.classList.contains('active')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                closeCatalog();
            }, 100);
        }
    });

    // Закрытие при клике на main
    const main = document.querySelector('.main');
    if (main) {
        main.addEventListener('click', function () {
            if (catalogDropdown && catalogDropdown.classList.contains('active')) {
                closeCatalog();
            }
        });
    }

    // Блокировка кликов внутри dropdown (чтобы не закрывался при клике внутрь)
    if (catalogDropdown) {
        catalogDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Закрытие при клике на ссылки внутри каталога
    const catalogLinks = document.querySelectorAll('.catalog-list a, .catalog-promo-link');
    catalogLinks.forEach(link => {
        link.addEventListener('click', function () {
            setTimeout(() => {
                closeCatalog();
            }, 100);
        });
    });
});
/* cookie */
document.addEventListener('DOMContentLoaded', function () {
    const cookieElement = document.querySelector('.cookie');
    const cookieBtn = document.querySelector('.cookie-btn');

    // Проверяем, соглашался ли пользователь уже с cookie
    const cookieAccepted = localStorage.getItem('cookieAccepted');

    // Если пользователь еще не соглашался, показываем плашку через 3 секунды
    if (!cookieAccepted) {
        setTimeout(function () {
            if (cookieElement) {
                cookieElement.style.display = 'block';
            }
        }, 3000); // 3 секунды
    }

    // Обработчик нажатия на кнопку "Окей"
    if (cookieBtn) {
        cookieBtn.addEventListener('click', function () {
            // Сохраняем в localStorage, что пользователь согласился
            localStorage.setItem('cookieAccepted', 'true');

            // Плавно скрываем плашку
            if (cookieElement) {
                cookieElement.style.display = 'none';
            }
        });
    }
});

/* фильтры в каталоге */
document.addEventListener('DOMContentLoaded', function () {
    const filterOpen = document.getElementById('cat-filterOpen');
    const filterPanel = document.getElementById('filterPanel');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterClose = document.getElementById('filterClose');
    const filterReset = document.querySelector('.filter-panel__reset');

    function openFilter() {
        filterPanel.classList.add('active');
        filterOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeFilter() {
        filterPanel.classList.remove('active');
        filterOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Функция сброса всех фильтров
    function resetFilters() {
        // Находим все чекбоксы в панели фильтров
        const allCheckboxes = document.querySelectorAll('.filter-panel .filter-checkbox input');

        // Сбрасываем все чекбоксы
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false;

            // Обновляем внешний вид чекбокса (убираем галочку)
            const box = checkbox.closest('.filter-checkbox').querySelector('.filter-checkbox__box');
            if (box) {
                box.innerHTML = '';
                box.style.background = 'white';
                box.style.borderColor = '#ccc';
            }
        });

        // Сбрасываем все аккордеоны (закрываем их)
        const allContents = document.querySelectorAll('.filter-group__content');
        allContents.forEach(content => {
            content.classList.remove('filter-group__content--visible');
        });

        // Сбрасываем стили стрелок
        const allArrows = document.querySelectorAll('.filter-group__arrow');
        allArrows.forEach(arrow => {
            arrow.classList.remove('arrow-open');
            // Возвращаем стили SVG
            const svg = arrow.querySelector('svg');
            if (svg) {
                const rect = svg.querySelector('rect');
                const path = svg.querySelector('path');
                if (rect) rect.setAttribute('fill', '#F5F5F5');
                if (path) path.setAttribute('stroke', 'black');
            }
        });

        console.log('Все фильтры сброшены');
    }

    if (filterOpen) filterOpen.addEventListener('click', openFilter);
    if (filterClose) filterClose.addEventListener('click', closeFilter);
    if (filterOverlay) filterOverlay.addEventListener('click', closeFilter);

    // Обработчик кнопки сброса
    if (filterReset) {
        filterReset.addEventListener('click', function () {
            resetFilters();  // Сбрасываем фильтры
            closeFilter();   // Закрываем окно фильтров
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeFilter();
    });


    // поворотом через класс на кнопке
    document.querySelectorAll('.filter-group__toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = document.getElementById(btn.dataset.target);
            if (!content) return;

            const isOpen = content.classList.contains('filter-group__content--visible');

            // Переключаем контент
            content.classList.toggle('filter-group__content--visible', !isOpen);

            // Переключаем класс для поворота стрелки
            btn.classList.toggle('rotate', !isOpen);

            // Меняем цвета
            const rect = btn.querySelector('svg rect');
            const path = btn.querySelector('svg path');

            if (!isOpen) {
                if (rect) rect.setAttribute('fill', '#054F2A');
                if (path) path.setAttribute('stroke', 'white');
            } else {
                if (rect) rect.setAttribute('fill', '#F5F5F5');
                if (path) path.setAttribute('stroke', 'black');
            }
        });
    });

    // Обработка чекбоксов - галочка на черном фоне
    document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
        const box = checkbox.closest('.filter-checkbox').querySelector('.filter-checkbox__box');

        const updateCheckbox = () => {
            if (checkbox.checked) {
                box.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 11.9996L8.65882 18.6585L22 5.34082" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                `;
                box.style.background = 'black';
                box.style.borderColor = 'black';
            } else {
                box.innerHTML = '';
                box.style.background = 'white';
                box.style.borderColor = '#ccc';
            }
        };

        checkbox.addEventListener('change', updateCheckbox);
        updateCheckbox();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Смена главного изображения при клике на миниатюру
    const thumbs = document.querySelectorAll('.detail-thumb');
    const mainImage = document.getElementById('mainProductImage');

    if (thumbs.length && mainImage) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Убираем active у всех
                thumbs.forEach(t => t.classList.remove('active'));
                // Добавляем active текущей
                this.classList.add('active');

                // Меняем главное изображение
                const newImageSrc = this.querySelector('img').src;
                mainImage.src = newImageSrc;
            });
        });
    }
});

/* anketa */
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        const overlay = document.getElementById('anketaOverlay');
        const panel = document.getElementById('anketaPanel');
        const btnSubmit = document.getElementById('anketaSubmit');

        // Находим ВСЕ кнопки с id="anketa"
        const btnsOpen = document.querySelectorAll('[id="anketa"]');

        function open() {
            panel.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function close() {
            panel.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Добавляем обработчики на ВСЕ кнопки с id="anketa"
        if (btnsOpen.length > 0) {
            btnsOpen.forEach(btn => {
                btn.addEventListener('click', open);
            });
        }

        // Закрытие (добавляем проверки на существование элементов)
        const btnClose = document.getElementById('anketaClose');
        if (btnClose) btnClose.addEventListener('click', close);
        if (overlay) overlay.addEventListener('click', close);

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && panel && panel.classList.contains('active')) close();
        });

        function setError(inputId, errId, show) {
            const input = document.getElementById(inputId);
            const error = document.getElementById(errId);
            if (input) input.classList.toggle('error', show);
            if (error) error.classList.toggle('visible', show);
        }

        const nameInput = document.getElementById('ank-name');
        const phoneInput = document.getElementById('ank-phone');
        const emailInput = document.getElementById('ank-email');
        const aboutInput = document.getElementById('ank-about');

        if (nameInput) nameInput.addEventListener('input', () => setError('ank-name', 'err-name', false));
        // Простая маска для телефона
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                let value = this.value.replace(/\D/g, '');

                if (value.length === 0) {
                    this.value = '';
                    return;
                }

                // Если первый символ не 7, добавляем 7
                if (value[0] !== '7') {
                    value = '7' + value;
                }

                // Ограничиваем 11 цифрами
                if (value.length > 11) value = value.slice(0, 11);

                // Форматируем
                let formatted = '+7';
                if (value.length > 1) formatted += ' (' + value.slice(1, 4);
                if (value.length > 4) formatted += ') ' + value.slice(4, 7);
                if (value.length > 7) formatted += '-' + value.slice(7, 9);
                if (value.length > 9) formatted += '-' + value.slice(9, 11);

                this.value = formatted;

                // Убираем ошибку при вводе
                setError('ank-phone', 'err-phone', false);
            });

            phoneInput.addEventListener('focus', function () {
                if (this.value === '') {
                    this.value = '+7 (';
                }
            });

            phoneInput.addEventListener('blur', function () {
                if (this.value === '+7 (' || this.value === '+7') {
                    this.value = '';
                }
            });

            function isPhoneValid(value) {
                // Проверяем что маска заполнена полностью
                return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
            }
        }
        if (emailInput) emailInput.addEventListener('input', () => setError('ank-email', 'err-email', false));
        if (aboutInput) aboutInput.addEventListener('input', () => setError('ank-about', 'err-about', false));

        if (btnSubmit) {
            btnSubmit.addEventListener('click', () => {
                const name = nameInput ? nameInput.value.trim() : '';
                const phone = phoneInput ? phoneInput.value.trim() : '';
                const email = emailInput ? emailInput.value.trim() : '';
                const about = aboutInput ? aboutInput.value.trim() : '';
                let valid = true;

                if (name.length < 2) {
                    setError('ank-name', 'err-name', true);
                    valid = false;
                } else setError('ank-name', 'err-name', false);

                if (!/^\+?[\d\s\(\)\-]{7,}$/.test(phone)) {
                    setError('ank-phone', 'err-phone', true);
                    valid = false;
                } else setError('ank-phone', 'err-phone', false);

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setError('ank-email', 'err-email', true);
                    valid = false;
                } else setError('ank-email', 'err-email', false);

                if (about.length < 5) {
                    setError('ank-about', 'err-about', true);
                    valid = false;
                } else setError('ank-about', 'err-about', false);

                if (valid) {
                    // показываем экран успеха
                    document.getElementById('anketaFormView').style.display = 'none';
                    document.getElementById('anketaSuccessView').classList.add('visible');
                }
                const btnSuccessClose = document.getElementById('anketaSuccessClose');
                if (btnSuccessClose) {
                    btnSuccessClose.addEventListener('click', close);
                }

                // Сброс к форме при каждом закрытии
                function close() {
                    panel.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';

                    // Возвращаем форму, скрываем успех
                    setTimeout(() => {
                        document.getElementById('anketaFormView').style.display = '';
                        document.getElementById('anketaSuccessView').classList.remove('visible');
                    }, 400); // после анимации закрытия
                }
            });
        }
    })();
});

// ── Панель «Оставить заявку» ─────────────────────────────
(function () {
    const overlay  = document.getElementById('zayavOverlay');
    const panel    = document.getElementById('zayavPanel');
    const nameInput  = document.getElementById('zav-name');
    const phoneInput = document.getElementById('zav-phone');

    function openZayav() {
        if (!panel) return;
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeZayav() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            document.getElementById('zayavFormView').style.display = '';
            document.getElementById('zayavSuccessView').classList.remove('visible');
        }, 400);
    }

    // Открытие — все кнопки с id="zayavOpen"
    document.querySelectorAll('[id="zayavOpen"]').forEach(btn => {
        btn.addEventListener('click', openZayav);
    });

    const btnClose = document.getElementById('zayavClose');
    if (btnClose) btnClose.addEventListener('click', closeZayav);
    if (overlay)  overlay.addEventListener('click', closeZayav);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && panel && panel.classList.contains('active')) closeZayav();
    });

    // Маска телефона
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (!value.length) { this.value = ''; return; }
            if (value[0] !== '7') value = '7' + value;
            if (value.length > 11) value = value.slice(0, 11);
            let f = '+7';
            if (value.length > 1) f += ' (' + value.slice(1, 4);
            if (value.length > 4) f += ') ' + value.slice(4, 7);
            if (value.length > 7) f += '-' + value.slice(7, 9);
            if (value.length > 9) f += '-' + value.slice(9, 11);
            this.value = f;
            setErr('zav-phone', 'zerr-phone', false);
        });
        phoneInput.addEventListener('focus', function () {
            if (!this.value) this.value = '+7 (';
        });
        phoneInput.addEventListener('blur', function () {
            if (this.value === '+7 (' || this.value === '+7') this.value = '';
        });
    }

    if (nameInput) nameInput.addEventListener('input', () => setErr('zav-name', 'zerr-name', false));

    function setErr(inputId, errId, show) {
        const inp = document.getElementById(inputId);
        const err = document.getElementById(errId);
        if (inp) inp.classList.toggle('error', show);
        if (err) err.classList.toggle('visible', show);
    }

    const btnSubmit = document.getElementById('zayavSubmit');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', () => {
            const name  = nameInput  ? nameInput.value.trim()  : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            let valid = true;

            if (name.length < 2) {
                setErr('zav-name', 'zerr-name', true); valid = false;
            } else setErr('zav-name', 'zerr-name', false);

            if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
                setErr('zav-phone', 'zerr-phone', true); valid = false;
            } else setErr('zav-phone', 'zerr-phone', false);

            if (valid) {
                document.getElementById('zayavFormView').style.display = 'none';
                document.getElementById('zayavSuccessView').classList.add('visible');
            }
        });
    }

    const btnSuccessClose = document.getElementById('zayavSuccessClose');
    if (btnSuccessClose) btnSuccessClose.addEventListener('click', closeZayav);
})();

/* слайдер в о компании */
document.addEventListener('DOMContentLoaded', function () {
    // ========== ФУНКЦИЯ ДЛЯ ИНИЦИАЛИЗАЦИИ ОТДЕЛЬНОГО СЛАЙДЕРА ==========
    function initSwiper(container) {
        if (!container) return null;

        // Находим кнопки внутри этого конкретного слайдера
        const sliderBlock = container.closest('.doc-slider');
        if (!sliderBlock) return null;

        const prevButton = sliderBlock.querySelector('.swiper-button-prev-custom');
        const nextButton = sliderBlock.querySelector('.swiper-button-next-custom');

        if (!prevButton || !nextButton) return null;

        // Функция для обновления состояния стрелок
        function updateNavigationState(swiperInstance) {
            if (!prevButton || !nextButton) return;

            // Проверяем, находится ли слайдер в начале
            if (swiperInstance.isBeginning) {
                prevButton.classList.add('swiper-button-disabled');
                prevButton.style.opacity = '0.5';
                prevButton.style.cursor = 'not-allowed';
                prevButton.style.pointerEvents = 'none';
            } else {
                prevButton.classList.remove('swiper-button-disabled');
                prevButton.style.opacity = '1';
                prevButton.style.cursor = 'pointer';
                prevButton.style.pointerEvents = 'auto';
            }

            // Проверяем, находится ли слайдер в конце
            if (swiperInstance.isEnd) {
                nextButton.classList.add('swiper-button-disabled');
                nextButton.style.opacity = '0.5';
                nextButton.style.cursor = 'not-allowed';
                nextButton.style.pointerEvents = 'none';
            } else {
                nextButton.classList.remove('swiper-button-disabled');
                nextButton.style.opacity = '1';
                nextButton.style.cursor = 'pointer';
                nextButton.style.pointerEvents = 'auto';
            }
        }

        // Создаем экземпляр Swiper
        const swiper = new Swiper(container, {
            slidesPerView: 1.1,
            spaceBetween: 12,

            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
                disabledClass: 'swiper-button-disabled',
            },

            breakpoints: {
                320: { slidesPerView: 1.1, spaceBetween: 12 },
                480: { slidesPerView: 1.3, spaceBetween: 12 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1440: { slidesPerView: 4, spaceBetween: 20 }
            },

            on: {
                init: function () {
                    updateNavigationState(this);
                },
                slideChange: function () {
                    updateNavigationState(this);
                },
                reachBeginning: function () {
                    updateNavigationState(this);
                },
                reachEnd: function () {
                    updateNavigationState(this);
                },
                fromEdge: function () {
                    updateNavigationState(this);
                },
                resize: function () {
                    updateNavigationState(this);
                }
            }
        });

        return swiper;
    }

    // ========== ИНИЦИАЛИЗАЦИЯ ВСЕХ СЛАЙДЕРОВ ==========
    const allSwiperContainers = document.querySelectorAll('.doc-items.swiper');

    allSwiperContainers.forEach(container => {
        initSwiper(container);
    });
});

// ── Оформление заказа (шаги) ─────────────────────────────
(function () {
    function showStep(n) {
        [1,2,3,4].forEach(i => {
            const el = document.getElementById('cartStep' + i);
            if (el) el.style.display = i === n ? '' : 'none';
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Кнопки «Оформить предзаказ»
    document.querySelectorAll('#cartSubmit, .cartSubmitBtn').forEach(btn => {
        btn.addEventListener('click', () => showStep(2));
    });

    // Шаг 2 → 3
    const step2Next = document.getElementById('cartStep2Next');
    if (step2Next) {
        step2Next.addEventListener('click', () => {
            const delivery = document.querySelector('input[name="delivery"]:checked');
            if (delivery && delivery.value === 'delivery') {
                const addr = document.getElementById('cartAddress');
                const addrErr = document.getElementById('cartAddressErr');
                if (!addr.value.trim()) {
                    addr.classList.add('error');
                    addrErr.classList.add('visible');
                    return;
                }
            }
            showStep(3);
        });
    }

    // Адрес — убираем ошибку при вводе
    const cartAddr = document.getElementById('cartAddress');
    if (cartAddr) {
        cartAddr.addEventListener('input', () => {
            cartAddr.classList.remove('error');
            document.getElementById('cartAddressErr').classList.remove('visible');
        });
    }

    // Маска телефона для шага 3
    const cartPhone = document.getElementById('cart-phone');
    if (cartPhone) {
        cartPhone.addEventListener('input', function () {
            let v = this.value.replace(/\D/g, '');
            if (!v.length) { this.value = ''; return; }
            if (v[0] !== '7') v = '7' + v;
            if (v.length > 11) v = v.slice(0, 11);
            let f = '+7';
            if (v.length > 1) f += ' (' + v.slice(1, 4);
            if (v.length > 4) f += ') ' + v.slice(4, 7);
            if (v.length > 7) f += '-' + v.slice(7, 9);
            if (v.length > 9) f += '-' + v.slice(9, 11);
            this.value = f;
            setCErr('cart-phone', 'cerr-phone', false);
        });
        cartPhone.addEventListener('focus', function () { if (!this.value) this.value = '+7 ('; });
        cartPhone.addEventListener('blur', function () { if (this.value === '+7 (' || this.value === '+7') this.value = ''; });
    }

    function setCErr(inputId, errId, show) {
        const inp = document.getElementById(inputId);
        const err = document.getElementById(errId);
        if (inp) inp.classList.toggle('error', show);
        if (err) err.classList.toggle('visible', show);
    }

    const cartName  = document.getElementById('cart-name');
    const cartEmail = document.getElementById('cart-email');
    if (cartName)  cartName.addEventListener('input',  () => setCErr('cart-name',  'cerr-name',  false));
    if (cartEmail) cartEmail.addEventListener('input', () => setCErr('cart-email', 'cerr-email', false));
    if (cartPhone) cartPhone.addEventListener('input', () => setCErr('cart-phone', 'cerr-phone', false));

    // Шаг 3 → 4 (успех)
    const step3Submit = document.getElementById('cartStep3Submit');
    if (step3Submit) {
        step3Submit.addEventListener('click', () => {
            const name  = cartName  ? cartName.value.trim()  : '';
            const phone = cartPhone ? cartPhone.value.trim() : '';
            const email = cartEmail ? cartEmail.value.trim() : '';
            let valid = true;

            if (name.length < 2) { setCErr('cart-name', 'cerr-name', true); valid = false; }
            else setCErr('cart-name', 'cerr-name', false);

            if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) { setCErr('cart-phone', 'cerr-phone', true); valid = false; }
            else setCErr('cart-phone', 'cerr-phone', false);

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setCErr('cart-email', 'cerr-email', true); valid = false; }
            else setCErr('cart-email', 'cerr-email', false);

            if (valid) showStep(4);
        });
    }
})();