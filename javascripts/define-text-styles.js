var textStyles = {
  textbf: function(s) {
    return '<b>' + s + '</b>';
  },
  textit: function(s) {
    return '<i>' + s + '</i>';
  },
  textsl: function(s) {
    return '<span class="slanted">' + s + '</span>';
  },
  textsf: function(s) {
    return '<span class="sans">' + s + '</span>';
  },
  textrm: function(s) {
    return '<span class="serif">' + s + '</span>';
  },
  emph: function(s) {
    return '<em>' + s + '</em>';
  },
  uline: function(s) {
    return '<u>' + s + '</u>';
  },
  section: function(s) {
    return '<h1>' + s + '</h1>';
  },
  subsection: function(s) {
    return '<h2>' + s + '</h2>';
  },
  subsubsection: function(s) {
    return '<h3>' + s + '</h3>';
  }
};
