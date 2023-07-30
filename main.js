// INDEX CARDS
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")
const btn4 = document.getElementById("btn4")

if (btn1) {
    btn1.addEventListener("click", sacarlo)
}

function sacarlo() {
    btn1.classList.toggle("disable")
    btn2.classList.remove("disable")
    btn3.classList.remove("disable")
    btn4.classList.remove("disable")
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
//tengo que ponerle id a todos los botones de pausa

let posicionReproduccionRock
let posicionReproduccionLatina
let posicionReproduccionElectronica
let posicionReproduccionHip


botonRock.addEventListener("click", escuchar)
botonLatina.addEventListener("click", escuchar)
botonElectronica.addEventListener("click", escuchar)
botonHip.addEventListener("click", escuchar)
pausar.addEventListener("click", pausa)




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
