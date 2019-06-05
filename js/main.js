const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d'); //建立繪製物件

//將ctx繪製放大   (x,y) 20 = 2000%
ctx.scale(20, 20);

//3x3的二維陣列，讓它有旋轉的軸心
//T 
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
]
const player = {
    position: { x: 5, y: 5 },
    matrix: matrix,
}
const matrix_arena = create_arena(12, 20);
//console.table(matrix_arena);

function create_arena(width, height) { //設定場地
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

function merge(matrix_arena, player) { //合併場地與puzzle
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                matrix_arena[y + player.position.y][x + player.position.x] = value;
            }

        });
    });
}

function draw() {
    // 建立線型漸層物件 參數依序為 x0(x起始點)、y0(y起始點)、x1(x結束點)、y1(y結束點)
    var grd = ctx.createLinearGradient(0, 0, 0, 400);
    // 設定顏色位置 參數依序為 position(0.0 到 1.0，0 即為起始點，1 即為結束點)、顏色代碼
    grd.addColorStop(0, "#CCEEFF");
    // 設定顏色位置 參數依序為 position(0.0 到 1.0，0 即為起始點，1 即為結束點)、顏色代碼
    grd.addColorStop(1, "#77DDFF");
    // 設定填滿樣式
    ctx.fillStyle = grd;
    // 執行填滿繪製 參數依序為 x、y、width、height
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    tetris_puzzle(player.matrix, player.position);
}

function tetris_puzzle(matrix, offset) {
    matrix.forEach((row, y) => { //forEach(value of int[i], index of int[])
        row.forEach((value, x) => {
            if (value != 0) {
                ctx.fillStyle = '#FF3333';
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function tetris_drop() { //tetris 下降 snippet
    player.position.y++;
    dropCounter = 0;
}

document.addEventListener('keydown', event => {
    button = event.keyCode; //使用者輸入按鍵的key code
    console.log(button);
    switch (button) {
        case 40:
            tetris_drop();
            break;
        case 37:
            player.position.x--;
            break;
        case 39:
            player.position.x++;
            break;
    }
})

let dropCounter = 0;
let dropInterval = 1000; //1000毫秒等於1秒

let lastTime = 0;

function update(time = 0) {
    // console.log(time) //觀察time
    const deltaTime = time - lastTime; //計算時間分差

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) { //超過1秒後
        tetris_drop();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update); //requestAnimationFrame(callback)
}

update()