/*jshint esversion: 6 */

var cssVars = {};

var hexColors = {
	"pink": "ffc0cb",
	"lightpink": "ffb6c1",
	"palevioletred": "db7093",
	"hotpink": "ff69b4",
	"deeppink": "ff1493",
	"mediumvioletred": "c71585",
	"lavender": "e6e6fa",
	"thistle": "d8bfd8",
	"plum": "dda0dd",
	"orchid": "da70d6",
	"violet": "ee82ee",
	"fuchsia": "ff00ff",
	"magenta": "ff00ff",
	"mediumorchid": "ba55d3",
	"darkorchid": "9932cc",
	"darkviolet": "9400d3",
	"blueviolet": "8a2be2",
	"darkmagenta": "8b008b",
	"purple": "800080",
	"mediumpurple": "9370db",
	"mediumslateblue": "7b68ee",
	"slateblue": "6a5acd",
	"darkslateblue": "483d8b",
	"rebeccapurple": "663399",
	"indigo ": "4b0082",
	"lightsalmon": "ffa07a",
	"salmon": "fa8072",
	"darksalmon": "e9967a",
	"lightcoral": "f08080",
	"indianred ": "cd5c5c",
	"crimson": "dc143c",
	"red": "ff0000",
	"firebrick": "b22222",
	"darkred": "8b0000",
	"orange": "ffa500",
	"darkorange": "ff8c00",
	"coral": "ff7f50",
	"tomato": "ff6347",
	"orangered": "ff4500",
	"gold": "ffd700",
	"yellow": "ffff00",
	"lightyellow": "ffffe0",
	"lemonchiffon": "fffacd",
	"lightgoldenrodyellow": "fafad2",
	"papayawhip": "ffefd5",
	"moccasin": "ffe4b5",
	"peachpuff": "ffdab9",
	"palegoldenrod": "eee8aa",
	"khaki": "f0e68c",
	"darkkhaki": "bdb76b",
	"greenyellow": "adff2f",
	"chartreuse": "7fff00",
	"lawngreen": "7cfc00",
	"lime": "00ff00",
	"limegreen": "32cd32",
	"palegreen": "98fb98",
	"lightgreen": "90ee90",
	"mediumspringgreen": "00fa9a",
	"springgreen": "00ff7f",
	"mediumseagreen": "3cb371",
	"seagreen": "2e8b57",
	"forestgreen": "228b22",
	"green": "008000",
	"darkgreen": "006400",
	"yellowgreen": "9acd32",
	"olivedrab": "6b8e23",
	"darkolivegreen": "556b2f",
	"mediumaquamarine": "66cdaa",
	"darkseagreen": "8fbc8f",
	"lightseagreen": "20b2aa",
	"darkcyan": "008b8b",
	"teal": "008080",
	"aqua": "00ffff",
	"cyan": "00ffff",
	"lightcyan": "e0ffff",
	"paleturquoise": "afeeee",
	"aquamarine": "7fffd4",
	"turquoise": "40e0d0",
	"mediumturquoise": "48d1cc",
	"darkturquoise": "00ced1",
	"cadetblue": "5f9ea0",
	"steelblue": "4682b4",
	"lightsteelblue": "b0c4de",
	"lightblue": "add8e6",
	"powderblue": "b0e0e6",
	"lightskyblue": "87cefa",
	"skyblue": "87ceeb",
	"cornflowerblue": "6495ed",
	"deepskyblue": "00bfff",
	"dodgerblue": "1e90ff",
	"royalblue": "4169e1",
	"blue": "0000ff",
	"mediumblue": "0000cd",
	"darkblue": "00008b",
	"navy": "000080",
	"midnightblue": "191970",
	"cornsilk": "fff8dc",
	"blanchedalmond": "ffebcd",
	"bisque": "ffe4c4",
	"navajowhite": "ffdead",
	"wheat": "f5deb3",
	"burlywood": "deb887",
	"tan": "d2b48c",
	"rosybrown": "bc8f8f",
	"sandybrown": "f4a460",
	"goldenrod": "daa520",
	"darkgoldenrod": "b8860b",
	"peru": "cd853f",
	"chocolate": "d2691e",
	"olive": "808000",
	"saddlebrown": "8b4513",
	"sienna": "a0522d",
	"brown": "a52a2a",
	"maroon": "800000",
	"white": "ffffff",
	"snow": "fffafa",
	"honeydew": "f0fff0",
	"mintcream": "f5fffa",
	"azure": "f0ffff",
	"aliceblue": "f0f8ff",
	"ghostwhite": "f8f8ff",
	"whitesmoke": "f5f5f5",
	"seashell": "fff5ee",
	"beige": "f5f5dc",
	"oldlace": "fdf5e6",
	"floralwhite": "fffaf0",
	"ivory": "fffff0",
	"antiquewhite": "faebd7",
	"linen": "faf0e6",
	"lavenderblush": "fff0f5",
	"mistyrose": "ffe4e1",
	"gainsboro": "dcdcdc",
	"lightgray": "d3d3d3",
	"silver": "c0c0c0",
	"darkgray": "a9a9a9",
	"dimgray": "696969",
	"gray": "808080",
	"lightslategray": "778899",
	"slategray": "708090",
	"darkslategray": "2f4f4f",
	"black": "000000"
};

var KwSs = ["xxsm", "xsm", "sm", "md", "lg", "xl", "xxl"];

var KwRe = {
	"xxsm": ["1", "479"],
	"xsm": ["480", "639"],
	"sm": ["640", "767"],
	"md": ["768", "1023"],
	"lg": ["1024", "1535"],
	"xl": ["1536", "1919"],
	"xxl": ["1920", "9999"],
	"1": ["1", "479"],
	"480": ["480", "639"],
	"640": ["640", "767"],
	"768": ["768", "1023"],
	"1024": ["1024", "1535"],
	"1536": ["1536", "1919"],
	"1920": ["1920", "9999"],
	"media": ["media", "99999"],
	"print": ["print", "99999"],
	"screen": ["screen", "99999"],
	"speech": ["speech", "99999"],
	"notprint": ["notprint", "99999"],
	"notscreen": ["notscreen", "99999"],
	"notspeech": ["notspeech", "99999"],
	"onlyprint": ["onlyprint", "99999"],
	"onlyscreen": ["onlyscreen", "99999"],
	"onlyspeech": ["onlyspeech", "99999"],
	"font-face": ["font-face", "99999"]
};

var KwKc = {
	/* white-space */
	"nowrap": "white-space-nowrap",
	"pre": "white-space-pre",

	/* text style */	
	"italic": "font-style-italic",
	"underline": "text-decoration-underline",
	"nounderline": "text-decoration-none",
	
	/* background */
	"bg": "background-color",
	"bg-color": "background-color",
	"back": "background-color",

	/* font-weight */
	"light": "font-weight-300",
	"normal": "font-weight-400",
	"medium": "font-weight-500",
	"semibold": "font-weight-600",
	"bold": "font-weight-700",

	/* visibility */
	"hidden": "visibility-hidden",
	"visible": "visibility-visible",
	
	/* position */
	"static": "position-static",
	"absolute": "position-absolute",
	"fixed": "position-fixed",
	"relative": "position-relative",
	"sticky": "position-sticky",
	"initial": "position-initial",
	"inherit": "position-inherit",

	/* alignment */
	"center": "margin-0/auto",
	"aligncenter": "text-align-center",
	"alignleft": "text-align-left",
	"alignright": "text-align-right",
	"aligntop": "vertical-align-top",
	"alignmiddle": "vertical-align-middle",
	"alignbottom": "vertical-align-bottom",
	"left": "float-left",
	"right": "float-right",

	/* width % */
	"full": "width-pct100",
	"half": "width-pct50",
	"third": "width-pct33.3333",
	"quarter": "width-pct25",

	/* display */
	"none": "display-none",
	"inline": "display-inline",
	"block": "display-block",
	"contents": "display-contents",
	"flex": "display-flex",
	"grid": "display-grid",
	"inline-block": "display-inline-block",	
	"inline-flex": "display-inline-flex",
	"inline-grid": "display-inline-grid",
	"inline-table": "display-inline-table",
	"li": "display-list-item",
	"run-in": "display-run-in",
	
	/* grid col/row */
	/*
	grid-2x1 = 2 cols, 1 row
	grid-3x2 = 3 cols, 2 rows
	
	*/

	/* tables */
	"table": "display=table",
	"collapse": "border-collapse=collapse",
	"separate": "border-collapse=separate",
	"row": "display=table-row",
	"cell": "display=table-cell",
	"col": "display=table-cell",
	"colgroup": "display=table-column-group",
	"column": "display=table-column",
	"thead": "display=table-header-group",
	"tfoot": "display=table-footer-group",
	"tbody": "display=table-row-group",

	/* cursors */
	"alias": "cursor-alias",
	"all-scroll": "cursor-all-scroll",
	"auto": "cursor-auto",
	"context-menu": "cursor-context-menu",
	"col-resize": "cursor-col-resize",
	"copy": "cursor-copy",
	"crosshair": "cursor-crosshair",
	"default": "cursor-default",
	"e-resize": "cursor-e-resize",
	"ew-resize": "cursor-ew-resize",
	"grab": "cursor-grab",
	"grabbing": "cursor-grabbing",
	"help": "cursor-help",
	"move": "cursor-move",
	"n-resize": "cursor-n-resize",
	"ne-resize": "cursor-ne-resize",
	"nesw-resize": "cursor-nesw-resize",
	"ns-resize": "cursor-ns-resize",
	"nw-resize": "cursor-nw-resize",
	"nwse-resize": "cursor-nwse-resize",
	"no-drop": "cursor-no-drop",
	"not-allowed": "cursor-not-allowed",
	"pointer": "cursor-pointer",
	"progress": "cursor-progress",
	"row-resize": "cursor-row-resize",
	"s-resize": "cursor-s-resize",
	"se-resize": "cursor-se-resize",
	"sw-resize": "cursor-sw-resize",
	"text": "cursor-text",
	"w-resize": "cursor-w-resize",
	"wait": "cursor-wait",
	"zoom-in": "cursor-zoom-in",
	"zoom-out": "cursor-zoom-out",
	
	/* object-cover */
	"fill": "object-cover-fill",
	"contain": "object-cover--contain",
	"cover": "object-cover-cover",
	"scale-down": "object-cover=scale-down",
	"scale": "object-cover=scale-down"
};

var KwDs = {};
var KwSa = {};
var KwCu = {};
var KwGc = {};
var KwRc = {};
var KwFc = {};
var KwPc = {};
var KwOg = {};
function KwTb(tB) {
	var tA = null;
	if (tB.length > 0) { tA = tB; }
	else { tA = document.getElementsByTagName('textarea'); }
	for (var i=0; i<tA.length; i++) {
		tA[i].onkeydown = function(e) {
			if ((e.keyCode==9) || (e.which==9)) {
				e.preventDefault();
				var s = this.selectionStart;
				this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
				this.selectionEnd = s+1;
			}
		};
	}
}
function KwEd (hL) {
	var hA = KwLy(hL);
	if (hA) {
		var hW = window.open("", "KnowCSS Editor", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=" + screen.height + ",top=0,left="+(screen.width-600));
		var hE = (hL in KwOg) ? KwOg[hL] : hL.innerText;
		hE = KwEn(hE.replace(/\n\t/gi, '\n'));
		hW.document.body.innerHTML = '<style>body{padding:0px;margin:0px;height:100%;width:100%;}textarea{box-sizing:border-box;font-family:verdana;font-size:12px;border:0px;padding:3px}</style><textarea style="width:100%; height:100%;" onKeyUp="window.opener.KwAp(this, \'' + hL + '\'); return true;" onkeydown="e=event; if ((e.keyCode==9) || (e.which==9)) { e.preventDefault(); var s = this.selectionStart; this.value = this.value.substring(0,this.selectionStart) + \'\\t\' + this.value.substring(this.selectionEnd); this.selectionEnd = s+1; }">' + hE + '</textarea>';
		//var hP = window.open("", "KnowCSS Preview", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" + (screen.width-600) + ",height=" + screen.height + ",top=0,left=0");
		//var hM = document.documentElement.innerHTML;
		//hP.document.documentElement.innerHTML = hM;
	}
}
function KwID (hL) {
	var letters = "abcdefghijklmnopqrstuvwxyz";
	var prefixID = letters[Math.floor(Math.random() * letters.length)];
	var newID = prefixID + Math.random().toString(36).substr(2, hL);
	if (newID in KwDs) { newID = KwID(hL); }
	else { KwDs[newID] = true; }
	return newID;
}
function KwTh (sC) {
	var sH = sC.toString(16);
	return (sH.length == 1) ? '0' + sH : sH;
}
function KwSh (sC, sP) {
	var sA = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sC);
	var sB = [parseInt(sA[1], 16), parseInt(sA[2], 16), parseInt(sA[3], 16)];
	var sD = sP/100;
	sB[0] = Math.ceil(sB[0] * sD);
	sB[1] = Math.ceil(sB[1] * sD);
	sB[2] = Math.ceil(sB[2] * sD);
	return KwTh(sB[0]) + KwTh(sB[1]) + KwTh(sB[2]);
}
function KwHx (hA) {
	var zY = '', hB = [], hC = hA;
	var zC = new RegExp('^([a-fA-F0-9]{6})$','i');
	while ((zY = zC.exec(hC)) !== null) {
		hB = zY[1].split('');
		if ((hB[0] == hB[1]) && (hB[2] == hB[3]) && (hB[4] == hB[5])) { hA = hB[0] + hB[2] + hB[4]; }
		break;
	}
	return hA;
}
function KwLy (eA) {
	return document.getElementById(eA);
}
function KwEt (eA, eB) {
	KwLy(eB).value = KwLy(eA).innerHTML;
}
function KwEx (eA, eB) {
	KwLy(eB).innerText = KwLy(eA).innerHTML.trim();
}
function KwEn (eA) {
	return eA.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').toString();
}
function KwCs (hA) {
	var hU = '', jF = '';
	if (hA.indexOf('-webkit-') > -1) { hA = hA.replace('-webkit-', 'webkit-'); hU = '-'; }
	else if (hA.indexOf('-moz-') > -1) { hA = hA.replace('-moz-', 'moz-'); hU = '-'; }
	else if (hA.indexOf('-ms-') > -1) { hA = hA.replace('-ms-', 'ms-'); hU = '-'; }
	else if (hA.indexOf('-o-') > -1) { hA = hA.replace('-o-', 'o-'); hU = '-'; }
	if (hA.indexOf('-pct-') > -1) { hA = hA.replace('-pct-', '-') + '%'; }
	else if (hA.indexOf('-pct') > -1) { hA = hA.replace('-pct', '-') + '%'; }
	if (hA.indexOf('-percent-') > -1) { hA = hA.replace('-percent-', '-') + '%'; }
	else if (hA.indexOf('-percent') > -1) { hA = hA.replace('-percent', '-') + '%'; }
	[hA, jF] = KwMp(hA, '', '!');
	hA = hA.replace(/\-{1,100}$/g, '');
	if (hA.indexOf('--') > -1) { hA = hA.replace(/\-\-/g, '-'); }
	return [hA, hU, jF];
}
function KwSc (jR) {
	jR = jR.replace(/\%/g, '-pct').replace(/[^a-zA-Z0-9\-]/g,'-').replace(/\-{1,100}$/g, '');
	if (jR.indexOf('--') > -1) { jR = jR.replace(/\-\-/g, '-'); }
	return jR;
}
function KwMf (hR) {
	var hS = '', jE = '', jZ = '';
	if (hR.indexOf('+') == 0) { jE = '.' + hR.substr(1) + ' '; }
	else if (hR == 'all') { hS = ' *'; }
	else if (hR.indexOf('random') == 0) { hS = '' + hR.replace('random', ''); }
	else if (['important','!','!important'].includes(hR)) { }
	else if (hR.indexOf('all-') == 0) { hS = ' ' + hR.replace('all-', ''); }
	else if (hR.indexOf('all>') == 0) { hS = ' ' + hR.replace('all>', ' > '); }
	else if (hR.indexOf('nth-child') > -1) { hS = ':nth-child(' + hR.replace('nth-child-', '') + ')'; }
	else if (KwCm(hR)) { hS = ' *:' + hR; }
	else if (hR.length == 0) { }
	else if (hR !== 'main') { hS = ':' + hR; }
	return [hS, jE, jZ];
}
function KwCm (hR) {
	if (hR.indexOf('nth-child') > -1) { return true; }
	else if (['last-child','first-child','only-child','first-of-type','last-of-type','only-of-type'].includes(hR)) { return true; }
	else if (['placeholder','after','before','first-letter','first-line','selection','marker'].includes(hR)) { return true; }
	else { return false; }
}
function gHD() {
	return document.getElementsByTagName('html')[0];
}
function KnowedCSS (hA) {
	return KwRn(hA, null, null);
}
function KnowCSS (hA) {
	var ret = KwRn(hA, null, null);
	var cssID = 'css_' + hA;
	var heAD = gHD();
	if (!KwLy(cssID)) {
		var cssTag = document.createElement('style');
		cssTag.innerHTML = ret[1];
		cssTag.id = cssID;
		heAD.appendChild(cssTag);
	}
	else if (ret[3]) { KwLy(cssID).innerHTML = ret[1]; }
	KwLy(hA).innerHTML = ret[2];
	//KnewCSS('');
}
function KnewCSS (hA) {
	var cssText = "";
	for (var i = 0; i<document.styleSheets.length; i++) {
		var classes = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
		if (typeof classes !== 'object') {
			for (var x in classes) {
				if (typeof classes[x] === 'object') {	
					cssText = classes[x].cssText || classes[x].style.cssText;
					var cssAttr = cssText.split("{");
					cssAttr = cssAttr[1].split("}");
					cssAttr = cssAttr [0].split(";");
					console.log(cssText);
					for (var y=0; y<cssAttr.length; y++) {
						var cssParts = cssAttr[y].split(":", 2);
						if (cssParts.length > 1) {
							cssParts[0] = cssParts[0].trim();
							cssParts[1] = cssParts[1].trim();
							console.log(cssParts);
							var sep = '-';
							if (cssParts[1].indexOf(' ') > -1) {
								sep = '=';
								cssParts[1] = cssParts[1].split(', ').join(',');
								cssParts[1] = cssParts[1].split(' ').join('/');
							}
							var converted = cssParts[0] + sep + cssParts[1];
							console.log(converted);
							console.log(' ');
						}
					}
				}
			}
		}
	}
}
function KwAe(dO, dT) {
	dO.innerHTML = dT;
	var dS = [];
	var dR = dO.childNodes;
	for (var i=0; dR[i]; i++) {
		if (dS && KwNd(dR[i], 'script') && (!dR[i].type || dR[i].type.toLowerCase() === 'text/javascript')) { dS.push(dR[i].parentNode ? dR[i].parentNode.removeChild(dR[i]) : dR[i]); }
	}
	for (var dA in dS) {
		if (typeof dA === 'string') { KwEs(dS[dA]); }
	}
}
function KwNd(nE, nN) {
	return nE.nodeName && nE.nodeName.toUpperCase() === nN.toUpperCase();
}
function KwEs(eL) {
	var eD = (eL.text || eL.textContent || eL.innerHTML || '');
	var eH = document.getElementsByTagName('head')[0] || document.documentElement;
	var eS = document.createElement('script');
	eS.type = 'text/javascript';
	eS.appendChild(document.createTextNode(eD));
	eH.insertBefore(eS, eH.firstChild);
	eH.removeChild(eS);
	if (eL.parentNode) { eL.parentNode.removeChild(eL); }
}
function KwAp(hA, hB) {
	var hC = KwLy(hB);
	if (hC) {
		if (KwOg[hB] !== hA.value) {
			KwOg[hB] = hA.value;
			KwAe(hC, hA.value);
			KnowCSS(hB);
		}
	}
}
function KwMp(jR, hR, kA) {
	var jY = '';
	var kB = kA + 'important';
	if (jR.indexOf('-important-') > -1) { jR = jR.replace('-important-', '-'); jY = kB; }
	else if (jR.indexOf('-important') > -1) { jR = jR.replace('-important', ''); jY = kB; }
	else if (jR.indexOf('!') > -1) { jR = jR.replace('!', ''); jY = kB; }
	else if (['important','!','!important'].includes(hR)) { jY = kB; }
	else if (hR.indexOf('-!-') > -1) { hR = hR.replace('-!-', '-'); jY = kB; }
	else if (hR.indexOf('-!') > -1) { hR = hR.replace('-!', ''); jY = kB; }
	else if (hR.indexOf('!') > -1) { hR = hR.replace('!', ''); jY = kB; }
	else { jY = ''; }
	return [jR, jY];
}
var mQ = ['any-hover','any-pointer','aspect-ratio','color','color-gamut','color-index','grid','height','hover','inverted-colors','light-level','max-aspect-ratio','max-color','max-color-index','max-height','max-monochrome','max-resolution','max-width','min-aspect-ratio','min-color','min-color-index','min-height','min-monochrome','min-resolution','min-width','monochrome','orientation','overflow-block','overflow-inline','pointer','resolution','scan','scripting','update','width'];
var mY = "^(" + mQ.join("|").replace('/-/gi', '\\-') + ")(.*)$";
function KwMq (mS) {
	return new RegExp(mY).exec(mS);
}
var wK = ['align-content','align-items','align-self','alt','animation','animation-delay','animation-direction','animation-duration','animation-fill-mode','animation-iteration-count','animation-name','animation-play-state','animation-timing-function','animation-trigger','app-region','appearance','aspect-ratio','backdrop-filter','backface-visibility','background-clip','background-composite','background-origin','background-size','border-after-color','border-after-style','border-after-width','border-after','border-before-color','border-before-style','border-before-width','border-before','border-bottom-left-radius','border-bottom-right-radius','border-end-color','border-end-style','border-end-width','border-end','border-fit','border-horizontal-spacing','border-image','border-radius','border-start-color','border-start-style','border-start-width','border-start','border-top-left-radius','border-top-right-radius','border-vertical-spacing','box-align','box-decoration-break','box-direction','box-flex-group','box-flex','box-lines','box-ordinal-group','box-orient','box-pack','box-reflect','box-shadow','box-sizing','clip-path','color-correction','column-axis','column-break-after','column-break-before','column-break-inside','column-count','column-fill','column-gap','column-progression','column-rule','column-rule-color','column-rule-style','column-rule-width','column-span','column-width','columns','cursor-visibility','dashboard-region','device-pixel-ratio','filter','flex','flex-basis','flex-direction','flex-flow','flex-grow','flex-shrink','flex-wrap','flow-from','flow-into','font-feature-settings','font-kerning','font-size-delta','font-smoothing','font-variant-ligatures','grid','grid-area','grid-auto-columns','grid-auto-flow','grid-auto-rows','grid-column','grid-column-end','grid-column-gap','grid-column-start','grid-gap','grid-row','grid-row-end','grid-row-gap','grid-row-start','grid-template','grid-template-areas','grid-template-columns','grid-template-rows','highlight','hyphenate-character','hyphenate-charset','hyphenate-limit-after','hyphenate-limit-before','hyphenate-limit-lines','hyphens','initial-letter','justify-content','justify-items','justify-self','line-align','line-box-contain','line-break','line-clamp','line-grid','line-snap','locale','logical-height','logical-width','margin-after','margin-after-collapse','margin-before','margin-before-collapse','margin-bottom-collapse','margin-collapse','margin-end','margin-start','margin-top-collapse','marquee','marquee-direction','marquee-increment','marquee-repetition','marquee-speed','marquee-style','mask','mask-attachment','mask-box-image','mask-box-image-outset','mask-box-image-repeat','mask-box-image-slice','mask-box-image-source','mask-box-image-width','mask-clip','mask-composite','mask-image','mask-origin','mask-position','mask-position-x','mask-position-y','mask-repeat','mask-repeat-x','mask-repeat-y','mask-size','mask-source-type','match-nearest-mail-blockquote-color','max-logical-height','max-logical-width','media-text-track-container','min-logical-height','min-logical-width','nbsp-mode','opacity','order','overflow-scrolling','padding-after','padding-before','padding-end','padding-start','perspective','perspective-origin','perspective-origin-x','perspective-origin-y','print-color-adjust','region-break-after','region-break-before','region-break-inside','region-fragment','rtl-ordering','ruby-position','scroll-snap-type','shape-image-threshold','shape-inside','shape-margin','shape-outside','svg-shadow','tap-highlight-color','text-color-decoration','text-combine','text-decoration-line','text-decoration-skip','text-decoration-style','text-decorations-in-effect','text-emphasis','text-emphasis-color','text-emphasis-position','text-emphasis-style','text-fill-color','text-justify','text-orientation','text-security','text-size-adjust','text-stroke','text-stroke-color','text-stroke-width','text-underline-position','text-zoom','transform','transform-2d','transform-3d','transform-origin','transform-origin-x','transform-origin-y','transform-origin-z','transform-style','transition','transition-delay','transition-duration','transition-property','transition-timing-function','user-drag','user-modify','user-select','animating-full-screen-transition','any-link','autofill','autofill-strong-password','drag','full-page-media','full-screen-ancestor','full-screen-controls-hidden','full-screen-document','full-screen','file-upload-button','inner-spin-button','input-placeholder','media-controls','media-controls-current-time-display','media-controls-enclosure','media-controls-fullscreen-button','media-controls-mute-button','media-controls-overlay-enclosure','media-controls-panel','media-controls-play-button','media-controls-time-remaining-display','media-controls-timeline','media-controls-toggle-closed-captions-button','media-controls-volume-control-container','media-controls-volume-control-hover-background','media-controls-volume-slider','meter-bar','meter-even-less-good-value','meter-inner-element','meter-optimum-value','meter-suboptimum-value','outer-spin-button','progress-bar','progress-inner-element','progress-value','search-cancel-button','search-results-button','slider-runnable-track','slider-thumb'];
var wY = "^" + wK.join("|").replace('/-/gi', '\\-');
function KwWk(wS) {
	return new RegExp(wY).test(wS);
}
function KwRn(hA, eV, eS) {
	var KwSt = {
		'minifyhtml': false,
		'minifycss': false,
		'minifyclasses': true,
		'normalize': false
	};
	var KwNc = '';
	var tS = (KwSt.minifycss === false) ? ['\n', '\n\t', '\n\t\t'] : ['', '', ''];
	var zC = new RegExp('class=["|\'](.*?)["|\']','gis');
	var zH = new RegExp('^([0-9a-f]{3,6})$', 'i');
	var zM = new RegExp('\\[(.*?)\\]','i');
	var zA = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!]{1,32})\{(.*?)\}','gis');
	var zE = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!]{1,32})\{(.*?)\}','gis');
	var zW = new RegExp('^([0-9]{1,6})$', 'i');
	var zD = new RegExp('^([0-9]{1,6})$', 'i');
	var zQ = new RegExp('^([0-9]{1,6})-([0-9]{1,6})$', 'i');
	var zF = new RegExp('([0-9]{1,6})-([0-9]{1,6})-(.*){1,100}', 'gis');
	var zX = new RegExp('([a-zA-Z0-9\-]{1,32})\\(\\((.*?)\\)\\)','gis');
	var zZ = new RegExp('\\{\\{\\$(.*?)\\}\\}','gi');
	var chg=false, ret=true, css='', html='', js='', i=0, j=0, zY='', zB='', aM='', sM='', cL={}, hB=[], hC='', hD='', hE='', hF='', hG='', hI='', hJ='', hK='', hL=[], hM='', hN={}, hO='', hP={}, hQ='', hR='', hS='', hT=[], hU='', hV='', hW='', hX=[], hY={}, hZ='', jA='', jB=[], jC='', jD=false, jE='', jF='', jG='', jH='', jI='', jJ='', jK='', jL='', jM='', jN=0, jO='', jP='', jQ=[], jR='', jS='', jT=[], jU='', jV='', jW=[], jX='', jY='', jZ='', kA='', kB=[], kC=[], kD=0, kE=[], kF=true, kG=true, kH=[], kI='', kJ=[], kK='', kL='', kM='', kN='', kO=false, kP=0, kR=1, kQ='';
	if (typeof hA === 'string') {
		jU = KwLy(hA);
		if (jU) {
			if (jU.tagName.toLowerCase() == 'textarea') { hA = jU.value; }
			else { hA = jU.innerHTML; }
		}
	}
	else if ('innerHTML' in hA) { jU = hA.innerHTML; hA = jU; }
	else { jU = hA; }
	if (typeof eS === 'object') {
		for (var eE in eS) {
			if (eE in KwSt) { KwSt[eE] = eS[eE]; }
		}
	}
	KwSa = {};
	KwCu = {};
	KwDs = {};
	KwGc = {};
	KwRc = {};
	KwFc = {};
	var iD = jU.id;
	if (hA.indexOf('<define') > -1) { css += 'define{display:none!important;visibility:hidden!important;height:0px!important;width:0px!important;padding:0px!important;margin:0px!important}'; }
	if (KwSt.normalize === true){ css+= '::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[hidden],template{display:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]::-webkit-search-decoration{-webkit-appearance:none}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a:active,a:hover{outline:0}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}body{margin:0}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}button[disabled],html input[disabled]{cursor:default}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}details{display:block}dfn{font-style:italic}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}figure{margin:1em 40px}h1{font-size:2em;margin:.67em 0}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;line-height:1.15}img{border-style:none;border:0}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input{line-height:normal}legend{border:0;padding:0;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}main{display:block}mark{background:#ff0;color:#000}optgroup{font-weight:700}pre{font-family:monospace,monospace;font-size:1e;overflow:auto}progress{vertical-align:baseline}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}summary{display:list-item}sup{top:-.5em}svg:not(:root){overflow:hidden}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}template{display:none}textarea{overflow:auto}'; }
	if (iD in KwOg === false) { KwOg[iD] = hA; }
	jH = hA;
	while ((zB = zZ.exec(hA)) !== null) {
		jG = '';
		if (typeof cssVars === 'object') {
			if (zB[1] in cssVars) { jG = cssVars[zB[1]].replace('/\\\\/gis', ''); }
		}
		kD = 0;
		while (jH.indexOf(zB[0]) > -1) {
			jH = jH.replace(zB[0], jG);
			kD++;
			if (kD > 500) { break; }
		}
	}
	html = jH.toString();
	var uR = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim;
	var uM = '';
	while ((uM = uR.exec(html)) !== null) { js += uM[0]; }
	if (js.length > 0) { html = html.replace(uR, ''); }
	hA = jH.toString().replace(uR, '');
	jH = '';
	KwNc = hA.replace(/[\s\n\r]/gi, '');
	while ((zY = zC.exec(hA)) !== null) {
		hM = '';
		hN = {};
		hP = {};
		hS = '';
		hT = [];
		hJ = '';
		jQ = [];
		hQ = zY[1];
		kH = [];
		kI = '';
		kJ = '';
		while ((aM = zA.exec(hQ)) !== null) {
			if (aM[1].indexOf('+') > -1) {
				jW = aM[1].split('+');
				hQ = '';
				if (aM[1].indexOf('!') > -1) {
					for (i=0; i<jW.length; i++) {
						kI = jW[i].replace('!', '');
						if (KwSs.includes(kI)) {
							kH[kH.length] = kI;
							kJ = aM[2];
						}
					}
				}
				else {
					for (i=0; i<jW.length; i++) {
						if (jW[i] in KwRe) { hQ += ' ' + jW[i] + '{' + aM[2] + '}'; }
					}
				}
			}
			else if (hQ.indexOf('!') == 0) {
				kI = hQ.replace('!', '');
				kH = [];
				if (KwSs.includes(kI)) {
					hQ = '';
					kH[kH.length] = kI;
					kJ = aM[2];
				}
			}
			break;
		}
		if (kH.length > 0) {
			for (i=0; i<KwSs.length; i++) {
				if (kH.includes(KwSs[i]) === false ) { hQ += ' ' + KwSs[i] + '{' + kJ + '}'; }
			}
		}
		hI = hQ;
		while ((aM = zF.exec(hQ)) !== null) {
			kN = aM[1] + '-' + aM[2] + '{' + aM[3] + '}';
			hQ = hQ.replace(aM[0], kN);
		}
		
		while ((aM = zE.exec(hQ)) !== null) {
			kO = false;
			if (KwCm(aM[1]) === false) {
				if (aM[1].indexOf('+') > -1) {
					jW = aM[1].split('+', 2);
					aM[1] = '';
					for (i=0; i<jW.length; i++) {
						if (jW[i] in KwRe) { aM[1] += '_' + jW[i]; }
					}
				}
				else if (aM[1].indexOf('-') > -1) {
					if (!zQ.test(aM[1])) {
						if (aM[1] in KwRe) {
						}
						else {
							jW = aM[1].split('-');
							if (['media','random'].includes(jW[0])) { kO = true; }
							else if (jW[1] in KwRe) {
								aM[1] = jW[1];
								aM[2] = jW[0] + '(' + aM[2] + ')';
							}
							else {
								aM[1] = jW[0];
								aM[2] = jW[1] + '(' + aM[2] + ')';
							}
						}							
					}
				}
			}
			if (kO) {
				jA = aM[2];
				jV = aM[1];
				if (jV in hP) { hP[jV] += ' ' + aM[2]; }
				else { hP[jV] = aM[2]; }
			}
			else {
				if (aM[1] in KwRe) { aM[1] = KwRe[aM[1]][0]; }
				jA = aM[2];
				while ((sM = zX.exec(aM[2])) !== null) {
					jV = aM[1] + '_' + sM[1];
					if (jV in hP) { hP[jV] += ' ' + sM[2]; }
					else { hP[jV] = sM[2]; }
					jA = jA.replace(sM[0], '');
				}
				if (jA.length > 0) {
					if (aM[1] in hP) { hP[aM[1]] += ' ' + jA; }
					else { hP[aM[1]] = jA; }
				}
			}
			hI = hI.replace(aM[0], '');
		}
		
		hP.main = hI;
		for (hR in hP) {
			if (typeof hP[hR] === 'string') {
				hG = '';
				hX = [];
				jC = true;
				hW = '';
				jE = false;
				jP = false;
				kF = true;
				kQ = '';
				hB = hP[hR].split(/(\s+)/).filter(e => e.trim().length > 0);
				if (hR.indexOf('_') > -1) {
					hW = hR;
					jB = hR.split('_', 2);
					hZ = jB[0];
					hR = jB[1];
				}
				else if (zQ.test(hR)) {
					KwRe[hR] = hR.split('-', 2);
					hZ = hR;
					jC = false;
					kF = false;
				}
				else if (zW.test(hR)) { hZ = hR; jC = false; }
				else if (hR == '0') { hZ = hR; jC = false; }
				else if (hR.indexOf('random') == 0) { kP++; kQ = '_' + kP; hZ = hR; jC = false; }
				else if (hR.indexOf('media-') == 0) { hZ = hR; jC = false; }
				else if (['screen','print','speech','notscreen','notprint','notspeech','onlyscreen','onlyprint','onlyspeech','font-face'].includes(hR)) { hZ = hR; jC = false; }
				else { hZ = ''; }
				if (hB.length > 0) {
					kN = hB.length;
					for (i=0; i<kN; i++) {
						hD = hB[i];
						if (hD.indexOf('!') > -1) {
							kC = hD.split('-');
							kK = kC[0].replace('!', '');
							if (KwSs.includes(kK) === true) {
								kC.shift();
								kL = kC.join('-');
								kM = false;
								for (j=0; j<KwSs.length; j++) {
									if (KwSs[j] != kK) {
										if (kM) { hB[hB.length] = KwSs[j] + '-' + kL; }
										else {
											hD = KwSs[j] + '-' + kL;
											hB[i] = hD;
											kM = true;
										}
									}
								}
								kN = hB.length;
							}
						}
						jS = hD;
						jR = hD.toLowerCase();
						[jR, jY] = KwMp(jR, hR, '-');
						if ((jR.indexOf('-') < 0) && (jR.indexOf('[') < 0)) {
							if (typeof KwKc === 'object') {
								if (jR in KwKc) { hD = KwKc[jR] + jY; }
								else {
									jR = jR.replace(/[^a-z0-9]/g,'');
									if (jR in KwKc) { hD = KwKc[jR] + jY; }
								}
							}
						}
						kC = hD.split('-');
						zM = new RegExp('\\[(.*?)\\]','i');
						if (zM.test(hD)) {
							KwCu[hD.substr(1, hD.length-2)] = true;
							if (hD in KwSa) { hN[hD] = KwSa[hD]; }
							else { hN[hD] = ''; jP = true; }
						}
						else if ((['retain','keep','my'].includes(hR)) || (kC.length < 1) || (['bi','fa','retain','keep','my'].includes(kC[0]))) {
							if (hT.includes(hD) === false) { hT[hT.length] = hD; }
						}
						else {
							hU = '';
							jF = '';
							kG = true;
							jM = hD;
							[hD, hU, jF] = KwCs(hD);
							if (hD.indexOf('=') > -1) {
								kB = hD.split('=', 2);
								hC = kB[0].split('-');
								hC[hC.length] = kB[1];
							}
							else { hC = hD.split('-'); }
							if (hC[0].indexOf(':') > -1) {
								jT = hC[0].split(':', 2);
								hC[0] = jT[1];
								hZ = jT[0];
								if (hZ in KwRe) { hZ = KwRe[hZ][0]; }
								else if (zD.test(hC[0])) {
									hZ = hC[0];
									hC.shift();
								}
							}
							else {
								if (hC[0] in KwRe) {
									hZ = KwRe[hC[0]][0];
									hC.shift();
								}
								else if (zD.test(hC[0])) {
									hZ = hC[0];
									hC.shift();
								}
							}
							if (hD.indexOf('#') == 0) {
								hF = hC.shift();
								hE = hC.join('-').trim();
							}
							else if (hD.indexOf('gradient') == 0) {
								//background-image=linear-gradient
								hC.shift();
								hF = 'background-image';
								hE = 'linear-gradient(' + hC.join(',').trim() + ')';
								hE = hE.replace(/,(bottom|top|left|right)/gi, ' $1');
								kG = false;
							}
							else {
								hE = hC.pop();
								hF = hC.join('-').trim();
							}
							if (typeof KwKc === 'object') {
								jR = hF.toLowerCase();
								[jR, jY] = KwMp(jR, hR, '-');
								if (['important','!','!important'].includes(hR)) {
									jY = '';
									if (jF.indexOf('!important') < 0) { jF += '!important'; }
								}
								if (jR in KwKc) { hF = KwKc[jR]; }
								else {
									jR = jR.replace(/[^a-z0-9]/g,'');
									if (jR in KwKc) { hF = KwKc[jR]; }
								}
								hF += jY;
							}
							if (hE.indexOf('/') > -1) {
								if (hD.indexOf('family') == -1) { hE = hE.replace(/\//g, ' '); }
								else { hE = '"' + hE.replace(/\//g, ' ') + '"'; }
							}
							if (!kG) { }
							else if ((hF.indexOf('color') > -1) || (hF.indexOf('background') > -1)) {
								jN = 100;
								jX = '';
								if (hE.indexOf('*') > -1) { jX = '*'; }
								else if (hE.indexOf('@') > -1) { jX = '@'; }
								else if (hE.indexOf('~') > -1) { jX = '~'; }
								if (jX.length > 0) {
									jO = hE.split(jX, 2);
									hE = jO[0];
									if (jO.length > 1) { jN = parseInt(jO[1]); }
								}
								hE = hE.replace('#', '');
								if (hE in hexColors) { hE = hexColors[hE].trim(); }
								if (zH.test(hE)) {
									if (jN != 100) { hE = KwSh(hE, jN); }
									hE = '#' + KwHx(hE);
								}
							}
							if (hR.indexOf('+') == 0) { hZ = ''; }
							if (!kF) { hR = ''; }
							hV = hU + hF + ':' + hE + jF + ';';
							hG += hV;
							if (KwWk(hF) === true) {
								hV += hU + '-webkit-' + hF + ':' + hE + jF + ';';
								hV += hU + '-moz-' + hF + ':' + hE + jF + ';';
								hV += hU + '-ms-' + hF + ':' + hE + jF + ';';
								hV += hU + '-o-' + hF + ':' + hE + jF + ';';
							}
							if (KwSt.minifyclasses === false) {
								jR = '';
								if (hR !== 'main') {
									if (!jC) { jR += 'width-'; }
									jR += hR + '-';
								}
								jR += jM;
								jR = KwSc(jR);
								jQ[jQ.length] = [hD, jS, hV, hR, hZ];
							}
							else { hX[hX.length] = [hZ+kQ, hV, hW, hR]; }
						}
					}
				}
				hM = '';
				jD = false;
				kA = hZ + kQ + '-' + hG;
				if ((!jP) && (hG.length > 0) && (hS.length > 0)) { hG = hS + '{' + hG + '}'; hJ = ''; }
				if ((kA.length > 0) && (kA in cL)) { hJ = cL[kA]; }
				else if (hJ.length > 0) { jD = true; }
				else {
					hK = Object.keys(cL).length.toString().length;
					hJ = KwID(hK);
					cL[kA] = hJ;
				}
				for (hO in hN) {
					if (hN[hO].length == 0) { KwSa[hO] = hJ; }
					else if (hM.indexOf(KwSa[hO] + ' ') == -1) { hM += KwSa[hO] + ' '; }
				}
				if ((hG.length > 0) || (hM.length > 0)) {
					jE = '';
					hS = '';
					jZ = '';
					if (jC) { [hS, jE, jZ] = KwMf(hR); }
					if (hR.length > 0) {
						if (hZ == 'all') { hS = ' *' + hS; }
					}
					if (hX.length > 0) {
						jJ = jE + '.' + hJ + hS;
						for (i=0; i<hX.length; i++) {
							jK = hX[i][0];
							jL = hX[i][1];
							if (jK == 'all') { jK = ''; }
							else if (jK.length > 0) {
								if (jK in KwRc === false) { KwRc[jK] = {}; }
								if (jL in KwRc[jK] === false) { KwRc[jK][jL] = jJ; }
								else if (KwRc[jK][jL].indexOf(jJ) == -1) { KwRc[jK][jL] += ',' + jJ; }
							}
							else if (jP) {
								if (jJ in KwFc === false) { KwFc[jJ] = jL; }
								else { KwFc[jJ] += jL; }
							}
							else {
								if (jL in KwGc === false) { KwGc[jL] = jJ; }
								else if (KwGc[jL].indexOf(jJ) == -1) { KwGc[jL] += ',' + jJ; }
							}
						}
					}
					if (KwSt.minifyclasses === true) {
						if ((!jD) || (hM.length > 0)) {
							if (hX.length > 0) {
								if (hJ.length > 0) {
									if (hT.includes(hJ+kQ) === false) { hT[hT.length] = hJ+kQ; }
								}
							}
							if (hM.length > 0) {
								if (hT.includes(hM.trim()) === false) { hT[hT.length] = hM.trim(); }
							}
						}
					}
				}
			}
		}
		if (jQ.length > 0) {
			hT = [];
			for (i=0; i<jQ.length; i++) {
				hR = jQ[i][3];
				[hS, jE, jZ] = KwMf(hR);
				jK = jQ[i][4];
				jQ[i][0] = KwSc(jQ[i][0]);
				jQ[i][1] = KwSc(jQ[i][1]);
				if (jK.length > 0) {
					jJ = jE + '.' + jQ[i][1];
					jL = jQ[i][2];
					if (hS.length > 0) { jJ += hS; }
					if (jK in KwRc === false) { KwRc[jK] = {}; }
					if (jL in KwRc[jK] === false) { KwRc[jK][jL] = jJ; }
				}
				else { KwFc[jE + '.' + jQ[i][1] + hS] = jQ[i][2]; }
				jI = jQ[i][1];
				if (hT.includes(jI) === false) { hT[hT.length] = jI; }
			}
			for (hO in hN) {
				if (hN[hO].length == 0) { KwSa[hO] = hT.join(' ').trim(); }
			}
		}
		if (hM.length > 0) {
			if (hT.includes(hM.trim()) === true) { hM = ''; }
		}
		if ((hT.length > 0) || (hM.length > 0)) { html = html.replace(zY[0], 'class="' + hM + hT.join(' ').trim() + '"'); }
	}
	if (iD in KwPc === false) { KwPc[iD] = ['', '', '']; }
	if (KwNc != KwPc[iD][0]) {
		chg = true;
		for (var xX in KwGc) {
			if (KwGc[xX] in hY) { hY[KwGc[xX]] += ' ' + xX; }
			else { hY[KwGc[xX]] = xX; }
		}
		for (var xT in KwFc) {
			if (typeof KwFc[xT] === 'string') { css += tS[0] + xT + '{' + tS[1] + KwFc[xT] + tS[0] + '}'; }
		}
		for (var xQ in hY) {
			if (typeof hY[xQ] === 'string') { css += tS[0] + xQ + '{' + tS[1] + hY[xQ] + tS[0] + '}'; }
		}
		var xB = [];
		for (var xK in KwRc) {
			if (typeof xK === 'string') { xB.unshift(xK); }
		}
		xB.sort(function(a, b) { return b-a; });
		var xZ = '';
		var xY = '';
		var xU = '';
		var xV = '';
		var xI = false;
		var xR = [];
		for (i=0; i<xB.length; i++) {
			xZ = xB[i];
			xV = '';
			if (xZ in KwRc) {
				hL = [];
				kR = 1;
				if (xZ.indexOf('random') == 0) {
					xV = KwMf(xZ)[0];
					css += tS[0] + '';
					xI = true;
					kR = 0;
				}
				else if (xZ.indexOf('media-') == 0) {
					xU = xZ.replace('media-', '');
					xY = KwMq(xU);
					if (xY) {
						xU = xY[1];
						xY[2] = xY[2].replace(/-/g, '').replace(/\//g, ' ');
						if (xY[2].length > 0) { xU += ":" + xY[2]; }
					}
					css += tS[0] + '@media (' + xU + ') {';
				}
				else if (['print','screen','speech'].includes(xZ)) { css += tS[0] + '@media ' + xZ + ' {'; }
				else if (['notprint','notscreen','notspeech'].includes(xZ)) { css += tS[0] + '@media not ' + xZ.replace('not','') + ' {'; }
				else if (['onlyprint','onlyscreen','onlyspeech'].includes(xZ)) { css += tS[0] + '@media only ' + xZ.replace('not','') + ' {'; }
				else if (['font-face'].includes(xZ)) { css += tS[0] + '@' + xZ + ' {';}
				else if (xZ.indexOf('-') > -1) {
					kE = xZ.split('-', 2);
					css += tS[0] + '@media screen and (min-width:' + kE[0] + 'px) and (max-width:' + kE[1] + 'px){';
				}
				else if (xZ in KwRe) { css += tS[0] + '@media screen and (min-width:' + KwRe[xZ][0] + 'px) and (max-width:' + KwRe[xZ][1] + 'px){'; }
				else { css += tS[0] + '@media screen and (max-width:' + KwRc[xZ][0] + 'px){'; }
				for (var xA in KwRc[xZ]) {
					if (KwRc[xZ][xA] in hL) { hL[KwRc[xZ][xA]] += ' ' + xA; }
					else { hL[KwRc[xZ][xA]] = xA; }
				}
				for (var xP in hL) {
					if (typeof hL[xP] === 'string') {
						if (xI) {
							xR = hL[xP].split(' ');
							if (xR.length > 1) { hL[xP] = xR[Math.floor(Math.random()*xR.length)]; }
						}
						css += tS[kR] + xP + xV + '{' + tS[kR+1] + hL[xP] + tS[kR] + '}';
					}
				}
				if (!xI) { css += tS[0] + '}'; }
			}
		}
		if (KwSt.minifycss === true) {
			css = css.replace(/;\}/g, '\}').replace(/\{ /g, '\{').replace(/; /g, ';');
		}
		if (KwSt.minifyhtml === true) { html = html.replace(/[\n|\r|\t]/gm, ''); }
		KwPc[iD] = [KwNc, css.trim(), js.trim() + html.trim()];
	}
	return [ret, KwPc[iD][1], KwPc[iD][2], chg];
}
