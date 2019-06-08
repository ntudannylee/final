const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d'); //建立繪製物件

//將ctx繪製放大   (x,y) 20 = 2000%
ctx.scale(20, 20);

const color = [
    null, //加上null讓value從1~7，因為在for迴圈判斷那邊有用if過濾掉value==0的狀況
    '#FF3333', //T
    '#5555FF', //L
    '#EEEE00', //I
    '#E93EFF', //J
    '#4400B3', //O
    'black', //Z
    '#33FF33', //S

]

const player = {
    position: { x: 0, y: 0 },
    matrix: null,
}
const matrix_arena = create_arena(12, 20); //建立寬12高20的場地
//console.table(matrix_arena);

//創造tetrix_puzzle，且每個都要讓它有旋轉的軸心
function create_puzzle(type) {
    switch (type) {
        case 'T':
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
            break;
        case 'L':
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2],
            ];
            break;
        case 'I':
            return [
                [0, 3, 0, 0],
                [0, 3, 0, 0],
                [0, 3, 0, 0],
                [0, 3, 0, 0],
            ];
            break;
        case 'J':
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
            break;
        case 'O':
            return [
                [5, 5],
                [5, 5],
            ];
            break;
        case 'Z':
            return [
                [6, 6, 0],
                [0, 6, 6],
                [0, 0, 0],
            ];
            break;
        case 'S':
            return [
                [0, 7, 7],
                [7, 7, 0],
                [0, 0, 0],
            ];
            break;
    }

}

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

function collide(matrix_arena, player) { //  透過player的matrix與arena的matrix來判斷同一列的行有沒有重疊到
    m = player.matrix;
    p = player.position;
    for (var y = 0; y < m.length; ++y) {
        for (var x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (matrix_arena[y + p.y] && matrix_arena[y + p.y][x + p.x]) != 0) {
                return true;
            }
        }
    }
    return false;
}

//----繪製背景並呼叫tetris_puzzle畫出一個方塊----
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

    tetris_puzzle(matrix_arena, { x: 0, y: 0 });
    tetris_puzzle(player.matrix, player.position);
}

function tetris_puzzle(matrix, offset) {
    matrix.forEach((row, y) => { //forEach(value of int[i], index of int[])
        row.forEach((value, x) => {
            if (value != 0) {
                ctx.fillStyle = color[value];
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}
//----繪製背景並呼叫tetris_puzzle畫出一個方塊----

//隨機創造出一個puzzle，把結果放在player物件內
function puzzle_reset() {
    const puzzle = 'TSZIJLO';
    var random = Math.floor(Math.random() * 7); //0~6  math.floor是捨五入math.random的值
    var randomforx = Math.floor(Math.random() * 10); //瘋狂亂下雨模式
    player.matrix = create_puzzle(puzzle[random]);
    player.position.y = 0;
    player.position.x = randomforx;
    //判斷puzzle有沒有堆疊到頂，若有，即為碰撞。
    if (collide(matrix_arena, player)) {
        matrix_arena.forEach(row => row.fill(0));
    }
}

//puzzle翻轉事件,傳入陣列以及想要旋轉的方位
function rotate(matrix, direction) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < y; ++x) {
            //概念：[a,b]-->[b,a]
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    //順時鐘旋轉
    if (direction > 0) {
        //若旋轉的時候撞到兩側，超出背景，判斷狀況後加減x
        while (collide(matrix_arena, player)) {
            if (player.position.x < 1) {
                player.position.x += 1;
            } else {
                player.position.x -= 1;
            }
        }

        matrix.forEach(row => row.reverse());

        //逆時鐘旋轉
    } else {
        while (collide(matrix_arena, player)) {
            if (player.position.x < 1) {
                player.position.x += 1;
            } else {
                player.position.x -= 1;
            }
        }
        matrix.reverse();
    }
}

//tetris 下降及碰撞判斷
function tetris_drop() {
    player.position.y++;
    dropCounter = 0;
    if (collide(matrix_arena, player)) {
        player.position.y--;
        merge(matrix_arena, player);
        puzzle_reset();
    }
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
            if (collide(matrix_arena, player)) {
                player.position.x += 1;
            }
            break;
        case 39:
            player.position.x++;
            if (collide(matrix_arena, player)) {
                player.position.x -= 1;
            }
            break;
        case 90:
            rotate(player.matrix, 1);
            break;
        case 88:
            rotate(player.matrix, 0);
            break;
    }
})

//-------下降事件-------
let dropCounter = 0;
let dropInterval = 1000; //1000毫秒等於1秒

let lastTime = 0;
//能夠連續draw
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
//-------下降事件-------



//主事件
puzzle_reset(); //製造一個隨機puzzle
update(); //繪製出該puzzle