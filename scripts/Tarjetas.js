class Tarjetas {
    constructor(containerId, modo) {
        this.id = 0;
        this.lastId = "";
        this.container = document.getElementById(containerId);
        this.modo = modo;
        this.menusDisponibles = [
            { datos: { img: "https://picsum.photos/200/120?random=1", title: "Pizza", description: "Pizza con queso, tomate y albahaca" } },
            { datos: { img: "https://picsum.photos/200/120?random=2", title: "Hamburguesa", description: "Hamburguesa simple con papas fritas" } },
            { datos: { img: "https://picsum.photos/200/120?random=3", title: "Ensalada", description: "Ensalada fresca con lechuga, tomate y zanahoria" } },
            { datos: { img: "https://picsum.photos/200/120?random=1", title: "Asado", description: "Asaduti" } },
            { datos: { img: "https://picsum.photos/200/120?random=3", title: "Pescado", description: "Pesezuli" } }
        ]
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

        if (this.modo == "seleccionar")
            card.addEventListener("click", () => this.marcarCard(card));
        else
            card.addEventListener("click", () => this.seleccionarCard(card));

        this.id++;
        return card;
    }


    showCards(selectedDate) {
        this.container.innerHTML = "";

        // "Consulta"
        const cardJson = [
            { fecha: "2025-10-13", datos: { img: "https://picsum.photos/200/120?random=1", title: "Pizza", description: "Pizza con queso, tomate y albahaca" } },
            { fecha: "2025-10-13", datos: { img: "https://picsum.photos/200/120?random=2", title: "Hamburguesa", description: "Hamburguesa simple con papas fritas" } },
            { fecha: "2025-10-14", datos: { img: "https://picsum.photos/200/120?random=3", title: "Ensalada", description: "Ensalada fresca con lechuga, tomate y zanahoria" } },
            { fecha: "2025-10-14", datos: { img: "https://picsum.photos/200/120?random=1", title: "Asado", description: "Asaduti" } },
            { fecha: "2025-10-15", datos: { img: "https://picsum.photos/200/120?random=3", title: "Pescado", description: "Pesezuli" } }
        ];

        const resultados = cardJson.filter(item => item.fecha === selectedDate);

        if (resultados.length == 0) {
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

    showCardsMenu() {
        this.container.innerHTML = "";
        this.menusDisponibles.forEach((menu) => {
            const card = this.createCard(
                menu.datos.img,
                menu.datos.title,
                menu.datos.description
            );
            this.container.appendChild(card);
        })

        const button = document.createElement("button");
        const div = document.createElement("div");

        button.className = "botonAgregar";
        button.textContent = "+";
        button.addEventListener("click", () => {
            const ventana = document.createElement("div");
            ventana.textContent = "Soy una ventana nueva";

            // Estilo básico para que se vea como una ventana arriba
            ventana.className = "ventanaAgregar";
            const html = `
            <div> 
                <label>
                    Foto:
                    <input type="file" name="imagen" accept="image/*">
                </label>
                
                <label>
                    Título:
                    <input type="text" name="titulo" placeholder="Escribe un título">
                </label>
                
                <label>
                    Descripción:
                    <input type="text" name="descripcion" placeholder="Escribe una descripción">
                </label>

                <button type="submit">Enviar</button>   
            </div> `

            ventana.innerHTML = html;
            document.body.appendChild(ventana);
        })

        div.className = "botonAgregarDiv"

        div.appendChild(button)
        this.container.appendChild(div)

    }


    seleccionarCard(card) {
        card.classList.toggle('checkedCard');
    }

}


