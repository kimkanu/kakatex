var editorDiv = document.querySelector('#editor');
var editor = ace.edit('editor');
editor.setTheme('ace/theme/tomorrow');
editor.session.setMode('ace/mode/latex');
editor.setFontSize(16);
editor.container.style.lineHeight = 1.5;
editor.renderer.updateFontSize();
editor.setOptions({
  wrap: true
});
var contents = document.querySelector('#contents');

var definedMacro = ['textbf', 'textit'];
var nestedBraceStack = [];

editor.on('change', function(event) {
  var value = editor.getValue();
  try {
    contents.innerHTML = preprocess(value);

    var acc = '';
    var mode = 'text';

    for (var i = 0; i < contents.innerHTML.length; i++) {
      var char = contents.innerHTML[i];
      if (char == '%') {
        if (acc == '\\') {
          var wrapped = wrapSpecialCharacter('%');
          contents.innerHTML =
            contents.innerHTML.slice(0, i - 1) +
            wrapped +
            contents.innerHTML.slice(i + 1);
          i += wrapped.length - 2;
          acc = '';
        } else {
          var j = i;
          while (contents.innerHTML[j] != '\n' && j < contents.innerHTML.length)
            j++;
          contents.innerHTML =
            contents.innerHTML.slice(0, i--) + contents.innerHTML.slice(j + 1);
        }
        continue;
      }

      if (mode == 'text') {
        if (char == '$') {
          switch (acc) {
            case '':
              acc = '$';
              break;
            case '$':
              mode = 'display';
              var wrapped = wrapSpecialText('START_DISPLAY');
              contents.innerHTML =
                contents.innerHTML.slice(0, i - 1) +
                wrapped +
                contents.innerHTML.slice(i + 1);
              i += wrapped.length - 2;
              break;
            case '\\':
              var wrapped = wrapSpecialCharacter('$');
              contents.innerHTML =
                contents.innerHTML.slice(0, i - 1) +
                wrapped +
                contents.innerHTML.slice(i + 1);
              i += wrapped.length - 2;
              break;
          }
        } else if (char == '\\') {
          switch (acc) {
            case '':
              acc = '\\';
              break;
            case '$':
              var wrapped = wrapSpecialText('START_INLINE');
              contents.innerHTML =
                contents.innerHTML.slice(0, i - 1) +
                wrapped +
                contents.innerHTML.slice(i);
              i += wrapped.length - 1;
              acc = '\\';
              mode = 'inline';
              break;
            case '\\':
              var wrapped = '<br>';
              contents.innerHTML =
                contents.innerHTML.slice(0, i - 1) +
                wrapped +
                contents.innerHTML.slice(i + 1);
              i += wrapped.length - 2;
              acc = '';
              break;
          }
          if (acc != '\\' && acc.startsWith('\\')) {
            acc = '\\';
          }
        } else if (char == '{') {
          if (acc == '\\') {
            var wrapped = wrapSpecialCharacter('{');
            contents.innerHTML =
              contents.innerHTML.slice(0, i - 1) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 2;
            acc = '';
          } else if (acc.startsWith('\\')) {
            if (definedMacro.includes(acc.trim().slice(1))) {
              nestedBraceStack.push(acc.trim().slice(1));
              var wrapped = wrapSpecialText(
                'START_MACRO_' + acc.trim().slice(1)
              );
              contents.innerHTML =
                contents.innerHTML.slice(0, i - acc.length) +
                wrapped +
                contents.innerHTML.slice(i + 1);
              i += wrapped.length - acc.length;
              acc = '';
            }
          }
        } else if (char == '}') {
          switch (acc) {
            case '\\':
              var wrapped = wrapSpecialCharacter('}');
              contents.innerHTML =
                contents.innerHTML.slice(0, i - 1) +
                wrapped +
                contents.innerHTML.slice(i + 1);
              i += wrapped.length - 2;
              acc = '';
              break;
            default:
              if (nestedBraceStack.length > 0) {
                var macro = nestedBraceStack.pop();
                var wrapped = wrapSpecialText('END_MACRO_' + macro);
                contents.innerHTML =
                  contents.innerHTML.slice(0, i) +
                  wrapped +
                  contents.innerHTML.slice(i + 1);
                i += wrapped.length - 1;
                acc = '';
              }
          }
        } else {
          if (acc.startsWith('\\')) {
            if (!acc.includes(' ') || char == ' ') acc += char;
            else {
              if (acc.trim() == '\\') {
                var wrapped = wrapSpecialCharacter(' ');
                contents.innerHTML =
                  contents.innerHTML.slice(0, i - 1) +
                  wrapped +
                  contents.innerHTML.slice(i + 1);
                i += wrapped.length - 2;
                acc = '';
              } else {
                contents.innerHTML =
                  contents.innerHTML.slice(0, i - 1) +
                  '{' +
                  char +
                  '}' +
                  contents.innerHTML.slice(i + 1);
                i -= acc.length + 3;
                acc = '';
              }
            }
          } else if (acc == '$') {
            var wrapped = wrapSpecialText('START_INLINE');
            contents.innerHTML =
              contents.innerHTML.slice(0, i - 1) +
              wrapped +
              contents.innerHTML.slice(i);
            i += wrapped.length - 1;
            acc = '';
            mode = 'inline';
          }
        }
      } else if (mode == 'inline') {
        if (char == '$') {
          if (acc == '\\') {
            acc = '';
            var wrapped = wrapSpecialText('MATH_DOLLAR');
            contents.innerHTML =
              contents.innerHTML.slice(0, i - 1) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 2;
          } else {
            var wrapped = wrapSpecialText('END_INLINE');
            contents.innerHTML =
              contents.innerHTML.slice(0, i) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 1;
            acc = '';
            mode = 'text';
          }
        } else if (char == '\\') {
          switch (acc) {
            case '\\':
              acc = '';
              break;
            default:
              acc = '\\';
          }
        } else {
          acc = '';
        }
      } else if (mode == 'display') {
        if (char == '$') {
          if (acc == '$') {
            var wrapped = wrapSpecialText('END_DISPLAY');
            contents.innerHTML =
              contents.innerHTML.slice(0, i - 1) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 2;
            acc = '';
            mode = 'text';
          } else if (acc == '\\') {
            acc = '';
            var wrapped = wrapSpecialText('MATH_DOLLAR');
            contents.innerHTML =
              contents.innerHTML.slice(0, i - 1) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 2;
          } else {
            acc += '$';
          }
        } else if (char == '\\') {
          switch (acc) {
            case '\\':
              acc = '';
              break;
            default:
              acc = '\\';
          }
        } else {
          acc = '';
        }
      }
    }

    contents.innerHTML = postprocess(contents.innerHTML);
    renderMathInElement(contents, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false,
      strict: 'ignore'
    });
  } catch (error) {
    console.error(error);
  }
});

function generateToken(l) {
  l = l || 8;
  var s = '';
  var charSet =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@';
  for (var i = 0; i < l; i++) {
    s += charSet[Math.floor(charSet.length * Math.random())];
  }
  return s;
}

var __uniqueToken = [generateToken(), generateToken()];
var specialCharacters = {
  $: 'DOLLAR',
  '%': 'PERCENT',
  '{': 'OPENING_BRACE',
  '}': 'CLOSING_BRACE',
  ' ': 'SPACE'
};
function wrapSpecialCharacter(s) {
  return __uniqueToken[0] + specialCharacters[s] + __uniqueToken[1];
}
function wrapSpecialText(s) {
  return __uniqueToken[0] + s + __uniqueToken[1];
}
function hideSpecialCharacters(s) {
  var chars = Object.keys(specialCharacters);
  var t = s;
  for (var i = 0; i < chars.length; i++) {
    t = t.replace(
      new RegExp('\\' + chars[i].split('').join('\\'), 'g'),
      wrapSpecialCharacter(chars[i])
    );
  }
  return t;
}
function recoverSpecialCharacters(s) {
  var chars = Object.keys(specialCharacters);
  for (var i = 0; i < chars.length; i++) {
    s = s.replace(new RegExp(wrapSpecialCharacter(chars[i]), 'g'), chars[i]);
  }
  return s;
}

function preprocess(string) {
  return string
    .replace(new RegExp('\\\\begin{align}', 'g'), '\\[ \\begin{aligned}')
    .replace(new RegExp('\\\\end{align}', 'g'), '\\end{aligned} \\]');
}

function processmacros(string) {
  var firstOpenerOccurrence = string.indexOf(__uniqueToken[0] + 'START_MACRO_');
  var firstCloserOccurrence = string.indexOf(
    __uniqueToken[1],
    firstOpenerOccurrence
  );
  if (firstOpenerOccurrence == -1) return string;
  var currentCursor = firstCloserOccurrence + __uniqueToken[1].length;
  var balancing = 1;
  while (balancing > 0 && currentCursor) {
    var startOccurrence = string.indexOf(
      __uniqueToken[0] + 'START_MACRO_',
      currentCursor
    );
    var endOccurrence = string.indexOf(
      __uniqueToken[0] + 'END_MACRO_',
      currentCursor
    );
    if (startOccurrence == -1 && endOccurrence == -1) break;
    if (startOccurrence == -1) startOccurrence = Number.MAX_SAFE_INTEGER;
    if (endOccurrence == -1) endOccurrence = Number.MAX_SAFE_INTEGER;
    if (startOccurrence < endOccurrence) {
      balancing += 1;
      currentCursor = startOccurrence + __uniqueToken[0].length;
    } else {
      balancing -= 1;
      currentCursor = endOccurrence + __uniqueToken[0].length;
    }
  }
  var actualEndCloserOccurrence =
    string.indexOf(__uniqueToken[1], currentCursor) + __uniqueToken[1].length;
  var currentMacro = string.slice(
    currentCursor + 'END_MACRO_'.length,
    actualEndCloserOccurrence - __uniqueToken[1].length
  );
  var innerPart = string.slice(
    firstOpenerOccurrence +
      (__uniqueToken[0] + 'START_MACRO_' + currentMacro + __uniqueToken[1])
        .length,
    actualEndCloserOccurrence -
      (__uniqueToken[0] + 'END_MACRO_' + currentMacro + __uniqueToken[1]).length
  );

  var group = [
    string.slice(0, firstOpenerOccurrence),
    string.slice(actualEndCloserOccurrence)
  ];

  var decorator = function(s) {
    return s;
  };
  switch (currentMacro) {
    case 'textbf':
      decorator = function(s) {
        return '<b>' + s + '</b>';
      };
      break;
    case 'textit':
      decorator = function(s) {
        return '<i>' + s + '</i>';
      };
      break;
  }
  return (
    group[0] + decorator(processmacros(innerPart)) + processmacros(group[1])
  );
}

function postprocess(string) {
  var s = processmacros(string);
  var r = recoverSpecialCharacters(s);
  return r
    .replace(
      new RegExp(
        wrapSpecialText('END_INLINE') + wrapSpecialText('START_INLINE'),
        'g'
      ),
      wrapSpecialText('END_INLINE') + ' ' + wrapSpecialText('START_INLINE')
    )
    .replace(
      new RegExp(
        wrapSpecialText('START_INLINE') +
          '((.|\n|$)*?)' +
          wrapSpecialText('END_INLINE'),
        'g'
      ),
      function(match, p1, p2) {
        return '$ ' + p1 + ' $';
      }
    )
    .replace(
      new RegExp(
        wrapSpecialText('END_DISPLAY') + wrapSpecialText('START_DISPLAY'),
        'g'
      ),
      wrapSpecialText('END_DISPLAY') + ' ' + wrapSpecialText('START_DISPLAY')
    )
    .replace(
      new RegExp(
        wrapSpecialText('START_DISPLAY') +
          '((.|\n|$)*?)' +
          wrapSpecialText('END_DISPLAY'),
        'g'
      ),
      function(match, p1, p2) {
        return '$$ ' + p1 + ' $$';
      }
    )
    .replace(new RegExp(wrapSpecialText('MATH_DOLLAR'), 'g'), '\\$')
    .replace(new RegExp(wrapSpecialText('START_INLINE'), 'g'), '$')
    .replace(new RegExp(wrapSpecialText('END_INLINE'), 'g'), '$')
    .replace(new RegExp(wrapSpecialText('START_DISPLAY'), 'g'), '$$')
    .replace(new RegExp(wrapSpecialText('END_DISPLAY'), 'g'), '$$')
    .replace(new RegExp(wrapSpecialText('START_MACRO_(.*?)'), 'g'), function(
      match,
      p1,
      p2
    ) {
      return '\\' + p1 + '{';
    })
    .replace(new RegExp(wrapSpecialText('END_MACRO_(.*?)'), 'g'), function(
      match,
      p1,
      p2
    ) {
      return '}';
    })
    .replace(new RegExp(__uniqueToken[0], 'g'), '')
    .replace(new RegExp(__uniqueToken[1], 'g'), '')
    .replace(new RegExp('START_MACRO_', 'g'), '')
    .replace(new RegExp('END_MACRO_', 'g'), '');
}
