const USERID = {
    name: null,
    identity: null,
    image: null,
    message: null,
    date: null
}


const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".comments");
const userName = document.querySelector(".user");
const notify = document.querySelector(".notifyinput");

    userComment.addEventListener("input", e => {
        if(!userComment.value) {
            publishBtn.setAttribute("disabled", "disabled");
            publishBtn.classList.remove("abled")
        }else {
            publishBtn.removeAttribute("disabled");
            publishBtn.classList.add("abled")
        }
    })

    function addPost() {
        if(!userComment.value) return;
        USERID.name = userName.value;
        if(USERID.name === "Anonymous") {
            USERID.identity = false;
            USERID.image = "anonymous.png"
        }else {
            USERID.identity = true;
            USERID.image = "user.png"
        }

        USERID.message = userComment.value;
        USERID.date = new Date().toLocaleString();
        let published = 
        `<div class="parents">
            <img src="${USERID.image}">
            <div class="parents-name-and-date">
                <div class="parents-1">
                    <h1>${USERID.name}</h1>
                    <span class="date">${USERID.date}</span>
                </div>
                <div class="parents-2">
                    <p>${USERID.message}</p>
                </div>
            </div>    
        </div>`

        comments.innerHTML += published;
        userComment.value = "";
        publishBtn.classList.remove("abled")

        let commentsNum = document.querySelectorAll(".parents").length;
        document.getElementById("comment").textContent = commentsNum;

    }

    publishBtn.addEventListener("click", addPost);

    /*
    function showDiv() {
        var x = document.querySelector('.comment-container');

        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
    }
    */

let previewContainer = document.querySelector('.owner-comments');
let previewBox = previewContainer.querySelectorAll('.comment-container');

document.querySelectorAll('.resto-reviews .review1').forEach(review =>{
  review.onclick = () =>{
    previewContainer.style.display = 'block';
    let name = review.getAttribute('data-comment');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});