var colors = ["red", "blue", "red", "blue", "red", "blue", "red", "blue", "red", "blue", "red", "blue"];
var restaraunts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
var startAngle = 0;
var arc = Math.PI / 6;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
const player = {
    coin: 0,
    bet: 0,
    flag: 0,
}
player.coin = Number(sessionStorage.getItem('coin')); //get coin string value from session
var dollar = '＄'
$(document).ready(function() {
    $("#spin").click(function(e) {
        e.preventDefault();
        player.bet = Number($('#bet').val()); //取得bet金額
        if (player.bet > player.coin) {
            alert('您的金額不足')
            player.flag = 1;
        } else {
            player.coin -= player.bet;
            $("#coin").text(dollar + player.coin);
        }
    });
    $("#coin").text(dollar + player.coin);

    $("#tetris").click(function(e) {
        e.preventDefault();
        sessionStorage.setItem('coin', player.coin);
        location.href = 'index.html';
    });
});


function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 125;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = 'bold 12px sans-serif';
        for (var i = 0; i < 12; i++) {
            var angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "white";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = restaraunts[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        //Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel(player);
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel(player) {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 60px sans-serif';
    var text = restaraunts[index];

    if (restaraunts[index] == 1 || restaraunts[index] == 3 || restaraunts[index] == 5 || restaraunts[index] == 7 || restaraunts[index] == 9 || restaraunts[index] == 11) {
        ctx.fillStyle = "red";

    } else {
        if (player.flag === 1) {
            //沒錢的狀況
        } else {
            var balance = player.coin + (player.bet + player.bet);
            player.coin = balance;
            $("#coin").text(dollar + player.coin);
            ctx.fillStyle = "blue";
        }
    }

    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
}


function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}



drawRouletteWheel();