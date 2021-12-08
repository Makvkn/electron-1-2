let tempBlock = document.querySelector('#temp')
let cityBlock = document.querySelector('#city')
let local_time = document.querySelector('#local-date')
let searchInp = document.querySelector('.search')
let local_date = document.querySelector('#data')

setInterval(() => {
    let date = new Date;
    local_time.textContent = `Local time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}, 10)

let city = 'Voronezh'

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        let value = searchInp.value;
        if(!value) return false;
        city = value;
        init()
        searchInp.value = ''
    }
})

function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d982b206b7125a363d94918d08ebf560`)
        .then((resp) => {return resp.json()})
        .then((data) => {


            tempBlock.textContent = `${temperature()}°`

            cityBlock.textContent = `City: ${data.name}`

            console.log()

            function temperature() {
                let getTemp = data.main.temp
                let tempC = Math.floor(getTemp) - 273
                return tempC
            }

            let date = new Date;

            local_date.textContent = `local date : ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        })
        .catch(() => {
            city = 'Voronezh';
            init()
            searchInp.value = ''
        })
}

init()

setInterval(() => {
    init()
}, 10000) //Обновляет инфу каждые 10секунд


