var removeFlag = false;
var files = JSON.parse(localStorage.getItem('files'));
if (files == []) files = null;
var filename =
  files == null ? generateToken(16) : localStorage.getItem('recent');
if (files == null || files == []) {
  localStorage.setItem('recent2', null);
  localStorage.setItem('recent', filename);
  files = [filename];
  localStorage.setItem('files', JSON.stringify(files));
  localStorage.setItem(filename, '');
} else if (files.length == 1) {
  localStorage.setItem('recent2', null);
  localStorage.setItem('recent', files[0]);
}
$(function() {
  console.log(localStorage.getItem('recent2'));
  console.log(localStorage.getItem('recent'));
  if (localStorage.getItem('files') == null)
    editor.setValue(localStorage.getItem(filename));

  $('#file-selector > select').select2({
    width: 'resolve',
    data: files.map(x => ({ id: x, text: x })),
    tags: true
  });

  if (localStorage.getItem('recent') == null) {
    localStorage.setItem('recent2', null);
    localStorage.setItem('recent', filename);
  } else {
    filename = localStorage.getItem('recent');
    $('#file-selector > select').val(filename);
    $('#file-selector > select').trigger('change');
    editor.setValue(localStorage.getItem(filename));
  }

  $('#file-selector > select').on('change', function(e) {
    try {
      var selected = $('#file-selector > select').find(':selected')[0]
        .innerText;
      var value = editor.getValue();
      localStorage.setItem(filename, value);
      if (!removeFlag) {
        if (localStorage.getItem('recent2') != localStorage.getItem('recent'))
          localStorage.setItem('recent2', localStorage.getItem('recent'));
        filename = selected;
        localStorage.setItem('recent', filename);
        if (!localStorage.getItem(filename)) {
          editor.setValue('');
          localStorage.setItem(filename, '');
          files = [filename].concat(files);
          localStorage.setItem('files', JSON.stringify(files));
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
    } catch {}
    if (files.length <= 1) {
      localStorage.setItem('recent2', '');
    }
    console.log(localStorage.getItem('recent2'));
    console.log(localStorage.getItem('recent'));
  });

  window.onbeforeunload = function() {
    var value = editor.getValue();
    if (filename != localStorage.getItem('recent'))
      localStorage.setItem('recent', filename);
    localStorage.setItem(filename, value);
  };
});

setInterval(() => {
  var value = editor.getValue();
  localStorage.setItem(filename, value);
}, 5000);

function removeCurrentFile() {
  var c = confirm('Are you sure to remove current file?');
  if (c) {
    removeFlag = true;
    files = files.filter(x => x != filename);
    localStorage.setItem('files', JSON.stringify(files));
    localStorage.setItem(filename, '');
    $('option[value="' + filename + '"]').remove();

    filename = localStorage.getItem('recent2');
    localStorage.setItem('recent', localStorage.getItem('recent2'));
    console.log(files[0], localStorage.getItem('recent2'));
    editor.setValue(localStorage.getItem(filename));

    if (files.length == 0) {
      filename = generateToken(16);
      files = [filename];
      localStorage.setItem('files', JSON.stringify(files));
      localStorage.setItem('recent2', '');
      localStorage.setItem('recent', filename);
    } else if (files.length == 1) {
      localStorage.setItem('recent2', '');
      localStorage.setItem('recent', filename);
    } else if (files[0] == localStorage.getItem('recent2')) {
      localStorage.setItem('recent2', files[1]);
    } else localStorage.setItem('recent2', files[0]);
    $('#file-selector > select').val(filename);
    console.log('removeCurrentFile', localStorage.getItem('recent2'));
    console.log('removeCurrentFile', localStorage.getItem('recent'));
    $('#file-selector > select').trigger('change');
  }
}
