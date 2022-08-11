"use strict"

var gChart

function createChart() {
    gChart = ({
        type: 'food',
        theme: 'circle',
        title: {
            Name: 'Favorite Food',
            posY: 50
        },
        style: {
            font: 'Arial',
            fontSize: '45px',
            backgroundColor: 'transparent',
        },
        valueType: 'percent/value',
        terms:
            [{
                label: 'Pizza',
                value: 50,
                percentage: 50,
                color: 'rgb(207, 26, 20)',
                brightColor: 'rgb(245, 103, 68)',
                position: gCanvas.width / 3,
                textPosition: { x: null, y: null, width: null, height: null },
                startPosition: null
            },
            {
                label: 'Burger',
                value: 50,
                color: 'rgb(30, 94, 11)',
                brightColor: 'rgb(75, 150, 52)',
                percentage: 50,
                position: (gCanvas.width / 3) * 2,
                textPosition: { x: null, y: null, width: null, height: null },
                startPosition: null
            }
            ]
    })
}

function getTerms() {
    return gChart.terms
}

function getTitle() {
    return gChart.title
}

function getGraphById(id) {
    return gGallry.find(chart => chart.id === id)
}

function removeTerm(idx) {
    var terms = getTerms()
    terms.splice(idx, 1)
    renderChart()
    renderEditor()

}

function addTerm() {
    var terms = getTerms()
    if (terms.length >= 4) return
    if (gChart.theme != 'circle' && terms.length >= 3) return
    terms.push({
        label: '',
        value: 50,
        percentage: 50,
        color: 'rgb(36, 0, 167)',
        brightColor: 'rgb(87, 41, 255)',
        position: (gCanvas.width / 3) * 2.5,
        textPosition: { x: null, y: null },
        startPosition: null
    })
}

function addTitle(ev) {
    var text = ev.value
    var title = getTitle()
    title.Name = text
}

function setColor(color, idx) {
    var terms = getTerms()

    switch (color) {
        case 'red': {
            terms[idx].color = 'rgb(207, 26, 20)'
            terms[idx].brightColor = 'rgb(245, 103, 68)'
        }
            break
        case 'blue': {
            {
                terms[idx].color = 'rgb(36, 0, 167)'
                terms[idx].brightColor = 'rgb(87, 41, 255)'
            }
        }
            break
        case 'green': {
            {
                terms[idx].color = 'rgb(30, 94, 11)'
                terms[idx].brightColor = 'rgb(75, 150, 52)'
            }
        }
            break
    }

    renderChart()
}

function changeValue(ev, idx) {
    var terms = getTerms()
    if (isNaN(ev.value) || (parseInt(ev.value) > 100)) return
    terms[idx].value = ev.value
}

function setPostion() {
    var terms = getTerms()
    var chart_length = terms.length

    if (gChart.theme === 'circle') {
        var idx = 1
        terms.forEach(chart => {
            chart.position = (gCanvas.width / (chart_length + 1)) * idx
            chart.textPosition.x = (gCanvas.width / (chart_length + 1)) * idx
            idx++
        })
    }

    else if (gChart.theme === 'diagram') {
        var idx = 0
        terms.forEach(chart => {
            chart.position = (gCanvas.width / (chart_length + 1)) * idx
            chart.textPosition.x = ((gCanvas.width / (chart_length + 1)) * idx) + 40
            idx++
        })

    }



    else {
        var idx = 1
        var endPostion
        var firstDiagramWidth
        terms.forEach(diagram => {
            if (idx === 1) {
                diagram.startPostion = 0
                diagram.position = ((canvas_width / 100) * parseInt(diagram.percentage
                ))
                diagram.textPosition.x = diagram.position / 2
                endPostion = diagram.position
                firstDiagramWidth = diagram.position
            }
            else if (idx === terms.length) {
                diagram.startPostion = canvas_width - (canvas_width / 100) * diagram.percentage

                diagram.position = ((canvas_width / 100) * diagram.percentage)
                diagram.textPosition.x = diagram.startPostion + (diagram.position / 2)
            }

            else {
                diagram.startPostion = endPostion
                diagram.position = (canvas_width / 100) * diagram.percentage
                diagram.textPosition.x = diagram.startPostion + (diagram.position / 2)
            }
            idx++
        })

    }


}