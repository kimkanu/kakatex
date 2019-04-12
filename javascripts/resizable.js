/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(div) {
  var element = document.querySelector(div);
  var resizers = document.querySelectorAll(div + ' .resizer');
  var minimumSize = 20;
  var originalWidth = 0;
  var originalHeight = 0;
  var originalMouseX = 0;
  var originalMouseY = 0;
  for (var i = 0; i < resizers.length; i++) {
    var currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault();
      originalWidth = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('width')
          .replace('px', '')
      );
      originalHeight = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('height')
          .replace('px', '')
      );
      originalX = element.getBoundingClientRect().left;
      originalY = element.getBoundingClientRect().top;
      originalMouseX = e.pageX;
      originalMouseY = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        var width = originalWidth + (e.pageX - originalMouseX) * 2;
        var height = originalHeight + (e.pageY - originalMouseY);
        var amount = Math.max(width, height);
        if (amount > minimumSize) {
          element.style.width = amount + 'px';
          element.style.height = amount + 'px';
        }
      } else {
        var height = originalHeight + (e.pageY - originalMouseY) * 2;
        var width = originalWidth - (e.pageX - originalMouseX);
        var amount = Math.max(width, height);
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
