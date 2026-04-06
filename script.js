document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    const rows = document.querySelectorAll('.table-row');
    const statusPanel = document.getElementById('statusPanel');
    
    const tableView = document.getElementById('tableView');
    const directionView = document.getElementById('directionView');
    const detailsView = document.getElementById('detailsView');
    
    const costBtn = document.getElementById('costManagementBtn');
    
    const tabs = document.querySelectorAll('.tabs-nav .tab');
    const tabContents = document.querySelectorAll('.tab-content');

    rows.forEach(row => {
        row.addEventListener('mouseenter', () => statusPanel.classList.add('active'));
        row.addEventListener('mouseleave', () => statusPanel.classList.remove('active'));
        
        row.addEventListener('click', () => {
            tableView.classList.add('hidden');
            directionView.classList.remove('hidden');
            window.scrollTo(0,0);
        });
    });

    // 2. Переход к экрану "Управление стоимостью"
    costBtn.addEventListener('click', () => {
        title.classList.add('hidden');
        directionView.classList.add('hidden');
        detailsView.classList.remove('hidden');
        window.scrollTo(0,0);
    });

    // 3. Логика переключения Табов (Общая информация / Документы)
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Убираем активный класс со всех табов
            tabs.forEach(t => t.classList.remove('active'));
            // Скрываем весь контент табов
            tabContents.forEach(content => content.classList.add('hidden'));

            // Активируем текущий таб
            tab.classList.add('active');
            
            // Показываем нужный контент по ID из data-target
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
});