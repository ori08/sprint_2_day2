"use strict"


var storedGraph = []
var image = null
var showMode = 'prcentage'
function init() {
    createCanvas()
    if (loadFromStorage("graph")) {
        storedGraph = loadFromStorage("graph")
        renderGraphImg()
    }
    createGallery()
    renderGallery()
    createChart()
    renderChart()
    renderEditor()

}

// Function group that change the values in the graph

function onRemoveTerm(idx) {
    removeTerm(idx)
}

function onChangeValue(ev, idx) {
    changeValue(ev, idx)
    caculateStatistcs()
    renderChart()
}

function onChangeTerm(ev, idx) {
    var terms = getTerms()
    terms[idx].label = ev.value
    var text = terms[idx].label
    var posX = terms[idx].position
    var posY = 270
    drawText(text, posX, posY)
    renderChart()
}

function onAddTitle(ev) {
    addTitle(ev)
    renderChart()
}

function onAddTerm() {
    addTerm()
    renderChart()
    renderEditor()
}

function caculateStatistcs() {
    var terms = getTerms()
    var sum = 0
    terms.forEach(term => {
        sum += parseInt(term.value)
    })
    terms.forEach(term => {
        term.percentage = Math.round((term.value / sum) * 100)
    })
}

// Function group that render in the Html


function renderChart() {

    var terms = getTerms()
    var title = getTitle()
    setPostion()
    gCtx.clearRect(0, 0, canvas_width, canvas_height)

    var idx = 1
    terms.forEach(chart => {

        if (gChart.theme === 'circle') drawArcPlusLine(chart)
        else if (gChart.theme === 'diagram') {
            drawRectDiagrm(chart)
        }
        else {
            drawRectingle(chart)
        }
        if (showMode === 'prcentage') var text = `${chart.percentage}%`
        else var text = `${chart.value}`
        var posY = 275
        // drawText(title.Name, canvas_height, title.posY)
        drawText(text, chart.textPosition.x, posY, chart.color, chart.textPosition)
        drawText(chart.label, chart.textPosition.x, posY = 290, chart.color, chart.textPosition)
    })
}

function renderEditor() {
    var terms = getTerms()

    var strHtml = ""
    var elTerms = document.querySelector('.terms')
    var chartIdx = 0
    terms.forEach(chart => {
        if (chart.isColorBtnPressed) {
            strHtml += `  
            <div class="term">
            <div class="colors-modal term-input">
                <button class="btn red" onclick="setColor('red',${chartIdx})"></button>
                <button class="btn blue" onclick="setColor('blue',${chartIdx})"></button>
                <button class="btn green" onclick="setColor('green',${chartIdx})"></button>
                <button class="btn-close" onclick="closeModal(${chartIdx})">x</button>
            </div>
        </div>`
        }

        else {

            var stringNum = ''
            switch (chartIdx) {
                case 0: stringNum = 'ONE'
                    break
                case 1: stringNum = "TWO"
                    break
                case 2: stringNum = 'THREE'
                    break
                case 3: stringNum = "FOUR"
                    break
            }

            strHtml += `       
        <div class="term">
         
          <div class="term-input">
          <button class="color-btn" onclick="openModal(${chartIdx})"></button>
         
          <h2>TERM ${stringNum}</h2>
        <input type="text" onkeyup=" onChangeTerm(this,${chartIdx})" data-trans="Search" placeholder="${chart.label}">
        <input type="text" onkeyup=" onChangeValue(this,${chartIdx})" data-trans="Search" placeholder="Value">
 `
            if (terms.length > 2)
                strHtml += `<button class="btn-close" onclick="onRemoveTerm(${chartIdx})">x</button>`
            strHtml += `</div></div>`

            chartIdx++
        }
    })

    strHtml += `<button class="btn-add" onclick="onAddTerm()">+ ADD TERM</button>`
    elTerms.innerHTML = strHtml
}



// Function group that hide and show elements in the html 

function openModal(idx) {
    var terms = getTerms()
    terms[idx].isColorBtnPressed = true
    renderEditor()
}

function closeModal(idx) {
    var terms = getTerms()
    terms[idx].isColorBtnPressed = false
    renderEditor()
}

function openEditor(style) {
    init()
    gChart.theme = style
    var elMain = document.querySelector('.main-container').style.display = "none"
    var elPersonalGallery = document.querySelector('.my-graph-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "none"
    var elEditor = document.querySelector('.main-container-editor').style.display = "flex"
    renderChart()
}

function closeEditor() {
    var elMain = document.querySelector('.main-container').style.display = "flex"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
}

function openGraphGallery() {
    var elMain = document.querySelector('.my-graph-container').style.display = "flex"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
    var elHomePage = document.querySelector('.main-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "none"

}

function openGallery() {
    var elPersonalGraph = document.querySelector('.my-graph-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "flex"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
    var elHomePage = document.querySelector('.main-container').style.display = "none"

}

function openHomePage() {
    var elPersonalGraph = document.querySelector('.my-graph-container').style.display = "none"
    var elGallery = document.querySelector('.main-container-gallery').style.display = "none"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
    var elHomePage = document.querySelector('.main-container').style.display = "flex"

}

//Function Group that save and loaf from local storage 

function saveGraph() {
    var imageUrl = gCanvas.toDataURL("image/jpg");
    var graphObejct = { graph: gChart, image: imageUrl }
    saveToStorage("obejct", graphObejct)
    storedGraph.push(loadFromStorage('obejct'))
    saveToStorage("graph", storedGraph)
    renderGraphImg()
}

function renderGraphImg() {
    console.log(storedGraph);
    var strHtml = ''
    var idx = 0
    storedGraph.forEach(graph => {
        strHtml += `<img class="graph-img" onclick="loadGraph(${idx})" src="${graph.image}">`
        idx++
    })
    var elMyGraph = document.querySelector('.my-graph-container').innerHTML = strHtml

}

function loadGraph(idx) {
    openEditor(storedGraph[idx].graph.theme)
    gChart = storedGraph[idx].graph
    renderChart()
    renderEditor()

}





function showPrcentage() {
    showMode = 'prcentage'
    renderChart()

}

function showNumbers() {
    showMode = 'numbers'
    renderChart()

}



