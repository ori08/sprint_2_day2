'use strict'

var gGallry
var galleryType =
{
    sport: ['Soccer', 'Basketball', 'Tenis', 'Hoki', 'Running', 'Swiming'],
    food: ['Pizza', 'Burger', 'Salat', 'Meat', 'Chips', 'Fish'],
    coins: ['Shekel', 'USD', 'Earo', 'Cent', 'Crypto', 'Bitcoins'],
    politician: ['Trump', 'Bibi', 'Benet', 'Lapid', 'Obama', 'Potin']
}
function createGallery() {
    if (loadFromStorage("gallery")) {
        gGallry = loadFromStorage("gallery")
        return
    }

    else gGallry = []

    for (let i = 0; i < 18; i++) {
        var randomIdx = getRandomIntInclusive(0, 3)
        var type
        var title
        var term1
        var term2
        var value1 = getRandomIntInclusive(1, 99)
        var value2 = 100 - value1
        var randomNum = getRandomIntInclusive(0, 2)
        var theme

        if (randomNum === 0) theme = 'circle'
        else if (randomNum === 1) theme = 'rect'
        else theme = "diagram"

        switch (randomIdx) {
            case 0: {
                type = 'sport'
                title = 'Favorite Sport'
                term1 = galleryType.sport[getRandomIntInclusive(0, 5)]
                term2 = galleryType.sport[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.sport[getRandomIntInclusive(0, 5)]
                }
            }
                break
            case 1: {
                type = 'food'
                title = 'Favorite Food'
                term1 = galleryType.food[getRandomIntInclusive(0, 5)]
                term2 = galleryType.food[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.food[getRandomIntInclusive(0, 5)]
                }
            }
                break
            case 2: {
                type = 'coins'
                title = 'Most used coins'
                term1 = galleryType.coins[getRandomIntInclusive(0, 5)]
                term2 = galleryType.coins[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.coins[getRandomIntInclusive(0, 5)]
                }
            }
                break
            case 3: {
                type = 'politician'
                title = 'Most loved politician'
                term1 = galleryType.politician[getRandomIntInclusive(0, 5)]
                term2 = galleryType.politician[getRandomIntInclusive(0, 5)]
                while (term1 === term2) {
                    term2 = galleryType.politician[getRandomIntInclusive(0, 5)]
                }
            }
                break

        }

        gGallry.push(
            {
                id: makeId(6),
                type: type,
                theme: theme,
                title: {
                    Name: title,
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
                        label: term1,
                        value: value1,
                        percentage: 50,
                        color: 'rgb(207, 26, 20)',
                        brightColor: 'rgb(245, 103, 68)',
                        position: gCanvas.width / 3,
                        textPosition: { x: null, y: null },
                        startPosition: null
                    },
                    {
                        label: term2,
                        value: value2,
                        color: 'rgb(30, 94, 11)',
                        brightColor: 'rgb(75, 150, 52)',
                        percentage: 50,
                        position: (gCanvas.width / 3) * 2,
                        textPosition: { x: null, y: null },
                        startPosition: null
                    }
                    ]
            })
    }
    saveToStorage("gallery", gGallry)
}

function renderGallery(gallery = gGallry) {
    var strHtml = ''
    var elGallery = document.querySelector('.gallery-context')
    var idx = 0
    gallery.forEach(graph => {

        gChart = graph
        caculateStatistcs()
        renderChart()
        var imageUrl = gCanvas.toDataURL("image/jpg");
        strHtml += `<img class="graph-img" onclick="loadFromGallry('${graph.id}')" src="${imageUrl}">`
        idx++
    })
    elGallery.innerHTML = strHtml
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function loadFromGallry(id) {
    console.log(id);
    openEditor()
    gChart = getGraphById(id)
    renderChart()
    renderEditor()

}


function onSearch(text) {
    var textFromUser = text.value
    var graphToDisplay = searchBook(textFromUser)
    renderGallery(graphToDisplay)
}

function searchBook(text) {
    var booksToDisplay = []
    gGallry.map(book => {
        if (book.type.includes(text)) booksToDisplay.push(book)
    }
    )
    return booksToDisplay
}


function makeId(length = 6) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '0123456789'

    let txt = letters.charAt(Math.floor(Math.random() * letters.length))

    for (let i = 0; i < length - 1; i++) {
        txt += digits.charAt(Math.floor(Math.random() * digits.length))
    }
    return txt
}
