
/* leaving a review */

document.addEventListener('DOMContentLoaded', function() {
    const previewContainer = document.querySelector('.review-preview');
    const previewBox = document.querySelector('.wrapper');
  
    const allStar = document.querySelectorAll('.rating1 .star');
    const ratingValue = document.querySelector('.rating1 input');
    const rating2 = document.getElementById('rating2');
  
    allStar.forEach((item, idx) => {
        item.addEventListener('click', function () {
            ratingValue.value = idx + 1;
  
            allStar.forEach((star, i) => {
                star.classList.toggle('bxs-star', i <= idx);
                star.classList.toggle('bx-star', i > idx);
                star.classList.toggle('active', i <= idx);
            });
  
            rating2.textContent = idx + 1;
        });
    });
  
    document.querySelectorAll('.review-container .review-button').forEach(review => {
        review.onclick = () => {
            previewContainer.style.display = 'flex'; 
            const name = review.getAttribute('data-name');
  
            if (previewBox.getAttribute('data-target') === name) {
                previewBox.classList.add('active'); 
            }
        };
    });
  
    const stars = document.querySelectorAll(".rating1");
    const reviewText = document.getElementById("review");
    const submitBtn = document.getElementById("submit");
    const reviewsContainer = document.getElementById("all-reviews");
    const cancelBtn = document.querySelector(".cancel");
  
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));
  
        stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five"));
  
        stars.forEach((s, index) => {
          if (index < value) {
            s.classList.add(getStarColorClass(value));
          }
        });
      });
    });
  

submitBtn.addEventListener("click", () => {
    const review = reviewText.value;
    const userRating = parseInt(ratingValue.value);
    const photoUpload = document.getElementById("photo-upload");
    
    if (!userRating || !review) {
        alert("Please select a rating and provide a review before submitting.");
        return;
    }
    
    if (userRating > 0) {
        const currentDate = new Date(); 
        const formattedDate = currentDate.toLocaleString(); 
        
        let photoHTML = '';
        if (photoUpload.files.length > 0) {
            const photo = photoUpload.files[0];
            const photoURL = URL.createObjectURL(photo);
            photoHTML = `<img src="${photoURL}" alt="User Photo">`;
        }

        const reviewElement = document.createElement("div");
        reviewElement.classList.add("all-reviews");
        reviewElement.innerHTML = `
            <div class="un-review">
                <div class="top-part">
                    <div class="un-rating">
                        <div class="user">
                            <img src="images/pfp.png">
                            <h4>username</h4>
                        </div>
                    </div>
                </div>

                <div class="un-review1">
                    <p><strong>Rating: <i class="fa-solid fa-star" style="color: #FFBD13;"></i> ${userRating}/5</strong></p>
                    <p class="rev-content">${review}</p>
                    <p><b>Review sent on: </b>${formattedDate}</p>
                    ${photoHTML}
                </div>

                <div class="buttons">
                    <div class="like___btn">
                        <div class="wrapper1">
                            <a href="javascript:void(0);" class="like-button">
                              <i class="fa-regular fa-thumbs-up"></i>
                              <i class="fa-solid fa-thumbs-up"></i>
                              <span class="like-overlay"></span>
                            </a>
                        </div>
                    </div>
    
                    <div class="like___btn">
                        <div class="wrapper1">
                            <a href="javascript:void(0);" class="like-button">
                              <i class="fa-regular fa-thumbs-down"></i>
                              <i class="fa-solid fa-thumbs-down"></i>
                              <span class="like-overlay"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(reviewElement);

        document.querySelectorAll('.like-button').forEach(function(button) {
            button.addEventListener('click', function() {
                this.classList.toggle('is-active');
            });
        });
    
        reviewText.value = "";
        ratingValue.value = ""; 
        rating2.textContent = "0";
        allStar.forEach((star) => {
            star.classList.remove("bxs-star"); 
            star.classList.add("bx-star");
        });

        photoUpload.value = ""; 
        
        previewContainer.style.display = 'none';
    }
});
    
    cancelBtn.addEventListener("click", () => {
        reviewText.value = "";
        ratingValue.value = ""; 
        rating2.textContent = "0"; 
        allStar.forEach((star) => {
            star.classList.remove("bxs-star"); 
            star.classList.add("bx-star");
        });
        previewContainer.style.display = 'none'; 
    });    
  
    function getStarColorClass(value) {
      switch (value) {
        case 1:
          return "one";
        case 2:
          return "two";
        case 3:
          return "three";
        case 4:
          return "four";
        case 5:
          return "five";
        default:
          return "";
      }
    }
  });


/* search for review */

function filterReviews(searchPhrase) {
    const allReviews = document.querySelectorAll('.un-review');
    allReviews.forEach(review => {
        const reviewText = review.querySelector('.rev-content').textContent.toLowerCase();
        if (reviewText.includes(searchPhrase.toLowerCase())) {
            review.style.display = 'block';
        } else {
            review.style.display = 'none';
        }
    });
}

const inputSearch = document.querySelector('.input-search');
inputSearch.addEventListener('input', function() {
    const searchPhrase = this.value.trim();
    filterReviews(searchPhrase);
});

const btnSearch = document.querySelector('.btn-search');
btnSearch.addEventListener('click', function() {
    const searchPhrase = inputSearch.value.trim();
    filterReviews(searchPhrase);
});

/* buttons */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.like-button').forEach(function(button) {
      button.addEventListener('click', function() {
          this.classList.toggle('is-active');
      });
  });
});

/* populating resto review info */

document.addEventListener('DOMContentLoaded', function() {
    function populateRestaurantInfo(name, location, phone, hours, description, image) {
        const infoContainer = document.getElementById('restaurantInfo');
        
        if (!infoContainer) {
            console.error("Restaurant info container not found");
            return; 
        }

        infoContainer.innerHTML = `
            <div class="resto-name-n-logo">
                <img src="images/${image}">
                <h1>${name}</h1>
            </div>
            <div class="location">        
                <i class="fa-solid fa-location-dot"></i>
                <p>${location}</p>
            </div>
            <div class="phone-no">
                <i class="fa-solid fa-mobile-screen"></i>
                <p>${phone}</p>
            </div>
            <div class="resto-hours">
                <i class="fa-regular fa-clock"></i>
                <p>${hours}</p>
            </div>
            <div class="description">
                <i class="fa-solid fa-circle-info"></i>
                <p>${description}</p>
            </div>
        `;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const location = urlParams.get('location');
    const phone = urlParams.get('phone');
    const hours = urlParams.get('hours');
    const description = urlParams.get('description');
    const image = urlParams.get('image'); 

    populateRestaurantInfo(name, location, phone, hours, description, image);
});