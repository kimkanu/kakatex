/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimumSize = 20;
  let originalWidth = 0;
  let originalHeight = 0;
  let originalMouseX = 0;
  let originalMouseY = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault();
      originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      originalX = element.getBoundingClientRect().left;
      originalY = element.getBoundingClientRect().top;
      originalMouseX = e.pageX;
      originalMouseY = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    })
    
    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = originalWidth + (e.pageX - originalMouseX) * 2;
        const height = originalHeight + (e.pageY - originalMouseY);
        const amount = Math.max(width, height);
        if (amount > minimumSize) {
          element.style.width = amount + 'px';
          element.style.height = amount + 'px';
        }
      }
      else {
        const height = originalHeight + (e.pageY - originalMouseY) * 2;
        const width = originalWidth - (e.pageX - originalMouseX);
        const amount = Math.max(width, height);
        if (amount > minimumSize) {
          element.style.width = amount + 'px';
          element.style.height = amount + 'px';
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize);
    }
  }
}

makeResizableDiv('.resizable');
