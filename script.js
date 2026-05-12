document.addEventListener('DOMContentLoaded', () => {
    restoreState(); // Проверяем, где был пользователь
    initTabs();
});

// Переключение между экранами
function openProject(projectName) {
    document.getElementById('screen-list').style.display = 'none';
    document.getElementById('screen-details').style.display = 'block';

    saveState('details', 'engineering', 'obustroystvo');
}

function goHome() {
    document.getElementById('screen-list').style.display = 'block';
    document.getElementById('screen-details').style.display = 'none';

    saveState('list');
}

function initTabs() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTabId = tab.dataset.tab; // Получаем например 'info' или 'engineering'

            // 1. Меняем активный класс у кнопок вкладок
            document.querySelector('.tab.active').classList.remove('active');
            tab.classList.add('active');

            // 2. Прячем все панели контента и показываем нужную
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.style.display = 'none';
                panel.classList.remove('active');
            });

            const targetPanel = document.getElementById(`content-${targetTabId}`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.classList.add('active');
            }

            // 3. Управление видимостью подвкладок (только для инжиниринга)
            const subContainer = document.getElementById('sub-tabs-engineering');
            if (subContainer) {
                subContainer.style.display = (targetTabId === 'engineering') ? 'flex' : 'none';
            }
            // Внутри функции initTabs добавь обработку подвкладок:
            const subTabs = document.querySelectorAll('.sub-tab');

            subTabs.forEach(st => {
                st.addEventListener('click', () => {
                    // Убираем активный класс у кнопок
                    document.querySelector('.sub-tab.active').classList.remove('active');
                    st.classList.add('active');

                    // Скрываем все панели подразделов (если их будет много)
                    document.querySelectorAll('.sub-panel').forEach(p => p.style.display = 'none');

                    // Показываем нужную панель (например, sub-content-obustroystvo)
                    const targetId = `sub-content-${st.dataset.sub}`;
                    const targetPanel = document.getElementById(targetId);
                    if (targetPanel) {
                        targetPanel.style.display = 'block';
                    }

                    saveState('details', 'engineering', st.dataset.sub);
                });
            });

            saveState('details', targetTabId);
        });
    });

    // Логика подвкладок (остается прежней)
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(st => {
        st.addEventListener('click', () => {
            document.querySelector('.sub-tab.active').classList.remove('active');
            st.classList.add('active');
            saveState('details', 'engineering', st.dataset.sub);
        });
    });
}

// Сохранение состояния в LocalStorage
function saveState(screen, tab = 'engineering', subTab = 'obustroystvo') {
    const state = { screen, tab, subTab };
    localStorage.setItem('app_state', JSON.stringify(state));
}

// Восстановление состояния при перезагрузке
function restoreState() {
    const saved = localStorage.getItem('app_state');
    if (!saved) return;

    const state = JSON.parse(saved);

    if (state.screen === 'details') {
        openProject(); // Показываем экран деталей

        // Кликаем по нужной вкладке программно, чтобы сработал весь код переключения
        const tabToActivate = document.querySelector(`[data-tab="${state.tab}"]`);
        if (tabToActivate) {
            tabToActivate.click();
        }

        // Если это была подвкладка в инжиниринге
        if (state.tab === 'engineering' && state.subTab) {
            const subTabToActivate = document.querySelector(`[data-sub="${state.subTab}"]`);
            if (subTabToActivate) subTabToActivate.click();
        }
    }
}