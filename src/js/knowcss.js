'use strict';

/*
KnowCSS Version 2.0.9 by Jay Doublay
https://www.knowcss.com/

NPM: https://www.npmjs.com/package/knowcss
Repo: https://github.com/knowcss/knowcss
*/

// JAA TODO - replace forEach() with while (i < x) {}

var knowCSSOptions = {
    hexColors: typeof hexColors !== 'undefined' && hexColors != null ? hexColors : {},
    shortHand: typeof shortHand !== 'undefined' && shortHand != null ? shortHand : {},
    shorterHand: typeof shorterHand !== 'undefined' && shorterHand != null ? shorterHand : {},
    shortHandVariable: typeof shortHandVariable !== 'undefined' && shortHandVariable != null ? shortHandVariable : {},
    cssVars: typeof cssVars !== 'undefined' && cssVars != null ? cssVars : {},
    mixins: typeof mixins !== 'undefined' && mixins != null ? mixins : {},
    components: typeof components !== 'undefined' && components != null ? components : {},
    conditionals: typeof conditionals !== 'undefined' && conditionals != null ? conditionals : {}
};

// JAA todo - add first/last/only/odd/even/etc shorthand for these
const knowCSSLists = function () {
    return {
        // JAA TODO - function() like calc()
        "function": ["abs", "acos", "asin", "atan", "atan2", "attr", "calc", "clamp", "cos", "counter", "counters", "cross-fade", "element", "env", "exp", "fit-content", "hypot", "log", "max", "min", "minmax", "path", "pow", "repeat", "round", "sign", "sin", "sqrt", "symbols", "tan", "url", "var"],

        // JAA TODO - @name{} like @media{}
        "at": ["charset", "color-profile", "container", "counter-style", "font-face", "font-feature-values", "import", "keyframes", "layer", "namespace", "page", "property", "supports"],

        "reversions": ['inherit','initial','unset','revert'],
        "media": ["any-hover", "hover", "any-pointer", "pointer", "min-width", "max-width", "width", "min-height", "max-height", "height", "orientation", "min-aspect-ratio", "max-aspect-ratio", "aspect-ratio", "color-gamut", "min-color-index", "min-color", "max-color-index", "max-color", "color-index", "forced-colors", "inverted-colors", "color", "max-monochrome", "min-monochrome", "monochrome", "display-mode", "dynamic-range", "scan", "update", "light-level", "video-dynamic-range", "max-resolution", "min-resolution", "resolution", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "grid", "overflow-block", "overflow-inline", "scripting"],
        "modifiers": ["webkit-scrollbar", "after", "backdrop", "before", "cue", "cue-region", "file-selector-button", "first-letter", "first-line", "grammar-error", "marker", "placeholder", "placeholder-shown", "selection", "spelling-error", "target-text"],
        "selectors": ["last-child", "first-child", "only-child", "first-of-type", "last-of-type", "only-of-type", "nth-last-child", "nth-last-of-type"],
        "actions": ["current", "past", "future", "playing", "paused", "active", "checked", "disabled", "empty", "enabled", "focus-visible", "focus-within", "focus", "hover", "in-range", "invalid", "link", "optional", "out-of-range", "read-only", "read-write", "required", "root", "target", "valid", "visited"],
        "webkit": ["align-content", "align-items", "align-self", "alt", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "animation-trigger", "animation", "app-region", "appearance", "aspect-ratio", "backdrop-filter", "backface-visibility", "background-clip", "background-composite", "background-origin", "background-size", "border-after-color", "border-after-style", "border-after-width", "border-after", "border-before-color", "border-before-style", "border-before-width", "border-before", "border-bottom-left-radius", "border-bottom-right-radius", "border-end-color", "border-end-style", "border-end-width", "border-end", "border-fit", "border-horizontal-spacing", "border-image", "border-radius", "border-start-color", "border-start-style", "border-start-width", "border-start", "border-top-left-radius", "border-top-right-radius", "border-vertical-spacing", "box-align", "box-decoration-break", "box-direction", "box-flex-group", "box-flex", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-reflect", "box-shadow", "box-sizing", "clip-path", "color-correction", "column-axis", "column-break-after", "column-break-before", "column-break-inside", "column-count", "column-fill", "column-gap", "column-progression", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "cursor-visibility", "dashboard-region", "device-pixel-ratio", "filter", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex", "flow-from", "flow-into", "font-feature-settings", "font-kerning", "font-size-delta", "font-smoothing", "font-variant-ligatures", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-row", "grid-template-areas", "grid-template-columns", "grid-template-rows", "grid-template", "grid", "highlight", "hyphenate-character", "hyphenate-charset", "hyphenate-limit-after", "hyphenate-limit-before", "hyphenate-limit-lines", "hyphens", "initial-letter", "justify-content", "justify-items", "justify-self", "line-align", "line-box-contain", "line-break", "line-clamp", "line-grid", "line-snap", "locale", "logical-height", "logical-width", "margin-after-collapse", "margin-after", "margin-before-collapse", "margin-before", "margin-bottom-collapse", "margin-collapse", "margin-end", "margin-start", "margin-top-collapse", "marquee-direction", "marquee-increment", "marquee-repetition", "marquee-speed", "marquee-style", "marquee", "mask-attachment", "mask-box-image", "mask-box-image-outset", "mask-box-image-repeat", "mask-box-image-slice", "mask-box-image-source", "mask-box-image-width", "mask-clip", "mask-composite", "mask-image", "mask-origin", "mask-position-x", "mask-position-y", "mask-position", "mask-repeat-x", "mask-repeat-y", "mask-repeat", "mask-size", "mask-source-type", "mask", "match-nearest-mail-blockquote-color", "max-logical-height", "max-logical-width", "media-text-track-container", "min-logical-height", "min-logical-width", "nbsp-mode", "opacity", "order", "overflow-scrolling", "padding-after", "padding-before", "padding-end", "padding-start", "perspective-origin", "perspective-origin-x", "perspective-origin-y", "perspective", "print-color-adjust", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rtl-ordering", "ruby-position", "scroll-snap-type", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "svg-shadow", "tap-highlight-color", "text-color-decoration", "text-combine", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-decorations-in-effect", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-emphasis", "text-fill-color", "text-justify", "text-orientation", "text-security", "text-size-adjust", "text-stroke-color", "text-stroke-width", "text-stroke", "text-underline-position", "text-zoom", "transform-2d", "transform-3d", "transform-origin-x", "transform-origin-y", "transform-origin-z", "transform-origin", "transform-style", "transform", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "transition", "user-drag", "user-modify", "user-select", "touch-callout", "animating-full-screen-transition", "any-link", "autofill", "autofill-strong-password", "drag", "full-page-media", "full-screen-ancestor", "full-screen-controls-hidden", "full-screen-document", "full-screen", "file-upload-button", "inner-spin-button", "input-placeholder", "media-controls-current-time-display", "media-controls-enclosure", "media-controls-fullscreen-button", "media-controls-mute-button", "media-controls-overlay-enclosure", "media-controls-panel", "media-controls-play-button", "media-controls-time-remaining-display", "media-controls-timeline", "media-controls-toggle-closed-captions-button", "media-controls-volume-control-container", "media-controls-volume-control-hover-background", "media-controls-volume-slider", "media-controls", "meter-bar", "meter-even-less-good-value", "meter-inner-element", "meter-optimum-value", "meter-suboptimum-value", "outer-spin-button", "progress-bar", "progress-inner-element", "progress-value", "search-cancel-button", "search-results-button", "slider-runnable-track", "slider-thumb"],
        "screens": ["media", "print", "screen", "speech", "!print", "!screen", "!speech", "notprint", "notscreen", "notspeech", "onlyprint", "onlyscreen", "onlyspeech"]
    };
};

// JAA TODO - include webkit variations for classValues
/*
const knowCSSPrefixer = function () {
    return {
        "only": {
            "webkit": [],
            "moz": [],
            "ms": [],
            "o": []
        },
        "all": ["calc", "grid", "sticky", "transform", "fit-content", "max-content", "min-content", "linear-gradient"],
        "spread": {
            "flex": ["webkit-box", "webkit-flex", "ms-flexbox"]
        }
    };
};
*/

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
        return knowCSSRender(val, true);
    },

    render: function (val, refresh, options) {
        if (refresh) { cssIncrement = 0; }
        this.options(options);
        var startTime = new Date().getTime();
        this.z = document.querySelectorAll(this.key) || [];
        var num = 0;
        if (this.z) { num = knowCSSRender("root", false); }
        var isNum = typeof num === 'number';
        var renderConsole = '{ knowcss' + (isNum ? '[' + num + ']' : '') + ' rendered in ' + (new Date().getTime() - startTime) + "ms }";
        var renderIn = knowLayer('render');
        if (renderIn && renderIn.innerText.length == 0) { renderIn.innerText = renderConsole; }
        if (isNum) { console.log(renderConsole); }
        return this;
    },

    knowmotion: function (val, ret) { return knowMotionRender(val, ret); },

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

    lists: knowCSSLists,

    init: function () {
        return this.document().render();
    },

    constructor: knowCSSProto
};

const knowID = 'know';
const knowMotionID = 'knowmotion';

var masterTab = '\t', masterLine = '\n';
var smartUnique = {}, allMixins = {}, classNext = '', classNextStart = '', smartClassNext = '', afterFirstRender = [], cssIncrement = 0, knowStartup = null, knowMotionLetter = '';

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
const screenSizeKeys = Object.keys(screenSizes);

var defined = function (val) { return typeof val !== 'undefined' && val != null; };
var contains = function (val, vals) { return val.indexOf(vals) > -1; };
var begins = function (val, vals) { return val.indexOf(vals) == 0; };
var containsAny = function (val, vals) {
    var i = 0;
    var x = vals.length;
    while (i < x) {
        if (val.indexOf(vals[i]) > -1) { return true; }
        i++;
    }
    return false;
};

function knowCSSNow() { var hW = window.open("../src/now/index.html", "KnowCSS Now", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=" + (screen.height - 200) + ",top=50,left=" + (screen.width - 600)); }

function knowLayer(name) {
    return document.getElementById(name);
}
function getReversion(val, screen) {
    var important = '';
    val = (typeof val === 'string') ? val : '';
    if (containsAny(val, ['!','important'])) {
        val = val.replace('-important', '!').replace('!important', '!');
        if (contains(val, '!')) {
            val = val.replace(/\!/g, '').replace(/\-{1,16}$/, '').replace(/^\-{1,16}/, '');
            important = '!';
        }
    }
    if (['inherit','initial','unset','revert','auto','normal'].includes(screen)) {
        val += '=' + screen;
        screen = "n";
    }
    else if (['inher','initi','unset','rever','auto-','norma'].includes(val.substr(0, 5))) {
        var valParts = val.split('-');
        var valPrefix = valParts.shift();
        val = valParts.join('-') + '=' + valPrefix;
        screen = "n";
    }
    return [val, important, screen];
}
function getGridSystem(classFound, classesFound) {
    var gridFound = true;
    if (classFound == "row") {
        classFound = "width-100%";
        classesFound.push("display=-webkit-box", "display=-ms-flexbox", "display-flex", "-ms-flex-wrap-wrap", "flex-wrap-wrap");
    }
    else if (begins(classFound, 'col-')) {
        var whichCol = classFound.replace(/^col-/, '');
        var alignCol = whichCol;
        if (contains(alignCol, '-')) { [whichCol, alignCol] = alignCol.split('-', 2); }
        if (['left', 'right', 'center'].includes(alignCol)) { classesFound.push('justify-content-' + alignCol); }
        if (whichCol.length == 0) { whichCol = 12; }
        var whichPct = (parseInt(whichCol) / 12) * 100;
        classFound = "width-" + parseFloat(whichPct.toFixed(6)) + "%";
        classesFound.push("display-flex", "align-items-center", "flex-0/0/auto", "flex-basis-0", "-webkit-box-flex-1", "-ms-flex-positive-1", "flex-grow-1", "max-" + classFound, "position-relative");
    }
    else if (begins(classFound, 'offset-')) {
        var whichOffset = classFound.replace(/^offset-/, '');
        if (whichOffset.length == 0) { whichOffset = 12; }
        var whichPct = (parseInt(whichOffset) / 12) * 100;
        classFound = "margin-left-" + parseFloat(whichPct.toFixed(6)) + "%";
    }
    else { gridFound = false; }
    return [classFound, classesFound];
}
function shouldREM(className) {
    var ret = false;
    if (['font-size', 'line-height', 'width', 'height', 'top'].includes(className)) { ret = true; }
    else if (['margin', 'paddin', 'spacin'].includes(className.substring(0, 6))) { ret = true; }
    else if (['top', 'bottom', 'left', 'right'].includes(className)) { ret = true; }
    else if (className.indexOf('-') > 0) {
        if (['top', 'bottom', 'left', 'right', 'width', 'height'].includes(className.split('-').pop())) { ret = true; }
    }
    return ret;
}
function getREM(className, classValue, classesFound, remMultiplier) {
    if (shouldREM(className) && (contains(classValue, 'px') || !isNaN(classValue))) {
        var classRoot = classValue.replace('px', '');
        if (!isNaN(classRoot) && classRoot > 0) {
            var classRem = parseInt(classRoot) / (remMultiplier || 16);
            if (!isNaN(classRem) && classRem > 0) { classesFound.push(className + '-' + classRem + 'rem'); }
        }
    }
    return classesFound;
}
function knowAttr() {
    return ["attr", "data"];
}
function knowEvents() {
    //JAA TODO - add more events
    return ["click"]; //"load","ready","resize","touch","mouse","swipe","drag"];
}
function knowParent(elem, level) {
    var elemParent = elem;
    while (level > 0) {
        if (elemParent && "parentNode" in elemParent && "classList" in elemParent.parentNode) { elemParent = elemParent.parentNode; }
        level--;
    }
    return elemParent;
}
// JAA TODO - check modifer & screen for ^, ^2-, parent-, parent2-, etc
function getParentSelector(screen, classFound, classesFound, modifier) {
    var classParent = 0;
    var classEvent = "";
    var screenEvent = screen;
    var modifierEvent = modifier;
    if (contains(modifier, '^')) {
        classParent = 1;
        modifier = modifier.replace(/\^/g, '');
    }
    if (contains(screenEvent, '^')) {
        screenEvent = screenEvent.replace(/\^/g, '');
        var screenUp = screenEvent;
        if (contains(screenEvent, '-')) {
            var screenParts = screenEvent.split('-', 2);
            if (!isNaN(screenParts[0])) {
                screenUp = screenParts[0];
                screenEvent = screenParts[1];
                screen = '^' + screenEvent;
            }
        }
        classParent = !isNaN(screenUp) ? parseInt(screenUp) : 1;
    }
    if (contains(knowEvents(), screenEvent)) {
        classEvent = screenEvent;
        screen = screenEvent;
    }
    else if (contains(knowAttr(), screenEvent)) {
        classEvent = "";
        screen = screenEvent;
    }
    else {
        if (contains(classFound, '^')) {
            classFound = classFound.replace(/\^/g, '');
            classParent = 1;
        }
        else if (contains(classFound, 'parent-')) {
            classFound = classFound.replace('parent-', '');
            classParent = 1;
        }
        else if (['^', 'parent'].includes(screen)) {
            classParent = 1;
            screen = 'n';
        }
        else {
            if (contains(screen, '^')) {
                screen = screen.replace('^', 'parent-');
                if (classParent == 0) { classParent = 1; }
            }
            else { classParent = contains(screen, 'parent') ? 1 : classParent; }
            if (classParent > 0 && contains(screen, '-')) {
                var modifierParts = screen.split('-', 2);
                if (modifierParts[0] in screenSizes) { screen = modifierParts[0]; }
                else if (modifierParts[1] in screenSizes) { screen = modifierParts[1]; }
                else { screen = 'n'; }
            }
        }
    }
    if (!isNaN(classFound)) { classFound = getFontOrWeight(classFound); }
    if (classParent > 99) { classParent = 0; }
    return [classParent, classFound, classesFound, screen, classEvent, modifier];
}
var knowEnvironment = [];
var userConditionals = [];
function getNavigator() {
    return {
        agent: navigator.userAgent,
        vendor: navigator.vendor,
        platform: navigator.platform
    };
}
function getUserConditionals() {
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
function getEnvironmentSelector(screen) {
    var classEnvironment = "";
    var allowEnvironment = true;
    var reverseEnvironment = false;
    if (contains(screen, '-')) {
        var modifierParts = screen.split('-', 2);
        if (modifierParts[0] in screenSizes) { [screen, classEnvironment] = modifierParts; }
        else if (modifierParts[1] in screenSizes) { [classEnvironment, screen] = modifierParts; }
    }
    else { classEnvironment = screen; }
    if (contains(classEnvironment, '!')) {
        reverseEnvironment = true;
        classEnvironment = classEnvironment.replace('!', '');
    }
    if (!contains(knowEnvironment, classEnvironment)) { classEnvironment = ""; }
    else {
        if (!contains(userConditionals, classEnvironment)) { allowEnvironment = false; }
        else if (classEnvironment == screen) { screen = 'n'; }
        if (reverseEnvironment) { allowEnvironment = !allowEnvironment; }
    }
    return [classEnvironment, screen, allowEnvironment];
}
function getShorterHand(classFound, classesFound, ii) {
    if (classFound in globalMixins) {
        classFound = globalMixins[classFound].trim();
        if (contains(classFound, ' ')) {
            var classMore = classFound.split(/(\s+)/).filter(e => e.trim().length > 0);
            classFound = classMore.shift();
            if (classMore.length > 0) { classesFound.concat(...classMore); }
        }
    }
    return [classFound, classesFound];
}
function getFontOrWeight(classFound) {
    if (classFound > 0 && (classFound % 100) == 0) { classFound = 'font-weight-' + parseFloat(classFound); }
    else { classFound = "font-size-" + parseFloat(classFound) + "px"; }
    return classFound;
}
function replaceVars(className, classValue) {
    var classValues = contains(classValue, '/') ? classValue.split('/') : [classValue];
    var i = 1;
    var j = classValues.length;
    var x = j + 10;
    while (i <= x) {
        className = className.replace(eval("/\\$" + i + "/g"), j >= i ? classValues[i - 1] : j == 1 ? classValues[0] : '');
        if (!contains(className, '$')) { break; }
        i++;
    }
    return className;
}
function getShortHand(classFound, classesFound) {
    var classImportant = '';
    var classScreen = '';
    [classFound, classImportant, classScreen] = getReversion(classFound, classScreen);
    var wByH = contains(classFound, 'x') && RegExp('^(|max-|min-)([0-9]{1,10})x([0-9]{1,10})$', 'i').exec(classFound);
    if (wByH) {
        var classValue = wByH[2];
        if (!isNaN(classValue) && classValue !== '0') { classValue += 'px'; }
        classFound = wByH[1] + 'width-' + classValue;
        classesFound.push(wByH[1] + 'height-' + classValue);
    }
    else if (!isNaN(classFound)) { classFound = getFontOrWeight(classFound); }
    else {
        var classChanged = false;
        if (!classChanged && defined(knowCSSOptions.shortHand)) {
            if (contains(classFound, '--')) { classFound = classFound.replace(/\-{2,100}$/g, '-'); }
            if (classFound in knowCSSOptions.shortHand) {
                classFound = knowCSSOptions.shortHand[classFound].trim();
                classChanged = true;
            }
        }
        if (!classChanged && contains(classFound, '-') && defined(knowCSSOptions.shortHandVariable)) {
            var classParts = classFound.split('-', 2);
            if (classParts[0] in knowCSSOptions.shortHandVariable) {
                classFound = replaceVars(knowCSSOptions.shortHandVariable[classParts[0]].trim(), classParts[1]);
                classChanged = true;
            }
        }
        if (classChanged) {
            if (contains(classFound, ' ')) {
                var classMore = classFound.split(/(\s+)/).filter(e => e.trim().length > 0);
                classFound = classMore.shift();
                if (classMore.length > 0) { classesFound.push(...classMore); }
            }
        }
    }
    return [classFound + classImportant, classesFound];
}
function getValue(val) {
    val = val.replace(/;/g, '');
    var hX = defined(knowCSSOptions.hexColors);
    if (containsAny(val, ['/', '|', '_'])) {
        val = val.replace(/[\/|\||\_]/g, ' ');
        var vals = val.split(' ');
        if (vals.length > 2) {
            if (hX && vals[2] in knowCSSOptions.hexColors) {
                vals[2] = '#' + getShortColor(knowCSSOptions.hexColors[vals[2]]);
                val = vals.join(' ');
            }
        }
    }
    else if (hX && val in knowCSSOptions.hexColors) { val = '#' + getShortColor(knowCSSOptions.hexColors[val]); }
    else if (begins(val, 'calc')) { val = val.replace('-', ' - ').trim(); }
    return val;
}
function getKeyShorter(modifier, name, val, important, parent, event) {
    return (modifier + '_' + name + '_' + val + '_' + important + '_' + parent.toString() + '_' + event).toLowerCase().replace(/[\s\n\r]/gi, '-');
}
function getKey(screen, modifier, name, action, val, important, parent, event) {
    return (screen + '_' + modifier + '_' + name + '_' + action + '_' + val + '_' + important + '_' + parent.toString() + '_' + event).toLowerCase().replace(/[\s\n\r]/gi, '-');
}
function getParents(container, parent) {
    var ret = [];
    if (contains(container, '^')) { ret[1] = true; }
    else { ret[0] = true; }
    return ret;
}
function getModifiers(container, modifier, action, single) {
    var ret = {};
    var modifier = '';
    var keepAction = false;
    var modifierSub = '';
    var modifierTag = '';
    if (begins(container, '+')) { modifier = ':first-child ' + container.replace(/\+/g, ' > ').trim(); }
    else {
        if (contains(container, '~')) { modifierSub = '~'; }
        else if (contains(container, '+')) { modifierSub = '+'; }
        if (modifierSub.length > 0) {
            [action, container] = container.split(modifierSub, 2);
            keepAction = true;
        }
        if (['all', '*', '>'].includes(container)) { modifier = ' *'; }
        else if (begins(container, '>')) { modifier = ' ' + container.replace(/\>/g, ' > ').trim(); }
        else if (begins(container, 'all')) {
            if (begins(container, 'all-')) { modifier = ' ' + container.replace('all-', ''); }
            else if (begins(container, 'all>')) { modifier = ' ' + container.replace('all>', '> '); }
        }
        else if (contains(container, 'nth')) {
            if (contains(container, '-nth')) {
                [modifierTag, container] = container.split('-nth', 2);
                container = 'nth' + container;
            }
            var colon = ':' + (keepAction ? action + modifierSub + modifierTag + ':' : '');
            if (contains(container, 'nth-child')) { modifier = colon + 'nth-child(' + container.replace('nth-child-', '') + ')'; }
            else if (contains(container, 'nth-last-child')) { modifier = colon + 'nth-last-child(' + container.replace('nth-last-child-', '') + ')'; }
            else if (contains(container, 'nth-of-type')) { modifier = colon + 'nth-of-type(' + container.replace('nth-of-type-', '') + ')'; }
            else if (contains(container, 'nth-last-of-type')) { modifier = colon + 'nth-last-of-type(' + container.replace('nth-last-of-type-', '') + ')'; }
        }
    }
    ret[modifier] = true;
    return [single ? modifier : ret, keepAction ? '' : action];
}
function getModifier(classList, classSecondary) {
    var zA = '', aM = [];
    if (classSecondary) { zA = new RegExp('([a-zA-Z0-9\-]{1,255})\\(\\((.*?)\\)\\)', 'gis'); }
    else { zA = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!\<\^\/\_\|\,]{1,255})\{(.*?)\}', 'gis'); }
    var screen = '', modifier = '', action = '', parent = '', container = '', dynamic = '', grepTag = '', multiScreen = false;
    var screens = {}, actions = {};
    var classListCheck = {}, containerPrefix = '', keyNew = '', actionSet = {}, parentContainer = "";
    for (var key in classList) { classListCheck[key] = true; }
    for (var key in classListCheck) {
        grepTag = classList[key];
        while ((aM = zA.exec(grepTag)) !== null) {
            [screen, modifier, action, parent] = key.split('_', 4);
            classList[key] = classList[key].replace(aM[0], '').trim();
            container = aM[1];
            parentContainer = container.indexOf("^") > -1 ? "^" : "";
            multiScreen = false;
            [dynamic, action] = getModifiers(container, modifier, action, true);
            if (dynamic.length > 0) { classList[screen + '_' + dynamic + '_' + action + '_'] = aM[2]; }
            else {
                actions = getActions(container, action);
                screens = getScreens(container, screen);
                for (var screenKey in screens) {
                    var actionsLen = actions.length;
                    var i = 0;
                    while (i < actionsLen) {
                        actionSet = actions[i];
                        for (var actionKey in actionSet) {
                            containerPrefix = actionSet[actionKey];
                            if (containerPrefix.length > 0) {
                                if (screenKey in screenSizes) { screenKey = screenSizes[screenKey].join('?'); }
                                keyNew = screenKey + '_' + parentContainer + containerPrefix + actionKey + '__';
                            }
                            else if (contains(screenKey, '?')) {
                                keyNew = screenKey + '_' + modifier + '_' + actionKey + '_';
                            }
                            else if (container !== 'n' || modifier !== 'n' || actionKey !== 'n' || begins(container, 'media-') || screenTypes.includes(container) || ruleTypes.includes(container)) {
                                keyNew = container + '_' + modifier + '_' + actionKey + '_';
                            }
                            else { keyNew = ''; }
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
    return classList;
}
function getColor(hE, hC) {
    var hX = defined(knowCSSOptions.hexColors);
    var hS = false;
    if (hX) {
        var hU = "";
        if (contains(hC, '@')) { hU = "@"; }
        else if (contains(hC, '~')) { hU = "~"; }
        if (hU.length > 0) {
            var hP = hC.split(hU, 2);
            var hL = hP[0];
            var hG = "";
            if (contains(hL, '~')) {
                [hL, hG] = hL.split("~", 2);
                hG = '~' + hG;
            }
            if (hL in knowCSSOptions.hexColors) {
                hE = knowCSSOptions.hexColors[hL].trim() + hU + hP[1] + hG;
                hC = "color";
            }
        }
        else if (hE in knowCSSOptions.hexColors) {
            hE = knowCSSOptions.hexColors[hE].trim() + "@" + hC;
            hC = "color";
            hS = true;
        }
        else if (hC in knowCSSOptions.hexColors) {
            hE = knowCSSOptions.hexColors[hC].trim() + "@" + hE;
            hC = "color";
        }
    }

    if (hS || containsAny(hC, ['background', 'color'])) {
        if (!contains(hE, '(')) {
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
            if (hX && hF in knowCSSOptions.hexColors) { hF = knowCSSOptions.hexColors[hF].trim(); }
            var zH = new RegExp('^([0-9a-f]{1,6})$', 'i');
            if (zH.test(hF)) {
                hF = getShade(hF, zY[1]);
                if (zY[2] != 100) { hE = getOpacity(hF, zY[2]); }
                else if (hF.length > 6) { hE = hF; }
                else { hE = '#' + getHex(hF); }
            }
            else if (hF.length > 6) { hE = hF; }
            else { hE = (hE.length > 0 ? '#' : '') + hF; }
        }
    }
    else if (['color', 'bgcolor', 'alink', 'vlink', 'link'].includes(hC)) {
        var zH = new RegExp('^([0-9a-f]{1,6})$', 'i');
        if (zH.test(hE)) { hE = '#' + getHex(hE); }
    }
    else if (['text'].includes(hE)) {
        var zH = new RegExp('^([0-9a-f]{1,6})$', 'i');
        if (zH.test(hC)) { hC = '#' + getHex(hC); }
    }
    return hS ? [hE, hC] : [hC, hE];
}
function getHex(sC) {
    var sH = sC.toString(16);
    return getShortColor((sH.length == 1) ? '0' + sH : sH);
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
        return sC;
    }
}
function getOpacity(sC, sP) {
    var sA = null, sB = getRGB(sC);
    if (sB.length == 0) { return sC; }
    else { return "rgba(" + sB[0] + "," + sB[1] + "," + sB[2] + "," + (sP / 100) + ")"; }
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
    if (contains(hA, 'family')) {
        hA = 'font-family';
        if (contains(hB, ',')) {
            var hS = [];
            hB.split(',').forEach(function (val) { hS.push(contains(val, ' ') ? '"' + val + '"' : val); });
            hB = hS.join(',');
        }
    }
    return [hA, hB];
}
function getWrapper(xZ) {
    var start = [], end = '}', tab = masterTab, line = masterLine;
    if (ruleTypes.includes(xZ)) { start.push('@' + xZ + ' {'); }
    else if (contains(xZ, 'media-')) {
        var xC = {
            'media': 'media',
            "not": "not all and",
            "!": "not all and",
            "only": "only"
        };
        var xP = "";
        for (var xK in xC) {
            if (contains(xZ, xK)) {
                xP += xC[xK] + ' ';
                xZ = xZ.replace(xK + '-', '').replace(xK, '');
            }
        }
        var xY = getMediaQuery(xZ);
        if (xY) {
            xZ = xY[1];
            xY[2] = xY[2].replace(/-/g, '').replace(/\//g, ' ');
            if (xY[2].length > 0) { xZ += ':' + xY[2]; }
        }
        start.push('@' + xP + '(' + xZ + ') {');
    }
    else if (xZ in screenSizes) {
        start.push('@media screen and (');
        if (contains(xZ, 'down')) { start.push('max-width:' + screenSizes[xZ][1] + 'px'); }
        else if (contains(xZ, 'up')) { start.push('min-width:' + screenSizes[xZ][0] + 'px'); }
        else { start.push('min-width:' + screenSizes[xZ][0] + 'px) and (max-width:' + screenSizes[xZ][1] + 'px'); }
        start.push(') {');
    }
    else if (contains(xZ, '?')) {
        var kE = xZ.split('?', 2);
        start.push('@media screen and (min-width:' + kE[0] + 'px) and (max-width:' + kE[1] + 'px) {');
    }
    else if (screenTypes.includes(xZ)) {
        start.push('@media ');
        if (begins(xZ, 'not')) { start.push('not ' + xZ.replace('not', '')); }
        else if (begins(xZ, '!')) { start.push('not ' + xZ.replace('!', '')); }
        else if (begins(xZ, 'only')) { start.push('only ' + xZ.replace('only', '')); }
        else { start.push(xZ); }
        start.push(' {');
    }
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
var screenTypes = [];
var ruleTypes = {};
function getGreps() {
    const getLists = knowCSSLists();

    mediaGrep = "^(" + getLists.media.join("|").replace('/-/gi', '\\-') + ")(.*)$";

    webkitGrep = "^" + getLists.webkit.join("|").replace('/-/gi', '\\-');

    actionGrep = [
        [" *::", "(" + getLists.modifiers.join("|").replace('/-/gi', '\\-') + ")", '::'],
        [" *:", "(" + getLists.selectors.join("|").replace('/-/gi', '\\-') + ")", ':'],
        [":", "(" + getLists.actions.join("|").replace('/-/gi', '\\-') + ")", ':']
    ];

    screenTypes = getLists.screens;
    var x = screenSizeKeys.length;
    var i = 0;
    while (i < x) {
        screenTypes.push("\\!" + screenSizeKeys[i], screenSizeKeys[i] + "down", screenSizeKeys[i] + "up", screenSizeKeys[i]);
        i++;
    }
    screenGrep = "(" + screenTypes.join("|").replace('/-/gi', '\\-') + ")";

    ruleTypes = getLists.at;
}
function getMediaQuery(mS) {
    return new RegExp(mediaGrep).exec(mS);
}
function getWebKit(wS) {
    return new RegExp(webkitGrep).test(wS);
}
function getActions(mS, mD, mF) {
    var ret = [{}, {}, {}], zA = '', zM = null, zS = '', zY = false;
    var x = actionGrep.length;
    var i = 0;
    var mA = '*';
    var mP = mA;
    var mU = mS.indexOf("^") > -1 ? "^" : "";
    ['>', '~', '+'].forEach(function (val) {
        if (contains(mS, val)) {
            mP = mS.split(val, 2).pop();
            if (!mP) { mP = mA; }
            else { mP = val + mP; }
        }
    });
    mP = mP.replace(/>/g, ' ');
    while (i < x) {
        zM = new RegExp(actionGrep[i][1], 'gi');
        zS = actionGrep[i][0].replace(mA, mP);
        while ((zA = zM.exec(mS)) !== null) {
            if (zS == ':' && mP != mA) { zA[1] += mP; }
            if (zA[1] == mS) { zS = actionGrep[i][2]; }
            ret[i][zA[1]] = zS;
            zY = true;
        }
        i++;
    }
    if (!zY) { ret = [{}]; ret[0][mU + mD] = ""; }
    if (mF) {
        ret = ret.filter(function (val) { return Object.keys(val).length > 0; });
    }
    return ret;
}
function getScreens(mS, mD) {
    var ret = {};

    var multiLoop = true;
    var multiScreen = "";
    var multiMax = 10;
    var multiRange = [];
    var multiFirst = "";
    var multiLast = "";
    while (multiLoop) {
        var grepFind = /(^[A-Za-z0-9\s\-]+)/.exec(mS);
        if (grepFind) {
            multiScreen = grepFind[1];
            if (contains(multiScreen, '-')) {
                multiRange = multiScreen.split('-');
                multiFirst = multiRange.shift();
                multiLast = multiRange.pop();
                if (multiFirst in screenSizes) { multiFirst = screenSizes[multiFirst][0]; }
                else if (isNaN(multiFirst)) { multiFirst = 0; }
                if (multiLast in screenSizes) { multiLast = screenSizes[multiLast][1]; }
                else if (isNaN(multiLast)) { multiLast = 9999; }
                ret[multiFirst + '?' + multiLast] = true;
            }
            else {
                if (multiScreen in screenSizes || !isNaN(multiScreen)) { ret[multiScreen] = true; }
            }
            mS = mS.substring(multiScreen.length + 1);
            multiMax--;
            if (multiMax == 0 || mS.length == 0) { multiLoop = false; }
        }
        else { multiLoop = false; }
    }

    if (mS.length == 0) { }
    else if (mS in screenSizes || !isNaN(mS)) { ret[mS] = true; }
    else {
        var all = [], zA = '', zB = '', notScreens = false;
        var zM = new RegExp(screenGrep, 'gi');
        while ((zA = zM.exec(mS)) !== null) {
            zB = zA[1];
            if (contains(zB, '!')) {
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
    }
    if (Object.keys(ret).length == 0) { ret[mD] = true; }
    return ret;
}
function getCleanStyles(style) {
    return style.replace(/(;){2,}/g, ';');
}
function getUserMixins() {
    if (defined(knowCSSOptions.mixins)) {
        for (var key in knowCSSOptions.mixins) { allMixins[key] = getVariables(knowCSSOptions.mixins[key]); }
    }
    if (defined(knowCSSOptions.components)) {
        for (var key in knowCSSOptions.components) { allMixins[key] = getVariables(knowCSSOptions.components[key]); }
    }
    for (var key in allMixins) {
        if (typeof allMixins[key] !== 'string') { allMixins[key] = allMixins[key].join(' '); }
    }
}
function moreMixins(classFound, classesFound, classImportant) {
    var classFoundOriginal = classFound;
    classFound = getMixins(crossMixins(classFound));
    if (classFound !== classFoundOriginal) {
        if (contains(classFound, ' ')) {
            var classMore = classFound.split(/(\s+)/).filter(e => e.trim().length > 0);
            classFound = classMore.shift();
            if (classMore.length > 0) {
                if (classImportant.length > 0) {
                    classMore = classMore.map(function (val) { return classImportant + val; });
                }
                classesFound.push(...classMore);
            }
        }
    }
    return [classFound, classesFound];
}
function variableMixin(mZ) {
    var mP = "";
    var mR = "";
    var mC = "";
    var mF = false;
    if (!contains(mZ, '[')) {
        if (mZ.indexOf('-') > 0) {
            [mP, mR] = mZ.split('-', 2);
            if (mP in allMixins) {
                mZ = mP;
                mC = "-";
                mF = true;
            }
            else { mR = ""; }
        }
        if (!mF && mZ in allMixins) { mF = true; }
    }
    return [mF, mZ, mR, mC];
}
function getMixins(mA) {
    var mixin = '', newMixin = {}, anyNewMixin = false;
    var zM = new RegExp('\\[(.*?)\\]', 'i');
    var mX = [];
    var mS = "";
    var mZ = "";
    var mR = "";
    var mC = "";
    var mF = false;
    while ((mixin = zM.exec(mA)) !== null) {
        [mF, mZ, mR, mC] = variableMixin(mixin[1]);
        if (mF) {
            mX.push(mS + replaceVars(allMixins[mZ], mR) + ' ');
            mS = " ";
        }
        else {
            newMixin[mZ] = true;
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
        if (root && contains(root.innerHTML, '$')) { root.innerHTML = getVariables(root.innerHTML); }
    }
}
function getVariables(html) {
    if (contains(html, '$')) {
        var zZ = new RegExp('\\{\\{\\$(.*?)\\}\\}', 'gi'), varKey = '';
        while ((varKey = zZ.exec(html)) !== null) {
            var varsFound = 0, varFound = '';
            if (defined(knowCSSOptions.cssVars)) {
                if (varKey[1] in knowCSSOptions.cssVars) { varFound = knowCSSOptions.cssVars[varKey[1]].replace('/\\\\/gis', ''); }
            }
            while (contains(html, varKey[0])) {
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
/*
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
*/
function getSafeClass(screen, modifier, name, action, val, important) {
    var key = (screen + '_' + modifier + '_' + name + '_' + action + '_' + val + '_' + important).toLowerCase().replace(/[\s\n\r]/gi, '-');
    key = key.replace(/n_/g, '').replace(/[\#\,\(\)\_]/g, '-').replace(/[^[a-z0-9\-]/g, '').replace(/(\-){2,10}/g, '-').replace(/^\-/g, '').replace(/\-$/g, '');
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
    var zC = '';
    var zD = '';
    var zF = false;
    var zA = classString.split(' ');
    var x = zA.length;
    var i = 0;
    while (i < x) {
        [zF, zB, zD, zC] = variableMixin(zA[i]);
        rW.push(zF ? "[" + zB + zC + zD + "]" : zB);
        i++;
    };
    return rW.join(' ');
}
// JAA TODO - support multiple screensizes and @size (with notX and !X)
function getScreenPrefixes(classString) {
    var ret = [];
    var isAt = contains(classString, '@@');
    if (contains(classString, '-') || isAt) {
        var key = '', prefix = '', parts = [], modifier = "";
        var classesFound = classString.split(' ');
        var x = classesFound.length;
        var i = 0;
        while (i < x) {
            key = classesFound[i];
            modifier = "";
            if (isAt) { parts = key.split('@'); }
            else if (!contains(key, '{')) { parts = key.split('-'); }
            else { parts = []; }
            if (parts.length > 0) {
                if (parts.length > 200 && parts[1] in screenSizes) {
                    prefix = parts[1];
                    parts.splice(1, 1);
                }
                else if (isAt) { prefix = parts.pop(); }
                else { prefix = parts.shift(); }
                if (prefix.length > 0) {
                    if (contains(prefix, ":")) {
                        [prefix, modifier] = prefix.split(':', 2);
                    }
                    if (prefix in screenSizes || !isNaN(prefix)) {
                        if (modifier.length > 0) {
                            key = prefix + "{" + modifier + '((' + parts.join('-') + '))}';
                        }
                        else {
                            key = prefix + "{" + parts.join('-') + '}';
                        }
                    }
                }
            }
            ret.push(key);
            i++;
        };
    }
    else { ret = [classString]; }
    return ret.join(' ');
}
function getContainerExtras(classFound, classesFound) {
    if (classFound == 'container') {
        classFound = '';
        classesFound.push(
            "width-100%",
            "padding-right-15px", "padding-left-15px", "margin-right-auto", "margin-left-auto",
            "max-width-100%", "1230{max-width-1550}", "1200{max-width-1140}", "1024{max-width-940}", "768{max-width-720}"
        );
    }
    else if (key == 'container-fluid') {
        classFound = '';
        classesFound.push("width-100%", "padding-right-15px", "padding-left-15px", "margin-right-auto", "margin-left-auto");
    }
    return [classFound, classesFound];
}
function getContainers(classString) {
    var ret = [];
    if (contains(classString, 'container')) {
        var key = '';
        var classesFound = classString.split(' ');
        var x = classesFound.length;
        var i = 0;
        while (i < x) {
            key = classesFound[i];
            [key, ret] = getContainerExtras(key, ret);
            if (key.length > 0) { ret.push(key); }
            i++;
        };
    }
    else { ret = [classString]; }
    return ret.join(' ');
}
function parseClassValue(val) {
    var className = "", classValue = ""
    if (contains(val, ':')) { [className, classValue] = val.split(':', 2); }
    else if (contains(val, '=')) { [className, classValue] = val.split('=', 2); }
    else if (contains(val, '-')) { [className, classValue] = val.split('-', 2); }
    else { className = val; }
    return className.trim() + ': ' + classValue.replace(/[\/|\||\_]/g, ' ').trim();
}

function knowMotionRender(knowMotion) {
    var ret = {
        "found": false,
        "keys": {},
        "restart": ""
    };

    if (knowMotion) {
        var foundMotions = typeof knowMotions !== 'undefined';

        var zA = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!\<\^\/\|\_\,\%]{1,255})\{(.*?)\}', 'gis');
        var zN = null, aM = [], aN = [], aF = false, kF = "", kS = "", kP = [], val = "", i = 0, x = 0;
        var classListCheck = [], grepTag = '', keyFrames = {}, runningTag = '';
        var classList = { 'n_n_n_': knowMotion };

        var keyFramesCSS = [], keyFrameValues = [];
        var classValues = [], runningTags = [];
        var animationRef = "", animationID = "", animationVals = {}, animationKeys = [], animationInitial = [], animationPossible = [], animationLast = "", animationReplay = 0;

        var animationPrefix = 'animation-';
        var animationShortHand = {
            "fwd": ["fill-mode", "forwards"],
            "bwd": ["fill-mode", "backwards"],
            "rev": ["direction", "reverse"],
            "alt": ["direction", "alternate"],
            "altrev": ["direction", "alternate-reverse"],
            "in": ["timing-function", "ease-in"],
            "out": ["timing-function", "ease-out"],
            "in-out": ["timing-function", "ease-in-out"],
            "once": ["iteration-count", "1"],
            "twice": ["titeration-count", "2"]
        };

        var container = "", screen = "", modifier = "", action = "";
        var screens = [], actions = [];
        var keyNew = "", previousAnimation = "", animationLetter = "", screenPrefix = "";

        for (var key in classList) { classListCheck.push(key); }
        while (classListCheck.length > 0) {
            key = classListCheck.pop();

            if (foundMotions) {
                runningTags = [];
                classValues = classList[key].split(' ');
                i = 0;
                x = classValues.length;
                while (i < x) {
                    val = classValues[i];
                    if (val in knowMotions) { runningTags.push(knowMotions[val].join(' ')); }
                    else { runningTags.push(val); }
                    i++;
                }
                grepTag = runningTags.join(' ');
            }
            else { grepTag = classList[key]; }
            runningTag = grepTag;

            keyFrames = {};
            [screen, modifier, action, previousAnimation] = key.split('_', 4);

            if (previousAnimation.length > 0) {
                animationLetter = previousAnimation;
            }
            else {
                knowMotionLetter = getNextLetter(knowMotionLetter);
                animationLetter = knowMotionLetter;
            }
            animationID = "km" + animationLetter;

            if (key in ret.keys == false) {
                ret.keys[key] = {
                    class: animationID,
                    values: "",
                    keyframes: ""
                };
            }

            animationVals = {
                "name": animationID,
                "duration": "3s", //timing - [0-9]s
                "delay": "0s", // delay - d[0-9]s
                "iteration-count": "infinite", // count - [0-9] or [infinte|once|twice]
                "direction": "", // direction - [rev|alt|altrev|reverse|alternate|alternate-reverse|normal]
                "timing-function": "", // curve - cubic-bezier - cb(a,b,c,d) or [linear|ease|ease-in|ease-out|ease-in-out|in|out|in-out]
                "fill-mode": "" // mode - [fwd|bwd|both|forwards|backwards]
            };
            animationInitial = [];
            animationPossible = [];
            animationReplay = 0;

            while ((aM = zA.exec(grepTag)) !== null) {
                container = aM[1];
                zN = new RegExp(/^([a-z0-9\/\-\,\%]{1,255})$/, 'gis');
                aN = zN.exec(aM[1]);
                aF = true;
                if (aN) {
                    kF = aN[1];
                    kS = "";
                    if (contains(kF, '-')) { kS = "-"; }
                    else if (contains(kF, '/')) { kS = "/"; }
                    else if (contains(kF, ',')) { kS = ","; }
                    kP = kS.length > 0 ? kF.split(kS) : [kF];
                    kP.forEach(function (val) {
                        if (val == "from") { keyFrames["0"] = aM[2]; }
                        else if (val == "to") { keyFrames["100"] = aM[2]; }
                        else if (containsAny(val, ['%', '/', ',', '-'])) { keyFrames[val.replace("%", "")] = aM[2]; }
                        else if (!isNaN(val)) { keyFrames[val] = aM[2]; }
                        else if (val in screenSizes) { aF = false; }
                        else { aF = false; }
                    });
                }
                else { aF = false; }

                if (!aF) {
                    actions = getActions(container, action);
                    screens = getScreens(container, screen);
                    for (var screenKey in screens) {
                        actions.forEach(function (actionSet) {
                            for (var actionKey in actionSet) {
                                keyNew = screenKey + '_' + modifier + '_' + actionKey + '_' + animationLetter;
                                if (key !== keyNew) {
                                    if (keyNew in classList) { classList[keyNew] += ' ' + aM[2]; }
                                    else { classList[keyNew] = aM[2]; }
                                    if (classListCheck.indexOf(keyNew) == -1) { classListCheck.push(keyNew); }
                                }
                            }
                        });
                    }

                    // loop through attributes to determine events and add listeners
                    // play-state = [pause|play|stop|restart]

                }
                runningTag = runningTag.replace(aM[0], '').trim();
            }

            classValues = contains(runningTag, ' ') ? runningTag.split(' ') : [runningTag];

            i = 0;
            x = classValues.length;
            while (i < x) {
                val = classValues[i].trim();

                animationRef = "";
                if (val in animationShortHand) {
                    animationRef = animationShortHand[val];
                    animationVals[animationRef[0]] = animationRef[1];
                }
                else if (["linear", "ease", "ease-in", "ease-out", "ease-in-out"].includes(val)) { animationVals["timing-function"] = val; }
                else if (["forwards", "backwards", "both"].includes(val)) { animationVals["fill-mode"] = val; }
                else if (["reverse", "alternate", "alternate-reverse", "normal"].includes(val)) { animationVals["direction"] = val; }
                else if (["infinite"].includes(val) || /^\d+$/.test(val)) { animationVals["iteration-count"] = val; }
                else if (/^\d+s$/.test(val)) { animationVals["duration"] = val; }
                else if (/^\d*(\.\d+)+s$/.test(val)) { animationVals["duration"] = val; }
                else if (/^d\d+s$/.test(val)) { animationVals["delay"] = val.replace('d', ''); }
                else if (/^d\d*(\.\d+)+s$/.test(val)) { animationVals["delay"] = val.replace('d', ''); }
                else if (contains(val, "last-") && "100" in keyFrames) {
                    animationLast = val.split('-', 2).pop();
                    if (animationLast in keyFrames) { keyFrames["100"] = keyFrames[animationLast]; }
                }
                else if (contains(val, "first-") && "0" in keyFrames) {
                    animationLast = val.split('-', 2).pop();
                    if (animationLast in keyFrames) { keyFrames["0"] = keyFrames[animationLast]; }
                }
                else if (contains(val, "restart-")) {
                    animationReplay = val.split('-', 2).pop().replace('s', '');
                    if (isNaN(animationReplay)) { animationReplay = 0; }
                }
                else { animationPossible.push(val); }
                i++;
            };

            if (animationPossible.length > 0) {
                i = 0;
                x = animationPossible.length;
                while (i < x) {
                    val = animationPossible[i].trim();
                    if (val.length > 0) { animationInitial.push(parseClassValue(val)); }
                    i++;
                }
            }

            x = Object.keys(keyFrames).length;
            if (x > 0) {
                if (x > 1) {
                    keyFrames = Object.keys(keyFrames).sort(function (a, b) {
                        if (parseInt(a) > parseInt(b)) { return 1; }
                        else { return -1; }
                    }).reduce((obj, key) => { obj[key] = keyFrames[key]; return obj; }, {});
                }
                keyFramesCSS = ["@keyframes " + animationID + "{"];
                keyFrameValues = [];
                for (var keyFrame in keyFrames) {
                    keyFrameValues = [];
                    classValues = keyFrames[keyFrame].split(' ');
                    i = 0;
                    x = classValues.length;
                    while (i < x) {
                        keyFrameValues.push(parseClassValue(classValues[i]));
                        i++;
                    };
                    if (keyFrameValues.length > 0) { keyFramesCSS.push(" " + keyFrame + "% { " + keyFrameValues.join('; ') + "; }"); }
                }
                keyFramesCSS.push("}");
                ret.keys[key].keyframes = keyFramesCSS.join('');
            }

            animationKeys = animationInitial;
            for (var animationKey in animationVals) {
                if (animationVals[animationKey].length > 0) { animationKeys.push(animationPrefix + animationKey + ": " + animationVals[animationKey].replace(/[\/|\||\_]/g, ' ')); }
            }

            if (animationKeys.length > 0) {
                if (screen != 'n') {
                    if (contains(screen, 'down')) { screenPrefix = 'max-width:' + screenSizes[screen][1] + 'px'; }
                    else if (contains(screen, 'up')) { screenPrefix = 'min-width:' + screenSizes[screen][0] + 'px'; }
                    else { screenPrefix = 'min-width:' + screenSizes[screen][0] + 'px) and (max-width:' + screenSizes[screen][1] + 'px'; }
                    ret.keys[key].values = "@media (" + screenPrefix + ") { ." + animationID + " { " + animationKeys.join('; ') + '; } }';
                }
                else { ret.keys[key].values = "." + animationID + " { " + animationKeys.join('; ') + '; }'; }

                ret.restart = animationReplay > 0 ? parseFloat(animationReplay) * 1000 : 0;
                ret.found = true;
            }
        }
    }
    return ret;
};


const parseQuick = function (attr) {
    var greps = [
        new RegExp('([a-zA-Z0-9\-\+\>\~\*\!\<\^]{1,255})\{(.*?)\}', 'gis'),
        new RegExp('([a-zA-Z0-9\-]{1,255})\\(\\((.*?)\\)\\)', 'gis')
    ];

    var checkGroups = [];
    var screen = "", modifier = "", action = "", parent = "";
    var screens = [], modifiers = [], actions = [], parents = [];
    var grepGroup = "", grepOriginal = "", grepFound = [], grepFull = "", grepWrap = "", grepClasses = "";
    var masterKeyNew = "";

    // screen_modifier_action_parent key: [check again based on changes, raw know value]
    var masterGroups = { "n_n_n_n": [false, attr] };

    greps.forEach(function (grepVal) {
        checkGroups = Object.keys(masterGroups);
        checkGroups.forEach(function (masterKey) {
            [screen, modifier, action, parent] = masterKey.split('_', 4);
            grepGroup = masterGroups[masterKey][1];
            grepOriginal = masterGroups[masterKey][1];
            while ((grepFound = grepVal.exec(grepGroup)) !== null) {
                [grepFull, grepWrap, grepClasses] = grepFound;

                // screen single -> sm, lg, 480, smup, smdown, etc
                // screen list with any non a-z/0-9 splitter -> sm~lg, sm+lg, sm|lg, sm:lg, sm_lg, sm/lg, etc
                // screen range with hyphen -> sm-lg, xl-xxl, sm-lg/xl-xxl, etc
                screens = getScreens(grepWrap, screen);

                // modifiers which may clear action
                [modifiers, action] = getModifiers(grepWrap, modifier, action);

                // actions from modifiers/selectors/actions master list
                actions = getActions(grepWrap, action, true);

                // parent with caret: ^
                // parent with parent prefix and any non a-z0-9 splitter: parent:, parent-, parent_, parent~, etc
                // up level parent with number before ^ or parent -> 2^, 3parent, etc
                parents = getParents(grepWrap, parent);

                grepOriginal = grepOriginal.replace(grepFull, '').trim();

                // loop through screens/modifiers/actions/parents and check for != n_n_n_n to append to masterGroups
                for (var screensKey in screens) {
                    for (var modifiersKey in modifiers) {
                        actions.forEach(function (actionVal) {
                            for (var actionsKey in actionVal) {
                                for (var parentsKey in parents) {
                                    masterKeyNew = screensKey + '_' + modifiersKey + '_' + actionsKey + '_' + parentsKey;
                                    if (masterKeyNew != masterKey) {
                                        if (masterKeyNew in masterGroups) {
                                            if (!contains(masterGroups[masterKeyNew][1], ' ' + grepClasses)) {
                                                masterGroups[masterKeyNew][1] += ' ' + grepClasses;
                                            }
                                        }
                                        else { masterGroups[masterKeyNew] = [false, grepClasses]; }
                                    }
                                }
                            }
                        });
                    }
                }
            }

            // split any grepOriginal left to look for additional screen/modifier/action/parent
            var grepRetain = [];
            if (grepOriginal.length > 0) {
                [screen, modifier, action, parent] = masterKey.split('_', 4);
                //var grepOriginals = grepOriginal.split(' ');
                //var grepOriginals = grepOriginal.split(/(\s+)/).filter(e => e.trim().length > 0)
                var grepOriginals = grepOriginal.replace(/\s+/gi, ' ').split(' ');
                var grepClass = "", grepPrefix = "", grepSuffix = "", grepKeep = true, grepFind = null;
                var grepClassMore = [];
                while (grepOriginals.length > 0) {
                    grepClass = grepOriginals.shift();
                    grepKeep = true;
                    grepFind = /^[A-Za-z0-9\s]+/.exec(grepClass);
                    if (grepFind) {
                        grepPrefix = grepFind[0];
                        if (grepPrefix !== grepClass) {
                            grepSuffix = grepClass;

                            //screens = getScreens(grepWrap, screen)
                            //switch to get screens as long as !isNan() is supported to match a screen size
                            if (grepPrefix in screenSizes || !isNaN(grepPrefix)) { screens[grepPrefix] = true; }
                            else { screens[screen] = true; }

                            [modifiers, action] = getModifiers(grepPrefix, modifier, action);
                            actions = getActions(grepPrefix, action, true);
                            parents = getParents(grepWrap, parent);

                            grepSuffix = grepSuffix.substring(grepPrefix.length + 1);

                            // Move to shared function
                            for (var screensKey in screens) {
                                for (var modifiersKey in modifiers) {
                                    actions.forEach(function (actionVal) {
                                        for (var actionsKey in actionVal) {
                                            for (var parentsKey in parents) {
                                                masterKeyNew = screensKey + '_' + modifiersKey + '_' + actionsKey + '_' + parentsKey;
                                                if (masterKeyNew != masterKey) {
                                                    grepKeep = false;

                                                    if (masterKeyNew in masterGroups) {
                                                        if (!contains(masterGroups[masterKeyNew][1], ' ' + grepSuffix)) {
                                                            masterGroups[masterKeyNew][1] += ' ' + grepSuffix;
                                                        }
                                                    }
                                                    else { masterGroups[masterKeyNew] = [false, grepSuffix]; }
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                    if (grepKeep) {
                        // Apply shorthand/mixins/etc here to the individual class and possibly grep even more {} variations from applies change
                        [grepClass, grepClassMore] = getShortHand(grepClass, []);
                        grepRetain.push(grepClass);
                        if (grepClassMore.length > 0) { grepRetain.push(...grepClassMore); }
                    }
                }
            }
            masterGroups[masterKey][1] = grepRetain.join(' ');
        });
    });
};

function knowCSSRender(uI, uC, uO) {
    var uX = {
        'codeKey': '',
        'refresh': false,
        'minifycss': false,
        'classes': 'sequential',
        'normalize': false,
        'smart': !uC,
        'autorem': true,
        'rem': 16,
        'autoprefix': true,
        'console': false
    };
    if (typeof knowConfig !== 'undefined') {
        for (var kC in knowConfig) {
            if (kC in uX) { uX[kC] = knowConfig[kC]; }
        }
    }
    if (typeof uO !== 'undefined') {
        for (var uA in uO) {
            if (uA in uX) { uX[uA] = uO[uA]; }
        }
    }
    var div = null, css = {}, screen = '', modifier = '', className = '', action = '', parent = '', classValue = '', classImportant = '', classWebKit = false, classParts = [], classKey = '', classKeyLong = '', classNew = '', classFirst = '', classList = [], classesFound = '', classFound = '', classesHere = [], styles = [], tab = '', cssGroup = {}, classHere = '', stylesHere, stylesWebKit = [], start = '', end = '', tab = '';
    if (uX.normalize === true) { styles.push('::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[hidden],template{display:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]::-webkit-search-decoration{-webkit-appearance:none}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a:active,a:hover{outline:0}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}body{margin:0}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}button[disabled],html input[disabled]{cursor:default}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}details{display:block}dfn{font-style:italic}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}figure{margin:1em 40px}h1{font-size:2em;margin:.67em 0}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}html{font-family:sans-serif;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;line-height:1.15}img{border-style:none;border:0}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input{line-height:normal}legend{border:0;padding:0;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}main{display:block}mark{background:#ff0;color:#000}optgroup{font-weight:700}pre{font-family:monospace,monospace;font-size:1e;overflow:auto}progress{vertical-align:baseline}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}summary{display:list-item}sup{top:-.5em}svg:not(:root){overflow:hidden}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}template{display:none}textarea{overflow:auto}'); }

    getUserMixins();
    getUserConditionals();
    getGreps();

    var knowMotionClasses = {};
    var motionTags = document.querySelectorAll("[" + knowMotionID + "]");
    var mi = 0;
    var mL = motionTags.length;
    var setAnimation = function (mE, mC) {
        setInterval(function () {
            mE.style.animation = "n";
            setTimeout(function () { mE.style.animation = ""; }, 10);
        }, mC);
    };
    while (mi < mL) {
        knowMotionClasses = $know().knowmotion(motionTags[mi].getAttribute(knowMotionID));
        if (knowMotionClasses.found) {
            var knowMotionKey = {};
            for (key in knowMotionClasses.keys) {
                knowMotionKey = knowMotionClasses.keys[key];
                if (knowMotionKey.keyframes.length > 0) { styles.push(masterLine + knowMotionKey.keyframes); }
                if (knowMotionKey.values.length > 0) { styles.push(masterLine + knowMotionKey.values); }
                motionTags[mi].classList.add(knowMotionKey.class);
            }
            motionTags[mi].removeAttribute(knowMotionID);
            if (knowMotionClasses.restart > 0) { setAnimation(motionTags[mi], knowMotionClasses.restart); }
        }
        mi++;
    }

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
        if (knowStartup == null && div && "innerHTML" in div) { knowStartup = div.innerHTML; }
        classTags = document.querySelectorAll("[" + knowID + "]");
    }
    var attr = "";
    var sharedClassKey = "";
    var smartClass = {};
    var smartDetail = {};
    var classParent = 0;
    var classEvent = "";
    var classEnvironment = "";
    var allowEnvironment = true;
    var checkShorterHand = (typeof globalMixins !== 'undefined');
    var ii = 0;
    var tL = classTags.length;
    while (ii < tL) {
        classesHere = [];
        attr = crossMixins(uC ? classTags[ii][1] : classTags[ii].getAttribute(knowID));

        //parseQuick(getMixins(getVariables(attr)));

        //classList = { 'n_n_n_': getScreenPrefixes(getContainers(getMixins(getVariables(attr)))) };
        classList = { 'n_n_n_': getMixins(getVariables(attr)) };
        classList = getModifier(getModifier(classList, false), true);
        classNew = '';
        classFirst = '';
        for (var key in classList) {
            [screen, modifier, action, parent] = key.split('_', 4);
            classesFound = getClasses(classList[key]);
            classFirst = '';
            classNextStart = classNext;
            if (uX.classes !== 'detail' && classNew === '') {
                classNext = getNextLetter(classNext);
                //if (uX.classes == 'sequential') { classNext = getNextLetter(classNext); }
                //else if (uX.classes == 'random') { classNext = getRandomClass(); }
                classNew = classNext.toLowerCase();
                if (!uX.smart) { classFirst += (classesHere.length > 0 ? ' ' : '') + classNew; }
            }
            while (classesFound.length > 0) {
                classFound = classesFound.shift().trim();
                if ([screen, modifier].includes('attr') === false) {
                    [classFound, classesFound] = getShortHand(classFound, classesFound);
                    if (checkShorterHand) { [classFound, classesFound] = getShorterHand(classFound, classesFound); }
                    [classFound, classesFound] = getContainerExtras(classFound, classesFound);
                    [classFound, classesFound] = getGridSystem(classFound, classesFound);
                }
                [classParent, classFound, classesFound, screen, classEvent, modifier] = getParentSelector(screen, classFound, classesFound, modifier);
                [classEnvironment, screen, allowEnvironment] = getEnvironmentSelector(screen);
                if (allowEnvironment) {
                    [classFound, classImportant, screen] = getReversion(classFound, screen);
                    if (classEvent.length > 0 && contains(classFound, '-')) { [classFound, classesFound] = moreMixins(classFound, classesFound, classImportant); }
                    className = '';
                    classValue = '';
                    /*
                    if (classFound.indexOf('gradient') == 0) {
                        classParts = classFound.split('-');
                        classParts.shift();
                        className = 'background-image';
                        classValue = 'linear-gradient(' + classParts.join(',').trim() + ')';
                        classValue = classValue.replace(/,(bottom|top|left|right)/gi, ' $1');
                    }
                    else
                    */
                    if (contains(classFound, ':')) { [className, classValue] = classFound.split(':', 2); }
                    else if (contains(classFound, '=')) { [className, classValue] = classFound.split('=', 2); }
                    else if (contains(classFound, '-')) {
                        classParts = classFound.split('-');
                        if (classParts[0] in knowCSSOptions.shorterHand) {
                            className = knowCSSOptions.shorterHand[classParts[0]];
                            classParts.shift();
                            classValue = classParts.join('-');
                        }
                        else {
                            classValue = classParts.pop();
                            className = classParts.join('-');
                        }
                    }
                    else { className = classFound; }
                    if (classValue.length == 0 && contains(className, '#')) {
                        classValue = className.replace('#', '');
                        className = 'color';
                    }
                    else if (className in knowCSSOptions.shortHand) { className = knowCSSOptions.shortHand[className]; }

                    [className, classValue] = getColor(getValue(classValue), className);
                    [className, classValue] = getFamily(className, classValue);
                    if (uX.autorem) { classesFound = getREM(className, classValue, classesFound, uX.rem); }
                    if (modifier == 'n') { modifier = ''; }
                    classKeyLong = getKey(screen, modifier, className, action, classValue, classImportant, classParent, classEvent);
                    classKey = getKeyShorter("", modifier, className, "", classValue, classImportant, classParent, classEvent);
                    if (!uX.smart && uX.classes == 'detail') {
                        classNew = getSafeClass(screen, modifier, className, action, classValue, classImportant);
                        classesHere.push(classNew);
                    }
                    if (uX.smart) {
                        sharedClassKey = classKeyLong + '__' + modifier + '__' + classParent + '__' + classEvent;
                        if (sharedClassKey in smartClass == false) {
                            smartDetail[sharedClassKey] = [screen, action, "", [modifier, className, classValue, classImportant, classWebKit], classParent, classEnvironment, classEvent];
                            smartClass[sharedClassKey] = ii.toString();
                        }
                        else { smartClass[sharedClassKey] += "__" + ii.toString(); }
                    }
                    else {
                        if (screen in css === false) { css[screen] = {}; }
                        if (action in css[screen] === false) { css[screen][action] = {}; }
                        if (classKey in css[screen][action]) {
                            if (!contains(css[screen][action][classKey], '.' + classNew + modifier)) {
                                css[screen][action][classKey].push('.' + classNew + modifier);
                            }
                        }
                        else { css[screen][action][classKey] = ['.' + classNew + modifier]; }
                    }
                }
            }
            if (!uX.smart) {
                if (classFirst.length > 0 && !contains(classesHere, classFirst)) { classesHere.push(classFirst); }
            }
        }

        if (!uX.smart) {
            if (uC) { div = div.replace(classTags[ii][0], 'data-class="' + classesHere.join(' ') + '"'); }
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
        var addParent = 0;
        var smartKeyID = "";
        var addEvent = "";
        var smartEvents = {};
        var screenKey = "";
        var aN = "", aV = "", aP = "";
        for (var smartKey in smartClass) {
            screenKey = smartDetail[smartKey][0];
            addParent = smartDetail[smartKey][4];
            if (screenKey == "keyframe") { }
            else if (knowAttr().includes(screenKey)) {
                aN = smartDetail[smartKey][3][1];
                aV = smartDetail[smartKey][3][2];
                aP = screenKey == 'data' ? screenKey + '-' : '';
                if (contains(aN, '=')) { aN = aN.split('=').pop(); }
                [aV, aN] = getColor(aN, getValue(aV));
                if (aV.length > 0 && aN.length > 0) {
                    smartClass[smartKey].split('__').forEach(function (ii) {
                        if (addParent > 0) { knowParent(classTags[ii], addParent).setAttribute(aP + aN, aV); }
                        else { classTags[ii].setAttribute(aP + aN, aV); }
                        classTags[ii].removeAttribute(knowID);
                    });
                }
            }
            else {
                addEvent = smartDetail[smartKey][6];
                smartKeyID = smartClass[smartKey] + '__' + addParent.toString() + '__' + addEvent.toString();
                if (smartKeyID in smartClassGroup) { smartClassHere = smartClassGroup[smartKeyID]; }
                else {
                    if (uX.classes == 'detail') {
                        [modifier, className, classValue, classImportant, classWebKit] = smartDetail[smartKey][3];
                        smartClassNext = getSafeClass(screenKey, modifier, className, smartDetail[smartKey][1], classValue, classImportant);
                    }
                    else { smartClassNext = smartClassNext ? getNextLetter(smartClassNext) : "a"; }
                    smartClassHere = smartClassNext;
                    smartUnique[smartKey] = smartClassHere;
                    smartClassGroup[smartKeyID] = smartClassHere;
                }
                smartDetail[smartKey][2] = smartClassHere;
                smartClass[smartKey].split('__').forEach(function (ii) {
                    if (addEvent.length > 0) {
                        if (ii in smartEvents === false) { smartEvents[ii] = {}; }
                        if (addEvent in smartEvents[ii] == false) { smartEvents[ii][addEvent] = [addParent, []]; }
                        smartEvents[ii][addEvent][1].push(smartClassHere);
                    }
                    else {
                        if (addParent > 0) { knowParent(classTags[ii], addParent).classList.add(smartClassHere); }
                        else { classTags[ii].classList.add(smartClassHere); }
                    }
                    classTags[ii].removeAttribute(knowID);
                });
            }
        }
        if (Object.keys(smartEvents).length > 0) {
            for (var elem in smartEvents) {
                for (var event in smartEvents[elem]) {
                    classTags[elem].addEventListener(event, function (e) {
                        e.preventDefault();
                        var addEvent = 'data-' + event;
                        var addParent = smartEvents[elem][event][0];
                        var elemTarget = classTags[elem];
                        var addValue = !elemTarget.hasAttribute(addEvent) || elemTarget.getAttribute(addEvent) !== 'true';
                        elemTarget.setAttribute(addEvent, addValue.toString());
                        smartEvents[elem][event][1].forEach(function (elemClass) {
                            var elemEffect = knowParent(elemTarget, addParent);
                            if (addValue) { elemEffect.classList.add(elemClass); }
                            else { elemEffect.classList.remove(elemClass); }
                        });
                    });
                }
            }
        }

        // JAA TODO:
        // for compile(), smartClassesHere = [];
        //if (uC) { div = div.replace(classTags[ii][0], 'data-class="' + smartClassesHere.join(' ') + '"'); }

        for (var classKey in smartDetail) {
            var screen = smartDetail[classKey][0];
            if (knowAttr().includes(screen) == false) {
                var classNew = smartDetail[classKey][2];
                var action = smartDetail[classKey][1];
                var modifier = smartDetail[classKey][3][0];
                var classModifier = '.' + classNew + modifier;
                if (screen in css === false) { css[screen] = {}; }
                if (action in css[screen] === false) { css[screen][action] = {}; }
                if (classKey in css[screen][action]) {
                    if (!contains(css[screen][action][classKey], classModifier)) {
                        css[screen][action][classKey].push(classModifier);
                    }
                }
                else { css[screen][action][classKey] = [classModifier]; }
            }
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
            for (var classKey in css[screen][action]) {
                if (classKey in smartDetail) {
                    [modifier, className, classValue, classImportant, classWebKit] = smartDetail[classKey][3];
                    if (className.length > 0 || classValue.length > 0) {
                        if (classValue.length > 0 || classImportant.length > 0) {
                            if (classValue.length == 0) { classValue = "''"; }
                            if (classImportant == '!') { classImportant = '!important'; }
                            if (!isNaN(classValue) && '' + parseInt(classValue) === classValue && classValue !== '0') {
                                var classFirstSix = className.substring(0, 5);
                                if (['heigh', 'width', 'margi', 'borde', 'spaci', 'paddi'].includes(classFirstSix) || contains(className, 'font-size')) { classValue += 'px'; }
                                else if (['top', 'bottom', 'left', 'right'].includes(className)) { classValue += 'px'; }
                            }
                            stylesHere = getCleanStyles(className + (action != 'n' ? action : '') + ':' + classValue + classImportant + ';');
                            if (classWebKit || (uX.autoprefix && getWebKit(className))) {
                                stylesWebKit = [' -webkit-' + stylesHere, ' -moz-' + stylesHere, ' -ms-' + stylesHere, ' -o-' + stylesHere];
                                stylesHere += stylesWebKit.join('');
                            }
                            classHere = css[screen][action][classKey].join(', ');
                            if (classHere in cssGroup == false) { cssGroup[classHere] = stylesHere; }
                            else { cssGroup[classHere] += ' ' + stylesHere; }
                        }
                    }
                }
            }
            for (var cssgroup in cssGroup) { styles.push(tab + cssgroup + '{' + cssGroup[cssgroup] + '}' + masterLine); }
        }
        styles.push(end);
    }
    var stylesFinal = styles.join('');
    var stylesTotal = styles.length;
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
        if (uX.codeKey && uX.codeKey.length > 0) {
            var codeLayer = knowLayer(uX.codeKey);
            if (codeLayer) { codeLayer.innerHTML = '&lt;style&gt;\n' + stylesFinal.trim() + '\n&lt;/style&gt;'; }
        }
        if (uX.refresh && cssIncrement == 1 && afterFirstRender.length > 0) {
            smartUnique = {};
            [classNext, classNextStart, smartClassNext] = afterFirstRender;
        }
        else {
            cssIncrement++;
            afterFirstRender = [classNext, classNextStart, smartClassNext];
        }
        return uX.console ? stylesTotal : true;
    }
    else { return uX.console ? 0 : false; }
}

if (typeof window !== 'undefined') {
    window.$know = function (key) { return new knowCSSProto(key); };
    var knowCSSProto = function (key) {
        this.x = {
            "attr": "know",
            "motion": "knowmotion"
        };
        this.key = key || "[" + knowID + "]";
        this.debugging = false;
    };
    knowCSSProto.prototype = knowCSS;
    if (["interactive", "complete"].includes(document.readyState)) { $know().init(); }
    else { document.addEventListener('DOMContentLoaded', function () { $know().init(); }); }
}
else if (typeof module !== 'undefined') { module.exports = knowCSS; }