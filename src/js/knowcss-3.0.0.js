'use strict';

/*
KnowCSS Version 3.0.0 by Jay Doublay
https://www.knowcss.com/

NPM: https://www.npmjs.com/package/knowcss
Repo: https://github.com/knowcss/knowcss
*/



const knowID = 'know';

var mixins = {
    "container": "width-100% padding-right-15px padding-left-15px margin-right-auto margin-left-auto max-width-100% 1230{max-width-1550} 1200{max-width-1140} 1024{max-width-940} 768{max-width-720}",
    "container-fluid": "width-100% padding-right-15px padding-left-15px margin-right-auto margin-left-auto",
    "row": "width-100% display=-webkit-box display=-ms-flexbox display-flex -ms-flex-wrap-wrap flex-wrap-wrap"
};

var options = {
    //hexColors: typeof hexColors !== 'undefined' && hexColors != null ? hexColors : {},
    //shortHand: typeof shortHand !== 'undefined' && shortHand != null ? shortHand : {},
    //shorterHand: typeof shorterHand !== 'undefined' && shorterHand != null ? shorterHand : {},
    //shortHandVariable: typeof shortHandVariable !== 'undefined' && shortHandVariable != null ? shortHandVariable : {},
    vars: typeof vars !== 'undefined' && vars != null ? vars : {},
    mixins: typeof mixins !== 'undefined' && mixins != null ? mixins : {}
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

var conditionals = {
    env: [],
    user: []
};
var environments = () => {
    var agent = navigator.userAgent;
    var vendor = navigator.vendor;
    var platform = navigator.platform;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var ratio = window.devicePixelRatio;

    var ret = {
        chrome: /Google Inc/.test(vendor) || /CriOS/.test(agent),
        safari: /Safari/.test(agent) && !/Chrome/.test(agent),
        firefox: /Firefox|FxiOS/.test(agent),
        edge: /Edge|Edg|EdgiOS/.test(agent),
        opera: /OPR|Opera/.test(agent),
        cordova: !!window.cordova,
        ie: /MSIE|Trident/.test(agent),
        chromium: !!window.chrome && !/Edge/.test(agent),
        vivaldi: /Vivaldi/.test(agent),
        yandex: /YaBrowser/.test(agent),

        mac: /Macintosh|MacIntel|MacPPC|Mac68K/.test(platform),
        win: /Win32|Win64|Windows|WinCE/.test(platform),
        linux: /Linux/.test(platform),
        unix: /X11/.test(platform),

        lowres: ratio < 2,
        hires: ratio >= 2,

        ios: /(iPhone|iPad|iPod)/.test(agent),
        android: /Android/.test(agent),
        windows: /IEMobile/.test(agent) || (/Windows/.test(agent) && /Phone/.test(agent)),
        blackberry: /BlackBerry/.test(agent),

        portrait: h > w,
        landscape: w > h,
        square: w == h,

        mobile: navigator.mobile || false,
        desktop: !(navigator.mobile || false),
        touch: ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || false
    };
    for (var key in ret) {
        if (ret[key]) { conditionals.user.push(key); }
    }
    /*
    if (typeof knowCSSOptions.conditionals !== 'undefined') {
        for (var key in knowCSSOptions.conditionals) {
            fixedConditionals[key] = knowCSSOptions.conditionals[key];
            if (knowCSSOptions.conditionals[key]) { conditionals.user.push(key); }
        }
    }
    */
    conditionals.env = Object.keys(ret);
    return ret;
};

const parser = {
    execute: function (attr) { return this.wrappers(attr); },
    wrappers: function (attr, level) {
        level = level || 0;
        attr = cleanup(attr);
        var master = "n_n_n_n_n", groups = {}, original = attr, grep = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!\<\^\|]{1,255})\{(.*?)\}', 'gis'), key = null, containers = {}, classes = [];
        while ((key = grep.exec(attr)) !== null) {
            var containersfirst = this.containers(key[1], null, 0);
            if (containersfirst.allow) {
                classes = cleanup(key[2]);
                var toplevel = JSON.stringify(containersfirst);

                var containerssecond = JSON.parse(toplevel);
                delete containerssecond.screens["n"];
                delete containerssecond.modifiers["n"];
                containerssecond.parents = {};
                var grepsecond = new RegExp('([a-zA-Z0-9\-]{1,255})\\(\\((.*?)\\)\\)', 'gis'), keysecond = null;
                var subWrap = classes.toString();
                while ((keysecond = grepsecond.exec(subWrap)) !== null) {
                    classes = classes.replace(keysecond[0], '');
                    var classessecond = cleanup(keysecond[2]);
                    containers = this.containers(keysecond[1], containerssecond, 1);
                    if (containers.allow) {
                        [groups, classessecond] = this.group(groups, classessecond, containers, master);
                    }
                };

                original = original.replace(key[0], '');
                [groups, classes] = this.group(groups, classes, JSON.parse(toplevel), master);

                classes = cleanup(classes).split(' ');
                classes.forEach((classFound) => {
                    original = original.replace(classFound, '');
                    containers = this.containers(classFound, JSON.parse(toplevel), 2);
                    [groups, classFound] = this.group(groups, classFound, containers, "");
                });
            }
            else {
                original = original.replace(key[0], '');
                classes = "";
            }
        }

        classes = cleanup(original).split(' ');
        classes.forEach((classFound) => {
            original = original.replace(classFound, '');
            [containers, classFound] = this.containers(classFound, null, 3);

            if (level < 1) {
                var any = false;
                [any, classFound] = this.getmixins(any, classFound);
                [any, classFound] = this.getgrid(any, classFound);
                if (any) {
                    var wrappersMore = this.wrappers(classFound, 1);
                    for (var key in wrappersMore) {
                        if (key in groups === false) { groups[key] = wrappersMore[key]; }
                        else { groups[key] += ' ' + wrappersMore[key]; }
                    }
                    classFound = "";
                }
            }
            if (classFound.length > 0) { [groups, classFound] = this.group(groups, classFound, containers, ""); }
        });

        original = cleanup(original);
        if (original) { groups[master] = original; }
        return groups;
    },

    getgrid: (any, val) => {
        if (begins(val, 'col-')) {
            var whichCol = val.replace(/^col-/, '');
            var alignCol = whichCol;
            if (contains(alignCol, '-')) { [whichCol, alignCol] = alignCol.split('-', 2); }
            if (['left', 'right', 'center'].includes(alignCol)) { classesFound.push('justify-content-' + alignCol); }
            if (whichCol.length == 0) { whichCol = 12; }
            var whichPct = (parseInt(whichCol) / 12) * 100;
            val = ["width-" + parseFloat(whichPct.toFixed(6)) + "%", "display-flex", "align-items-center", "flex-0/0/auto", "flex-basis-0", "-webkit-box-flex-1", "-ms-flex-positive-1", "flex-grow-1", "max-" + val, "position-relative"].join(' ');
            any = true;
        }
        else if (begins(val, 'offset-')) {
            var whichOffset = val.replace(/^offset-/, '');
            if (whichOffset.length == 0) { whichOffset = 12; }
            var whichPct = (parseInt(whichOffset) / 12) * 100;
            val = "margin-left-" + parseFloat(whichPct.toFixed(6)) + "%";
            any = true;
        }
        return [any, val];
    },
    getmixins: (any, val) => {
        if (val in options.mixins) {
            val = options.mixins[val];
            any = true;
        }
        return [any, val];
    },
    containers: function (wrapper, ret, level) {
        ret = ret || {
            "allow": true,
            "screens": {},
            "modifiers": {},
            "actions": {},
            "parents": {},
            "reversions": {},
            "environments": {}
        };

        var grep = new RegExp('([A-Za-z0-9\-\!\^]+){1,255}', 'gis'), key = null, any = false, val = null, keepval = null, offset = 0, len = 0, allow = true;
        var vals = [], parts = [], retain = "";
        if (level == 3) {
            parts = wrapper.split(wrapper.indexOf('=') > -1 ? '=' : '-');
            if (parts.length > 1) {
                retain = '=' + parts.pop();
                wrapper = parts.join('-');
            }
        }
        while ((key = grep.exec(wrapper)) !== null) {
            val = key[1].toString();
            len = val.length + 1;
            keepval = wrapper.substr(offset, len);
            offset += len;
            if (level > 1) { ret.allow = true; }
            else { [any, val, ret.environments, ret.allow] = this.getenvironments(val, ret.environments); }
            if (ret.allow) {
                [any, val, ret.reversions] = this.getreversions(val, ret.reversions);
                [any, val, ret.parents] = this.getparents(val, ret.parents);
                [any, val, ret.modifiers] = this.getmodifiers(val, ret.modifiers);
                [any, val, ret.screens] = this.getscreens(val, ret.screens, level);
                [any, val, ret.actions] = this.getactions(val, ret.actions);
                if (val) { vals.push(keepval + retain); }
            }
            else { break; }
        }
        return level > 2 ? [ret, vals.join('')] : ret;
    },
    getreversions: (val, ret) => {
        var num = 0, grep = '';
        while ((grep = new RegExp(greps.reversion, 'gi').exec(val)) !== null) {
            ret[grep[1]] = true;
            val = val.replace(grep[1], '');
            num++;
        }
        return [num > 0, hyphens(val), ret];
    },
    getparents: (val, ret) => {
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
    },
    getmodifiers: (val, ret) => {
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
    },
    getscreens: (val, ret, level) => {
        var num = 0;
        if (val in greps.screens) {
            ret[val] = true;
            val = '';
            num++;
        }
        else if (!isNaN(val)) {
            var str = parseInt(val);
            if (level == 3 && (val % 100) == 0) { }
            else if (str > 96 || str < 2) {
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
    },
    getactions: (val, ret) => {
        var key = '', grep = null, zS = '', zY = false, num = 0;
        var mA = '*';
        var mP = mA;
        var mU = val.indexOf("^") > -1 ? "^" : "";
        ['>', '~', '+'].forEach((symbol) => {
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
    },
    getenvironments: (val, ret) => {
        var any = false, allow = true, reverse = false;
        if (contains(val, '!')) {
            reverse = true;
            val = val.replace('!', '');
        }
        if (contains(conditionals.env, val)) {
            any = true;
            ret[val] = true;
            if (!contains(conditionals.user, val)) { allow = false; }
            if (reverse) { allow = !allow; }
            val = "";
        }
        return [any, val, ret, allow];
    },
    group: (groups, classes, containers, master) => {
        greps.group.forEach(key => {
            if (Object.keys(containers[key]).length == 0) { containers[key]["n"] = ""; }
        });
        classes = cleanup(classes);
        var ret = classes;
        if (classes.length > 0) {
            for (var screensKey in containers.screens) {
                for (var modifiersKey in containers.modifiers) {
                    for (var actionsKey in containers.actions) {
                        for (var parentsKey in containers.parents) {
                            for (var reverionsKey in containers.reversions) {
                                var masterKeyNew = screensKey + '_' + modifiersKey + '_' + actionsKey + '_' + parentsKey + '_' + reverionsKey;
                                if (masterKeyNew != master) {
                                    if (masterKeyNew in groups === false) { groups[masterKeyNew] = classes; }
                                    else if (!contains(groups[masterKeyNew], ' ' + classes)) { groups[masterKeyNew] += ' ' + classes; }
                                    ret = "";
                                }
                            }
                        }
                    }
                }
            }
        }
        return [groups, ret];
    }
};

var knowCSS = {
    apply: function () {
        environments();
        var groups = {}, elems = document.querySelectorAll(this.key);
        var i = 0;
        var x = elems.length;
        while (i < x) {
            groups = parser.execute(elems[i].getAttribute(knowID));
            if (Object.keys(groups).length > 0) {
                for (var key in groups) {
                    console.log(['know', i, key, JSON.stringify(this.getclasses(groups[key]))]);
                }
            }
            i++;
        }
        return this;
    },
    greps: function () {
        if (!greps) {
            const getLists = {
                "group": ["screens", "modifiers", "actions", "parents", "reversions"],
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
                rules: getLists.at,
                group: getLists.group
            };
        }
        return this;
    },
    render: function () { return this.greps().apply(); },
    document: function () {
        if (defined(options.vars)) {
            var root = layer('root');
            if (root && contains(root.innerHTML, '$')) { root.innerHTML = this.getvars(root.innerHTML); }
        }
        return this;
    },
    getvars: function (html) {
        if (contains(html, '$')) {
            var grep = new RegExp('\\{\\{\\$(.*?)\\}\\}', 'gi'), key = null;
            while ((key = grep.exec(html)) !== null) {
                var val = '';
                if (defined(options.vars) && key[1] in options.vars) { val = options.vars[key[1]].replace('/\\\\/gis', ''); }
                while (contains(html, key[0])) { html = html.replace(key[0], val); }
            }
        }
        return html;
    },
    getclasses: function (classes) {
        var grep = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!]{1,32})\\(\\((.*?)\\)\\)', 'gis'), key = [], original = classes;
        while ((key = grep.exec(original)) !== null) {
            if (['var', 'invert', 'translate', 'translateY', 'translateX'].includes(key[1]) === false) {
                classes = classes.replace(key[0], key[1] + "=" + key[2].replace(/\s/g, '\/'));
            }
        }
        var ret = classes.split(/(\s+)/).filter(e => e.trim().length > 0);
        var opt = {};
        return this.getvariants(ret, opt);
    },
    getvariants: function (ret, opt) {
        if (ret.length > 0) {
            var x = ret.length, i = 0, key;
            while (i < x) {
                key = ret[i];
                if (key in shortHand) { key = shortHand[key]; }
                else if (!isNaN(key)) { key = this.getfontweight(key); }

                // shorterHand
                // globalMixins
                // shortHandVariable
                // components

                ret[i] = key;
                i++;
            }
        }
        return ret;
    },

    getfontweight: (val) => (val > 0 && (val % 100) == 0) ? 'font-weight-' + parseFloat(val) : "font-size-" + parseFloat(val) + "px",

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