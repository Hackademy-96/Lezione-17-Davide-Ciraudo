let bowling = {
    "giocatori": [
        
    ],
    "playRound": function(){
        if(this.giocatori[0].tiri.length < 10){
            this.giocatori.forEach( (giocatore)=>{
                let hit = Math.floor(Math.random() * (10 - 0 + 1) + 0)
                giocatore.tiri.push(hit)
                giocatore.punteggioFinale = giocatore.tiri.reduce((acc, tiro)=> acc + tiro, 0)
                if(hit == 10){
                    let img = document.createElement("img")
                    img.classList.add("strike");
                    img.src = "https://cdn.dribbble.com/users/1833200/screenshots/18034163/media/4474eda0cec6fbb576f3c0f3290e5faa.gif"
                    document.body.appendChild(img)
                    setTimeout(() => {
                        img.remove()
                    }, 3000);
                }
                })
            }
    },
    "createPlayers": function(){
        tbody.innerHTML = "";

        this.giocatori.forEach( (giocatore, i)=>{
            let tr = document.createElement("tr")
            tr.innerHTML = `
                <th scope="row">${i+1}</th>
                <td>${giocatore.name}</td>
                <td>${giocatore.tiri[0] ? giocatore.tiri[0] : 0}</td>
                <td>${giocatore.tiri[1] ? giocatore.tiri[1] : 0}</td>
                <td>${giocatore.tiri[2] ? giocatore.tiri[2] : 0}</td>
                <td>${giocatore.tiri[3] ? giocatore.tiri[3] : 0}</td>
                <td>${giocatore.tiri[4] ? giocatore.tiri[4] : 0}</td>
                <td>${giocatore.tiri[5] ? giocatore.tiri[5] : 0}</td>
                <td>${giocatore.tiri[6] ? giocatore.tiri[6] : 0}</td>
                <td>${giocatore.tiri[7] ? giocatore.tiri[7] : 0}</td>
                <td>${giocatore.tiri[8] ? giocatore.tiri[8] : 0}</td>
                <td>${giocatore.tiri[9] ? giocatore.tiri[9] : 0}</td>
                <td class="bg-warning">${giocatore.punteggioFinale}</td>
            `
            tbody.appendChild(tr);
        })
    },
    "aggiungiGiocatore": function(nome){
        this.giocatori.push( {"name": nome, "tiri": [], "punteggioFinale": 0} )
    },
    "resetGame": function(){
        this.giocatori.forEach( (giocatore)=>{
            giocatore.tiri = [];
            giocatore.punteggioFinale = 0;
        })
    },
    "resetPlayers": function(){
        this.giocatori = [];
    }

}

let play = document.querySelector("#play");
let tbody = document.querySelector("#tbody");
let newPlayer = document.querySelector("#newPlayer");
let inputName = document.querySelector("#inputName");
let modalTitle = document.querySelector("#modalTitle");
let modalBody = document.querySelector("#modalBody");
let buttonResults = document.querySelector("#buttonResults");
let resetGame = document.querySelector("#resetGame");
let resetPlayers = document.querySelector("#resetPlayers");
let info = document.querySelector("#info");

bowling.createPlayers();


play.addEventListener("click", ()=>{
    bowling.playRound();
    bowling.createPlayers();
    newPlayer.classList.add("d-none")
    
    //COMPARSA PULSANTE CLASSIFICA
    if(bowling.giocatori[0].tiri.length == 10){
        buttonResults.classList.remove("d-none")
        play.classList.add("d-none")
    }

})

newPlayer.addEventListener("click", ()=>{
    bowling.aggiungiGiocatore(inputName.value)
    inputName.value = ""; 
    bowling.createPlayers();
    if(bowling.giocatori.length == 2){
        info.classList.add("d-none");
        play.classList.remove("d-none");
        resetGame.classList.remove("d-none");
        resetPlayers.classList.remove("d-none");

    }
})

buttonResults.addEventListener("click", ()=>{
    modalBody.innerHTML = ""
    modalTitle.innerHTML = ""
    // CLONATO ARRAY GIOCATORI PER CREARE LA CLASSIFICA NELLA MODALE 
    let classifica = bowling.giocatori.map( (el)=>el ).sort( (a, b)=> b.punteggioFinale - a.punteggioFinale )
    classifica.forEach( (giocatore, i)=>{
        let p = document.createElement("p")
        p.innerHTML = `#${i+1} - ${giocatore.name} - ${giocatore.punteggioFinale}`
        modalBody.appendChild(p)
    } )
    //MODIFICATO TITOLO MODALE
    modalTitle.innerHTML = `Il vincitore è : ${classifica[0].name}`

})

resetGame.addEventListener("click", ()=>{
    bowling.resetGame();
    bowling.createPlayers();
    newPlayer.classList.remove("d-none")
    buttonResults.classList.add("d-none")
})

resetPlayers.addEventListener("click", ()=>{
    bowling.resetPlayers();
    bowling.createPlayers()
    newPlayer.classList.remove("d-none")
    info.classList.remove("d-none")
    play.classList.add("d-none")
    resetGame.classList.add("d-none")
    resetPlayers.classList.add("d-none")
    buttonResults.classList.add("d-none")
    
})