'use strict';

/*
KnowCSS Version 2.0.4 by Jay Doublay
https://www.knowcss.com/

NPM: https://www.npmjs.com/package/knowcss
Repo: https://github.com/knowcss/knowcss
*/

var knowCSSOptions = {
    hexColors: typeof hexColors !== 'undefined' && hexColors != null ? hexColors : {},
    shortHand: typeof shortHand !== 'undefined' && shortHand != null ? shortHand : {},
    cssVars: typeof cssVars !== 'undefined' && cssVars != null ? cssVars : {},
    mixins: typeof mixins !== 'undefined' && mixins != null ? mixins : {},
    conditionals: typeof conditionals !== 'undefined' && conditionals != null ? conditionals : {}
};

var knowCSS = {
    settings: function (vals) {
        if (vals) {
            for (var val in vals) { this.x[val] = vals[val]; };
            return this;
        }
        else { return this.x; }
    },

    debug: function (val) {
        this.debugging = defined(val) ? val : true;
        return this;
    },

    options: function (options) {
        if (options) {
            for (var key in options) {
                if (key in knowCSSOptions) { knowCSSOptions[key] = options[key]; }
            }
        }
        return this;
    },

    compile: function (val, options) {
        this.options(options);
        var ret = knowCSSRender(val, true);
        return ret;
    },

    render: function (val, refresh, options) {
        if (refresh) { cssIncrement = 0; }
        this.options(options);
        var startTime = new Date().getTime();
        this.z = document.querySelectorAll(this.key);
        if (this.z === 'undefined' || this.z == null) { this.z = []; }
        if (this.z) { knowCSSRender("root", false); }
        var renderIn = knowLayer('render');
        if (renderIn && renderIn.innerText.length == 0) { renderIn.innerText = '{ page rendered in ' + (new Date().getTime() - startTime) + "ms }"; }
        return this;
    },

    document: function () {
        getDocument();
        return this;
    },

    // TODO - add/remove observer
    watch: function (val) {
        val = val || true;
        return this;
    },

    startup: function () { return knowStartup; },

    now: knowCSSNow,

    init: function () {
        return this.document().render();
    },

    constructor: knowCSSProto
};

const knowID = 'know';

var runningValue = '', allMixins = {}, classNext = '', classNextStart = '', smartClassNext = '', cssIncrement = 0, knowStartup = null;
var screenSized = { "xxsm": 479, "xsm": 639, "sm": 767, "md": 1023, "lg": 1535, "xl": 1919, "xxl": 99999 };
var screenNum = 1, screenVal = 0, screenSizes = {};
for (var key in screenSized) {
    screenVal = screenSized[key] + (key == 'xxl' ? 0 : 0.98);
    screenSizes[key] = [screenNum, screenVal];
    screenSizes[key + "down"] = [1, screenVal];
    screenSizes[key + "up"] = [screenNum, screenSized.xxl];
    screenSizes[screenNum] = [screenNum, screenVal];
    screenSizes[screenNum + "down"] = [1, screenVal];
    screenSizes[screenNum + "up"] = [screenNum, screenSized.xxl];
    screenNum = screenVal + 0.02;
};
var screenSizeKeys = Object.keys(screenSizes);
var screenTypes = ["media", "print", "screen", "speech", "!print", "!screen", "!speech", "notprint", "notscreen", "notspeech", "onlyprint", "onlyscreen", "onlyspeech"];

var masterTab = '\t', masterLine = '\n';

var defined = function (val) { return typeof val !== 'undefined' && val != null; };

/*
function getBrowser () { // know="safari{} chrome{} firefox{} edge{} opera{} etc" }
function getOS () { // know="mac{} win{} linux{} unix{} etc" }
function getPlatform () { // know="ios{} android{} windows{}" }
function getView () { // know="mobile{} tablet{} desktop{}" }
function getOrientation { // know="landscape{} portrait{}" }
function getSession { know="new{} return{} return-X{}" }
*/

function knowCSSNow() { var hW = window.open("../src/now/index.html", "KnowCSS Now", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=" + (screen.height - 200) + ",top=50,left=" + (screen.width - 600)); }

function knowLayer(name) {
    return document.getElementById(name);
}
function getImportant(val) {
    var important = '';
    val = (typeof val === 'string') ? val : '';
    val = val.replace('-!', '!').replace('-important', '!').replace('!important', '!').replace(/\!\!+/g, '!');
    if (val.indexOf('!') > -1) {
        val = val.replace('!', '');
        important = '!';
    }
    return [val, important];
}

// TODO - add support for col-SCREEN and offset-SCREEN (ex: col-sm-1 offset-xl-3)
// Already have support for SCREEN-col and SCREEN-offset
function getGridSystem(classFound, classesFound) {
    if (classFound == "row") {
        classFound = "width-100%";
        classesFound.push("display=-webkit-box", "display=-ms-flexbox", "display-flex", "-ms-flex-wrap-wrap", "flex-wrap-wrap");
    }
    else if (classFound.indexOf('col-') == 0) {
        var whichCol = classFound.replace(/^col-/, '');
        var whichPct = (parseInt(whichCol) / 12) * 100;
        classFound = "width-" + parseFloat(whichPct.toFixed(6)) + "%";
        classesFound.push("flex-0/0/auto", "flex-basis-0", "-webkit-box-flex-1", "-ms-flex-positive-1", "flex-grow-1", "max-" + classFound, "position-relative", classFound);
    }
    else if (classFound.indexOf('offset-') == 0) {
        var whichOffset = classFound.replace(/^offset-/, '');
        var whichPct = (parseInt(whichOffset) / 12) * 100;
        classFound = "margin-left-" + parseFloat(whichPct.toFixed(6)) + "%";
    }
    return [classFound, classesFound];
}
function shouldREM(className) {
    var ret = false;
    if (['font-size', 'line-height', 'width', 'height'].includes(className)) { ret = true; }
    else if (['margin', 'paddin', 'spacin'].includes(className.substring(0, 6))) { ret = true; }
    else if (['top', 'bottom', 'left', 'right'].includes(className)) { ret = true; }
    return ret;
}
function getREM(className, classValue, classesFound) {
    if (shouldREM(className) && classValue.indexOf('px') > -1) {
        var classRoot = classValue.replace('px', '');
        if (!isNaN(classRoot) && classRoot > 0) {
            var classRem = parseInt(classRoot) / 16;
            if (!isNaN(classRem) && classRem > 0) { classesFound.push(className + '-' + classRem + 'rem'); }
        }
    }
    return classesFound;
}
function getParentSelector (screen) {
    var classParent = screen.indexOf('parent') > -1;
    if (classParent && screen.indexOf('-') > -1) {
        var modifierParts = screen.split('-', 2);
        if (modifierParts[0] in screenSizes) { screen = modifierParts[0]; }
        else if (modifierParts[1] in screenSizes) { screen = modifierParts[1]; }
        else { screen = 'none'; }
    }
    return [classParent, screen];
}
var knowEnvironment = [];
var userConditionals = [];
function getNavigator () {
    return {
        agent: navigator.userAgent,
        vendor: navigator.vendor,
        platform: navigator.platform
    };
}
function getuserConditionals () {
    var navigatorInfo = getNavigator();
    var userAgent = navigatorInfo.agent;
    var vendor = navigatorInfo.vendor;
    var platform = navigatorInfo.platform;

    var w = window.innerWidth;
    var h = window.innerHeight;
    var pixelRatio = window.devicePixelRatio;

    var fixedConditionals = {
        chrome: /Google Inc/.test(vendor) || /CriOS/.test(userAgent),
        safari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
        firefox: /Firefox|FxiOS/.test(userAgent),
        edge: /Edge|Edg|EdgiOS/.test(userAgent),        
        opera: /OPR|Opera/.test(userAgent),
        cordova: !!window.cordova,
        ie: /MSIE|Trident/.test(userAgent),
        chromium: !!window.chrome && !/Edge/.test(userAgent),
        vivaldi: /Vivaldi/.test(userAgent),
        yandex: /YaBrowser/.test(userAgent),

        mac: /Macintosh|MacIntel|MacPPC|Mac68K/.test(platform),
        win: /Win32|Win64|Windows|WinCE/.test(platform),
        linux: /Linux/.test(platform),
        unix: /X11/.test(platform),

        lowres: pixelRatio < 2,
        hires: pixelRatio >= 2,

        ios: /(iPhone|iPad|iPod)/.test(userAgent),
        android: /Android/.test(userAgent),
        windows: /IEMobile/.test(userAgent) || (/Windows/.test(userAgent) && /Phone/.test(userAgent)),
        blackberry: /BlackBerry/.test(userAgent),

        portrait: h > w,
        landscape: w > h,
        square: w == h,

        mobile: userAgent.mobile || false,
        touch: ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || false
    };
    knowEnvironment.desktop = !knowEnvironment.mobile;
    for (var key in knowEnvironment) {
        if (knowEnvironment[key]) { userConditionals.push(key); }
    }
    if (typeof knowCSSOptions.conditionals !== 'undefined') {
        for (var key in knowCSSOptions.conditionals) {
            fixedConditionals[key] = knowCSSOptions.conditionals[key];
            if (knowCSSOptions.conditionals[key]) { userConditionals.push(key); }
        }
    }
    knowEnvironment = Object.keys(fixedConditionals);
}
function getEnvironmentSelector (screen) {
    var classEnvironment = "";
    var allowEnvironment = true;
    var reverseEnvironment = false;
    if (screen.indexOf('-') > -1) {
        var modifierParts = screen.split('-', 2);
        if (modifierParts[0] in screenSizes) { [screen, classEnvironment] = modifierParts; }
        else if (modifierParts[1] in screenSizes) { [classEnvironment, screen] = modifierParts; }
        else { screen = 'none'; }
    }
    else { classEnvironment = screen; }
    if (classEnvironment.indexOf('!') > -1) {
        reverseEnvironment = true;
        classEnvironment = classEnvironment.replace('!', '');
    }
    if (knowEnvironment.indexOf(classEnvironment) == -1) { classEnvironment = ""; }
    else {        
        if (userConditionals.indexOf(classEnvironment) == -1) { allowEnvironment = false; }
        else if (classEnvironment == screen) { screen = 'none'; }
        if (reverseEnvironment) { allowEnvironment = !allowEnvironment; }
    }
    return [classEnvironment, screen, allowEnvironment];
}
function getShorterHand(classFound, classesFound, ii) {
    if (ii == 0) {
        console.log(['getShorterHand', classFound, classFound in globalMixins]);
    }
    if (classFound in globalMixins) {
        classFound = globalMixins[classFound].trim();
        if (classFound.indexOf(' ') > -1) {
            var classMore = classFound.split(/(\s+)/).filter(e => e.trim().length > 0);
            classFound = classMore.shift();
            if (classMore.length > 0) { classesFound.concat(...classMore); }
        }
    }
    return [classFound, classesFound];
}
function getShortHand(classFound, classesFound) {
    var classWebKit = false;
    if (!isNaN(classFound)) { classFound = "font-size-" + classFound + "px"; }
    else if (defined(knowCSSOptions.shortHand)) {
        if (classFound.indexOf('-webkit-') > -1) { classFound = classFound.replace('-webkit-', ''); classWebKit = true; }
        else if (classFound.indexOf('-moz-') > -1) { classFound = classFound.replace('-moz-', ''); classWebKit = true; }
        else if (classFound.indexOf('-ms-') > -1) { classFound = classFound.replace('-ms-', ''); classWebKit = true; }
        else if (classFound.indexOf('-o-') > -1) { classFound = classFound.replace('-o-', ''); classWebKit = true; }
        if (classFound.indexOf('--') > -1) { classFound = classFound.replace(/\-{2,100}$/g, '-'); }
        if (classFound in knowCSSOptions.shortHand) {
            classFound = knowCSSOptions.shortHand[classFound].trim();
            if (classFound.indexOf(' ') > -1) {
                var classMore = classFound.split(/(\s+)/).filter(e => e.trim().length > 0);
                classFound = classMore.shift();
                if (classMore.length > 0) { classesFound.push(...classMore); }
            }
        }
    }
    return [classFound, classesFound, classWebKit];
}
function getValue(val) {
    if (defined(knowCSSOptions.hexColors) && val.indexOf('/') > -1) {
        val = val.replace(/\//g, ' ');
        var vals = val.split(' ');
        if (vals.length > 2) {
            if (vals[2] in knowCSSOptions.hexColors) {
                vals[2] = '#' + getShortColor(knowCSSOptions.hexColors[vals[2]]);
                val = vals.join(' ');
            }
        }
    }
    return val;
}
function getKey(screen, modifier, name, action, val, important) {
    var key = (screen + '_' + modifier + '_' + name + '_' + action + '_' + val + '_' + important).toLowerCase().replace(/[\s\n\r]/gi, '-');
    return key;
}
function getDynamic(container) {
    var dynamic = '';
    if (container == 'all') { dynamic = ' *'; }
    else if (container.indexOf('all-') == 0) { dynamic = ' ' + container.replace('all-', ''); }
    else if (container.indexOf('all>') == 0) { dynamic = ' ' + container.replace('all>', '> '); }
    else if (container.indexOf('nth-child') > -1) { dynamic = ':nth-child(' + container.replace('nth-child-', '') + ')'; }
    else if (container.indexOf('nth-last-child') > -1) { dynamic = ':nth-last-child(' + container.replace('nth-last-child-', '') + ')'; }
    else if (container.indexOf('nth-of-type') > -1) { dynamic = ':nth-of-type(' + container.replace('nth-of-type-', '') + ')'; }
    else if (container.indexOf('nth-last-of-type') > -1) { dynamic = ':nth-last-of-type(' + container.replace('nth-last-of-type-', '') + ')'; }
    return dynamic;
}
function getModifier(classList, classSecondary) {
    var zA = '', aM = [];
    if (classSecondary) { zA = new RegExp('([a-zA-Z0-9\-]{1,255})\\(\\((.*?)\\)\\)', 'gis'); }
    else { zA = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!]{1,255})\{(.*?)\}', 'gis') }
    var screen = '', modifier = '', action = '', container = '', dynamic = '', grepTag = '', multiScreen = [], multiContainer = [], notContainer = '', manyModifier = [];
    var containers = {}, screens = {}, modifiers = {}, actions = {};
    var classListCheck = {}, containerPrefix = '', keyNew = '', actionSet = {};
    for (var key in classList) { classListCheck[key] = true; }
    for (var key in classListCheck) {
        grepTag = classList[key];
        while ((aM = zA.exec(grepTag)) !== null) {
            containers = {};
            screens = {};
            [screen, modifier, action] = key.split('_', 3);
            classList[key] = classList[key].replace(aM[0], '').trim();
            container = aM[1];
            multiScreen = false;
            dynamic = getDynamic(container);
            if (dynamic.length > 0) { classList[screen + '_' + dynamic + '_' + action] = aM[2]; }
            else {
                [screen, modifier, action] = key.split('_', 3);
                containers[container] = true;
                modifiers[modifier] = true;
                actions = getActions(container, action);
                screens = getScreens(container, screen);
                for (var containerKey in containers) {
                    for (var screenKey in screens) {
                        for (var modifierKey in modifiers) {
                            var actionsLen = actions.length;
                            var i = 0;
                            while (i < actionsLen) {
                                actionSet = actions[i];
                                for (var actionKey in actionSet) {
                                    containerPrefix = actionSet[actionKey];
                                    if (screenKey in screenSizes) { screenKey = screenSizes[screenKey].join('-'); }
                                    keyNew = '';
                                    if (containerPrefix.length > 0) {
                                        keyNew = screenKey + '_' + containerPrefix + actionKey + '_';
                                    }
                                    else if (containerKey !== 'none' || modifierKey !== 'none' || actionKey !== 'none' || containerKey.indexOf('media-') == 0 || screenTypes.includes(containerKey) || ['font-face'].includes(containerKey)) {
                                        keyNew = containerKey + '_' + modifierKey + '_' + actionKey;
                                    }
                                    if (keyNew.length > 0) {
                                        if (keyNew in classList) { classList[keyNew] += ' ' + aM[2]; }
                                        else { classList[keyNew] = aM[2]; }
                                    }
                                }
                                i++;
                            }
                        }
                    }
                }
            }
        }
    }
    return classList;
}
function getColor(hE, hC) {
    if (hC.indexOf('background') > -1 || hC.indexOf('color') > -1) {
        if (hE.indexOf('(') == -1) {
            var aM = [];
            var zY = [false, 100, 100];
            var zS = [
                [new RegExp('^(.*)@(.*)~(.*)$', 'i'), 1, 2],
                [new RegExp('^(.*)~(.*)@(.*)$', 'i'), 2, 1],
                [new RegExp('^(.*)@(.*)$', 'i'), 1, 1],
                [new RegExp('^(.*)~(.*)$', 'i'), 2, 2]
            ];
            var x = zS.length;
            var i = 0;
            while (i < x) {
                while ((aM = zS[i][0].exec(hE)) !== null) {
                    if (aM.length > 1) {
                        zY[0] = true;
                        hE = aM[1];
                        if (aM.length >= 3) { zY[zS[i][1]] = parseInt(aM[2]); }
                        if (aM.length >= 4) { zY[zS[i][2]] = parseInt(aM[3]); }
                        break;
                    }
                }
                if (zY[0]) { break; }
                i++;
            }
            var hF = hE.replace('#', '');
            if (defined(knowCSSOptions.hexColors) && hF in knowCSSOptions.hexColors) { hF = knowCSSOptions.hexColors[hF].trim(); }
            var zH = new RegExp('^([0-9a-f]{1,6})$', 'i');
            if (zH.test(hF)) {
                hF = getShade(hF, zY[1]);
                if (zY[2] != 100) { hE = getOpacity(hF, zY[2]); }
                else { hE = '#' + getHex(hF); }
            }
            else { hE = '#' + hF; }
        }
    }
    return hE;
}
function getHex(sC) {
    var sH = sC.toString(16);
    return (sH.length == 1) ? '0' + sH : sH;
}
function getRGB(sC) {
    var sA = null;
    if (sC.length == 1) {
        return [parseInt(sC + sC, 16), parseInt(sC + sC, 16), parseInt(sC + sC, 16)];
    }
    else if (sC.length == 2) {
        return [parseInt(sC, 16), parseInt(sC, 16), parseInt(sC, 16)];
    }
    else if (sC.length == 3) {
        sA = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(sC);
        return [parseInt(sA[1] + sA[1], 16), parseInt(sA[2] + sA[2], 16), parseInt(sA[3] + sA[3], 16)];
    }
    else if (sC.length == 6) {
        sA = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sC);
        return [parseInt(sA[1], 16), parseInt(sA[2], 16), parseInt(sA[3], 16)];
    }
    else {
        return sB;
    }
}
function getOpacity(sC, sP) {
    var sA = null, sB = getRGB(sC);
    if (sB.length == 0) { return sC; }
    else { return "rgba(" + sB[0] + "," + sB[1] + "," + sB[2] + "," + (sP/100) + ")"; }
}
function getShade(sC, sP) {
    var sA = null, sB = getRGB(sC);
    if (sB.length == 0) { return sC; }
    else {
        var sD = sP / 100;
        return getHex(Math.ceil(sB[0] * sD)) + getHex(Math.ceil(sB[1] * sD)) + getHex(Math.ceil(sB[2] * sD));
    }
}
function getShortColor(hA) {
    var zY = '', hB = [], hC = hA, zC = new RegExp('^([a-fA-F0-9]{6})$', 'i');
    while ((zY = zC.exec(hC)) !== null) {
        hB = zY[1].split('');
        if ((hB[0] == hB[1]) && (hB[2] == hB[3]) && (hB[4] == hB[5])) { hA = hB[0] + hB[2] + hB[4]; }
        break;
    }
    return hA;
}
function getFamily(hA, hB) {
    if (hA.indexOf('family') > -1) {
        hA = 'font-family';
        hB = '"' + hB + '"';
    }
    return [hA, hB];
}
function getWrapper(xZ) {
    var start = [], end = '}', tab = masterTab, line = masterLine;
    if (xZ.indexOf('media-') == 0) {
        var xU = xZ.replace('media-', '');
        var xY = getMediaQuery(xU);
        if (xY) {
            xU = xY[1];
            xY[2] = xY[2].replace(/-/g, '').replace(/\//g, ' ');
            if (xY[2].length > 0) { xU += ':' + xY[2]; }
        }
        start.push('@media (' + xU + ') {');
    }
    else if (xZ in screenSizes) {
        start.push('@media screen and (');
        if (xZ.indexOf('down') > -1) { start.push('max-width:' + screenSizes[xZ][1] + 'px'); }
        else if (xZ.indexOf('up') > -1) { start.push('min-width:' + screenSizes[xZ][0] + 'px'); }
        else { start.push('min-width:' + screenSizes[xZ][0] + 'px) and (max-width:' + screenSizes[xZ][1] + 'px'); }
        start.push(') {');
    }
    else if (xZ.indexOf('-') > -1) {
        var kE = xZ.split('-', 2);
        start.push('@media screen and (min-width:' + kE[0] + 'px) and (max-width:' + kE[1] + 'px) {');
    }
    else if (screenTypes.includes(xZ)) {
        start.push('@media ');
        if (xZ.indexOf('not') == 0) { start.push('not ' + xZ.replace('not', '')); }
        else if (xZ.indexOf('!') == 0) { start.push('not ' + xZ.replace('!', '')); }
        else if (xZ.indexOf('only') == 0) { start.push('only ' + xZ.replace('only', '')); }
        else { start.push(xZ); }
        start.push(' {');
    }
    else if (['font-face'].includes(xZ)) { start.push('@' + xZ + ' {'); }
    else if (!isNaN(xZ)) { start.push('@media screen and (min-width:' + parseFloat(xZ) + 'px) {'); }
    else {
        end = '';
        tab = '';
        line = '';
    }
    return [start.join('') + line, end, tab];
}
var mediaGrep = '';
var webkitGrep = '';
var actionGrep = [];
var screenGrep = '';
function getGreps () {
    var mQ = ['any-hover', 'any-pointer', 'aspect-ratio', 'color', 'color-gamut', 'color-index', 'grid', 'height', 'hover', 'inverted-colors', 'light-level', 'max-aspect-ratio', 'max-color', 'max-color-index', 'max-height', 'max-monochrome', 'max-resolution', 'max-width', 'min-aspect-ratio', 'min-color', 'min-color-index', 'min-height', 'min-monochrome', 'min-resolution', 'min-width', 'monochrome', 'orientation', 'overflow-block', 'overflow-inline', 'pointer', 'resolution', 'scan', 'scripting', 'update', 'width'];
    mediaGrep = "^(" + mQ.join("|").replace('/-/gi', '\\-') + ")(.*)$";
    
    var wK = ['align-content', 'align-items', 'align-self', 'alt', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'animation-trigger', 'app-region', 'appearance', 'aspect-ratio', 'backdrop-filter', 'backface-visibility', 'background-clip', 'background-composite', 'background-origin', 'background-size', 'border-after-color', 'border-after-style', 'border-after-width', 'border-after', 'border-before-color', 'border-before-style', 'border-before-width', 'border-before', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-end-color', 'border-end-style', 'border-end-width', 'border-end', 'border-fit', 'border-horizontal-spacing', 'border-image', 'border-radius', 'border-start-color', 'border-start-style', 'border-start-width', 'border-start', 'border-top-left-radius', 'border-top-right-radius', 'border-vertical-spacing', 'box-align', 'box-decoration-break', 'box-direction', 'box-flex-group', 'box-flex', 'box-lines', 'box-ordinal-group', 'box-orient', 'box-pack', 'box-reflect', 'box-shadow', 'box-sizing', 'clip-path', 'color-correction', 'column-axis', 'column-break-after', 'column-break-before', 'column-break-inside', 'column-count', 'column-fill', 'column-gap', 'column-progression', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'cursor-visibility', 'dashboard-region', 'device-pixel-ratio', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'flow-from', 'flow-into', 'font-feature-settings', 'font-kerning', 'font-size-delta', 'font-smoothing', 'font-variant-ligatures', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-gap', 'grid-column-start', 'grid-gap', 'grid-row', 'grid-row-end', 'grid-row-gap', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'highlight', 'hyphenate-character', 'hyphenate-charset', 'hyphenate-limit-after', 'hyphenate-limit-before', 'hyphenate-limit-lines', 'hyphens', 'initial-letter', 'justify-content', 'justify-items', 'justify-self', 'line-align', 'line-box-contain', 'line-break', 'line-clamp', 'line-grid', 'line-snap', 'locale', 'logical-height', 'logical-width', 'margin-after', 'margin-after-collapse', 'margin-before', 'margin-before-collapse', 'margin-bottom-collapse', 'margin-collapse', 'margin-end', 'margin-start', 'margin-top-collapse', 'marquee', 'marquee-direction', 'marquee-increment', 'marquee-repetition', 'marquee-speed', 'marquee-style', 'mask', 'mask-attachment', 'mask-box-image', 'mask-box-image-outset', 'mask-box-image-repeat', 'mask-box-image-slice', 'mask-box-image-source', 'mask-box-image-width', 'mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-position', 'mask-position-x', 'mask-position-y', 'mask-repeat', 'mask-repeat-x', 'mask-repeat-y', 'mask-size', 'mask-source-type', 'match-nearest-mail-blockquote-color', 'max-logical-height', 'max-logical-width', 'media-text-track-container', 'min-logical-height', 'min-logical-width', 'nbsp-mode', 'opacity', 'order', 'overflow-scrolling', 'padding-after', 'padding-before', 'padding-end', 'padding-start', 'perspective', 'perspective-origin', 'perspective-origin-x', 'perspective-origin-y', 'print-color-adjust', 'region-break-after', 'region-break-before', 'region-break-inside', 'region-fragment', 'rtl-ordering', 'ruby-position', 'scroll-snap-type', 'shape-image-threshold', 'shape-inside', 'shape-margin', 'shape-outside', 'svg-shadow', 'tap-highlight-color', 'text-color-decoration', 'text-combine', 'text-decoration-line', 'text-decoration-skip', 'text-decoration-style', 'text-decorations-in-effect', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-fill-color', 'text-justify', 'text-orientation', 'text-security', 'text-size-adjust', 'text-stroke', 'text-stroke-color', 'text-stroke-width', 'text-underline-position', 'text-zoom', 'transform', 'transform-2d', 'transform-3d', 'transform-origin', 'transform-origin-x', 'transform-origin-y', 'transform-origin-z', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'user-drag', 'user-modify', 'user-select', 'animating-full-screen-transition', 'any-link', 'autofill', 'autofill-strong-password', 'drag', 'full-page-media', 'full-screen-ancestor', 'full-screen-controls-hidden', 'full-screen-document', 'full-screen', 'file-upload-button', 'inner-spin-button', 'input-placeholder', 'media-controls', 'media-controls-current-time-display', 'media-controls-enclosure', 'media-controls-fullscreen-button', 'media-controls-mute-button', 'media-controls-overlay-enclosure', 'media-controls-panel', 'media-controls-play-button', 'media-controls-time-remaining-display', 'media-controls-timeline', 'media-controls-toggle-closed-captions-button', 'media-controls-volume-control-container', 'media-controls-volume-control-hover-background', 'media-controls-volume-slider', 'meter-bar', 'meter-even-less-good-value', 'meter-inner-element', 'meter-optimum-value', 'meter-suboptimum-value', 'outer-spin-button', 'progress-bar', 'progress-inner-element', 'progress-value', 'search-cancel-button', 'search-results-button', 'slider-runnable-track', 'slider-thumb'];
    webkitGrep = "^" + wK.join("|").replace('/-/gi', '\\-');

    var aG = [
        ['after', 'backdrop', 'before', 'cue', 'cue-region', 'file-selector-button', 'first-letter', 'first-line', 'grammar-error', 'marker', 'placeholder', 'placeholder-shown', 'selection', 'spelling-error', 'target-text'],
        ['last-child', 'first-child', 'only-child', 'first-of-type', 'last-of-type', 'only-of-type', 'nth-last-child', 'nth-last-of-type'],
        ['current', 'past', 'future', 'playing', 'paused', 'active', 'checked', 'disabled', 'empty', 'enabled', 'focus', 'focus-visible', 'focus-within', 'hover', 'in-range', 'invalid', 'link', 'optional', 'out-of-range', 'read-only', 'read-write', 'required', 'root', 'target', 'valid', 'visited']
    ];
    actionGrep = [
        [" *::", "(" + aG[0].join("|").replace('/-/gi', '\\-') + ")"],
        [" *:", "(" + aG[1].join("|").replace('/-/gi', '\\-') + ")"],
        [":", "(" + aG[2].join("|").replace('/-/gi', '\\-') + ")"]
    ];

    var sT = screenTypes;
    var x = screenSizeKeys.length;
    var i = 0;
    while (i < x) {
        sT.push("\\!" + screenSizeKeys[i], screenSizeKeys[i] + "down", screenSizeKeys[i] + "up", screenSizeKeys[i]);
        i++
    }
    screenGrep = "(" + sT.join("|").replace('/-/gi', '\\-') + ")";
}
function getMediaQuery(mS) {
    return new RegExp(mediaGrep).exec(mS);
}
function getWebKit(wS) {
    return new RegExp(webkitGrep).test(wS);
}
function getActions(mS, mD) {
    var ret = [{}, {}, {}], zA = '', zM = null, zS = '', zY = false;
    var x = actionGrep.length;
    var i = 0;
    while (i < x) {
        zM = new RegExp(actionGrep[i][1], 'gi');
        zS = actionGrep[i][0];
        while ((zA = zM.exec(mS)) !== null) {
            ret[i][zA[1]] = zS;
            zY = true;
        }
        i++;
    }
    if (!zY) { ret = [{}]; ret[0][mD] = ""; }
    return ret;
}
function getScreens(mS, mD) {
    var ret = {}, all = [], zA = '', zB = '', notScreens = false;
    var zM = new RegExp(screenGrep, 'gi');
    while ((zA = zM.exec(mS)) !== null) {
        zB = zA[1];
        if (zB.indexOf('!') > -1) {
            notScreens = true;
            zB = zB.replace(/\!/g, '');
        }
        ret[zB] = true;
        all.push(zB);
    }
    if (notScreens) {
        var screenSizeContainers = all;
        var screenSizeKey = '';
        ret = {};
        var x = screenSizeKeys.length;
        var i = 0;
        while (i < x) {
            screenSizeKey = screenSizeKeys[i];
            if (!screenSizeContainers.includes(screenSizeKey)) { ret[screenSizeKey] = true; }
            i++;
        }
    }
    if (Object.keys(ret).length == 0) { ret[mD] = true; }
    return ret;
}
function getCleanStyles(style) {
    return style.replace(/(;){2,}/g, ';');
}
function getmixins() {
    if (defined(knowCSSOptions.mixins)) {
        for (var key in knowCSSOptions.mixins) { allMixins[key] = getVariables(knowCSSOptions.mixins[key]); }
    }    
}
function getMixins(mA) {
    var mixin = '', newMixin = {}, anyNewMixin = false;
    var zM = new RegExp('\\[(.*?)\\]', 'i');
    var mX = [];
    var mS = "";
    while ((mixin = zM.exec(mA)) !== null) {
        if (mixin[1] in allMixins) {
            mX.push(mS + allMixins[mixin[1]] + ' ');
            mS = " ";
        }
        else {
            newMixin[mixin[1]] = true;
            anyNewMixin = true;
        }
        mA = mA.replace(mixin[0], '');
    }
    mA = mX.join('') + mA;
    mA = mA.trim();
    if (anyNewMixin) {
        for (mixin in newMixin) { allMixins[mixin] = mA; }
    }
    return mA;
}
function getDocument() {
    if (defined(knowCSSOptions.cssVars)) {
        var root = knowLayer('root');
        if (root && root.innerHTML.indexOf('$') > -1) { root.innerHTML = getVariables(root.innerHTML); }
    }
}
function getVariables(html) {
    if (html.indexOf('$') > -1) {
        var zZ = new RegExp('\\{\\{\\$(.*?)\\}\\}', 'gi'), varKey = '';
        while ((varKey = zZ.exec(html)) !== null) {
            var varsFound = 0, varFound = '';
            if (defined(knowCSSOptions.cssVars)) {
                if (varKey[1] in knowCSSOptions.cssVars) { varFound = knowCSSOptions.cssVars[varKey[1]].replace('/\\\\/gis', ''); }
            }
            while (html.indexOf(varKey[0]) > -1) {
                html = html.replace(varKey[0], varFound);
                varsFound++;
                if (varsFound > 500) { break; }
            }
        }
    }
    return html;
}
var usedClass = {};
var letters = "abcdefghijklmnopqrstuvwxyz";
var shuffled = letters.split('').sort(function () { return 0.5 - Math.random() }).join('');
function getNextLetter(nA) {
    if (nA.length == 0) { return "a"; }
    var nI = nA.length - 1;
    var nC = nA.charCodeAt(nI);
    var nD = "z".charCodeAt();
    do {
        nC = nA.charCodeAt(nI);
        var nB = nA.split("");
        if (nB[nI] == "z") {
            nB[nI] = "a";
            if (nI == 0) { nB.unshift("a"); }
        }
        else { nB[nI] = String.fromCharCode(nC + 1); }
        nA = nB.join("");
        nI--;
    }
    while (nC == nD);
    return nA;
}
// TODO - pass a mapping of letter to random letter as a cypher for randomizing
function getRandomClass() {
    var prefixID = "", nA = '';
    var ret = false;
    var k = letters.length;
    var i = 1;
    var j = Object.keys(usedClass).length;
    var g = j;
    if (j > k) {
        i = 0;
        while (j > k) {
            j -= k;
            i++;
        }
    }
    while (!ret) {
        if (g < k) { nA = shuffled.substring(j, 1); }
        else {
            prefixID = letters[Math.floor(Math.random() * k)];
            nA = prefixID + Math.random().toString(26).substring(2, i);
        }
        if (nA in usedClass == false) {
            ret = true;
            break;
        }
    }
    usedClass[nA] = true;
    return nA;
}
function getSafeClass(screen, modifier, name, action, val, important) {
    var key = (screen + '_' + modifier + '_' + name + '_' + action + '_' + val + '_' + important).toLowerCase().replace(/[\s\n\r]/gi, '-');
    key = key.replace(/none_/g, '').replace(/[\#\,\(\)\_]/g, '-').replace(/[^[a-z0-9\-]/g, '').replace(/(\-){2,10}/g, '-').replace(/^\-/g, '').replace(/\-$/g, '');
    if (('0123456789').includes(key.substring(0, 1))) { key = 'sz-' + key; }
    return key;
}

function getClasses(classString) {
    var zA = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!]{1,32})\\(\\((.*?)\\)\\)', 'gis');
    var aM = "";
    var rW = "";
    var grepTag = classString;
    while ((aM = zA.exec(grepTag)) !== null) {
        if (['var', 'invert', 'translate', 'translateY', 'translateX'].includes(aM[1]) === false) {
            rW = aM[1] + "=" + aM[2].replace(/\s/g, '\/');
            classString = classString.replace(aM[0], rW);
        }
    }
    return classString.split(/(\s+)/).filter(e => e.trim().length > 0);
}
function crossMixins(classString) {
    var rW = [];
    var zB = '';
    var zA = classString.split(' ');
    var x = zA.length;
    var i = 0;
    while (i < x) {
        zB = zA[i];
        rW.push(zB in allMixins ? "[" + zB + "]" : zB);
        i++;
    };
    return rW.join(' ');
}
function getScreenPrefixes(classString) {
    var ret = [];
    if (classString.indexOf('-') > -1) {
        var key = '', prefix = '', parts = [];
        var classesFound = classString.split(' ');
        var x = classesFound.length;
        var i = 0;
        while (i < x) {
            key = classesFound[i];
            if (key.indexOf('-') > -1 && key.indexOf('{') == -1) {
                parts = key.split('-');
                prefix = parts.shift();
                if (prefix in screenSizes || !isNaN(prefix)) { key = prefix + '((' + parts.join('-') + '))'; }
            }
            ret.push(key);
            i++;
        };
    }
    else { ret = [classString]; }
    return ret.join(' ');
}
function getContainers(classString) {
    var ret = [];
    if (classString.indexOf('container') > -1) {
        var key = '';
        var classesFound = classString.split(' ');
        var x = classesFound.length;
        var i = 0;
        while (i < x) {
            key = classesFound[i];
            if (key == 'container') {
                ret.push(
                    "width-100%",
                    "padding-right-15px", "padding-left-15px", "margin-right-auto", "margin-left-auto",
                    "max-width-100%", "1230{max-width-1550}", "1200{max-width-1140}", "1024{max-width-940}", "768{max-width-720}"
                );
            }
            else if (key == 'container-fluid') {
                ret.push("width-100%", "padding-right-15px", "padding-left-15px", "margin-right-auto", "margin-left-auto");
            }
            i++;
        };
    }
    else { ret = [classString]; }
    return ret.join(' ');
}
function knowCSSRender(uI, uC, uO) {
    var uX = {
        'minifycss': true,
        'classes': 'sequential',
        'normalize': false,
        'share': false,
        'smart': !uC,
        'rem': 16,
        'autoprefix': true
    };
    if (typeof uX !== 'undefined') {
        for (var uA in uO) {
            if (uA in uX) { uX[uA] = uO[uA]; }
        }
    }
    var div = null, css = {}, screen = '', modifier = '', className = '', action = '', classValue = '', classMore = [], classImportant = '', classWebKit = false, classParts = [], classKey = '', classNew = '', classFirst = '', classTotal = 0, classList = [], classMixins = [], classesFound = '', classFound = '', classesHere = [], styles = [], tab = '', cssGroup = {}, classHere = '', stylesHere, stylesWebKit = [], start = '', end = '', tab = '';
    if (uX.normalize === true) { styles.push('::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[hidden],template{display:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]::-webkit-search-decoration{-webkit-appearance:none}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a:active,a:hover{outline:0}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}body{margin:0}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}button[disabled],html input[disabled]{cursor:default}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}details{display:block}dfn{font-style:italic}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}figure{margin:1em 40px}h1{font-size:2em;margin:.67em 0}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}html{font-family:sans-serif;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;line-height:1.15}img{border-style:none;border:0}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input{line-height:normal}legend{border:0;padding:0;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}main{display:block}mark{background:#ff0;color:#000}optgroup{font-weight:700}pre{font-family:monospace,monospace;font-size:1e;overflow:auto}progress{vertical-align:baseline}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}summary{display:list-item}sup{top:-.5em}svg:not(:root){overflow:hidden}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}template{display:none}textarea{overflow:auto}'); }
    if (['sequential', 'random'].includes(uX.classes) == false) { uX.classes = 'detail'; }
    var classTags = [];
    if (uC) {
        var zC = new RegExp(knowID + '=["|\'](.*?)["|\']', 'gis');
        var zY = null;
        div = uI;
        while ((zY = zC.exec(uI)) !== null) { classTags.push(zY); }
    }
    else {
        if (typeof uI === 'string') { div = knowLayer(uI); }
        else if ('innerHTML' in uI) { div = uI; }
        if (knowStartup == null) { knowStartup = div.innerHTML; }
        classTags = document.querySelectorAll("[" + knowID + "]");
    }
    getmixins();
    getuserConditionals();
    getGreps();
    var attr = "";
    var sharedClasses = {};
    var sharedClassKey = "";
    var isDefine = false;
    var smartClass = {};
    var smartDetail = {};
    var classParent = false;
    var classEnvironment = "";
    var allowEnvironment = false;
    var checkShorterHand = (typeof globalMixins !== 'undefined');
    var ii = 0;
    var tL = classTags.length;
    while (ii < tL) {
        isDefine = classTags[ii].tagName == 'DEFINE';
        classesHere = [];
        attr = crossMixins(uC ? classTags[ii][1] : classTags[ii].getAttribute(knowID));
        classList = { 'none_none_none': getScreenPrefixes(getContainers(getMixins(getVariables(attr)))) };
        classList = getModifier(getModifier(classList, false), true);
        classNew = '';

        classFirst = '';
        for (var key in classList) {
            [screen, modifier, action] = key.split('_', 3);
            classesFound = getClasses(classList[key]);    
            //if (classesFound.length > 0) {
                classFirst = '';
                classNextStart = classNext;
                if (uX.classes !== 'detail' && classNew === '') {
                    classTotal++;
                    if (uX.classes == 'sequential') { classNext = getNextLetter(classNext); }
                    else if (uX.classes == 'random') { classNext = getRandomClass(); }
                    classNew = classNext.toLowerCase();
                    // JAA TODO - build array of unique values instead of appending strings
                    if (!uX.smart) { classFirst += (classesHere.length > 0 ? ' ' : '') + classNew; }
                }
                while (classesFound.length > 0) {
                    classFound = classesFound.shift().trim();
                    //if (classFound.length > 0) {
                        [classFound, classesFound, classWebKit] = getShortHand(classFound, classesFound);
                        if (checkShorterHand) { [classFound, classesFound] = getShorterHand(classFound, classesFound); }
                        [classFound, classesFound] = getGridSystem(classFound, classesFound);                        
                        if (!isDefine) {
                            [classParent, screen] = getParentSelector(screen);
                            [classEnvironment, screen, allowEnvironment] = getEnvironmentSelector(screen);
                            if (allowEnvironment) {
                                [classFound, classImportant] = getImportant(classFound);
                                className = '';
                                classValue = '';
                                if (classFound.indexOf('gradient') == 0) {
                                    classParts = classFound.split('-');
                                    classParts.shift();
                                    className = 'background-image';
                                    classValue = 'linear-gradient(' + classParts.join(',').trim() + ')';
                                    classValue = classValue.replace(/,(bottom|top|left|right)/gi, ' $1');
                                }
                                else if (classFound.indexOf('=') > -1) { [className, classValue] = classFound.split('=', 2); }
                                else if (classFound.indexOf('-') > -1) {
                                    classParts = classFound.split('-');
                                    classValue = classParts.pop();
                                    className = classParts.join('-');
                                }
                                else { className = classFound; }
                                if (className in knowCSSOptions.shortHand) { className = knowCSSOptions.shortHand[className]; }
                                classValue = getColor(getValue(classValue), className);
                                [className, classValue] = getFamily(className, classValue);
                                classesFound = getREM(className, classValue, classesFound);
                                classKey = getKey(screen, modifier, className, action, classValue, classImportant);
                                /*
                                if (if (!uX.smart && uX.classes == 'detail') {
                                    classNew = getSafeClass(screen, modifier, className, action, classValue, classImportant);
                                    classesHere.push(classNew);
                                }
                                */
                                if (screen in css === false) { css[screen] = {}; }
                                if (action in css[screen] === false) { css[screen][action] = [{}, {}] }
                                if (modifier == 'none') { modifier = ''; }    
                                if (uX.smart) {
                                    sharedClassKey = classKey + '__' + modifier;
                                    if (sharedClassKey in smartClass == false) {
                                        smartDetail[sharedClassKey] = [screen, action, "", [modifier, className, classValue, classImportant, classWebKit], classParent, classEnvironment];
                                        smartClass[sharedClassKey] = ii.toString();
                                    }
                                    else {
                                        smartClass[sharedClassKey] += "__" + ii.toString();
                                    }
                                }
                                else {
                                    if (uX.share) {
                                        sharedClassKey = classKey + '__' + modifier;
                                        if (sharedClassKey in sharedClasses == false) {
                                            classNext = getNextLetter(classNext);
                                            sharedClasses[sharedClassKey] = classNext.toLowerCase();
                                        }
                                        classNew = sharedClasses[sharedClassKey];
                                        if (classesHere.indexOf(classNew) == -1) { classesHere.push(classNew); }
                                    }

                                    // JAA TODO - build array of unique values instead of appending strings
                                    if (classKey in css[screen][action][0]) {
                                        if (css[screen][action][0][classKey].indexOf('.' + classNew + modifier) == -1) {
                                            css[screen][action][0][classKey] += ', .' + classNew + modifier;
                                        }
                                    }
                                    else { css[screen][action][0][classKey] = '.' + classNew + modifier; }
                                    css[screen][action][1][classKey] = [modifier, className, classValue, classImportant, classWebKit];
                                }
                            }
                        }
                    //}
                }
                if (!uX.smart) {
                    if (classFirst.length > 0 && classesHere.indexOf(classFirst) == -1) { classesHere.push(classFirst); }
                }
            //}
        }
        if (!uX.smart) {
            if (uC) { div = div.replace(classTags[ii][0], 'data-class="' + classesHere.join(' ') + '"'); }
            //else if (isDefine) { classTags[ii].parentNode.removeChild(classTags[ii]); }
            else {
                classesHere.forEach(function (key, val) { classTags[ii].classList.add(key); });                
                classTags[ii].removeAttribute(knowID);
            }   
        }
        ii++;
    }

    if (uX.smart) {
        var smartClassGroup = {};
        var smartClassHere = "";
        var addParent = false;
        for (var smartKey in smartClass) {
            var smartKeys = smartClass[smartKey];
            if (smartKeys in smartClassGroup) { 
                smartClassHere = smartClassGroup[smartKeys];
            }
            else { 
                smartClassNext = smartClassNext ? getNextLetter(smartClassNext) : "a";          
                smartClassHere = smartClassNext;
                smartClassGroup[smartKeys] = smartClassHere;
            }
            smartDetail[smartKey][2] = smartClassHere;
            addParent = smartDetail[smartKey][4];
            smartKeys.split('__').forEach(function (ii) {
                if (addParent) { classTags[ii].parentNode.classList.add(smartClassHere); }
                else { classTags[ii].classList.add(smartClassHere); }
                classTags[ii].removeAttribute(knowID);
            });
        }
        // JAA TODO:
        // for compile(), smartClassesHere = [];
        //if (uC) { div = div.replace(classTags[ii][0], 'data-class="' + smartClassesHere.join(' ') + '"'); }
        
        for (var classKey in smartDetail) {
            var screen = smartDetail[classKey][0];
            var action = smartDetail[classKey][1];
            var modifier = smartDetail[classKey][3][0];
            var classNew = smartDetail[classKey][2];
            var classModifier = '.' + classNew + modifier;
            if (screen in css === false) { css[screen] = {}; }
            if (action in css[screen] === false) { css[screen][action] = [{}, {}]; }
            if (classKey in css[screen][action][0]) {
                if (css[screen][action][0][classKey].indexOf(classModifier) == -1) {
                    css[screen][action][0][classKey] += ', ' + classModifier;
                }
            }
            else { css[screen][action][0][classKey] = classModifier; }
            css[screen][action][1][classKey] = smartDetail[classKey][3];
        }
    }

    if (uX.minifycss) {
        masterLine = '';
        masterTab = '';
    }
    for (var screen in css) {
        [start, end, tab] = getWrapper(screen);        
        styles.push(masterLine + start);
        for (var action in css[screen]) {
            cssGroup = {};
            classHere = '';
            for (var classKey in css[screen][action][0]) {
                [modifier, className, classValue, classImportant, classWebKit] = css[screen][action][1][classKey];
                if (className.length > 0 || classValue.length > 0) {
                    if (classValue.length == 0) { classValue = "''"; }
                    classHere = css[screen][action][0][classKey];
                    if (classImportant == '!') { classImportant = '!important'; }
                    if (!isNaN(classValue) && '' + parseInt(classValue) === classValue) {
                        var classFirstSix = className.substring(0, 5);
                        if (['heigh', 'width', 'margin', 'borde', 'spaci', 'paddi'].includes(classFirstSix) || className.indexOf('font-size') > -1) { classValue += 'px'; }
                    }
                    stylesHere = getCleanStyles(className + (action != 'none' ? action : '') + ':' + classValue + classImportant + ';');
                    if (classWebKit || (uX.autoprefix && getWebKit(className))) {
                        stylesWebKit = [' -webkit-' + stylesHere, ' -moz-' + stylesHere, ' -ms-' + stylesHere, ' -o-' + stylesHere];
                        stylesHere += stylesWebKit.join('');
                    }
                    if (classHere in cssGroup == false) { cssGroup[classHere] = stylesHere; }
                    else { cssGroup[classHere] += ' ' + stylesHere; }
                }
            }
            for (var cssgroup in cssGroup) { styles.push(tab + cssgroup + '{' + cssGroup[cssgroup] + '}' + masterLine); }
        }
        styles.push(end);
    }
    var stylesFinal = styles.join('');
    styles = [];
    if (uX.minifycss) { stylesFinal = stylesFinal.replace(/[\n\r\t]/gi, '').replace(/;\}/gi, '}').replace(/ \{/gi, '{').replace(/; /gi, ';').replace(/, /gi, ',').trim(); }
    if (uC) { return [div, stylesFinal]; }
    else if (stylesFinal.length > 0) {
        var cssID = 'css_' + div.id + '_' + cssIncrement;
        var cssTag = knowLayer(cssID);
        if (!cssTag) {
            var heAD = document.getElementsByTagName('head')[0];
            cssTag = document.createElement('style');
            cssTag.id = cssID;
            heAD.appendChild(cssTag);
        }
        cssTag.innerHTML = stylesFinal;
        cssIncrement++;
        return true;
    }
}

if (typeof window !== 'undefined') {
    window.$know = function (key) { return new knowCSSProto(key); };
    var knowCSSProto = function (key) {
        this.x = { "attr": "know" };
        this.key = key || "[" + knowID + "]";
        this.debugging = false;
    };
    knowCSSProto.prototype = knowCSS;
    if (["interactive", "complete"].includes(document.readyState)) { $know().init(); }
    else { document.addEventListener('DOMContentLoaded', function () { $know().init(); }); }
}
else if (typeof module !== 'undefined') { module.exports = knowCSS; }