//http://api.open-notify.org/iss-now.json

function init() {
    function fetchData() {
        let url = 'http://api.open-notify.org/iss-now.json'
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => getData(data))
            .catch((error) => console.error(error))

        setTimeout(fetchData, 5000)
    }

    function getData(data) {
        let issPosition = document.querySelector('.iss')
        let longitudeText = document.querySelector('.longitude')
        let latitudeText = document.querySelector('.latitude')
        //-180 west / +180 east
        let long = data.iss_position.longitude
        // -90 south / +90 north
        let lat = data.iss_position.latitude
        longitudeText.textContent = long
        latitudeText.textContent = lat
        let longFragment = 50 / 180
        let latFragment = 50 / 90
        let longPos = long * longFragment
        let latPos = lat * latFragment

        //  console.log(long * longFragment)
        issPosition.style.left = `calc(${longPos}% + 50%)`
        issPosition.style.bottom = `calc(${latPos}% + 50%)`
    }

    function fetchPeople() {
        let urlPeople = 'http://api.open-notify.org/astros.json'
        fetch(urlPeople)
            .then((resp) => resp.json())
            .then((data) => writePeople(data))
            .catch((error) => console.error(error))
    }

    function writePeople(data) {
        let people = document.querySelector('.people')
        people.textContent = data.number
        console.log()
        let list = document.querySelector('ul')
        data.people.map((a) => {
            let name = document.createElement('li')
            let nameText = document.createTextNode(a.name)
            name.appendChild(nameText)
            list.appendChild(name)
        })
    }
    // CALL THE FETCHES
    fetchData()
    fetchPeople()
}
window.addEventListener('load', init)
