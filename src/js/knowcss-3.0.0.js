'use strict';

/*
KnowCSS Version 3.0.0 by Jay Doublay
https://www.knowcss.com/

NPM: https://www.npmjs.com/package/knowcss
Repo: https://github.com/knowcss/knowcss
*/


const parseReversions = function (val, ret) {
    var num = 0, grep = '';
    while ((grep = new RegExp(greps.reversion, 'gi').exec(val)) !== null) {
        ret[grep[1]] = true;
        val = val.replace(grep[1], '');
        num++;
    }
    return [num > 0, hyphens(val), ret];
};
const parseModifiers = function (val, ret) {
    var modifier = "";
    if (begins(val, '+')) { modifier = ':first-child ' + val.replace(/\+/g, ' > ').trim(); }
    else {
        var sub = '', action = '', keep = false;
        if (contains(val, '~')) { sub = '~'; }
        else if (contains(val, '+')) { sub = '+'; }
        if (sub.length > 0) {
            [action, val] = val.split(sub, 2);
            keep = true;
        }
        if (['all', '*', '>'].includes(val)) { modifier = ' *'; }
        else if (begins(val, '>')) { modifier = ' ' + val.replace(/\>/g, ' > ').trim(); }
        else if (begins(val, 'all')) {
            if (begins(val, 'all-')) { modifier = ' ' + val.replace('all-', ''); }
            else if (begins(val, 'all>')) { modifier = ' ' + val.replace('all>', '> '); }
        }
        else if (contains(val, 'nth')) {
            var tag = '';
            if (contains(val, '-nth')) {
                [tag, val] = val.split('-nth', 2);
                val = 'nth' + val;
            }
            var colon = ':' + (keep ? action + sub + tag + ':' : '');
            if (contains(val, 'nth-child')) { modifier = colon + 'nth-child(' + val.replace('nth-child-', '') + ')'; }
            else if (contains(val, 'nth-last-child')) { modifier = colon + 'nth-last-child(' + val.replace('nth-last-child-', '') + ')'; }
            else if (contains(val, 'nth-of-type')) { modifier = colon + 'nth-of-type(' + val.replace('nth-of-type-', '') + ')'; }
            else if (contains(val, 'nth-last-of-type')) { modifier = colon + 'nth-last-of-type(' + val.replace('nth-last-of-type-', '') + ')'; }
        }
    }
    if (modifier.length > 0) { ret[modifier] = true; }
    return [modifier.length > 0, hyphens(val), ret];
};
const parseScreens = function (val, ret, level) {
    var num = 0;
    if (val in greps.screens) {
        ret[val] = true;
        val = '';
        num++;
    }
    else if (!isNaN(val)) {
        var str = parseInt(val);
        if (str > 64 || str < 2) {
            ret[val] = true;
            val = '';
            num++;
        }
    }
    else if (level == 3) {
    }
    else {
        var key = null, zB = '', nots = [];
        var grep = new RegExp(greps.screen, 'gi');
        while ((key = grep.exec(val)) !== null) {
            zB = key[1];
            val = val.replace(zB, '');
            if (contains(zB, '!')) { notScreens.push(zB.replace(/\!/g, '')); }
            else { ret[zB] = true; }
            num++;
        }
        if (nots.length > 0) {
            var x = greps.screens.length, i = 0;
            while (i < x) {
                key = greps.screens[i];
                if (!nots.includes(key)) { ret[key] = true; }
                i++;
            }
        }
    }
    return [num > 0, hyphens(val), ret];
};
const parseParents = function (val, ret) {
    var level = 0, key = null;
    val = val.replace('parent', '^');
    if (val == '^') {
        level = 1;
        val = '';
    }
    else if (contains(val, '^')) {
        key = /\^([0-9]+){1,2}/.exec(val);
        if (key) {
            val = val.replace(key[0], '');
            level = parseInt(key[1]) || 1;
        }
        else {
            val = val.replace('^', '');
            level = 1;
        }
    }
    if (level && level > 0) { ret[level] = true; }
    return [level > 0, hyphens(val), ret];
};
const parseActions = function (val, ret) {
    var original = val;
    var key = '', grep = null, zS = '', zY = false, num = 0;
    var mA = '*';
    var mP = mA;
    var mU = val.indexOf("^") > -1 ? "^" : "";
    ['>', '~', '+'].forEach(function (symbol) {
        if (contains(val, symbol)) {
            mP = val.split(symbol, 2).pop();
            if (!mP) { mP = mA; }
            else { mP = symbol + mP; }
        }
    });
    mP = mP.replace(/>/g, ' ');

    var i = 0, x = greps.action.length;
    while (i < x) {
        grep = new RegExp(greps.action[i][1], 'gi');
        zS = greps.action[i][0].replace(mA, mP);
        while ((key = grep.exec(val)) !== null) {
            if (zS == ':' && mP != mA) { key[1] += mP; }
            if (key[1] == val) { zS = greps.action[i][2]; }
            ret[key[1]] = zS;
            val = val.replace(key[0], '');
            num++;
            zY = true;
        }
        i++;
    }

    if (num == 0 && mU.length > 0) {
        ret[mU + mD] = "";
        num++;
    }
    return [num > 0, hyphens(val), ret];
};


var buildGroup = function (groups, classes, containers, master) {
    // tmp until other parse funcitons are ready which assign at least 1 key
    if (Object.keys(containers.screens).length == 0) { containers.screens["n"] = ""; }
    if (Object.keys(containers.modifiers).length == 0) { containers.modifiers["0"] = ""; }
    if (Object.keys(containers.actions).length == 0) { containers.actions["0"] = ""; }
    if (Object.keys(containers.parents).length == 0) { containers.parents["0"] = ""; }
    if (Object.keys(containers.reversions).length == 0) { containers.reversions["0"] = ""; }

    var ret = classes;
    if (classes.length > 0) {
        for (var screensKey in containers.screens) {
            for (var modifiersKey in containers.modifiers) {
                for (var actionsKey in containers.actions) {
                    for (var parentsKey in containers.parents) {
                        for (var reverionsKey in containers.reversions) {
                            var masterKeyNew = screensKey + '_' + modifiersKey + '_' + actionsKey + '_' + parentsKey + '_' + reverionsKey;
                            if (masterKeyNew != master) {
                                if (masterKeyNew in groups) {
                                    if (!contains(groups[masterKeyNew], ' ' + classes)) { groups[masterKeyNew] += ' ' + classes; }
                                }
                                else { groups[masterKeyNew] = classes; }
                                ret = "";
                            }
                        }
                    }
                }
            }
        }
    }
    return [groups, ret];
};

const knowID = 'know';

var options = {
    //hexColors: typeof hexColors !== 'undefined' && hexColors != null ? hexColors : {},
    //shortHand: typeof shortHand !== 'undefined' && shortHand != null ? shortHand : {},
    //shorterHand: typeof shorterHand !== 'undefined' && shorterHand != null ? shorterHand : {},
    //shortHandVariable: typeof shortHandVariable !== 'undefined' && shortHandVariable != null ? shortHandVariable : {},
    vars: typeof vars !== 'undefined' && vars != null ? vars : {}
    //mixins: typeof mixins !== 'undefined' && mixins != null ? mixins : {},
    //components: typeof components !== 'undefined' && components != null ? components : {},
    //conditionals: typeof conditionals !== 'undefined' && conditionals != null ? conditionals : {}
};

var greps = null;

var defined = (val) => typeof val !== 'undefined' && val != null;
var contains = (val, vals) => val.indexOf(vals) > -1;
var begins = (val, vals) => val.indexOf(vals) == 0;
var hyphens = (str) => contains(str, '-') ? str.replace(/(^\-){1,20}/, '').replace(/(\-$){1,20}/, '') : str;;
var layer = (val) => document.getElementById(val);
var cleanup = (str) => str.replace(/[\n\t\r]/gi, ' ').replace(/\s{2,}/g, ' ').trim();
var getdocument = (ctx) => {
    if (defined(options.vars)) {
        var root = layer('root');
        if (root && contains(root.innerHTML, '$')) { root.innerHTML = getvars(root.innerHTML); }
    }
    return ctx;
};
var getvars = (html) => {
    if (contains(html, '$')) {
        var grep = new RegExp('\\{\\{\\$(.*?)\\}\\}', 'gi'), key = null;
        while ((key = grep.exec(html)) !== null) {
            var val = '';
            if (defined(options.vars) && key[1] in options.vars) { val = options.vars[key[1]].replace('/\\\\/gis', ''); }
            while (contains(html, key[0])) { html = html.replace(key[0], val); }
        }
    }
    return html;
};
var getgreps = (ctx) => {
    if (greps) { return ctx; }

    const getLists = {
        "function": ["abs", "acos", "asin", "atan", "atan2", "attr", "calc", "clamp", "cos", "counter", "counters", "cross-fade", "element", "env", "exp", "fit-content", "hypot", "log", "max", "min", "minmax", "path", "pow", "repeat", "round", "sign", "sin", "sqrt", "symbols", "tan", "url", "var"],
        "at": ["charset", "color-profile", "container", "counter-style", "font-face", "font-feature-values", "import", "keyframes", "layer", "namespace", "page", "property", "supports"],
        "reversions": ['inherit', 'initial', 'unset', 'revert', 'auto', 'normal'],
        "media": ["any-hover", "hover", "any-pointer", "pointer", "min-width", "max-width", "width", "min-height", "max-height", "height", "orientation", "min-aspect-ratio", "max-aspect-ratio", "aspect-ratio", "color-gamut", "min-color-index", "min-color", "max-color-index", "max-color", "color-index", "forced-colors", "inverted-colors", "color", "max-monochrome", "min-monochrome", "monochrome", "display-mode", "dynamic-range", "scan", "update", "light-level", "video-dynamic-range", "max-resolution", "min-resolution", "resolution", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "grid", "overflow-block", "overflow-inline", "scripting"],
        "modifiers": ["webkit-scrollbar", "after", "backdrop", "before", "cue", "cue-region", "file-selector-button", "first-letter", "first-line", "grammar-error", "marker", "placeholder", "placeholder-shown", "selection", "spelling-error", "target-text"],
        "selectors": ["last-child", "first-child", "only-child", "first-of-type", "last-of-type", "only-of-type", "nth-last-child", "nth-last-of-type"],
        "actions": ["current", "past", "future", "playing", "paused", "active", "checked", "disabled", "empty", "enabled", "focus-visible", "focus-within", "focus", "hover", "in-range", "invalid", "link", "optional", "out-of-range", "read-only", "read-write", "required", "root", "target", "valid", "visited"],
        "webkit": ["align-content", "align-items", "align-self", "alt", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "animation-trigger", "animation", "app-region", "appearance", "aspect-ratio", "backdrop-filter", "backface-visibility", "background-clip", "background-composite", "background-origin", "background-size", "border-after-color", "border-after-style", "border-after-width", "border-after", "border-before-color", "border-before-style", "border-before-width", "border-before", "border-bottom-left-radius", "border-bottom-right-radius", "border-end-color", "border-end-style", "border-end-width", "border-end", "border-fit", "border-horizontal-spacing", "border-image", "border-radius", "border-start-color", "border-start-style", "border-start-width", "border-start", "border-top-left-radius", "border-top-right-radius", "border-vertical-spacing", "box-align", "box-decoration-break", "box-direction", "box-flex-group", "box-flex", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-reflect", "box-shadow", "box-sizing", "clip-path", "color-correction", "column-axis", "column-break-after", "column-break-before", "column-break-inside", "column-count", "column-fill", "column-gap", "column-progression", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "cursor-visibility", "dashboard-region", "device-pixel-ratio", "filter", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex", "flow-from", "flow-into", "font-feature-settings", "font-kerning", "font-size-delta", "font-smoothing", "font-variant-ligatures", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-row", "grid-template-areas", "grid-template-columns", "grid-template-rows", "grid-template", "grid", "highlight", "hyphenate-character", "hyphenate-charset", "hyphenate-limit-after", "hyphenate-limit-before", "hyphenate-limit-lines", "hyphens", "initial-letter", "justify-content", "justify-items", "justify-self", "line-align", "line-box-contain", "line-break", "line-clamp", "line-grid", "line-snap", "locale", "logical-height", "logical-width", "margin-after-collapse", "margin-after", "margin-before-collapse", "margin-before", "margin-bottom-collapse", "margin-collapse", "margin-end", "margin-start", "margin-top-collapse", "marquee-direction", "marquee-increment", "marquee-repetition", "marquee-speed", "marquee-style", "marquee", "mask-attachment", "mask-box-image", "mask-box-image-outset", "mask-box-image-repeat", "mask-box-image-slice", "mask-box-image-source", "mask-box-image-width", "mask-clip", "mask-composite", "mask-image", "mask-origin", "mask-position-x", "mask-position-y", "mask-position", "mask-repeat-x", "mask-repeat-y", "mask-repeat", "mask-size", "mask-source-type", "mask", "match-nearest-mail-blockquote-color", "max-logical-height", "max-logical-width", "media-text-track-container", "min-logical-height", "min-logical-width", "nbsp-mode", "opacity", "order", "overflow-scrolling", "padding-after", "padding-before", "padding-end", "padding-start", "perspective-origin", "perspective-origin-x", "perspective-origin-y", "perspective", "print-color-adjust", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rtl-ordering", "ruby-position", "scroll-snap-type", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "svg-shadow", "tap-highlight-color", "text-color-decoration", "text-combine", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-decorations-in-effect", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-emphasis", "text-fill-color", "text-justify", "text-orientation", "text-security", "text-size-adjust", "text-stroke-color", "text-stroke-width", "text-stroke", "text-underline-position", "text-zoom", "transform-2d", "transform-3d", "transform-origin-x", "transform-origin-y", "transform-origin-z", "transform-origin", "transform-style", "transform", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "transition", "user-drag", "user-modify", "user-select", "touch-callout", "animating-full-screen-transition", "any-link", "autofill", "autofill-strong-password", "drag", "full-page-media", "full-screen-ancestor", "full-screen-controls-hidden", "full-screen-document", "full-screen", "file-upload-button", "inner-spin-button", "input-placeholder", "media-controls-current-time-display", "media-controls-enclosure", "media-controls-fullscreen-button", "media-controls-mute-button", "media-controls-overlay-enclosure", "media-controls-panel", "media-controls-play-button", "media-controls-time-remaining-display", "media-controls-timeline", "media-controls-toggle-closed-captions-button", "media-controls-volume-control-container", "media-controls-volume-control-hover-background", "media-controls-volume-slider", "media-controls", "meter-bar", "meter-even-less-good-value", "meter-inner-element", "meter-optimum-value", "meter-suboptimum-value", "outer-spin-button", "progress-bar", "progress-inner-element", "progress-value", "search-cancel-button", "search-results-button", "slider-runnable-track", "slider-thumb"],
        "screens": ["media", "print", "screen", "speech", "!print", "!screen", "!speech", "notprint", "notscreen", "notspeech", "onlyprint", "onlyscreen", "onlyspeech"],
        "breakpoints": { "xxsm": 479, "xsm": 639, "sm": 767, "md": 1023, "lg": 1535, "xl": 1919, "xxl": 99999 }
    };

    var num = 1, val = 0, screens = {};
    const xxl = getLists.breakpoints.xxl;
    for (var key in getLists.breakpoints) {
        getLists.screens.push("\\!" + key, key + "down", key + "up", key);
        val = getLists.breakpoints[key] + (key == 'xxl' ? 0 : 0.98);
        screens[key] = [num, val];
        screens[key + "down"] = [1, val];
        screens[key + "up"] = [num, xxl];
        screens[num] = [num, val];
        screens[num + "down"] = [1, val];
        screens[num + "up"] = [num, xxl];
        num = val + 0.02;
    };

    greps = {
        media: "^(" + getLists.media.join("|").replace('/-/gi', '\\-') + ")(.*)$",
        webkit: "^" + getLists.webkit.join("|").replace('/-/gi', '\\-'),
        action: [[" *::", "(" + getLists.modifiers.join("|").replace('/-/gi', '\\-') + ")", '::'], [" *:", "(" + getLists.selectors.join("|").replace('/-/gi', '\\-') + ")", ':'], [":", "(" + getLists.actions.join("|").replace('/-/gi', '\\-') + ")", ':']],
        screens: screens,
        screen: "^(" + getLists.screens.join("|").replace('/-/gi', '\\-') + ")$",
        reversion: "(" + getLists.reversions.join("|").replace('/-/gi', '\\-') + ")",
        rules: getLists.at
    };
    return ctx;
};

const parser = {
    execute: function (attr) {
        return this.wrappers(attr);
    },
    wrappers: function (attr) {
        attr = cleanup(attr);
        var master = "n_0_0_0_0", groups = {}, original = attr, grep = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!\<\^\|]{1,255})\{(.*?)\}', 'gis'), key = null, containers = {}, classes = [];
        while ((key = grep.exec(attr)) !== null) {
            classes = cleanup(key[2]);
            var toplevel = JSON.stringify(this.containers(key[1], null, 0));

            var grepsecond = new RegExp('([a-zA-Z0-9\-]{1,255})\\(\\((.*?)\\)\\)', 'gis'), keysecond = null;
            var subWrap = classes.toString();
            while ((keysecond = grepsecond.exec(subWrap)) !== null) {
                //var classessecond = cleanup(keysecond[2]);

                var containerssecond = JSON.parse(toplevel);
                delete containerssecond.screens["n"];
                delete containerssecond.modifiers["0"];
                containerssecond.parents = {};

                classes = classes.replace(keysecond[0], '');
                this.containers(keysecond[1], containerssecond, 1);
            };

            original = original.replace(key[0], '');
            [groups, classes] = buildGroup(groups, classes, JSON.parse(toplevel), master);

            classes = cleanup(classes).split(' ');
            classes.forEach((classFound) => {
                original = original.replace(classFound, '');
                containers = this.containers(classFound, JSON.parse(toplevel), 2);
                [groups, classFound] = buildGroup(groups, classFound, containers, "");
            });
        }

        classes = cleanup(original).split(' ');
        classes.forEach((classFound) => {
            original = original.replace(classFound, '');
            [containers, classFound] = this.containers(classFound, null, 3);
            [groups, classFound] = buildGroup(groups, classFound, containers, "");
        });

        original = cleanup(original);
        if (original) { groups[master] = original; }
        return groups;
    },
    containers: function (wrapper, ret, level) {
        ret = ret || {
            "screens": {},
            "modifiers": {},
            "actions": {},
            "parents": {},
            "reversions": {},
            "environments": {}
        };

        wrapper = this.getvariants(wrapper);

        var grep = new RegExp('([A-Za-z0-9\-\!\^]+){1,255}', 'gis'), key = null, any = false, val = null;
        var vals = [];
        while ((key = grep.exec(wrapper)) !== null) {
            val = key[1].toString();
            [any, val, ret.reversions] = this.getreversions(val, ret.reversions);
            [any, val, ret.parents] = this.getparents(val, ret.parents);
            [any, val, ret.modifiers] = this.getmodifiers(val, ret.modifiers);
            [any, val, ret.screens] = this.getscreens(val, ret.screens, level);
            [any, val, ret.actions] = this.getactions(val, ret.actions);
            [any, val, ret.environments] = this.getenvironments(val, ret.environments);
            if (val) { vals.push(val); }
        }
        return level > 2 ? [ret, vals.join('|')] : ret;
    },
    getvariants: function (ret) {
        // get variables
        // get shorthand
        // get shorterhand
        // get mixins
        // get components
        return ret;
    },
    getreversions: function (val, ret) { return parseReversions(val, ret); },
    getparents: function (val, ret) { return parseParents(val, ret); },
    getmodifiers: function (val, ret) { return parseModifiers(val, ret); },
    getscreens: function (val, ret, level) { return parseScreens(val, ret, level); },
    getactions: function (val, ret) { return parseActions(val, ret); },
    getenvironments: function (val, ret) {
        var any = false;
        return [any, val, ret];
    }
};


var knowCSS = {
    apply: function () {
        var classes, elems = document.querySelectorAll(this.key);
        var i = 0;
        var x = elems.length;
        while (i < x) {
            classes = parser.execute(elems[i].getAttribute(knowID));
            console.log(classes);
            i++;
        }
        return this;
    },
    greps: function () { return getgreps(this); },
    render: function () { return this.greps().apply(); },
    document: function () { return getdocument(this); },
    init: function () { return this.document().render(); },
    constructor: knowCSSProto
};

if (typeof window !== 'undefined') {
    window.$know = function (key) { return new knowCSSProto(key); };
    var knowCSSProto = function (key) { this.key = key || "[" + knowID + "]"; };
    knowCSSProto.prototype = knowCSS;
    if (["interactive", "complete"].includes(document.readyState)) { $know().init(); }
    else { document.addEventListener('DOMContentLoaded', function () { $know().init(); }); }
}
else if (typeof module !== 'undefined') { module.exports = knowCSS; }