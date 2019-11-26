const toggleMenu = () => {
  const menu = document.querySelector('menu'),
        body = document.querySelector('body');

  body.addEventListener('click', event => {
    if (!event.target.closest('menu') && !event.target.closest('.menu') || 
    event.target.closest('.close-btn') || event.target.nodeName === 'A'){
      menu.classList.remove('active-menu');
    }
    else if (event.target.closest('.menu')){
      handlerMenu();
    }
  });
  function handlerMenu () {
    menu.classList.toggle('active-menu');
  }
};

export default toggleMenu;