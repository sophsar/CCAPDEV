/* editing a profile */

document.addEventListener('DOMContentLoaded', function() {
    const lol = document.querySelector('.editedpfp');
    const lol1= document.querySelector('.desc');

    const previewContainer = document.querySelector('.edit-preview');
    const previewBox = document.querySelector('.edit-wrapper');
  
    document.querySelectorAll('.edit-container .edit-button').forEach(review => {
        review.onclick = () => {
            previewContainer.style.display = 'flex';
            const name = review.getAttribute('data-name');

            if (previewBox.getAttribute('data-target') === name && lol.getAttribute('data-target')&& lol1.getAttribute('data-target') ) {
                previewBox.classList.add('active');
                lol.classList.add('active');
                lol1.classList.add('active');
            }
        };
    });
  
    const submitBtn = document.getElementById("editSubmit");
    const cancelBtn = document.querySelector(".cancel"); 

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

    previewContainer.style.display = 'none'; 
});

    
    
    cancelBtn.addEventListener("click", () => {
        reviewText.value = "";
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

function hideContainer() {
const previewContainer = document.querySelector('.edit-preview');
previewContainer.style.display = 'none';
}

function hideContainer2() {
const previewContainer = document.querySelector('.review-preview');
previewContainer.style.display = 'none';
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

/* editing a review */

document.addEventListener('DOMContentLoaded', function() {
    const ellipsisIcons = document.querySelectorAll('.fa-solid.fa-ellipsis');
    ellipsisIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const reviewContainer = icon.closest('.un-review');
            const ratingElement = reviewContainer.querySelector('.un-review1 strong');
            const currentRating = parseInt(ratingElement.textContent.match(/\d+/)[0]);
            const newRating = parseInt(prompt("Enter a new rating (1 - 5):"));
            if (newRating >= 1 && newRating <= 5) {
                ratingElement.innerHTML = `Rating: <i class="fa-solid fa-star" style="color: #FFBD13;"></i> ${newRating}/5`;
                const reviewContentElement = reviewContainer.querySelector('.rev-content');
                const newReviewContent = prompt("Enter updated review:");
                if (newReviewContent !== null) {
                    reviewContentElement.textContent = newReviewContent;
                }
                const reviewDateElement = reviewContainer.querySelector('.un-review1 p:last-child');
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleString();
                reviewDateElement.textContent = `Review sent on: ${formattedDate}`;
                const editedMark = document.createElement('span');
                editedMark.textContent = " (edited)";
                editedMark.style.color = "red";
                reviewDateElement.appendChild(editedMark);
            } else {
                alert("Invalid rating! Please enter a number between 1 and 5.");
            }
        });
    });
});
