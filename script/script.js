document.addEventListener('DOMContentLoaded', () => {
    // хэш таблица/матрица
    const data = [
        [
            [1, 6500, 2, 15000],
            [2, 12000, 4, 30000],
            [3, 18000, 7, 52500],
            [4, 24000, 12, 90000],
            [6, 35000, 16, 127500]
        ],
        [
            [1, 7000, 2, 15000],
            [2, 13000, 5, 37500],
            [3, 19000, 10, 75000],
            [5, 30000, 13, 112500]
        ],
        [
            [1, 7000, 3, 22500],
            [2, 13000, 8, 60000],
            [4, 24000, 11, 97500]
        ],
        [
            [1, 7000, 5, 37500],
            [3, 18000, 10, 75000]
        ],
        [
            [2, 12000, 5, 37500]
        ],
    ];

    //функция для склонения числительный
    // n - число
    // t - массив из 3 вариантов склонения
    const declOfNum = (n, t) => t[(n % 100 > 4 && n % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(n % 10 < 5) ? n % 10 : 5]];

    // получаем элементы по id
    const start = document.getElementById('start'),
        end = document.getElementById('end'),
        dayThis = document.querySelector('.day_this'),
        moneyThis = document.querySelector('.money_this'),
        dayOther = document.querySelector('.day_other'),
        moneyOther = document.querySelector('.money_other'),
        compareRange = document.querySelector('.compare-range');

    // функции
    const showResult = (arr) => {
        // деструктивное присваивание
        const [dayT, moneyT, dayO, moneyO] = arr;
        const month = ['месяц', 'месяца', 'месяцев'];
        dayThis.textContent = dayT + ' ' + declOfNum(dayT, month);
        moneyThis.textContent = moneyT + ' руб.';
        dayOther.textContent = dayO + ' ' + declOfNum(dayO, month);
        moneyOther.textContent = moneyO + ' руб.';
    };

    const calcResult = () => {
        const startVal = parseInt(start.value);
        const endVal = parseInt(end.value);

        if (startVal === endVal) {
            showResult([0, 0, 0, 0]);
        } else {
            showResult(data[startVal][endVal - startVal - 1]);
        }
    };

    function handler() {
        if (start.value > end.value) {
            start.value = end.value = this.value;
        }

        calcResult();
    };

    const changeRange = (event) => {
        const target = event.target;

        // contains возвращает true или false в зависимости от того, найден элемент или нет
        if (target.classList.contains('change_range')) {
            // Метод Element.closest() возвращает ближайший родительский элемент (или сам элемент), 
            // который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.
            const parent = target.closest('#started') || target.closest('#ended');
            const range = parent.querySelector('.range');
            range.value = target.dataset.level;
            handler.apply(range);
        }
    };

    // обработчики событий
    start.addEventListener('change', handler);
    end.addEventListener('change', handler);
    compareRange.addEventListener('click', changeRange);

    document.querySelectorAll('.change_range').forEach((elem) => {
        elem.style.cursor = 'pointer';
    });

    calcResult();
});