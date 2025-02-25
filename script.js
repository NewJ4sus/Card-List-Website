document.addEventListener('DOMContentLoaded', function() {
    const showContentBtn = document.getElementById('showContent');
    const body = document.body;
    const card1 = document.querySelector('.card-1');
    const card2 = document.querySelector('.card-2');
    const card3 = document.querySelector('.card-3');
    const card4 = document.querySelector('.card-4');
    const arrowY = document.querySelector('.arrow-y');

    showContentBtn.addEventListener('click', function() {
        body.classList.toggle('show-content');
        card1.style.opacity = body.classList.contains('show-content') ? '1' : '0';
        arrowY.style.transform = body.classList.contains('show-content') ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    window.addEventListener('scroll', function() {
        showContentBtn.disabled = true;
        showContentBtn.style.cursor = 'not-allowed';

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        // Если начали скроллить, автоматически скрываем контент
        if (scrollTop > 10 && body.classList.contains('show-content')) {
            body.classList.remove('show-content');
            card1.style.opacity = '0';
            arrowY.style.transform = 'rotate(0deg)';
        }

        // Управление третьей картой
        if (scrollTop < windowHeight) {
            const progress = scrollTop / windowHeight;
            const translateY = 40 - (progress * 90); // Начинаем с 40% и поднимаем до -50%
            card3.style.transform = `translate(-50%, ${translateY}%)`;
        } else {
            // Фиксируем третью карту поверх второй
            card3.style.transform = 'translate(-50%, -50%)';
        }

        // Управление четвертой картой
        if (scrollTop >= windowHeight && scrollTop < windowHeight * 2) {
            const progress = (scrollTop - windowHeight) / windowHeight;
            const translateY = 100 - (progress * 150);
            card4.style.transform = `translate(-50%, ${translateY}%)`;
        } else if (scrollTop >= windowHeight * 2) {
            // Фиксируем четвертую карту поверх третьей
            card4.style.transform = 'translate(-50%, -50%)';
        } else {
            // Держим четвертую карту внизу
            card4.style.transform = 'translate(-50%, 100%)';
        }
    });

    // Улучшенная проверка возврата в начальное положение
    window.addEventListener('scrollend', function() {
        // Используем небольшой порог для более надежного определения
        if (window.scrollY <= 5) {
            showContentBtn.disabled = false;
            showContentBtn.style.cursor = 'pointer';
        }
    });
});