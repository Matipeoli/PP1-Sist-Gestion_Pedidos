const comida1 = [
  {
    "img": "https://picsum.photos/200/120?random=1",
    "title": "Pizza",
    "description": "Pizza con queso, tomate y albahaca"
  },
  {
    "img": "https://picsum.photos/200/120?random=2",
    "title": "Hamburguesa",
    "description": "Hamburguesa simple con papas fritas"
  },
  {
    "img": "https://picsum.photos/200/120?random=3",
    "title": "Ensalada",
    "description": "Ensalada fresca con lechuga, tomate y zanahoria"
  },
  {
    "img": "https://picsum.photos/200/120?random=4",
    "title": "Empanada",
    "description": "Empanada de carne cortada a cuchillo"
  },
  {
    "img": "https://picsum.photos/200/120?random=4",
    "title": "Empanada",
    "description": "Empanada de carne cortada a cuchillo"
  }
];

let id = 0;
let lastId = "";

function createCard(img,title,description){
    const html = `
    <div class="cardContainer" id="card${id}" onclick=marcarCard(card${id})>
        <img src=${img}></img>
        <div class="cardText"> 
            <div class="cardTitle">${title}</div>
            <div class="cardDescription">${description}</div>
        </div>
    </div>`
    id++;
    return html;
}



function showCards(cardJson){
    const contenedor = document.getElementById("cardContainer");
    let listadoComida = "";
    
    for(let i=0;i<cardJson.length;i++){
        listadoComida += createCard(cardJson[i].img,cardJson[i].title,cardJson[i].description)
    }

    contenedor.innerHTML = listadoComida;
    
    new Sortable(contenedor, {
        swapThreshold: 1,
        invertSwap: true,
        animation: 150,
        dragClass: "dragging"
    });
}


function marcarCard(id){

    if(id != lastId){
        lastId = id;
        document.querySelectorAll(".checkedCard").forEach(element => {
            if (element.classList.contains("checkedCard")) {
                element.classList.remove("checkedCard");
            }
        });
        id.classList.add("checkedCard");
    }else{
        id.classList.remove("checkedCard");
        lastId = "";
    }

    
}

showCards(comida1)