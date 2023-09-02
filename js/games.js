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


const scoreElement = document.querySelector(".score-memory")
const highScoreElement = document.querySelector(".high-score-memory")

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

if (btnFlag) {
    btnFlag.addEventListener("click", comenzarJuego)
    btnFinalQuiz.addEventListener("click", volverAlInicio)
}


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


//Formulario Nosotros
const formUs = document.getElementById("form-us")
const persona = document.getElementById("persona")
const email = document.getElementById("email")
const tel = document.getElementById("tel")
const message = document.getElementById("message")
const avisoUs = document.getElementById("avisoUs")
const perfecto = document.getElementById("perfectoUs")

if (formUs) {
    formUs.addEventListener("submit", function (event) {
        event.preventDefault()
        let aviso = ""
        let entrar = false
        let validarEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        
        if (persona.value.length <=2) {
            aviso += 'El nombre es muy corto <br>'
            entrar = true
        }
        if (!validarEmail.test(email.value)) {
            aviso += 'El Email no es valido <br>'
            entrar = true
            
        }
        if (tel.value.length <= 7) {
            aviso += 'El número de teléfono no es valido <br>'
            entrar = true
        }
        if (entrar) {
            avisoUs.innerHTML = aviso
            perfecto.innerHTML = ""
        }else{
            perfecto.innerHTML = "Enviado"
            avisoUs.innerHTML = ""
        }

    })  
}

//Adivina la palabra juego

let palabras = [
    {
        palabra: "remera",
        pista: "Prenda para la parte superior"
    },
    {
        palabra: "reunion",
        pista: "Evento donde se juntan varias personas"
    },
    {
        palabra: "limon",
        pista: "Fruta acida amarilla"
    },
    {
        palabra: "matematica",
        pista: "Números, operaciones, fórmulas y geometría son fundamentales en esta disciplina"
    },
    {
        palabra: "martillo",
        pista: "Herramienta de mano que se usa para golpear objetos o clavar clavos"
    },
    {
        palabra: "puerta",
        pista: "Puede ser de madera, metal o vidrio y se usa para salir de una habitación"
    },
    {
        palabra: "celula",
        pista: "Es la unidad básica de la vida, puede ser eucariota o procariota"
    },
    {
        palabra: "botella",
        pista: "Se usa para contener líquidos"
    },
    {
        palabra: "dinosaurio",
        pista: "Ser prehistórico extinguido"
    },
    {
        palabra: "cassette",
        pista: "almacenamiento de música retro"
    },
]




const textoPalabra = document.querySelector(".palabra")
const ayudaTexto = document.querySelector(".pista span")
const tiempoTexto = document.querySelector(".tiempo b")
const espacioInput = document.querySelector("input")
const refrescarBtn = document.querySelector(".refrescar-palabra")
const checkBtn = document.querySelector(".check-word")
const correcto = document.querySelector(".correcto")

let palabraCorrecta, cronometro





const initTimer = (maxTime) =>{
    clearInterval(cronometro)
    cronometro = setInterval(() =>{
        if (maxTime > 0) {
            maxTime--
            return (tiempoTexto.innerText = maxTime)
        }
        return(`Time off! ${palabraCorrecta.toUpperCase()} era la palabra correcta`)
        initGame()
    },1000)
}

let j

const mezclarLetras = (palabra) => {
    const letrasArray = palabra.split("");
    for (let i = letrasArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letrasArray[i], letrasArray[j]] = [letrasArray[j], letrasArray[i]];
    }
    return letrasArray.join("");
};

const initGame = () => {
    initTimer(30);
    let objetoRandom = palabras[Math.floor(Math.random() * palabras.length)];
    textoPalabra.innerText = mezclarLetras(objetoRandom.palabra); // Mezclar letras antes de mostrarlas
    ayudaTexto.innerText = objetoRandom.pista;
    palabraCorrecta = objetoRandom.palabra.toLowerCase();
    espacioInput.value = ""
    espacioInput.setAttribute("maxLength", palabraCorrecta.length);
};

initGame()

const checkWord = () =>{
    let userWord = espacioInput.value.toLowerCase()
    if (!userWord) return alert("Porfavor escribe la palabra para chequear")
    if (userWord !== palabraCorrecta){
        correcto.innerText = (`ooops! ${userWord} no es la palabra correcta`)
    }else{
        correcto.innerText = (`Felicidades! ${palabraCorrecta.toUpperCase()} es la palabra correcta`)
    }
    initGame()
}

refrescarBtn.addEventListener("click",initGame)
checkBtn.addEventListener("click",checkWord)