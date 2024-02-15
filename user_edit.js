/* EDITING a PROFILE */

document.addEventListener('DOMContentLoaded', function() {
    // Select the review preview container and the preview box
    const lol = document.querySelector('.editedpfp');
    const lol1= document.querySelector('.desc');

    const previewContainer = document.querySelector('.edit-preview');
    const previewBox = document.querySelector('.edit-wrapper');
  
    // Select all review buttons and add click event listener to each
    document.querySelectorAll('.edit-container .edit-button').forEach(review => {
        review.onclick = () => {
            previewContainer.style.display = 'flex'; // Show the review preview container
            const name = review.getAttribute('data-name'); // Get the data-name attribute value
  
            // Check if the preview box matches the clicked review button
            if (previewBox.getAttribute('data-target') === name && lol.getAttribute('data-target')&& lol1.getAttribute('data-target') ) {
                previewBox.classList.add('active'); // Add the active class to the preview box
                lol.classList.add('active');
                lol1.classList.add('active');
            }
        };
    });
  
    const submitBtn = document.getElementById("submit");
    const cancelBtn = document.querySelector(".cancel"); // Select the cancel button

    submitBtn.addEventListener("click", () => {
        const photoUpload = document.getElementById("profile-picture");
        const editedPfp = document.getElementById("editedpfp");
        const description = document.getElementById("description"); // textarea
        const desc = document.getElementById("desc"); // paragraph

        editedPfp.src = photoUpload.src;
        desc.textContent = description.value; 

        previewContainer.style.display = 'none';
    });
    
    
    // Event listener for the Cancel button
    cancelBtn.addEventListener("click", () => {
        // Reset styles after submitting

        reviewText.value = "";
        previewContainer.style.display = 'none'; // Hide the review preview container
    });    
  
    
  });




/* EDITING a review */

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
    
        if (userRating > 0) {
            const currentDate = new Date(); // Get the current date and time
            const formattedDate = currentDate.toLocaleString(); // Format the date and time
            
            let photoHTML = '';
            if (photoUpload.files.length > 0) {
                const photo = photoUpload.files[0];
                const photoURL = URL.createObjectURL(photo);
                photoHTML = `<img src="${photoURL}" alt="User Photo">`;
            }
    
          
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

      document.addEventListener("DOMContentLoaded", function() {
        // Add event listener to all trash icons
        const trashIcons = document.querySelectorAll('.trash-icon');
        trashIcons.forEach(trashIcon => {
          trashIcon.addEventListener('click', function() {
            // Find the parent .un-review div and remove it
            const unReviewDiv = this.closest('.un-review');
            if (unReviewDiv) {
              unReviewDiv.remove();
            }
          });
        });
      });