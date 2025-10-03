class Calendario {
    constructor(monthSelectId, yearSelectId, gridId) {
        this.monthSelect = document.getElementById(monthSelectId);
        this.yearSelect = document.getElementById(yearSelectId);
        this.calendarGrid = document.getElementById(gridId);
        
        this.selectedDate = null;
        this.fechaRango1 = null;
        this.fechaRango2 = null;
        this.viernes = false;
        
        //Objeto de cards
        this.cards = new Tarjetas("cardContainer");
        
        const hoy = new Date();
        const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

        this.monthSelect.value = fechaHoy.getMonth();
        this.yearSelect.value = fechaHoy.getFullYear();

        this.determinarFechaRango();
        this.initListeners();
        this.renderCalendar(parseInt(this.monthSelect.value), parseInt(this.yearSelect.value));
    }

    initListeners() {
        this.monthSelect.addEventListener('change', () => {
            this.renderCalendar(parseInt(this.monthSelect.value), parseInt(this.yearSelect.value));
        });

        this.yearSelect.addEventListener('change', () => {
            this.renderCalendar(parseInt(this.monthSelect.value), parseInt(this.yearSelect.value));
        });

    }

    renderCalendar(month, year) {
        this.calendarGrid.innerHTML = '';

        const daysOfWeek = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = day;
            if (day === "DOM" || day === "SAB") {
                dayHeader.style.color = "gray";
            }
            this.calendarGrid.appendChild(dayHeader);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-cell-disabled', 'empty');
            this.calendarGrid.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const diaDeLaSemana = new Date(year, month, i).getDay();
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-cell');

            if (diaDeLaSemana === 0 || diaDeLaSemana === 6) {
                this.desactivarCelda(dayCell);
            }

            if (this.viernes) {
                const estaFueraDelRango = new Date(year, month, i) < this.fechaRango1 || new Date(year, month, i) > this.fechaRango2;
                if (estaFueraDelRango) {
                    this.desactivarCelda(dayCell);
                }
            }

            dayCell.textContent = i;
            dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            const fechaAgregar = new Date(year, month, i);

            if (fechaAgregar <= this.fechaRango1) {
                this.desactivarCelda(dayCell);
            }

            if (diaDeLaSemana !== 0 && diaDeLaSemana !== 6) {
                dayCell.addEventListener('click', () => {
                    const prevSelected = this.calendarGrid.querySelector('.calendar-cell.selected');
                    if (prevSelected) {
                        prevSelected.classList.remove('selected');
                    }
                    dayCell.classList.add('selected');
                    this.selectedDate = dayCell.dataset.date;

                    document.getElementById('selected-day-label').textContent = i;
                    this.mostrarDiaDeLaSemana(this.selectedDate);
                });
            }

            this.calendarGrid.appendChild(dayCell);
        }
    }

    mostrarDiaDeLaSemana(selectedDate) {
        const diasDeLaSemana = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
        document.getElementById('dayOfTheWeek').textContent = diasDeLaSemana[new Date(selectedDate).getDay()];

        //Mostrar cards
        this.cards.showCards(selectedDate)
    }

    desactivarCelda(dayCell) {
        dayCell.classList.add('calendar-cell-disabled');
        dayCell.classList.remove('calendar-cell');
        dayCell.removeAttribute('onclick');
    }

    determinarFechaRango() {
        const hoy = new Date();
        let fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        let encontroPrimerViernes = false;

        while (!encontroPrimerViernes) {
            if (fecha.getDay() === 5) {
                encontroPrimerViernes = true;
            } else {
                fecha.setDate(fecha.getDate() + 1);
            }
        }

        this.fechaRango1 = new Date(fecha);
        this.fechaRango2 = new Date(fecha);
        this.fechaRango2.setDate(this.fechaRango2.getDate() + 7);

        this.viernes = true;
    }
}


