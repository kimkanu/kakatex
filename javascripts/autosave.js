var removeFlag = false;
var files = JSON.parse(localStorage.getItem('____files____'));
if (files == []) files = null;
var filename =
  files == null ? generateToken(16) : localStorage.getItem('____recent____');
if (files == null || files == []) {
  localStorage.setItem('____recent2____', null);
  localStorage.setItem('____recent____', filename);
  files = [filename];
  localStorage.setItem('____files____', JSON.stringify(files));
  localStorage.setItem(filename, '');
} else if (files.length == 1) {
  localStorage.setItem('____recent2____', null);
  localStorage.setItem('____recent____', files[0]);
}
$(function() {
  console.log(localStorage.getItem('____recent2____'));
  console.log(localStorage.getItem('____recent____'));
  if (localStorage.getItem('____files____') == null)
    editor.setValue(localStorage.getItem(filename));

  $('#file-selector > select').select2({
    width: 'resolve',
    data: files.map(x => ({ id: x, text: x })),
    tags: true
  });

  if (localStorage.getItem('____recent____') == null) {
    localStorage.setItem('____recent2____', null);
    localStorage.setItem('____recent____', filename);
  } else {
    filename = localStorage.getItem('____recent____');
    $('#file-selector > select').val(filename);
    $('#file-selector > select').trigger('change');
    editor.setValue(localStorage.getItem(filename));
  }

  $('#file-selector > select').on('change', function(e) {
    var selected = $('#file-selector > select').find(':selected')[0].innerText;
    var value = editor.getValue();
    localStorage.setItem(filename, value);
    if (!removeFlag) {
      if (
        localStorage.getItem('____recent2____') !=
        localStorage.getItem('____recent____')
      )
        localStorage.setItem(
          '____recent2____',
          localStorage.getItem('____recent____')
        );
      filename = selected;
      localStorage.setItem('____recent____', filename);
      if (!files.includes(selected)) {
        editor.setValue('');
        localStorage.setItem(filename, '');
        files = [filename].concat(files);
        localStorage.setItem('____files____', JSON.stringify(files));
        setTimeout(function() {
          $('#file-selector > select').select2({
            width: 'resolve',
            data: files.map(x => ({ id: x, text: x })),
            tags: true
          });
        });
      } else {
        editor.setValue(localStorage.getItem(filename));
      }
    }
  });

  window.onbeforeunload = function() {
    var value = editor.getValue();
    if (filename != localStorage.getItem('____recent____'))
      localStorage.setItem('____recent____', filename);
    localStorage.setItem(filename, value);
    if (document.body.classList.contains('dark'))
      localStorage.setItem('____dayOrNight____', 'night');
    else localStorage.setItem('____dayOrNight____', 'day');
    localStorage.setItem('____width____', $('.resizable').css('width'));
    localStorage.setItem('____height____', $('.resizable').css('height'));
  };
});

setInterval(() => {
  var value = editor.getValue();
  localStorage.setItem(filename, value);
  if (document.body.classList.contains('dark'))
    localStorage.setItem('____dayOrNight____', 'night');
  else localStorage.setItem('____dayOrNight____', 'day');
  localStorage.setItem('____width____', $('.resizable').css('width'));
  localStorage.setItem('____height____', $('.resizable').css('height'));
}, 5000);

function removeCurrentFile() {
  var c = confirm('Are you sure to remove current file?');
  if (c) {
    removeFlag = true;
    files = files.filter(x => x != filename);
    localStorage.setItem('____files____', JSON.stringify(files));
    localStorage.setItem(filename, '');
    $('option[value="' + filename + '"]').remove();

    filename = localStorage.getItem('____recent2____');
    localStorage.setItem(
      '____recent____',
      localStorage.getItem('____recent2____')
    );
    editor.setValue(localStorage.getItem(filename));

    if (files.length == 0) {
      filename = generateToken(16);
      files = [filename];
      localStorage.setItem('____files____', JSON.stringify(files));
      localStorage.setItem('____recent____', filename);
    } else if (files.length == 1) {
      localStorage.setItem('____recent____', filename);
    } else if (files[0] == localStorage.getItem('____recent2____')) {
      localStorage.setItem('____recent2____', files[1]);
    } else localStorage.setItem('____recent2____', files[0]);
    $('#file-selector > select').val(filename);
    $('#file-selector > select').trigger('change');
    removeFlag = false;
  }
}

var dayOrNight = localStorage.getItem('____dayOrNight____');
if (dayOrNight == null) localStorage.setItem('____dayOrNight____', 'day');
if (dayOrNight == 'night') {
  toggleDark();
}

var width = localStorage.getItem('____width____') || '300px';
var height = localStorage.getItem('____height____') || '300px';
$('.resizable').css('width', width);
$('.resizable').css('height', height);
