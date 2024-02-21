/* review replys */

const replyBtns = document.querySelectorAll(".reply-button");
let publishBtns = document.querySelectorAll(".publish");

replyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        let reviewReply = event.target.closest('.review1').parentNode;

        let replyContainer = document.createElement("div");
        replyContainer.className = "reply";

        let user = document.createElement("div");
        let profilePic = document.createElement("img");
        let userName = document.createElement("h4");

        profilePic.src = "images/pfp.png";
        user.className = "user";
        userName.textContent = "owner";
        user.appendChild(profilePic);
        user.appendChild(userName);

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

        replyContainer.appendChild(user);

        replyContainer.appendChild(bottomDiv);

        reviewReply.appendChild(replyContainer);

        publishBtns = document.querySelectorAll(".publish");

        publishBtn.addEventListener("click", (event) => {
            let bottomDiv = event.target.closest(".bottom");
            let contentPane = bottomDiv.querySelector(".content");
            let cancelBtn = bottomDiv.querySelector(".cancel");

            if (contentPane.tagName === 'INPUT') {
                contentPane.readOnly = true; 
            }

            contentPane.classList.remove('editable'); 
            contentPane.classList.add('published'); 
            cancelBtn.remove();
            event.target.remove();
        });

        cancelBtn.addEventListener("click", (event) => {
            replyContainer.remove();
        });
    });
});