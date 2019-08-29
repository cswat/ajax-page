const gallery = document.getElementById('gallery')
const userInfoCard = document.getElementsByClassName('card')

//checks the status of a fetch request and returns a rejection/resolution
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//fetch request method
function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(data => data.json())
    .catch(e => {
        console.log(Error('Problem retrieving data. Check your network connection.', error))
    })
}

//call to API
fetchData('https://randomuser.me/api/?results=12')
    .then(data => generateUsers(data.results))

//generates the div for the employee info
function generateUsers(data) {
    for(i=0; i<data.length; i++) {
        const cardDiv = document.createElement('DIV')
        cardDiv.innerHTML = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${data[i].name.first + ' ' + data[i].name.last}</h3>
                    <p class="card-text">${data[i].email}</p>
                    <p class="card-text cap">${data[i].location.city + ', ' + data[i].location.state}</p>
                </div>
            </div>
            `
        gallery.appendChild(cardDiv)
    }
}

//element creation DRY
function addElement(className, type) {
    const element = document.createElement(type)
    element.className = className 
    return element
}

//build the modal using fetch data
function generateModal(data) {
    modalContainer = addElement('modal-container', 'DIV')
    modalContainer.innerHTML = 
    `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.results.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.results.name.first} ${data.results.name.last}</h3>
                <p class="modal-text">${data.results.email}</p>
                <p class="modal-text cap">${data.results.location.city}</p>
                <hr>
                <p class="modal-text">${data.results.phone}</p>
                <p class="modal-text">${data.results.location.street}, ${data.results.location.state}, ${data.results.location.postcode}</p>
                <p class="modal-text">Birthday: ${data.results.dob}</p>
            </div>
        </div>
    `
    document.querySelector('body').appendChild(modalContainer)
}

//card event listener to generate modal
gallery.addEventListener('click', e => {
    generateModal(data)
})