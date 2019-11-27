let togglePopUp = () => {
  let opacity = 0;
  const popUp = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn'),
        popUpClose = document.querySelector('.popup-close');
  popUp.style.opacity = 0;

  popUpBtn.forEach(elem => {
    elem.addEventListener('click', () => {
      popUp.style.display = 'block';
      popUpShow();
    });
  }); 

  function popUpShow () {
    if (opacity < 1) {
      opacity += 0.05;
      popUp.style.opacity = opacity;
      requestAnimationFrame(popUpShow);
    }
  }
  function popUpUnshow () {
    if (opacity > 0) {
      opacity -= 0.05;
      popUp.style.opacity = opacity;
      requestAnimationFrame(popUpUnshow);
    }
    else {
      popUp.style.display = '';
    }
  }
  popUp.addEventListener('click', event => {
    if (event.target === popUp || event.target === popUpClose) {
      popUpUnshow();
    } 
  });
};

export default togglePopUp;