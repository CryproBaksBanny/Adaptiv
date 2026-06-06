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
🔥 РОБОТА З GET-ПАРАМЕТРАМИ (AURA / PULSE) — СЕЙВ ВАРІАНТ
-----------------------------------------------------------*/
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectParam = urlParams.get('project');

    console.log("Знайдено параметр у лінку project =", projectParam); // Дебаг-лог в консоль

    if (projectParam) {
        let matchedIndex = -1;

        for (let i = 0; i < projectSelect.options.length; i++) {
            const option = projectSelect.options[i];
            const optionValue = option.value.toLowerCase();
            const searchWord = projectParam.toLowerCase();

            // Перевіряємо: або значення опції містить слово (наприклад, 'pulse.html' містить 'pulse')
            // або сам текст кнопки/опції містить це слово (наприклад, 'PORTFOLIO PULS')
            if (optionValue.includes(searchWord) || option.text.toLowerCase().includes(searchWord)) {
                matchedIndex = i;
                break;
            }
        }

        if (matchedIndex !== -1) {
            console.log("Успішно знайдено збіг з опцією №", matchedIndex);
            
            // 1. Змінюємо вибраний елемент у списку
            projectSelect.selectedIndex = matchedIndex;
            
            // 2. Змінюємо посилання для iframe
            iframe.src = projectSelect.options[matchedIndex].value;
            
            // 3. Оскільки iframe змінився, примусово викликаємо адаптивне масштабування для Full HD
            if (typeof initDefaultDevice === 'function') {
                initDefaultDevice();
            }
        } else {
            console.log("Не вдалося знайти збіг для тексту:", projectParam);
        }
    }
}

// Запускаємо перевірку лінка відразу при завантаженні сторінки
window.addEventListener('DOMContentLoaded', checkUrlParameters);
