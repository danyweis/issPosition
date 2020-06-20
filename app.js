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
    fetchData()
    let long = ''
    // -180west +180est

    let lat = ''
    // -90sud +90nord

    function getData(data) {
        let issPosition = document.querySelector('.iss')
        long = data.iss_position.longitude
        lat = data.iss_position.latitude

        let longFragment = 50 / 180
        let latFragment = 50 / 90
        let longPos = long * longFragment
        let latPos = lat * latFragment

        console.log(long * longFragment)
        issPosition.style.left = `calc(${longPos}% + 50%)`
        issPosition.style.bottom = `calc(${latPos}% + 50%)`
    }
}
window.addEventListener('load', init)
