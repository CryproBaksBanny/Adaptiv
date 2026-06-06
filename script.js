const iframe = document.getElementById('preview-iframe');
const projectSelect = document.getElementById('project-select');

// Функція 1: Зміна самого сайту всередині фрейму
function changeProject() {
    const selectedUrl = projectSelect.value;
    iframe.src = selectedUrl;
}

// Функція 2: Зміна розмірів вікна (пристрою)
function changeDevice(button, width, height) {
    const previewArea = document.querySelector('.preview-area');
    
    // 1. Спочатку задаємо фрейму його чесні цільові розміри
    iframe.style.width = width + 'px';
    iframe.style.height = height + 'px';

    // 2. Отримуємо реальні розміри робочої зони твоего монітора (з урахуванням паддінгів)
    const padding = 5; // запас на відступи
    const maxWidth = previewArea.clientWidth - padding;
    const maxHeight = previewArea.clientHeight - padding;

    // 3. Вираховуємо коефіцієнт масштабування (scale)
    let scaleX = maxWidth / width;
    let scaleY = maxHeight / height;
    
    // Беремо найменший коефіцієнт, щоб сайт помістився і по ширині, і по висоті
    let scale = Math.min(scaleX, scaleY);

    // Якщо сайт і так менший за екран (наприклад, мобільний) — не збільшуємо його (scale = 1)
    if (scale > 1) scale = 1;

    // 4. Застосовуємо масштаб до фрейму
    iframe.style.transform = `scale(${scale})`;

    // Перемикаємо активний клас на кнопках
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}