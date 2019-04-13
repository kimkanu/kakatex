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
  },
  centerline: function(s) {
    return '<p class="centerline">' + s + '</p>';
  },
  centering: function(s) {
    return '<p class="centerline">' + s + '</p>';
  },
  center: function(s) {
    return '<p class="centerline">' + s + '</p>';
  },
  Huge: function(s) {
    return '<span style="font-size: 2.488rem">' + s + '</span>';
  },
  huge: function(s) {
    return '<span style="font-size: 2.074rem">' + s + '</span>';
  },
  LARGE: function(s) {
    return '<span style="font-size: 1.728rem">' + s + '</span>';
  },
  Large: function(s) {
    return '<span style="font-size: 1.44rem">' + s + '</span>';
  },
  large: function(s) {
    return '<span style="font-size: 1.2rem">' + s + '</span>';
  },
  normalsize: function(s) {
    return '<span style="font-size: 1.0rem">' + s + '</span>';
  },
  small: function(s) {
    return '<span style="font-size: .9rem">' + s + '</span>';
  },
  footnotesize: function(s) {
    return '<span style="font-size: .8rem">' + s + '</span>';
  },
  scriptsize: function(s) {
    return '<span style="font-size: .7rem">' + s + '</span>';
  },
  tiny: function(s) {
    return '<span style="font-size: .5rem">' + s + '</span>';
  }
};
