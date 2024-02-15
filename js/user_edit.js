
/* leaving a review */

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

    // Check if the profile picture is not the default image
    if (photoUpload.src !== "images/pfp (1).png") {
        editedPfp.src = photoUpload.src; // Update profile picture
    }

    // Check if the description is not blank
    if (description.value.trim() !== "") {
        desc.textContent = description.value; // Update description
    }

    previewContainer.style.display = 'none'; // Hide the review preview container
});

    
    
    // Event listener for the Cancel button
    cancelBtn.addEventListener("click", () => {
        // Reset styles after submitting
        reviewText.value = "";
        previewContainer.style.display = 'none'; // Hide the review preview container
    });    
  
    
  });
