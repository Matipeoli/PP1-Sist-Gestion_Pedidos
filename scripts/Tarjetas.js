class Tarjetas {
    constructor(containerId) {
        this.id = 0;
        this.lastId = "";
        this.container = document.getElementById(containerId);
    }

    createCard(img, title, description) {

        const card = document.createElement("div");
        card.className = "cardContainer";
        card.id = `card${this.id}`;

        card.innerHTML = `
            <img src="${img}">
            <div class="cardText"> 
                <div class="cardTitle">${title}</div>
                <div class="cardDescription">${description}</div>
            </div>
        `;

        card.addEventListener("click", () => this.marcarCard(card));

        this.id++;
        return card;
    }

    
    showCards(selectedDate) {
        this.container.innerHTML = ""; 

        // "Consulta"
        const cardJson = [
            { fecha: "2025-10-06", datos: { img: "https://picsum.photos/200/120?random=1", title: "Pizza", description: "Pizza con queso, tomate y albahaca" } },
            { fecha: "2025-10-06", datos: { img: "https://picsum.photos/200/120?random=2", title: "Hamburguesa", description: "Hamburguesa simple con papas fritas" } },
            { fecha: "2025-10-06", datos: { img: "https://picsum.photos/200/120?random=3", title: "Ensalada", description: "Ensalada fresca con lechuga, tomate y zanahoria" } },
            { fecha: "2025-10-07", datos: { img: "https://picsum.photos/200/120?random=1", title: "Asado", description: "Asaduti" } },
            { fecha: "2025-10-07", datos: { img: "https://picsum.photos/200/120?random=3", title: "Pescado", description: "Pesezuli" } }
        ];

        const resultados = cardJson.filter(item => item.fecha === selectedDate);

        if(resultados.length == 0){
                this.container.innerHTML = "<h1>Aun no hay menus cargados</h1>"
                return;
        }

        for (let i = 0; i < resultados.length; i++) {
            const card = this.createCard(
                resultados[i].datos.img,
                resultados[i].datos.title,
                resultados[i].datos.description
            );
            this.container.appendChild(card);
        }

        new Sortable(this.container, {
            swapThreshold: 1,
            invertSwap: true,
            animation: 150,
            dragClass: "dragging"
        });
    }

    marcarCard(id) {
        if (id != this.lastId) {
            this.lastId = id;
            document.querySelectorAll(".checkedCard").forEach(element => {
                if (element.classList.contains("checkedCard")) {
                    element.classList.remove("checkedCard");
                }
            });
            id.classList.add("checkedCard");
            this.container.prepend(id)
        } else {
            id.classList.remove("checkedCard");
            this.lastId = "";
        }
    }

    showCardsByJson(){
        //Implementar
    }
}


