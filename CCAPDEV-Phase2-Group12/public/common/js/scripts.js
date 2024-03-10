/* header */

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');

    console.log(header);

    if (header) {
        document.addEventListener('scroll', function () {
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    } else {
        console.error('Header element not found.');
    }
}); 

/* from scripts2.js*/

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

document.addEventListener('DOMContentLoaded', function () {
    const inputSearch = document.querySelector('.input-search');
    const btnSearch = document.querySelector('.btn-search');

    if (inputSearch && btnSearch) {
        inputSearch.addEventListener('input', function() {
            const searchPhrase = this.value.trim();
            filterRestaurants(searchPhrase);
        });

        btnSearch.addEventListener('click', function() {
            const searchPhrase = inputSearch.value.trim();
            filterRestaurants(searchPhrase);
        });
    } else {
        console.error('Input search or button search element not found.');
    }
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

document.addEventListener('DOMContentLoaded', function () {
    const alphabeticalButton = document.querySelector('.alphabetical');
    if (alphabeticalButton) {
        alphabeticalButton.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                arrangeAlphabetically();
            } 
        });
    } else {
        console.error('Alphabetical button element not found.');
    }
});

/* from scripts.js */

/* editing a review (FIX: contents not updating on UI)*/

document.addEventListener('DOMContentLoaded', function() {
    const previewContainer = document.querySelector('.review-edit-preview');
    const previewBox = document.querySelector('.edit-wrapper');
    const reviewText = document.getElementById("edit-review-text");
    const ratingValue = document.querySelector('.rating3 input');
    const allStar = document.querySelectorAll('.rating3 .star');
    const rating2 = document.getElementById('rating4');

    // Function to update the review content and rating
    function updateReviewContent() {
        // Get the updated review text
        const newReviewText = reviewText.value.trim();
        
        // Get the updated rating
        const newRating = rating2.textContent.trim();

        // Update the review content and rating
        const reviewContent = document.querySelector('.rev-content');
        const reviewRating = document.querySelector('.un-review1 strong');

        if (newReviewText !== "") {
            reviewContent.textContent = newReviewText;
        }

        if (newRating !== "") {
            reviewRating.innerHTML = `Rating: <i class="fa-solid fa-star" style="color: #FFBD13;"></i> ${newRating}/5`;
        }
    }

    allStar.forEach((item, idx) => {
        item.addEventListener('click', function () {
            ratingValue.value = idx + 1;

            allStar.forEach((star, i) => {
                if (i <= idx) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });

            rating2.textContent = idx + 1;
        });
    });

    document.querySelectorAll('.edit-review-button').forEach(review => {
        review.onclick = () => {
            previewContainer.style.display = 'flex'; 
            const name = review.getAttribute('data-name');

            if (previewBox.getAttribute('data-target') === name) {
                previewBox.classList.add('active'); 
            }
        };
    });

    const stars = document.querySelectorAll(".rating3 .star");

    stars.forEach((star, idx) => {
        star.addEventListener("click", () => {
            const value = idx + 1;

            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                    s.classList.add('bxs-star');
                    s.classList.remove('bx-star');
                } else {
                    s.classList.remove('active');
                    s.classList.add('bx-star');
                    s.classList.remove('bxs-star');
                }
            });

            // Update the rating value input
            ratingValue.value = value;
        });
    });

    // Review editing functionality
    const editButtons = document.querySelectorAll('.edit-review-button');
    const editReviewSubmit = document.getElementById('editReviewSubmit');
    const editCancel = document.getElementById('editCancel');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewContainer = button.closest('.un-review');
            const ratingElement = reviewContainer.querySelector('.un-review1 strong');
            const currentRating = parseInt(ratingElement.textContent.match(/\d+/)[0]);
            ratingValue.value = currentRating;
            rating2.textContent = currentRating;

            const reviewContentElement = reviewContainer.querySelector('.rev-content');
            reviewText.value = reviewContentElement.textContent.trim();

            previewContainer.style.display = 'flex';
            previewBox.classList.add('active');

            // Update stars to match current rating
            stars.forEach((star, idx) => {
                if (idx < currentRating) {
                    star.classList.add('active');
                    star.classList.add('bxs-star');
                    star.classList.remove('bx-star');
                } else {
                    star.classList.remove('active');
                    star.classList.add('bx-star');
                    star.classList.remove('bxs-star');
                }
            });
        });
    });

    editCancel.addEventListener('click', function() {
        previewContainer.style.display = 'none';
        previewBox.classList.remove('active');
    });

    editReviewSubmit.addEventListener('click', function() {
        // Update the review content and rating
        updateReviewContent();
        
        // Close the modal
        previewContainer.style.display = 'none';
        previewBox.classList.remove('active');
    });
});

/* submit & cancel buttons for editing a review */

document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('editReviewSubmit');
    const cancelBtn = document.getElementById('editCancel');

    if (submitBtn && cancelBtn) {
        submitBtn.addEventListener('click', function(event) {
            hideModal();
        });
        cancelBtn.addEventListener('click', function(event) {
            event.preventDefault();
            clearForm();
            hideModal(); 
        });
    } else {
        console.error('Submit button, cancel button, or review form element not found.');
    }

    function hideModal() {
        const modal = document.querySelector('.review-edit-preview');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function clearForm() {
        document.getElementById('edit-review-text').value = "";
        document.querySelector('.rating3 input').value = ""; 
        document.getElementById('rating4').textContent = "0"; 
        document.querySelectorAll('.rating3 .star').forEach((star) => {
            star.classList.remove('bxs-star'); 
            star.classList.add('bx-star');
        });
    }
});


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
    const reviewsContainer = document.getElementById("all-reviews");
  
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

/* submit & cancel buttons for leave a review */

document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit');
    const cancelBtn = document.querySelector('.cancel');

    if (submitBtn && cancelBtn) {
        submitBtn.addEventListener('click', function(event) {
            window.location.reload();
            hideModal();
        });
        cancelBtn.addEventListener('click', function(event) {
            event.preventDefault();
            clearForm();
            hideModal(); 
        });
    } else {
        console.error('Submit button, cancel button, or review form element not found.');
    }

    function hideModal() {
        const modal = document.querySelector('.review-preview');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function clearForm() {
        document.getElementById('reviewText').value = "";
        document.querySelector('.rating1 input').value = ""; 
        document.getElementById('rating2').textContent = "0"; 
        document.querySelectorAll('.rating1 .star').forEach((star) => {
            star.classList.remove('bxs-star'); 
            star.classList.add('bx-star');
        });
    }
});

/* search for review */

document.addEventListener('DOMContentLoaded', function () {
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
    inputSearch.addEventListener('input', function () {
        const searchPhrase = this.value.trim();
        filterReviews(searchPhrase);
    });

    const btnSearch = document.querySelector('.btn-search');
    btnSearch.addEventListener('click', function () {
        const searchPhrase = inputSearch.value.trim();
        filterReviews(searchPhrase);
    });

    /* buttons */
    document.querySelectorAll('.like-button').forEach(function (button) {
        button.addEventListener('click', function () {
            this.classList.toggle('is-active');
        });
    });
});

/* from user_edit.js */

/* editing a profile */

document.addEventListener('DOMContentLoaded', function() {
    const lol = document.querySelector('.editedpfp');
    const lol1 = document.querySelector('.desc');

    const previewContainer = document.querySelector('.edit-preview');
    const previewBox = document.querySelector('.edit-wrapper');
  
    document.querySelectorAll('.edit-container .edit-button').forEach(review => {
        review.onclick = () => {
            previewContainer.style.display = 'flex';
            const name = review.getAttribute('data-name');

            if (previewBox.getAttribute('data-target') === name && lol.getAttribute('data-target') && lol1.getAttribute('data-target')) {
                previewBox.classList.add('active');
                lol.classList.add('active');
                lol1.classList.add('active');
            }
        };
    });
  
    const submitBtn = document.getElementById("editSubmit");
    const cancelBtn = document.getElementById("cancel"); 

    submitBtn.addEventListener("click", () => {
        const photoUpload = document.getElementById("profile-picture");
        const editedPfp = document.getElementById("editedpfp");
        const description = document.getElementById("description");
        const desc = document.getElementById("desc");

        if (photoUpload.src !== "images/pfp (1).png") {
            editedPfp.src = photoUpload.src; 
        }

        if (description.value.trim() !== "") {
            desc.textContent = description.value; 
        }

        // Reset input fields after submitting
        photoUpload.value = "";  // Clear file input
        description.value = "";  // Clear textarea

        previewContainer.style.display = 'none'; 
    });

    // Move the cancel button event listener outside of the submit button event listener
    cancelBtn.addEventListener("click", () => {
        const photoUpload = document.getElementById("profile-picture");
        const description = document.getElementById("description");

        // Reset input fields after cancelling
        photoUpload.value = "";  // Clear file input
        description.value = "";  // Clear textarea

        previewContainer.style.display = 'none';
    });    
});

/* udpating profile picture */

function updateProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePicture = document.getElementById('profile-picture');
            profilePicture.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

/* deleting review */

document.addEventListener("DOMContentLoaded", function() {
    const trashIcons = document.querySelectorAll('.trash-icon');
    trashIcons.forEach(trashIcon => {
      trashIcon.addEventListener('click', function() {
        const unReviewDiv = this.closest('.un-review');
        if (unReviewDiv) {
          unReviewDiv.remove();
        }
      });
    });
  });

/* pop-up after signing up */

document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("myModal");

    var btn = document.querySelector('.create-user button[type="submit"]');

    btn.addEventListener('click', function(event) {
        modal.style.display = "block";
    });

    modal.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.getElementById('goToHomePage').addEventListener('click', function() {
        window.location.href = "/"; 
    });

    document.getElementById('goToLoginPage').addEventListener('click', function() {
        window.location.href = "/login";
    });
});

/* review replies */

document.addEventListener('DOMContentLoaded', function () {
    const reviewContainer = document.querySelector('.resto-reviews');

    if (reviewContainer) {
        reviewContainer.addEventListener('click', function (event) {
            const replyButton = event.target.closest('.reply-button');
            if (replyButton) {
                const reviewReply = replyButton.closest('.un-review');
                const replyContainer = reviewReply.querySelector('.reply'); // Select the reply element

                // Show the reply container when reply button is clicked
                replyContainer.style.display = 'block';

                const cancelButton = replyContainer.querySelector('.cancel');
                cancelButton.addEventListener('click', function () {
                    replyContainer.style.display = 'none'; // Hide the reply container when cancel button is clicked
                });
            }
        });
    } else {
        console.error('Review container element not found.');
    }
});