// INDEX CARDS
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")
const btn4 = document.getElementById("btn4")
const btn5 = document.getElementById("btn5")

if (btn1) {
    btn1.addEventListener("click", sacarlo)
}

function sacarlo() {
    btn1.classList.toggle("disable")
    btn2.classList.remove("disable")
    btn3.classList.remove("disable")
    btn4.classList.remove("disable")
    btn5.classList.remove("disable")
}




// JUEGO SNAKE
const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")


let foodX , foodY
let snakeX = 5, snakeY = 10
let velocityX = 0, velocityY = 0
let snakeBody = []
let gameOver = false
let setIntervalId
let score = 0
let highScore = localStorage.getItem("high-score") || 0
if (highScoreElement) {
    highScoreElement.innerHTML = `High Score: ${highScore}`
}




const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1 
}


const handleGameOver = () =>{
    clearInterval(setIntervalId)
    location.reload()
}

const changeDirection = (e) =>{
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0
        velocityY = 1
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1
        velocityY = 0
    }else if (e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1
        velocityY = 0
    }
}


const initGame = () =>{
    if (gameOver) {
        return handleGameOver()
    }
    let htmlMarkUp = `<div class ="food" style="grid-area:${foodY} / ${foodX}"></div>`;
    
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++


        highScore = score >= highScore ? score : highScore
        localStorage.setItem("high-score", highScore)

        scoreElement.innerHTML = `Score ${score}`

        highScoreElement.innerHTML = `High Score: ${highScore}`
    }

    for(let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocityX
    snakeY += velocityY

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }


    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkUp += `<div class ="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody [0][1] === snakeBody[i][1] && snakeBody [0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }

if (playBoard) {
    playBoard.innerHTML = htmlMarkUp
    
}
}

changeFoodPosition()
// initGame()
setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection)



//Escuchar musica
const botonRock = document.getElementById("botonRock")
const botonLatina = document.getElementById("botonLatina")
const botonElectronica = document.getElementById("botonElectronica")
const botonHip = document.getElementById("botonHip")
const rock1 = document.getElementById("rock1")
const latina1 = document.getElementById("latina1")
const electronica1 = document.getElementById("electronica1")
const hip1 = document.getElementById("hiphop1")
const pausar = document.querySelector(".pausar")
const contenedorMusica = document.getElementById("contenedorMusica")

let posicionReproduccionRock
let posicionReproduccionLatina
let posicionReproduccionElectronica
let posicionReproduccionHip

if (contenedorMusica) {
    botonRock.addEventListener("click", escuchar)
    botonLatina.addEventListener("click", escuchar)
    botonElectronica.addEventListener("click", escuchar)
    botonHip.addEventListener("click", escuchar)
    pausar.addEventListener("click", pausa)
}





function pausa() {
        posicionReproduccionRock = rock1.currentTime
        rock1.pause()
        posicionReproduccionLatina = latina1.currentTime
        latina1.pause()
        posicionReproduccionElectronica = electronica1.currentTime
        electronica1.pause()
        posicionReproduccionHip = hip1.currentTime
        hip1.pause()
    }



function escuchar(event) {
    if (event.target === botonRock) {
        rock1.play()
        latina1.pause()
        electronica1.pause()
        hip1.pause()
        latina1.currentTime = 0
        hip1.currentTime = 0
        electronica1.currentTime = 0
    }else if (event.target === botonLatina){
        latina1.play()
        rock1.pause()
        hip1.pause()
        electronica1.pause()
        rock1.currentTime = 0
        hip1.currentTime = 0
        electronica1.currentTime = 0
    }else if(event.target === botonElectronica){
        electronica1.play()
        rock1.pause()
        latina1.pause()
        hip1.pause()
        latina1.currentTime = 0
        hip1.currentTime = 0
        rock1.currentTime = 0
    }else if(event.target === botonHip){
        hip1.play()
        latina1.pause()
        rock1.pause()
        electronica1.pause()
        latina1.currentTime = 0
        rock1.currentTime = 0
        electronica1.currentTime = 0
    }
}


//LOGIN Y REGISTER
const loginContainer = document.getElementById("loginContainer")
const contentContainer = document.getElementById("contentContainer")
const loginForm = document.getElementById("loginForm")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const emailInput = document.getElementById("email")
const registerBtn = document.getElementById("registerBtn")
const userDisplay = document.getElementById("userDisplay")
const logoutBtn = document.getElementById("logoutBtn")
const aviso = document.getElementById("aviso")


let currentUser = null

//Inicio de sesión con exito
function loginExitoso(username) {
    currentUser = username
    localStorage.setItem("loggedInUser", username)
    loginContainer.style.display = "none"
    contentContainer.style.display = "block"
    userDisplay.textContent = `¡Bienvenido, ${username}`
}

function guardarUsuario() {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        currentUser = username;
        document.getElementById("userDisplay").textContent = username;
        loginContainer.style.display = "none";
        contentContainer.style.display = "block";
    }
}


function controlLoginORegistro(event) {
    event.preventDefault()
    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    const usersData = JSON.parse(localStorage.getItem("users")) || []

    const user = usersData.find((user) => user.username === username)

    if (user) {
        if (user.password === password) {
            loginExitoso(username)
            aviso.innerHTML = ``
        }else{
            aviso.innerHTML = `Contraseña incorrecta`
        }
    }else{
        aviso.innerHTML = `Usuario no registrado`
    }
}


function controlarRegistro() {
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const usersData = JSON.parse(localStorage.getItem("users")) || []

    const usuariosExistentes = usersData.find((user) => user.username === username)

    if (username === "" && password === "") {
        aviso.innerHTML = `Falta completar los campos`
    }else{
    if (usuariosExistentes) {
        aviso.innerHTML = `El usuario ya existe`
    }else{
        usersData.push({username, password})
        localStorage.setItem("users", JSON.stringify(usersData))
        loginExitoso(username)
    }
    }
    
}

function logout() {
    currentUser = null
    localStorage.removeItem("loggedInUser")
    loginContainer.style.display = "flex"
    contentContainer.style.display = "none"
    usernameInput.value = ""
    passwordInput.value = ""
}

    loginForm.addEventListener("submit", controlLoginORegistro)
    registerBtn.addEventListener("click", controlarRegistro)
    logoutBtn.addEventListener("click", logout)

document.addEventListener("DOMContentLoaded", () =>{
    const usuarioGuardado = localStorage.getItem("loggedInUser")
    if (usuarioGuardado) {
        loginExitoso(usuarioGuardado)
    }
})

guardarUsuario()


