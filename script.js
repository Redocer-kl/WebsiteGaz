// Функция для перехода с главного экрана на экран проекта
function openProject() {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('project-view').classList.remove('hidden');
}

// Функция для возврата к выбору проектов
function backToProjects() {
    document.getElementById('project-view').classList.add('hidden');
    document.getElementById('home-view').classList.remove('hidden');
}

// Функция для переключения главных вкладок внутри проекта (верхнее оранжевое меню)
function switchTab(tabId, element) {
    // Убираем активный класс у всех главных кнопок меню
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Добавляем класс нажатой кнопке
    element.classList.add('active');

    // Скрываем все главные вкладки
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));

    // Показываем выбранную вкладку
    document.getElementById('tab-' + tabId).classList.remove('hidden');
}

// Функция для переключения подменю (серое меню во вкладке Экономика)
function switchSubTab(subTabId, element) {
    // Убираем активный класс у всех кнопок подменю
    const subNavItems = document.querySelectorAll('.submenu-item');
    subNavItems.forEach(item => item.classList.remove('active'));

    // Добавляем класс нажатой кнопке
    element.classList.add('active');

    // Скрываем все контенты подменю
    const subTabs = document.querySelectorAll('.sub-content');
    subTabs.forEach(tab => tab.classList.add('hidden'));

    // Показываем выбранный контент подменю
    document.getElementById('sub-' + subTabId).classList.remove('hidden');
}

// Этот код сработает после загрузки всей страницы
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");

    // Ищем все теги img на странице
    const images = document.querySelectorAll("img");

    images.forEach(img => {
        // Исключаем саму картинку внутри модалки, чтобы не зациклить
        if (img.id === "modal-img") return;

        // По клику на любую картинку показываем модалку
        img.addEventListener("click", function() {
            modal.classList.remove("hidden");
            modalImg.src = this.src; // Копируем путь нажатой картинки в модалку
        });
    });

    // Закрытие модального окна при клике на пустое пространство (вокруг картинки)
    modal.addEventListener("click", function(e) {
        if (e.target !== modalImg) {
            closeModal();
        }
    });
});

// Функция закрытия (вызывается на крестик или фон)
function closeModal() {
    document.getElementById("image-modal").classList.add("hidden");
}