const iframe = document.getElementById('preview-iframe');
const projectSelect = document.getElementById('project-select');

function changeProject() {
    const selectedUrl = projectSelect.value;
    iframe.src = selectedUrl;
}

function changeDevice(button, width, height) {
    if (!button) {
        button = document.querySelector('.btn.active') || document.querySelector('.btn');
    }

    const previewArea = document.querySelector('.preview-area');
    if (!previewArea || !iframe) return; // Захист від помилок, якщо елементи не знайдені

    iframe.style.width = width + 'px';
    iframe.style.height = height + 'px';
    const padding = 5; // запас на відступи
    const maxWidth = previewArea.clientWidth - padding;
    const maxHeight = previewArea.clientHeight - padding;

    let scaleX = maxWidth / width;
    let scaleY = maxHeight / height;

    let scale = Math.min(scaleX, scaleY);

    if (scale > 1) scale = 1;

    iframe.style.transform = `scale(${scale})`;

    // Перемикаємо активний клас на кнопках
    if (button) {
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
}
function initDefaultDevice() {
    const defaultBtn = document.querySelector('.btn'); // Беремо найпершу кнопку (Full HD)
    changeDevice(defaultBtn, 1920, 1080);
}
window.addEventListener('DOMContentLoaded', initDefaultDevice);
window.addEventListener('load', initDefaultDevice);
window.addEventListener('resize', initDefaultDevice);
