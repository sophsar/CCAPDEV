/* leaving a review */

document.addEventListener('DOMContentLoaded', function() {
    // Select the review preview container and the preview box
    const previewContainer = document.querySelector('.review-preview');
    const previewBox = document.querySelector('.wrapper');
  
    // Select all star elements and the rating value input
    const allStar = document.querySelectorAll('.rating1 .star');
    const ratingValue = document.querySelector('.rating1 input');
    const rating2 = document.getElementById('rating2');
  
    // Add click event listeners to each star element
    allStar.forEach((item, idx) => {
        item.addEventListener('click', function () {
            ratingValue.value = idx + 1; // Set the rating value based on the index
  
            // Update the visual representation of stars
            allStar.forEach((star, i) => {
                star.classList.toggle('bxs-star', i <= idx);
                star.classList.toggle('bx-star', i > idx);
                star.classList.toggle('active', i <= idx);
            });
  
            // Update rating2 span
            rating2.textContent = idx + 1;
        });
    });
  
    // Select all review buttons and add click event listener to each
    document.querySelectorAll('.review-container .review-button').forEach(review => {
        review.onclick = () => {
            previewContainer.style.display = 'flex'; // Show the review preview container
            const name = review.getAttribute('data-name'); // Get the data-name attribute value
  
            // Check if the preview box matches the clicked review button
            if (previewBox.getAttribute('data-target') === name) {
                previewBox.classList.add('active'); // Add the active class to the preview box
            }
        };
    });
  
    const stars = document.querySelectorAll(".rating1");
    const reviewText = document.getElementById("review");
    const submitBtn = document.getElementById("submit");
    const reviewsContainer = document.getElementById("all-reviews");
    const cancelBtn = document.querySelector(".cancel"); // Select the cancel button
  
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));
  
        // Remove all existing classes from stars
        stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five"));
  
        // Add the appropriate class to each star based on the selected star's value
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
        const currentDate = new Date(); // Get the current date and time
        const formattedDate = currentDate.toLocaleString(); // Format the date and time
        
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
                    <p>${review}</p>
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

        // Event delegation to make like buttons work
        document.querySelectorAll('.like-button').forEach(function(button) {
            button.addEventListener('click', function() {
                this.classList.toggle('is-active');
            });
        });
    
        // Reset styles after submitting
        reviewText.value = "";
        ratingValue.value = ""; // Reset rating value
        rating2.textContent = "0"; // Reset displayed rating
        allStar.forEach((star) => {
            star.classList.remove("bxs-star"); // Reset star appearance
            star.classList.add("bx-star");
        });

        // Reset file submission
        photoUpload.value = ""; // Clear the value of the file input
        
        previewContainer.style.display = 'none';
    }
});
    
    // Event listener for the Cancel button
    cancelBtn.addEventListener("click", () => {
        // Reset styles after submitting
        reviewText.value = "";
        ratingValue.value = ""; // Reset rating value
        rating2.textContent = "0"; // Reset displayed rating
        allStar.forEach((star) => {
            star.classList.remove("bxs-star"); // Reset star appearance
            star.classList.add("bx-star");
        });
        previewContainer.style.display = 'none'; // Hide the review preview container
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

/* searching for a review */

// Function to filter reviews based on search phrase
function filterReviews(searchPhrase) {
    const allReviews = document.querySelectorAll('.all-reviews');
    allReviews.forEach(review => {
        const reviewText = review.textContent.toLowerCase();
        if (reviewText.includes(searchPhrase.toLowerCase())) {
            review.style.display = 'block';
        } else {
            review.style.display = 'none';
        }
    });
}

// Event listener for search input changes
const inputSearch = document.querySelector('.input-search');
inputSearch.addEventListener('input', function() {
    const searchPhrase = this.value.trim();
    filterReviews(searchPhrase);
});

// Event listener for search button click (optional)
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

/* review replys */

const replyBtns = document.querySelectorAll(".reply-button");
let publishBtns = document.querySelectorAll(".publish");

replyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        // select the parent div closest to reply button pressed
        let reviewReply = event.target.closest('.review1').parentNode;

        // create reply container div
        let replyContainer = document.createElement("div");
        replyContainer.className = "reply";

        // create user div with pfp and username
        let user = document.createElement("div");
        let profilePic = document.createElement("img");
        let userName = document.createElement("h4");

        profilePic.src = "images/pfp.png";
        user.className = "user";
        userName.textContent = "username";
        user.appendChild(profilePic);
        user.appendChild(userName);

        //create bottom div with input, publish, and cancel
        let bottomDiv = document.createElement("div");
        bottomDiv.className = "bottom";
        let inputPane = document.createElement("input");
        inputPane.classList.add("content");
        inputPane.classList.add("editable");
        let publishBtn = document.createElement("button");
        let cancelBtn = document.createElement("button");
        publishBtn.className = "publish";
        cancelBtn.className = "cancel";
        publishBtn.innerHTML = "Publish";
        cancelBtn.innerHTML = "Cancel";

        bottomDiv.appendChild(inputPane);
        bottomDiv.appendChild(publishBtn);
        bottomDiv.appendChild(cancelBtn);

        // Append user to replyContainer
        replyContainer.appendChild(user);

        // Append bottomDiv to reply
        replyContainer.appendChild(bottomDiv);

        // Append replyContainer to reviewReply
        reviewReply.appendChild(replyContainer);

        publishBtns = document.querySelectorAll(".publish");

        // Add event listener to the new publish button
        publishBtn.addEventListener("click", (event) => {
            let bottomDiv = event.target.closest(".bottom");
            let contentPane = bottomDiv.querySelector(".content");
            let cancelBtn = bottomDiv.querySelector(".cancel");

            // If contentPane is an input element
            if (contentPane.tagName === 'INPUT') {
                contentPane.readOnly = true; // Make it readonly
            }

            contentPane.classList.remove('editable'); // Remove current classes
            contentPane.classList.add('published'); // Add 'published' class

            cancelBtn.remove();
            event.target.remove();
        });

        // Add event listener to the new cancel button
        cancelBtn.addEventListener("click", (event) => {
            replyContainer.remove();
        });
    });
});

/* populating resto review info */

document.addEventListener('DOMContentLoaded', function() {
    // Function to populate restaurant info
    function populateRestaurantInfo(name, location, phone, hours, description, image) {
        // Select the restaurant info container
        const infoContainer = document.getElementById('restaurantInfo');
        
        // Check if the info container exists
        if (!infoContainer) {
            console.error("Restaurant info container not found");
            return; // Exit the function if info container is not found
        }

        // Populate the restaurant info
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

    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const location = urlParams.get('location');
    const phone = urlParams.get('phone');
    const hours = urlParams.get('hours');
    const description = urlParams.get('description');
    const image = urlParams.get('image'); // New line to get image filename

    // Populate restaurant info
    populateRestaurantInfo(name, location, phone, hours, description, image);
});

