var $leftArrow = document.querySelector('.left-arrow');
var $rightArrow = document.querySelector('.right-arrow');
var $image = document.querySelector('.carousel-image');
var $progressDots = document.querySelectorAll('.dot');
var $dotsContainer = document.querySelector('.progress-dots');

var curSlide = 1;
var maxSlide = $progressDots.length;

$dotsContainer.addEventListener('click', function (event) {
  if (event.target.nodeName === 'BUTTON') {
    curSlide = parseInt(event.target.getAttribute('id'));
    selectDot(curSlide);
    renderImage(curSlide);
  }
});

function selectDot(id) {
  for (var i = 0; i < $progressDots.length; i++) {
    $progressDots[i].className = 'dot';
  }
  $progressDots[id - 1].classList.add('selected');
}

function renderImage(id) {
  $image.setAttribute('src', `images/circuits/${id}.png`);
}

$rightArrow.addEventListener('click', goNextImg);
$leftArrow.addEventListener('click', goPreviousImg);

function goNextImg() {
  if (curSlide === maxSlide) {
    renderImage(1);
    curSlide = 1;
    selectDot(1);
  } else {
    curSlide++;
    renderImage(curSlide);
    selectDot(curSlide);
  }
}

function goPreviousImg() {
  if (curSlide === 1) {
    renderImage(maxSlide);
    curSlide = maxSlide;
    selectDot(curSlide);
  } else {
    curSlide--;
    renderImage(curSlide);
    selectDot(curSlide);
  }
}
