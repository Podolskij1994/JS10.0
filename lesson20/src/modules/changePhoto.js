const changePhoto = () => {
  const commandPhoto = document.querySelectorAll('.command__photo'),
        command = document.getElementById('command');

  command.addEventListener('mouseover', event => {
    let target = event.target;
    if (target.matches('.command__photo')) {
      let src = target.src;
      target.src = target.dataset.img;
      target.dataset.img = src;
    }
  });
  command.addEventListener('mouseout', event => {
    let target = event.target;
    if (target.matches('.command__photo')) {
      let src = target.src;
      target.src = target.dataset.img;
      target.dataset.img = src;
    }
  });
}

export default changePhoto;