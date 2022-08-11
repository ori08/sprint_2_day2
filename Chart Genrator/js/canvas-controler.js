'use strict'

var gCanvas
var gCtx
var canvas_width
var canvas_height

function createCanvas() {
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    canvas_width = 426
    canvas_height = 320
}

function drawText(text, posX, posY, fontsize = 15, color) {
    gCtx.lineWidth = 0.5
    gCtx.font = `${fontsize}px Arial`
    if (gChart.theme != 'circle') {
        gCtx.fillStyle = "black"
        gCtx.strokeStyle = "black"
    }
    else {
        gCtx.fillStyle = color
        gCtx.strokeStyle = color
    }

    var messureTxt = gCtx.measureText(text)
    if (posX === canvas_height) posX = posX / 2
    else posX -= messureTxt.width / 2


    gCtx.fillText(text, posX, posY)
    gCtx.strokeText(text, posX, posY)

}

function drawRectingle(chart) {

    gCtx.beginPath();
    gCtx.rect(chart.startPostion, 0, chart.position, canvas_height)
    gCtx.stroke();
    gCtx.fillStyle = chart.color;
    gCtx.fill();
}

function drawArcPlusLine(chart) {
    gCtx.beginPath();
    if (showMode === 'prcentage') gCtx.arc(chart.position, 150, chart.percentage, 0, 2 * Math.PI);
    else gCtx.arc(chart.position, 150, chart.value, 0, 2 * Math.PI);
    gCtx.draw
    gCtx.stroke();
    gCtx.fillStyle = chart.color;
    gCtx.fill();
    gCtx.beginPath();
    gCtx.moveTo(chart.position, 150);
    gCtx.lineTo(chart.position, 260);
    gCtx.lineWidth = 3
    gCtx.strokeStyle = chart.brightColor
    gCtx.stroke();

}

function drawRectDiagrm(chart) {
    if (showMode === 'prcentage') var height = (canvas_height / 100) * chart.percentage
    else var height = (canvas_height / 100) * chart.value
    gCtx.beginPath();
    gCtx.rect(chart.position, canvas_height - height, 80, height)
    gCtx.stroke();
    gCtx.fillStyle = chart.color;
    gCtx.fill();

}

function downloadGraph(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}




