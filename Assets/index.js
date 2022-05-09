let order = [];
let clickedOrder = [];
let lock = true;
let gameState = document.getElementById("state");


const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

//Start
let StartGame = () => {
    nextlevel();
}

//CreateColor
let createColorElement = (color) => {
    switch (color) {
        case 0:
            return green;
            break;
        case 1:
            return red;
            break;
        case 2:
            return yellow;
            break;
        case 3:
            return blue;
            break;
    }
}

//Highlight
let lightColor = (element, i) => {

    element.classList.remove('off');
    let leng = order.length
    setTimeout(() => {
        element.classList.add('off');
        //checkOrder();
        if (i ==leng- 1)
        {
            setTimeout(() => {
                lock = false;
                gameState.innerHTML=("INSIRA A ORDEM");
            }, 200)
        }
            
    }, 800)
}

//newColor
let newColor = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    lock = true;
    for (let i in order) {

        setTimeout(() => {
            let element = createColorElement(order[i]);

            lightColor(element, i);
        }, 1000 + 1000 * i)

    }

}

//check
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {

            lose();
            return;
        }
    }
    if (clickedOrder.length == order.length) {

        nextlevel();
    }

}

//Win
let nextlevel = () => {  
    let val = order.length+1
    gameState.innerHTML=("NÍVEL "+ val)
    clickedOrder = [];
    setTimeout(() => {
        newColor();
    }, 100)

}

//Lose
let lose = () => {
    lock = true;
    order = [];
    clickedOrder = [];
    gameState.innerHTML=("GAME OVER");
  
    setTimeout(()=>{
      
        StartGame();
    },1500);
    
}

//Click
let click = (color) => {
    if (lock != true) {
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.remove('off');
        setTimeout(() => {
            createColorElement(color).classList.add('off');
            checkOrder();
        }, 300)
    }

}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

StartGame();