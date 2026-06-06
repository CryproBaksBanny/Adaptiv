const iframe = document.getElementById('preview-iframe');
const projectSelect = document.getElementById('project-select');

// Твоя оригінальна Функція 1
function changeProject() {
    const selectedUrl = projectSelect.value;
    iframe.src = selectedUrl;
}

// Твоя ОРИГІНАЛЬНА Функція 2 (повертаємо її повністю, як ти просив)
function changeDevice(button, width, height) {
    // Якщо при першому старті кнопка ще не передалася, знаходимо дефолтну активну кнопку
    if (!button) {
        button = document.querySelector('.btn.active') || document.querySelector('.btn');
    }
    
    const previewArea = document.querySelector('.preview-area');
    if (!previewArea || !iframe) return; // Захист від помилок, якщо елементи не знайдені
    
    // 1. Спочатку задаємо фрейму його чесні цільові розміри
    iframe.style.width = width + 'px';
    iframe.style.height = height + 'px';

    // 2. Отримуємо реальні розміри робочої зони твого монітора
    const padding = 5; // запас на відступи
    const maxWidth = previewArea.clientWidth - padding;
    const maxHeight = previewArea.clientHeight - padding;

    // 3. Вираховуємо коефіцієнт масштабування (scale)
    let scaleX = maxWidth / width;
    let scaleY = maxHeight / height;
    
    // Беремо найменший коефіцієнт, щоб сайт помістився і по ширині, і по висоті
    let scale = Math.min(scaleX, scaleY);

    // Якщо сайт і так менший за екран — не збільшуємо його (scale = 1)
    if (scale > 1) scale = 1;

    // 4. Застосовуємо масштаб до фрейму
    iframe.style.transform = `scale(${scale})`;

    // Перемикаємо активний клас на кнопках
    if (button) {
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
}

/*-----------------------------------------------------------
🔥 ВИПРАВЛЕННЯ БАГУ ПЕРШОГО ЗАПУСКУ
-----------------------------------------------------------*/
// Створюємо функцію, яка запустить твій Full HD режим правильно
function initDefaultDevice() {
    const defaultBtn = document.querySelector('.btn'); // Беремо найпершу кнопку (Full HD)
    changeDevice(defaultBtn, 1920, 1080);
}

// 1. Пробуємо запустити відразу, як побудувався HTML
window.addEventListener('DOMContentLoaded', initDefaultDevice);

// 2. СТРАХОВКА: Перераховуємо масштаб ще раз, коли вікно ПОВНІСТЮ завантажилось зі стилями
window.addEventListener('load', initDefaultDevice);

// 3. Також додамо автоматичний перерахунок при зміні розміру самого вікна браузера (щоб не ламалося)
window.addEventListener('resize', initDefaultDevice);

/*-----------------------------------------------------------
🔥 РОБОТА З GET-ПАРАМЕТРАМИ (AURA / PULSE)
-----------------------------------------------------------*/
function checkUrlParameters() {
    // 1. Створюємо об'єкт для роботи з параметрами лінка
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Витягуємо значення параметра 'project'
    const projectParam = urlParams.get('project');

    if (projectParam) {
        // Шукаємо в нашому <select> опцію, яка містить це слово (наприклад, aura чи pulse)
        // Для цього перебираємо всі <option> всередині нашого списку
        for (let i = 0; i < projectSelect.options.length; i++) {
            const option = projectSelect.options[i];
            
            // Якщо в посиланні опції є наше слово (наприклад, "aura.html" містить "aura")
            if (option.value.toLowerCase().includes(projectParam.toLowerCase())) {
                
                // Перемикаємо селект на цю опцію візуально
                projectSelect.selectedIndex = i;
                
                // Оновлюємо фрейм значенням цієї опції
                iframe.src = option.value;
                break;
            }
        }
    }
}

// Запускаємо перевірку лінка відразу при завантаженні сторінки
window.addEventListener('DOMContentLoaded', checkUrlParameters);
