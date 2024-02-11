let previewContainer = document.querySelector('.review-preview');
let previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.review-container .review-button').forEach(review =>{
  review.onclick = () =>{
    previewContainer.style.display = 'flex';
    let name = review.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

const allStar = document.querySelectorAll('.rating1 .star')
const ratingValue = document.querySelector('.rating1 input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})
