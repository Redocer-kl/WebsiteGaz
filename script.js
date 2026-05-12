document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    restoreState(); // Сначала инициализируем, потом восстанавливаем
});

// Переключение между экранами
function openProject(projectName, shouldSave = true) {
    document.getElementById('screen-list').style.display = 'none';
    document.getElementById('screen-details').style.display = 'block';

    if (shouldSave) {
        saveState('details', getCurrentTab(), getCurrentSubTab());
    }
}

function goHome(shouldSave = true) {
    document.getElementById('screen-list').style.display = 'block';
    document.getElementById('screen-details').style.display = 'none';

    if (shouldSave) {
        saveState('list');
    }
}

function initTabs() {
    // 1. Основные вкладки
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activateTab(tab.dataset.tab);
            saveState('details', tab.dataset.tab, getCurrentSubTab());
        });
    });

    // 2. Подвкладки (теперь вешаем один раз при загрузке)
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(st => {
        st.addEventListener('click', () => {
            activateSubTab(st.dataset.sub);
            saveState('details', getCurrentTab(), st.dataset.sub);
        });
    });
}

// Функция чистого переключения основной вкладки (без сохранения)
function activateTab(tabId) {
    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    if (!tab) return;

    // Смена активного класса кнопок
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Показ нужной панели
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = 'none';
    });

    const targetPanel = document.getElementById(`content-${tabId}`);
    if (targetPanel) {
        targetPanel.style.display = 'block';
    }

    // Управление видимостью контейнера подвкладок
    const subContainer = document.getElementById('sub-tabs-engineering');
    if (subContainer) {
        subContainer.style.display = (tabId === 'engineering') ? 'flex' : 'none';
    }
}

// Функция чистого переключения подвкладки
function activateSubTab(subId) {
    const subTab = document.querySelector(`.sub-tab[data-sub="${subId}"]`);
    if (!subTab) return;

    document.querySelectorAll('.sub-tab').forEach(st => st.classList.remove('active'));
    subTab.classList.add('active');

    document.querySelectorAll('.sub-panel').forEach(p => p.style.display = 'none');
    const targetPanel = document.getElementById(`sub-content-${subId}`);
    if (targetPanel) {
        targetPanel.style.display = 'block';
    }
}

// Хелперы для получения текущего состояния UI
function getCurrentTab() {
    return document.querySelector('.tab.active')?.dataset.tab || 'engineering';
}

function getCurrentSubTab() {
    return document.querySelector('.sub-tab.active')?.dataset.sub || 'obustroystvo';
}

// Сохранение состояния
function saveState(screen, tab, subTab) {
    const state = { screen, tab, subTab };
    localStorage.setItem('app_state', JSON.stringify(state));
}

// Восстановление состояния
function restoreState() {
    const saved = localStorage.getItem('app_state');
    if (!saved) return;

    const state = JSON.parse(saved);

    if (state.screen === 'details') {
        // Открываем экран без триггера сохранения
        openProject(null, false); 
        
        // Активируем вкладки напрямую без .click()
        if (state.tab) {
            activateTab(state.tab);
        }
        if (state.tab === 'engineering' && state.subTab) {
            activateSubTab(state.subTab);
        }
    } else {
        goHome(false);
    }
}

// Логика просмотра изображений
document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('image-viewer');
    const fullImg = document.getElementById('full-image');
    const closeBtn = document.querySelector('.close-viewer');
    
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;

    // 1. Открытие модалки при клике на любую картинку (кроме иконок)
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && !e.target.classList.contains('icon-small') && !e.target.classList.contains('icon-medium')) {
            viewer.style.display = 'block';
            fullImg.src = e.target.src;
            resetTransform();
        }
    });

    // 2. Закрытие
    const closeViewer = () => {
        viewer.style.display = 'none';
        resetTransform();
    };

    closeBtn.onclick = closeViewer;
    viewer.onclick = (e) => { if (e.target === viewer || e.target.classList.contains('viewer-container')) closeViewer(); };

    // 3. Зум колесиком мыши
    viewer.onwheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        scale = Math.min(Math.max(1, scale + delta), 10); // Ограничение зума от 1x до 10x
        updateTransform();
    };

    // 4. Перемещение (Drag & Pan)
    fullImg.onmousedown = (e) => {
        if (scale > 1) { // Перемещаем только если картинка увеличена
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        }
    };

    window.onmousemove = (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    };

    window.onmouseup = () => {
        isDragging = false;
    };

    function updateTransform() {
        fullImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    function resetTransform() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }
    
    // Закрытие на ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeViewer();
    });
});