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
        userName.textContent = "owner";
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