/* filter based on search */

function filterRestaurants(searchPhrase) {
    const allRestaurants = document.querySelectorAll('.restaurants a');
    allRestaurants.forEach(restaurant => {
        const name = restaurant.querySelector('.name-and-rating h4').textContent.toLowerCase();
        const description = restaurant.querySelector('p').textContent.toLowerCase();
        if (name.includes(searchPhrase.toLowerCase()) || description.includes(searchPhrase.toLowerCase())) {
            restaurant.style.display = 'block';
        } else {
            restaurant.style.display = 'none';
        }
    });
}

// Event listener for search input changes
const inputSearch = document.querySelector('.input-search');
inputSearch.addEventListener('input', function() {
    const searchPhrase = this.value.trim();
    filterRestaurants(searchPhrase);
});

// Event listener for search button click (optional)
const btnSearch = document.querySelector('.btn-search');
btnSearch.addEventListener('click', function() {
    const searchPhrase = inputSearch.value.trim();
    filterRestaurants(searchPhrase);
});


/* filter based on buttons */

function arrangeAlphabetically() {
    const restaurantsContainer = document.getElementById('restaurants');
    const restaurants = Array.from(restaurantsContainer.querySelectorAll('a'));
    
    restaurants.sort((a, b) => {
        const nameA = a.querySelector('.name-and-rating h4').textContent.toLowerCase();
        const nameB = b.querySelector('.name-and-rating h4').textContent.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    
    restaurantsContainer.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        restaurantsContainer.appendChild(restaurant);
    });
}

const alphabeticalButton = document.querySelector('.alphabetical');
alphabeticalButton.addEventListener('click', function() {
    this.classList.toggle('active');
    
    if (this.classList.contains('active')) {
        arrangeAlphabetically();
    } 
});