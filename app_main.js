
document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const calendarGrid = document.getElementById('calendar-grid');
    const confirmButton = document.getElementById('confirm-button');
    let selectedDate = null;

    const hoy = new Date();
    const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    monthSelect.value = fechaHoy.getMonth();
    yearSelect.value = fechaHoy.getFullYear();
    let viernes = false;
    
    let fechaRango1;
    let fechaRango2;
    function renderCalendar(month, year) {
        
        
        
        calendarGrid.innerHTML = ''; // Limpiar el calendario existente
        
        const daysOfWeek = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = day;
            if(day == "DOM" || day == "SAB")
                dayHeader.style.color = "gray" 
            calendarGrid.appendChild(dayHeader);
        });

        const firstDay = new Date(year, month, 1).getDay(); // 0 para domingo, 1 para lunes, etc.
        const daysInMonth = new Date(year, month + 1, 0).getDate();


        // Rellenar los días vacíos al inicio del mes
        for (let i = 0; i < firstDay; i++) {    
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-cell-disabled', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        // Rellenar los días del mes
        for (let i = 1; i <= daysInMonth; i++) {
            const diaDeLaSemana = new Date(year, month, i).getDay()
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-cell');
            
            //determina el rango
            if(new Date(year, month, i) >= fechaHoy){
                if(!viernes){
                    if(diaDeLaSemana == 5){
                        fechaRango1 = new Date(year, month, i);
                        fechaRango2 = new Date(year, month, i+7);
                        viernes = true
                    }

                }
            }

            if(diaDeLaSemana == 0 || diaDeLaSemana == 6 )
                desactivarCelda(dayCell)

            if(viernes){
                
                const estaFueraDelRango = new Date(year, month, i) < fechaRango1 || new Date(year, month, i) > fechaRango2;
                if (estaFueraDelRango) {
                    desactivarCelda(dayCell);
                }
            }

            dayCell.textContent = i;
            dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            if(new Date(year, month, i) < fechaHoy)
               desactivarCelda(dayCell) 
            
            
            if(diaDeLaSemana !== 0 && diaDeLaSemana !== 6){
                dayCell.addEventListener('click', () => {
                    // Remover la selección anterior
                    const prevSelected = calendarGrid.querySelector('.calendar-cell.selected');
                    if (prevSelected) {
                        prevSelected.classList.remove('selected');
                    }
                    // Añadir la nueva selección
                    dayCell.classList.add('selected');
                    selectedDate = dayCell.dataset.date;

                    // Muestra el dia seleccionado en el calendario
                    const selectedDayLabel = document.getElementById('selected-day-label');
                    selectedDayLabel.textContent = i;

                    //Muestra el dia de la semana
                    mostrarDiaDeLaSemana(selectedDate)
                });
            }
            calendarGrid.appendChild(dayCell);

           
        }
    }

    // Event listeners para cambios en el mes y año
    monthSelect.addEventListener('change', () => {
        renderCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });
    yearSelect.addEventListener('change', () => {
        renderCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });

    // Event listener para el botón de confirmar
    confirmButton.addEventListener('click', () => {
        if (selectedDate) {
            alert(`Fecha seleccionada: ${selectedDate}`);
            // Aquí puedes añadir lógica para enviar la fecha a un servidor, etc.
        } else {
            alert('Por favor, selecciona una fecha.');
        }
    });

    // Renderizar el calendario inicial
    renderCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));

    //clickear el dia de hoy
    document.querySelector(`[data-date="${fechaHoy.toISOString().split("T")[0]}"]`).click();

});

function mostrarDiaDeLaSemana(selectedDate){
    const diasDeLaSemana = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
    document.getElementById('dayOfTheWeek').textContent =  diasDeLaSemana[new Date(selectedDate).getDay()]
}

function desactivarCelda(dayCell){
    dayCell.classList.add('calendar-cell-disabled');
    dayCell.classList.remove('calendar-cell');
}