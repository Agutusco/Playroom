const cards = document.querySelectorAll(".tarjeta")


let matchedCard = 0
let cardOne, cardTwo
let disabledDeck = false

function flipCards(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disabledDeck) {
        clickedCard.classList.add("flip")
        if (!cardOne) {
            return cardOne = clickedCard
        }
        cardTwo = clickedCard
        disabledDeck = true

        let cardOneImg = cardOne.querySelector("img").src
        let cardTwoImg = cardTwo.querySelector("img").src
        matchCards(cardOneImg, cardTwoImg)
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++
        if (matchedCard == 8) {
            setTimeout(() =>{
                return shuffleCard()
            },)
        }
        cardOne.removeEventListener("click", flipCards)
        cardTwo.removeEventListener("click", flipCards)
        cardOne = cardTwo = ""
        return disabledDeck = false;
    }
    setTimeout(() =>{
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")
    }, 400)

    setTimeout(() =>{
        cardOne.classList.remove("shake", "flip")
        cardTwo.classList.remove("shake", "flip")
        cardOne = cardTwo = ""
        disabledDeck = false
    }, 1200)
}

function shuffleCard() {
    matchedCard = 0
    cardOne =  cardTwo = ""
    disabledDeck = false;
    let arr = [1,2,3,4,5,6,7,8, 1, 2,3,4,5,6,7,8]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, index)=>{
        card.classList.remove("flip")
        let imgTag = card.querySelector("img")
        imgTag.src = `../img/img-${arr[index]}.png`
        card.addEventListener("click", flipCards)
    })
}


shuffleCard()

cards.forEach(card =>{
    card.addEventListener("click", flipCards)
})

//ADIVINA LA BANDERA JUEGO

const btnFlag = document.getElementById("btnFlag")
const btnFinalQuiz = document.getElementById("btnFinalQuiz")

const banderas = ["pa.svg", "bo.svg", "ad.svg", "gb.svg", "na.svg"]
const correcta = [2, 2, 1, 1, 0]
const opciones = []

opciones.push(["SUDAFRICA", "SINGAPUR", "PANAMA"])
opciones.push(["PERU", "ITALIA", "BOLIVIA"])
opciones.push(["TUNEZ", "ANDORRA", "ANTIGUA Y BARBUDA"])
opciones.push(["UCRANIA", "REINO UNIDO", "MADAGASCAR"])
opciones.push(["NAMIBIA", "OMAN", "ETIOPIA"])


btnFlag.addEventListener("click", comenzarJuego)
btnFinalQuiz.addEventListener("click", volverAlInicio)


let posActual = 0
let  cantidadCorrecta = 0

function comenzarJuego() {
    posActual = 0
    cantidadCorrecta = 0
    document.getElementById("pantalla-inicial").style.display = "none"
    document.getElementById("pantalla-juego").style.display = "block"
    cargarBandera()

}

function cargarBandera() {
    if (banderas.length <= posActual) {
        terminarJuego()
    }else{
        limpiarOpciones()
        document.getElementById("imgBandera").src = "../img/" + banderas[posActual]
        document.getElementById("n0").innerHTML = opciones[posActual][0]
        document.getElementById("n1").innerHTML = opciones[posActual][1]
        document.getElementById("n2").innerHTML = opciones[posActual][2]
        document.getElementById("l0").className = "letra"
        document.getElementById("l1").className = "letra"
        document.getElementById("l2").className = "letra"
        
    }
}

function limpiarOpciones(){
    document.getElementById("n0").className = "nombre"
    document.getElementById("n1").className = "nombre"
    document.getElementById("n2").className = "nombre"
}

function terminarJuego() {
    document.getElementById("pantalla-juego").style.display = "none"
    document.getElementById("pantalla-final").style.display="block"
    document.getElementById("numCorrectas").innerHTML = cantidadCorrecta
    document.getElementById("numIncorrectas").innerHTML = banderas.length - cantidadCorrecta
}

function volverAlInicio() {
    document.getElementById("pantalla-final").style.display = "none"
    document.getElementById("pantalla-inicial").style.display = "block"
    document.getElementById("pantalla-juego").style.display = "none"

}

function comprobarRta(opcionElegida) {
    if (opcionElegida == correcta[posActual]) {
        document.getElementById("n" + opcionElegida).className = "nombre nombreCorrecto"
        document.getElementById("l" + opcionElegida).className = "letra letraCorrecto"
        cantidadCorrecta++
    }else{
        document.getElementById("n" + opcionElegida).className = "nombre nombreIncorrecto"
        document.getElementById("l" + opcionElegida).className = "letra letraIncorrecto"

        document.getElementById("n" + correcta[posActual]).className = "nombre nombreCorrecto"
        document.getElementById("l" + correcta[posActual]).className = "letra letraCorrecto"
    }
    posActual++

    setTimeout(cargarBandera, 1000)
}
