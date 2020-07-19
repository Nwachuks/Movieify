const container = document.querySelector('.container');
const allSeats= document.querySelectorAll('.row .seat');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const ticketNumber = document.getElementById('ticketNumber');
const total = document.getElementById('total');

const movieSelected = document.getElementById('movie');
let ticketPrice = +movieSelected.value;

populateUI();
updateSelectedCount();

// Seat selected event
container.addEventListener('click', (e) => {
    // Highlight picked seats
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
});

// Movie selected event
movieSelected.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Update total and count
function updateSelectedCount() {
    // Get all selected seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // Get the index of each selected seat from list of all seats and return their seat numbers
    const selectedSeatsNumbers = [...selectedSeats].map((seat) => {
        return [...allSeats].indexOf(seat) + 1;
    });
    localStorage.setItem('selectedSeatsNumbers', JSON.stringify(selectedSeatsNumbers));
    // console.log(selectedSeatsNumbers);
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    ticketNumber.innerText = selectedSeatsNumbers.join(", ");
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const selectedSeatsNumbers = JSON.parse(localStorage.getItem('selectedSeatsNumbers')).map((index) => {
        return index - 1;
    });
    if (selectedSeatsNumbers !== null && selectedSeatsNumbers.length > 0) {
        allSeats.forEach((seat, index) => {
            if (selectedSeatsNumbers.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !==  null) {
        movieSelected.selectedIndex = selectedMovieIndex;
    }
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if (selectedMoviePrice !== null) {
        movieSelected.value = selectedMoviePrice;
        ticketPrice = +movieSelected.value;
    }
    console.log(movieSelected.value);
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
