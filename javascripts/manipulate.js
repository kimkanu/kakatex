var editorDiv = document.querySelector('#editor');
var editor = ace.edit('editor');
var langTools = ace.require('ace/ext/language_tools');
editor.setTheme('ace/theme/tomorrow');
editor.session.setMode('ace/mode/latex');
editor.setFontSize(16);
editor.container.style.lineHeight = 1.5;
editor.renderer.updateFontSize();
editor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  wrap: true
});

var logoSvg =
  '<svg version="1.1" width="12em" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n  viewBox="0 0 700 197.7" style="enable-background:new 0 0 700 197.7;width: 4em;position: relative;height: 1.13em;transform: translateY(0.29em);" xml:space="preserve">\n<style type="text/css">\n  .st0 {\n    fill: #333;\n  }\n  .dark .st0 {\n    fill: #FFEB00;\n  }\n</style>\n<g>\n <path class="st0" d="M84.3,146.8H71c-1.5,0-2.7-0.5-3.8-1.7L19.2,86.6v56.8c0,1.7-1.2,3.4-3.1,3.4H6.7c-1.7,0-3.1-1.5-3.1-3.4V23.3\n   C3.7,21.6,5,20,6.9,20h9c1.7,0,3.2,1.4,3.2,3.2v55.1l49.1-56.8c1-1,1.7-1.5,3.4-1.5H84c1.7,0,2.4,0.8,2.4,1.9\n   c0,0.5-0.2,1.2-0.7,1.7l-51.3,58L85.7,143c0.5,0.5,0.9,1.4,0.9,2C86.6,145.9,85.9,146.8,84.3,146.8z"/>\n <path class="st0" d="M158.9,146.8H151c-1.9,0-3.4-1.5-3.4-3.4v-3.8c-8.2,4.8-16.7,8.4-26.3,8.4c-14.5,0-27.8-6.3-27.8-27.6v-2\n   c0-18.4,10.7-27.6,41.1-27.6h12.6v-6.8c0-14.3-4.9-19.3-18.3-19.3c-11.1,0-19.3,0.7-26.1,1.4c-0.3,0-0.5,0-0.9,0\n   c-1.5,0-3.1-0.5-3.1-2.7v-6c0-1.9,1.2-2.9,3.6-3.2c7-1.2,14.8-2.2,26.4-2.2c23.7,0,33.3,11.9,33.3,32.1v59.5\n   C162.3,145.2,160.8,146.8,158.9,146.8z M147.3,101.4h-12.6c-20.6,0-26.1,4.6-26.1,16.7v2c0,12.3,5.8,15.5,15.7,15.5\n   c7.8,0,14.8-2.4,23-6.8V101.4z"/>\n <path class="st0" d="M247.2,146.8h-12.3c-1.9,0-2.6-0.5-3.9-2.2l-33.9-42v40.8c0,1.9-1.5,3.4-3.4,3.4h-8.2c-1.9,0-3.4-1.5-3.4-3.4\n   V21.9c0-1.9,1.5-3.4,3.4-3.4h8.2c1.9,0,3.4,1.5,3.4,3.4v70.9l34.1-38.4c1-1.2,1.7-1.5,3.4-1.5h11.9c1.7,0,2.6,0.9,2.6,1.9\n   c0,0.7-0.3,1.4-0.9,1.9l-37.5,40.6l37.9,45.7c0.3,0.3,0.5,1,0.5,1.5C249.1,145.7,248.4,146.8,247.2,146.8z"/>\n <path class="st0" d="M325.1,146.8h-7.8c-1.9,0-3.4-1.5-3.4-3.4v-3.8c-8.2,4.8-16.7,8.4-26.3,8.4c-14.5,0-27.8-6.3-27.8-27.6v-2\n   c0-18.4,10.7-27.6,41.1-27.6h12.6v-6.8c0-14.3-4.9-19.3-18.3-19.3c-11.1,0-19.3,0.7-26.1,1.4c-0.3,0-0.5,0-0.9,0\n   c-1.5,0-3.1-0.5-3.1-2.7v-6c0-1.9,1.2-2.9,3.6-3.2c7-1.2,14.8-2.2,26.4-2.2c23.7,0,33.3,11.9,33.3,32.1v59.5\n   C328.6,145.2,327,146.8,325.1,146.8z M313.5,101.4h-12.6c-20.6,0-26.1,4.6-26.1,16.7v2c0,12.3,5.8,15.5,15.7,15.5\n   c7.8,0,14.8-2.4,23-6.8V101.4z"/>\n <g>\n   <path class="st0" d="M462,1.2H336.9l-3.7,47.9h3.9c2.8-35.9,5.9-42.2,39.5-42.2c3.9,0,10.2,0,12,0c4.1,0.6,4.1,3.3,4.1,8.3v117.9\n     c0,7.8-0.7,10.2-18.9,10.2h-6.1v5.2c10.4-0.2,21.2-0.4,31.8-0.4c10.6,0,21.5,0.2,31.8,0.4v-5.2h-6c-18,0-18.6-2.4-18.6-10.2V15.2\n     c0-4.8,0-7.4,3.9-8.3h11.9c33.1,0,36.4,6.2,39.2,42.2h3.9"/>\n   <path class="st0" d="M570.6,141h-3.9c-4.7,32.1-7.5,49.6-45.6,49.6H491c-8.7,0-9.1-1.1-9.1-8.5v-60.5h20.4\n     c20.4,0,22.4,7.5,22.4,25.8h3.5V90.9h-3.5c0,18-2,25.3-22.4,25.3H482V62.5c0-7.3,0.4-8.4,9.1-8.4h29.6c33.5,0,37.4,13.3,40.5,42\n     h3.9l-5.2-47.9H450.1v5.9c15.3,0,17.8,0,17.8,9.7v116.9c0,9.7-2.4,9.7-17.8,9.7v5.2h112.7"/>\n   <path class="st0" d="M629,66.5l32-46.3c3.2-4.5,9.7-13.9,27.5-14.1V0.8c-5,0.4-13.2,0.4-18.4,0.4c-7.1,0-16,0-21.4-0.4v5.2\n     c6.9,0.6,8.6,5,8.6,8.5c0,2.6-1.1,4.3-2.6,6.5l-28.6,41.5l-32-46.9c-1.5-2.4-1.7-3-1.7-3.7c0-2,2.4-5.6,9.5-5.8V0.8\n     c-6.9,0.4-17.5,0.4-24.7,0.4c-5.6,0-16.4,0-21.7-0.4v5.2c11.9,0,15.8,0.4,20.6,7.2L618,74.6l-37.7,55\n     c-9.3,13.5-23.4,13.7-27.5,13.7v5.2c4.9-0.4,13.2-0.4,18.4-0.4c5.8,0,16,0,21.4,0.4v-5.2c-6.7-0.6-8.6-5-8.6-8.5\n     c0-2.8,1.1-4.3,2.2-5.9l34.6-50.6l37.7,55.4c1.7,2.4,1.7,3,1.7,3.7c0,1.7-1.9,5.4-9.5,5.9v5.2c6.9-0.4,17.5-0.4,24.7-0.4\n     c5.6,0,16.4,0,21.7,0.4v-5.2c-13.9,0-16.1-1.1-20.4-7.2"/>\n </g>\n</g>\n</svg>';

var contents = document.querySelector('#contents');

var definedMacros = Object.keys(textStyles).concat(['begin', 'end']);
var definedMacrosWithNoParams = ['item'];
var nestedBraceStack = [];

var render = function(event) {
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
            case '\\':
              acc = '';
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
            if (definedMacros.includes(acc.trim().slice(1))) {
              nestedBraceStack.push(acc.trim().slice(1));
              var wrapped = wrapSpecialText(
                'START_MACRO_' + acc.trim().slice(1)
              );
              contents.innerHTML =
                contents.innerHTML.slice(0, i - acc.length) +
                wrapped +
                contents.innerHTML.slice(i + 1);
              i += wrapped.length - acc.length - 1;
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
          if (definedMacrosWithNoParams.includes(acc.trim().slice(1))) {
            var wrapped = wrapSpecialText('MACRO_' + acc.trim().slice(1));
            contents.innerHTML =
              contents.innerHTML.slice(0, i - acc.length) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - acc.length - 1;
            acc = '';
          } else if (acc.trim() == '\\verb' && char == '|') {
            var wrapped = wrapSpecialText('START_VERB');
            contents.innerHTML =
              contents.innerHTML.slice(0, i - 5) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 6;
            acc = '';
            mode = 'verb';
          } else if (acc.startsWith('\\')) {
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
              } else if (definedMacros.includes(acc.trim().slice(1))) {
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
      } else if (mode == 'verb') {
        if (char == '|') {
          if (acc == '\\') {
            var wrapped = wrapSpecialCharacter('|');
            contents.innerHTML =
              contents.innerHTML.slice(0, i - 1) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 2;
            acc = '';
          } else {
            var wrapped = wrapSpecialText('END_VERB');
            contents.innerHTML =
              contents.innerHTML.slice(0, i) +
              wrapped +
              contents.innerHTML.slice(i + 1);
            i += wrapped.length - 1;
            acc = '';
            mode = 'text';
          }
        } else if (char == '\\') {
          acc = '\\';
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
    contents.innerHTML = contents.innerHTML
      .replace(new RegExp('\\n\\n+', 'g'), '<br>')
      .replace(new RegExp('\\\\\\\\', 'g'), '<br>');
  } catch (error) {
    console.error(error);
  }
};
editor.on('change', render);

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
    .replace(new RegExp('\\\\KakaTeX', 'g'), wrapSpecialText('MACRO_KakaTeX'))
    .replace(new RegExp('\\\\KaKaTeX', 'g'), wrapSpecialText('MACRO_KakaTeX'));
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
  if (
    definedMacros.includes(currentMacro) &&
    currentMacro !== 'begin' &&
    currentMacro !== 'end'
  ) {
    decorator = textStyles[currentMacro];
  }
  return (
    group[0] + decorator(processmacros(innerPart)) + processmacros(group[1])
  );
}

function postprocess(string) {
  var s = processmacros(
    string
      .replace(
        new RegExp(
          wrapSpecialText('START_MACRO_begin') +
            'enumerate' +
            wrapSpecialText('END_MACRO_begin'),
          'g'
        ),
        '<ol>'
      )
      .replace(
        new RegExp(
          wrapSpecialText('START_MACRO_end') +
            'enumerate' +
            wrapSpecialText('END_MACRO_end'),
          'g'
        ),
        '</ol>'
      )
      .replace(
        new RegExp(
          wrapSpecialText('START_MACRO_begin') +
            'itemize' +
            wrapSpecialText('END_MACRO_begin'),
          'g'
        ),
        '<ul>'
      )
      .replace(new RegExp(wrapSpecialText('MACRO_item'), 'g'), '<li>')
  );
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
    .replace(
      new RegExp(
        wrapSpecialText('START_VERB') + '(.*?)' + wrapSpecialText('END_VERB'),
        'g'
      ),
      function(match, p1, p2) {
        return '<code>' + p1 + '</code>';
      }
    )
    .replace(new RegExp(wrapSpecialText('MATH_DOLLAR'), 'g'), '\\$')
    .replace(new RegExp(wrapSpecialText('START_INLINE'), 'g'), '$')
    .replace(new RegExp(wrapSpecialText('END_INLINE'), 'g'), '$')
    .replace(new RegExp(wrapSpecialText('START_DISPLAY'), 'g'), '$$')
    .replace(new RegExp(wrapSpecialText('END_DISPLAY'), 'g'), '$$')
    .replace(new RegExp(wrapSpecialText('START_VERB'), 'g'), '\\verb|')
    .replace(new RegExp(wrapSpecialText('END_VERB'), 'g'), '|')
    .replace(new RegExp(wrapSpecialText('END_VERB'), 'g'), '|')
    .replace(
      new RegExp(wrapSpecialText('MACRO_KakaTeX'), 'g'),
      '<span style="height: 1.13em; transform: translateY(0.29em);">' +
        logoSvg +
        '</span>'
    )
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
