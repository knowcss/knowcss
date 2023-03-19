'use strict';

/*
KnowCSS Version 3.0.0 by Jay Doublay
https://www.knowcss.com/

NPM: https://www.npmjs.com/package/knowcss
Repo: https://github.com/knowcss/knowcss
*/


const knowID = 'know';

var config = {
    vars: typeof knowVars !== 'undefined' && knowVars != null ? knowVars : {},
    mixins: typeof knowMixins !== 'undefined' && knowMixins != null ? knowMixins : {},
    colors: typeof knowColors !== 'undefined' && knowColors != null ? knowColors : {},
    prop: typeof knowProp !== 'undefined' && knowProp != null ? knowProp : {},
    short: typeof knowShort !== 'undefined' && knowShort != null ? knowShort : {},
    variable: typeof knowVariable !== 'undefined' && knowVariable != null ? knowVariable : {},
    components: typeof knowComponents !== 'undefined' && knowComponents != null ? knowComponents : {},
    brackets: typeof knowBrackets !== 'undefined' && knowBrackets != null ? knowBrackets : {},
    conditionals: typeof knowConditionals !== 'undefined' && knowConditionals != null ? knowConditionals : {}
};

var greps = null;
var letter = "";

var defined = (val) => typeof val !== 'undefined' && val != null;
var contains = (val, vals) => val.indexOf(vals) > -1;
var begins = (val, vals) => val.indexOf(vals) == 0;
var hyphens = (str) => contains(str, '-') ? str.replace(/(^\-){1,20}/, '').replace(/(\-$){1,20}/, '') : str;
var cleanup = (str) => str.replace(/[\n\t\r]/gi, ' ').replace(/\s{2,}/g, ' ').trim();
var containsAny = (val, vals) => {
    var x = vals.length, i = 0;
    while (i < x) {
        if (val.indexOf(vals[i]) > -1) { return true; }
        i++;
    }
    return false;
};

var conditionals = [];
const configuration = {
    init: function () { this.greps().environments().brackets(); },
    mixins: function (val) {
        var ret = [];
        var ctx = parser;
        var classes = cleanup(ctx.getvars(val)).split(' ');
        classes.forEach((classFound) => { ret.push(ctx.getsubclasses({}, classFound, ctx, false)[1]); });
        return ret.join(' ');
    },
    brackets: function () {
        for (var key in config.brackets) { config.brackets[key] = this.mixins(config.brackets[key]); }
        return this;
    },
    environments: function () {
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

        conditionals = Object.keys(ret);
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
                screenTypes: getLists.screens,
                screen: "^(" + getLists.screens.join("|").replace('/-/gi', '\\-') + ")$",
                reversion: "(" + getLists.reversions.join("|").replace('/-/gi', '\\-') + ")",
                rules: getLists.at,
                group: getLists.group
            };
        }
        return this;
    }
};

const parseComponent = (component, val) => {
    var vals = contains(val, '/') ? val.split('/') : [val];
    var j = vals.length;
    var i = 1, x = j + 10;
    while (i <= x) {
        component = component.replace(eval("/\\$" + i + "/g"), j >= i ? vals[i - 1] : j == 1 ? vals[0] : '');
        if (!contains(component, '$')) { break; }
        i++;
    }
    return component;
};

const parser = {
    execute: function (attr) { return this.wrappers(attr); },
    wrappers: function (attr, level) {
        level = level || 0;
        attr = this.getvars(cleanup(attr));
        attr = this.getbrackets(attr);
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
                    if (containers.allow) { [groups, classessecond] = this.group(groups, classessecond, containers, master); }
                };

                original = original.replace(key[0], '');
                var subClasses = [];
                classes = cleanup(classes).split(' ');
                classes.forEach((classFound) => {
                    [groups, classFound] = this.getsubclasses(groups, classFound, this, false);
                    subClasses.push(classFound);
                });
                classes = subClasses.join(' ');
                [groups, classes] = this.group(groups, classes, JSON.parse(toplevel), master);
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
            if (level < 1) { [groups, classFound] = this.getsubclasses(groups, classFound, this, true); }
            if (classFound.length > 0) { [groups, classFound] = this.group(groups, classFound, containers, ""); }
        });

        original = cleanup(original);
        if (original) { groups[master] = original; }
        return groups;
    },

    getsubclasses: (groups, classFound, ctx, applyMore) => {
        var any = false;
        [any, classFound] = ctx.getmixins(any, classFound, ctx);
        [any, classFound] = ctx.getgrid(any, classFound);
        if (applyMore && any) {
            var wrappersMore = ctx.wrappers(classFound, 1);
            for (var key in wrappersMore) {
                if (key in groups === false) { groups[key] = wrappersMore[key]; }
                else { groups[key] += ' ' + wrappersMore[key]; }
            }
            classFound = "";
        }
        return [groups, classFound];
    },

    getvars: (html) => {
        if (contains(html, "$")) {
            html = html.replace(/\$\{([^\}]+)\}/g, (val, key) => key in config.vars ? config.vars[key] : '');
            html = html.replace(/\{\{\$(.*?)\}\}/g, (val, key) => key in config.vars ? config.vars[key] : '');
        }
        return html;
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
    getcomponent: (component, val) => {
        var vals = contains(val, '/') ? val.split('/') : [val];
        var j = vals.length;
        var i = 1, x = j + 10;
        while (i <= x) {
            component = component.replace(eval("/\\$" + i + "/g"), j >= i ? vals[i - 1] : j == 1 ? vals[0] : '');
            if (!contains(component, '$')) { break; }
            i++;
        }
        return component;
    },
    getbrackets: (val) => {
        if (contains(val, '[')) {
            var grep = new RegExp('\\[(.*?)\\]', 'i'), key = "", any = [], extra = "";
            while ((key = grep.exec(val)) !== null) {
                if (key[1] in config.brackets) { extra += ' ' + config.brackets[key[1]] + ' '; }
                else { any.push(key[1]); }
                val = val.replace(key[0], '');
            }
            if (any.length > 0) {
                any.forEach(key => { config.brackets[key] = ' ' + val + ' '; });
            }
            val += extra;
        }
        return val;
    },
    getmixins: (any, val, ctx) => {
        if (val in config.mixins) {
            val = config.mixins[val];
            any = true;
        }
        else if (val in config.short) {
            val = config.short[val];
            if (val.indexOf(' ') > -1) {
                var vals = [];
                val.split(' ').forEach(value => { vals.push(ctx.getmixins(any, value, ctx)[1]); });
                val = vals.join(' ');
            }
            any = true;
        }
        else if (val.indexOf('-') > -1) {
            var parts = val.split('-');
            var key = parts.shift();
            if (key in config.components) {
                var component = config.components[key];
                if (typeof component !== 'string') {
                    component = component.join(' ');
                    config.components[key] = component;
                }
                val = parseComponent(component, parts.join('-'));
            }
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

        var grep = new RegExp('([A-Za-z0-9\-\!\^\@\~]+){1,255}', 'gis'), key = null, any = false, val = null, keepval = null, offset = 0, len = 0;
        var vals = [], parts = [], retain = "";
        if (level == 3) {
            var equal = wrapper.indexOf('=') > -1 ? '=' : '-';
            parts = wrapper.split(equal);
            if (parts.length > 1) {
                retain = equal + parts.pop();
                wrapper = parts.join('-');
            }
            else if (new RegExp('([0-9a-f]{1,32})\~([0-9]{1,3})$', '').test(wrapper)) { return [ret, wrapper]; }
        }
        while ((key = grep.exec(wrapper)) !== null) {
            val = key[1].toString();
            len = val.length + 1;
            keepval = wrapper.substr(offset, len);
            offset += len;
            if (level > 1) { ret.allow = true; }
            else { [val, ret.environments, ret.allow] = this.getenvironments(val, ret.environments); }
            if (ret.allow) {
                [any, val, retain, ret.reversions] = this.getreversions(val, retain, ret.reversions);
                [any, val, ret.parents] = this.getparents(val, ret.parents);
                [any, val, ret.actions] = this.getactions(val, ret.actions);
                [any, val, ret.modifiers] = this.getmodifiers(val, ret.modifiers);
                [any, val, ret.screens, keepval] = this.getscreens(val, ret.screens, level, keepval);
                if (val) { vals.push(keepval + retain); }
            }
        }
        return level > 2 ? [ret, vals.join(' ')] : ret;
    },
    getreversions: (val, retain, ret) => {
        var num = 0, grep = '';
        if (val && containsAny(val, ['!', 'important'])) {
            val = val.replace('important', '').replace(/\!/g, '');
            ret["!"] = true;
        }
        if (retain && containsAny(retain, ['!', 'important'])) {
            retain = retain.replace('important', '').replace(/\!/g, '');
            ret["!"] = true;
        }
        if (val.length > 0) {
            while ((grep = new RegExp(greps.reversion, 'gi').exec(val)) !== null) {
                ret[grep[1]] = true;
                val = val.replace(grep[1], '');
                num++;
            }
        }
        return [num > 0, hyphens(val), retain, ret];
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
    getscreens: (val, ret, level, orig) => {
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
            var parts = val.split('-', 2);
            var part = parts.shift();
            if (part in greps.screens) {
                ret[part] = true;
                val = parts.join('-');
                orig = val;
                num++;
            }
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
        return [num > 0, hyphens(val), ret, orig];
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

        var x = greps.action.length, i = 0;
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
        var allow = true, reverse = false;
        var env = val;
        if (contains(val, '!')) {
            reverse = true;
            env = env.replace('!', '');
        }
        if (contains(conditionals, env)) {
            ret[env] = true;
            if (reverse) { allow = !allow; }
            val = "0";
        }
        return [val, ret, allow];
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

const property = {
    parse: function (value, key) {
        var extras = [], prop = "", any = false;
        value = this.reversion(value, key);
        [value, extras] = this.components(value, extras);
        [value, extras] = this.getfinalmixin(value, extras, parser);
        [prop, value] = this.getpropvalue(value);
        [prop, value] = this.getpropvariable(prop, value);
        if (!any) { [any, prop, value] = this.color(prop, this.getvalue(value)); }
        if (!any) { [any, prop, value] = this.px(prop, value); }
        if (!any) { [any, prop, value] = this.family(prop, value); }
        extras = this.rem(prop, value, extras);
        return [prop, value, extras];
    },
    getfinalmixin: (value, extras, ctx) => {
        var retain = '';
        if (contains(value, '!')) {
            value = value.replace(/\!/g, '');
            retain = '!';
        }
        var values = ctx.getmixins(false, value.replace(/\^/g, ''), ctx)[1].split(' ');
        value = values.shift();
        if (values.length > 0) {
            values.forEach(val => { extras.push(val + retain); });
        }
        return [value, extras];
    },
    getpropvariable: (prop, value) => {
        if (prop in config.variable) {
            var parts = config.variable[prop].split("=", 2);
            value = parseComponent(parts.pop(), value);
            prop = parts.shift();
        }
        return [prop, value];
    },
    getpropvalue: (val) => {
        var prop = "", value = "";
        if (contains(val, ':')) { [prop, value] = val.split(':', 2); }
        else if (contains(val, '=')) { [prop, value] = val.split('=', 2); }
        else if (contains(val, '-')) {
            var parts = val.split('-');
            if (parts[0] in config.prop) {
                prop = config.prop[parts[0]];
                parts.shift();
                value = parts.join('-');
            }
            else {
                value = parts.pop();
                prop = parts.join('-');
            }
        }
        else { prop = val; }

        if (value.length == 0 && contains(prop, '#')) {
            value = prop.replace('#', '');
            prop = 'color';
        }
        else if (prop in config.prop) { prop = config.prop[prop]; }
        if (contains(value, '!')) { value = value.replace(/\!/g, '') + '!important'; }
        return [prop, value];
    },
    getvalue: (val) => {
        val = val.replace(/;/g, '');
        var hexes = defined(config.colors);
        if (containsAny(val, ['/', '|', '_'])) {
            val = val.replace(/[\/|\||\_]/g, ' ');
            var vals = val.split(' ');
            if (vals.length > 2) {
                if (hexes && vals[2] in config.colors) {
                    vals[2] = '#' + colors.shorter(config.colors[vals[2]]);
                    val = vals.join(' ');
                }
            }
        }
        else if (hexes && val in config.colors) { val = '#' + colors.shorter(config.colors[val]); }
        else if (begins(val, 'calc')) { val = val.replace('-', ' - ').trim(); }
        return val;
    },
    components: (value, extras) => {
        var wByH = contains(value, 'x') && RegExp('^(|max-|min-)([0-9]{1,10})x([0-9]{1,10})$', 'i').exec(value);
        if (wByH) {
            var [full, pre, width, height] = wByH;
            if (!isNaN(width) && width !== '0') { width += 'px'; }
            if (!isNaN(height) && height !== '0') { height += 'px'; }
            value = pre + 'width' + '-' + width;
            extras.push(pre + 'height-' + height);
        }
        return [value, extras];
    },
    reversion: (value, key) => {
        var reversion = key.split('_', 6)[4];
        if (["", "!", "n"].includes(reversion) === false) { value += '-' + reversion; }
        return value;
    },
    px: (prop, value) => {
        var any = false, px = prop.replace("px", "");
        if (value === "" && !isNaN(px)) {
            prop = parseInt(px);
            if (prop > 0 && (prop % 100) == 0) {
                value = parseFloat(prop).toString();
                prop = 'font-weight';
            }
            else {
                value = parseFloat(prop) + "px";
                prop = "font-size";
            }
            any = true;
        }
        else if (!isNaN(value) && parseInt(value).toString() === value && value !== '0') {
            if (['top', 'bottom', 'left', 'right'].includes(prop)) { any = true; }
            else if (containsAny(prop, ["font-size", "-width", "-height"])) { any = true; }
            else if (['heigh', 'width', 'margi', 'borde', 'spaci', 'paddi'].includes(prop.substring(0, 5))) { any = true; }
            if (any) { value += 'px'; }
        }
        return [any, prop, value];
    },
    color: (prop, value) => colors.parse(prop, value),
    family: (prop, value) => {
        var any = false;
        if (contains(prop, 'family')) {
            prop = 'font-family';
            any = true;
            if (contains(value, ',')) {
                var fonts = [];
                value.split(',').forEach((val) => { fonts.push(contains(val, ' ') ? '"' + val + '"' : val); });
                value = hS.join(',');
            }
        }
        return [any, prop, value];
    },
    rem: (prop, value, extras) => {
        if ((contains(value, 'px') || !isNaN(value))) {
            var any = false;
            var multiplier = 16;
            if (['font-size', 'line-height', 'width', 'height', 'top', 'bottom', 'left', 'right'].includes(prop)) { any = true; }
            else if (['margin', 'paddin', 'spacin'].includes(prop.substring(0, 6))) { any = true; }
            else if (prop.indexOf('-') > 0 && ['top', 'bottom', 'left', 'right', 'width', 'height'].includes(prop.split('-').pop())) { any = true; }
            if (any) {
                value = value.replace('px', '');
                var important = "";
                if (value.indexOf('!') > -1) {
                    value = value.replace(/\!/g, '');
                    important = "!";
                }
                if (!isNaN(value) && parseInt(value) > 0) {
                    var rem = parseInt(value) / (multiplier || 16);
                    if (!isNaN(rem) && rem > 0) { extras.push(prop + '=' + rem + 'rem' + important); }
                }
            }
        }
        return extras;
    }
}

const colors = {
    parse: function (prop, value) {
        var orig = [prop, value];
        [prop, value] = this.color(prop, value);
        return [orig[0] !== prop || orig[1] !== value, prop, value];
    },
    color: function (prop, value) {
        var reverse = false;
        var hexes = defined(config.colors);
        if (hexes) {
            var sep = "";
            if (contains(prop, '@')) { sep = "@"; }
            else if (contains(prop, '~')) { sep = "~"; }
            if (sep.length > 0) {
                var [val1, val2] = prop.split(sep, 2);
                var val3 = "";
                if (contains(val1, '~')) {
                    [val1, val3] = val1.split("~", 2);
                    val3 = '~' + val3;
                }
                if (val1 in config.colors) {
                    value = config.colors[val1].trim() + sep + val2 + val3;
                    prop = "color";
                }
            }
            else if (value in config.colors) {
                value = config.colors[value].trim();
                prop = "color";
                reverse = true;
            }
            else if (prop in config.colors) {
                value = config.colors[prop].trim();
                prop = "color";
            }
        }
        if (reverse || containsAny(prop, ['background', 'color'])) {
            if (!contains(value, '(')) {
                var key = [];
                var vals = [false, 100, 100];
                var variants = [
                    [new RegExp('^(.*)@(.*)~(.*)$', 'i'), 1, 2],
                    [new RegExp('^(.*)~(.*)@(.*)$', 'i'), 2, 1],
                    [new RegExp('^(.*)@(.*)$', 'i'), 1, 1],
                    [new RegExp('^(.*)~(.*)$', 'i'), 2, 2]
                ];
                var x = variants.length, i = 0;
                while (i < x) {
                    while ((key = variants[i][0].exec(value)) !== null) {
                        if (key.length > 1) {
                            vals[0] = true;
                            value = key[1];
                            if (key.length >= 3) { vals[variants[i][1]] = parseInt(key[2]); }
                            if (key.length >= 4) { vals[variants[i][2]] = parseInt(key[3]); }
                            break;
                        }
                    }
                    if (vals[0]) { break; }
                    i++;
                }
                var base = value.replace('#', '');
                if (hexes && base in config.colors) { base = config.colors[base].trim(); }
                if (new RegExp('^([0-9a-f]{1,6})$', 'i').test(base)) {
                    base = this.shade(this.rgb(base), vals[1] / 100);
                    if (vals[2] != 100) { value = this.opacity(this.rgb(base), vals[2]); }
                    else if (base.length > 6) { value = base; }
                    else { value = '#' + this.hex(base); }
                }
                else if (base.length > 6) { value = base; }
                else { value = (value.length > 0 ? '#' : '') + base; }
            }
        }
        else if (['color', 'bgcolor', 'alink', 'vlink', 'link'].includes(prop)) {
            if (new RegExp('^([0-9a-f]{1,6})$', 'i').test(value)) { value = '#' + this.hex(value); }
        }
        else if (['text'].includes(value)) {
            if (new RegExp('^([0-9a-f]{1,6})$', 'i').test(prop)) { prop = '#' + this.hex(prop); }
        }
        return reverse ? [value, prop] : [prop, value];
    },
    hex: function (value) {
        var key = value.toString(16);
        return this.shorter((key.length == 1) ? '0' + key : key);
    },
    shade: function (vals, percent) {
        return vals.length == 0 ? value : this.hex(Math.ceil(vals[0] * percent)) + this.hex(Math.ceil(vals[1] * percent)) + this.hex(Math.ceil(vals[2] * percent));
    },
    opacity: (vals, percent) => {
        return vals.length == 0 ? value : "rgba(" + vals[0] + "," + vals[1] + "," + vals[2] + "," + (percent / 100) + ")";
    },
    rgb: (value) => {
        var key = null;
        if (value.length == 1) { return [parseInt(value + value, 16), parseInt(value + value, 16), parseInt(value + value, 16)]; }
        else if (value.length == 2) { return [parseInt(value, 16), parseInt(value, 16), parseInt(value, 16)]; }
        else if (value.length == 3) {
            key = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(value);
            return [parseInt(key[1] + key[1], 16), parseInt(key[2] + key[2], 16), parseInt(key[3] + key[3], 16)];
        }
        else if (value.length == 6) {
            key = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
            return [parseInt(key[1], 16), parseInt(key[2], 16), parseInt(key[3], 16)];
        }
        else { return value; }
    },
    shorter: (value) => {
        var key = [], vals = [], val = value.toString(), regexp = new RegExp('^([a-fA-F0-9]{6})$', 'i');
        while ((key = regexp.exec(val)) !== null) {
            vals = key[1].split('');
            if ((vals[0] == vals[1]) && (vals[2] == vals[3]) && (vals[4] == vals[5])) { value = vals[0] + vals[2] + vals[4]; }
            break;
        }
        return value;
    }
};

var knowCSS = {
    apply: function () {
        configuration.init();
        var startTime = new Date().getTime();
        var groups = {}, elems = document.querySelectorAll(this.key), smart = {}, val = "", flat = {};
        var x = elems.length, i = 0, letters = {};
        while (i < x) {
            groups = parser.execute(elems[i].getAttribute(knowID));
            elems[i].removeAttribute(knowID);
            if (Object.keys(groups).length > 0) {
                for (var key in groups) { smart = this.splitclasses(i, key, groups[key], smart); }
            }
            i++;
        }
        for (var key in smart) {
            val = smart[key].join("_");
            if (val in flat === false) { flat[val] = []; }
            flat[val].push(key);
        }

        const forThis = this;
        var css = {};
        for (var key in flat) {
            //console.log(JSON.stringify(flat[key], null, 2));
            var keys = key.split('_');
            flat[key].forEach(val => {
                var [screen, modifier, action, parent, reversion, style] = val.split('_', 6);
                var segment = forThis.getsegment(modifier, parent);
                style = forThis.getstyle(style, reversion);

                var parentLevel = 0;
                if (parent != "n") { parentLevel = parseInt(parent); }

                var x = keys.length, i = 0, j = 0;
                while (i < x) {
                    j = keys[i];
                    var ref = j, elem = elems[j];
                    if (parentLevel > 0) {
                        ref = j + "__" + parentLevel;
                        elem = forThis.getparent(elem, parentLevel);
                    }
                    if (ref in letters == false) {
                        letter = this.getletter(letter);
                        elem.classList.add(letter);
                        letters[ref] = letter;
                    }
                    var classNew = letters[ref];
                    if (modifier == 'n') { modifier = ''; }
                    if (screen in css === false) { css[screen] = {}; }
                    if (action in css[screen] === false) { css[screen][action] = {}; }
                    if (segment in css[screen][action] === false) { css[screen][action][segment] = {}; }
                    if (style in css[screen][action][segment] === false) { css[screen][action][segment][style] = []; }
                    if (!contains(css[screen][action][segment][style], classNew + modifier)) {
                        css[screen][action][segment][style].push(classNew + modifier);
                    }
                    else { css[screen][action][segment][style] = [classNew + modifier]; }
                    i++;
                }
            });
        }

        var cssGroup = {};
        var styles = [], start = "", end = "", tab = "", masterLine = "\n";
        for (var screen in css) {
            [start, end, tab] = getWrapper(screen);
            styles.push(masterLine + start);
            for (var action in css[screen]) {
                cssGroup = {};
                for (var segment in css[screen][action]) {
                    for (var style in css[screen][action][segment]) {
                        var actionAdd = (action != 'n' ? ':' + action : '');
                        var classJoin = "." + css[screen][action][segment][style].join(actionAdd + ', .') + actionAdd;
                        var groupKey = screen + '_' + action + '_' + segment;
                        if (groupKey in cssGroup === false) { cssGroup[groupKey] = {}; }
                        if (classJoin in cssGroup[groupKey] === false) { cssGroup[groupKey][classJoin] = []; }

                        // JAA TODO - insert webkit alternative prop:value into style here
                        /*
                        if (classWebKit || (uX.autoprefix && getWebKit(className))) {
                            stylesWebKit = [' -webkit-' + stylesHere, ' -moz-' + stylesHere, ' -ms-' + stylesHere, ' -o-' + stylesHere];
                            stylesHere += stylesWebKit.join('');
                        }
                        */

                        cssGroup[groupKey][classJoin].push(style);
                    }
                }
                for (var cssgroup in cssGroup) {
                    for (var stylegroup in cssGroup[cssgroup]) {
                        styles.push(tab + stylegroup + '{' + cssGroup[cssgroup][stylegroup].join('; ') + '}' + masterLine);
                    }
                }
            }
            styles.push(end);
            delete css[screen];
        }

        var cssTag = document.createElement('style');
        cssTag.innerHTML = styles.join('');
        document.getElementsByTagName('head')[0].appendChild(cssTag);

        var endTime = new Date().getTime();
        console.log('compiled in: ' + (endTime - startTime) + 'ms');
        return this;
    },
    splitclasses: (elem, key, vals, smart) => {
        var classes = vals.split(' ');
        var prop = "", value = "", extras = [], smartkey = "";
        while (classes.length > 0) {
            [prop, value, extras] = property.parse(classes.shift(), key);
            smartkey = key + '_' + prop + '=' + value;
            if (smartkey in smart === false) { smart[smartkey] = []; }
            smart[smartkey].push(elem);
            if (extras.length > 0) { extras.forEach(extra => { classes.push(extra); }); }
        }
        return smart;
    },
    render: function () { return this.apply(); },
    getclasses: (classes) => {
        var grep = new RegExp('([a-zA-Z0-9\-\+\>\~\*\!]{1,32})\\(\\((.*?)\\)\\)', 'gis'), key = [], original = classes;
        while ((key = grep.exec(original)) !== null) {
            if (['var', 'invert', 'translate', 'translateY', 'translateX'].includes(key[1]) === false) {
                classes = classes.replace(key[0], key[1] + "=" + key[2].replace(/\s/g, '\/'));
            }
        }
        return classes.split(/(\s+)/).filter(e => e.trim().length > 0);
    },
    getletter: (val) => {
        if (val.length == 0) { val = "a"; }
        else {
            var i = val.length - 1, chr = val.charCodeAt(i), z = "z".charCodeAt(), chr = "", vals = [];
            do {
                chr = val.charCodeAt(i);
                vals = val.split("");
                if (vals[i] == "z") {
                    vals[i] = "a";
                    if (i == 0) { vals.unshift("a"); }
                }
                else { vals[i] = String.fromCharCode(chr + 1); }
                val = vals.join("");
                i--;
            }
            while (chr == z);
        }
        return val;
    },
    getstyle: (style, reversion) => style.split('=', 2).join(":") + (contains(reversion, '!') ? '!important' : ''),
    getsegment: (modifier, parent) => {
        return (modifier + '_' + parent.toString()).toLowerCase().replace(/[\s\n\r]/gi, '-');
    },
    getparent: (elem, level) => {
        var ret = elem;
        while (level > 0) {
            if (ret && "parentNode" in ret && "classList" in ret.parentNode) { ret = ret.parentNode; }
            level--;
        }
        return ret;
    },
    init: function () { return this.render(); },
    constructor: knowCSSProto
};

function getMediaQuery(mS) {
    return new RegExp(greps.media).exec(mS);
}
function getWebKit(wS) {
    return new RegExp(greps.webkit).test(wS);
}

function getWrapper(xZ) {
    var start = [], end = '}', tab = "\t", line = "\n";
    if (greps.rules.includes(xZ)) { start.push('@' + xZ + ' {'); }
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
    else if (xZ in greps.screens) {
        start.push('@media screen and (');
        if (contains(xZ, 'down')) { start.push('max-width:' + greps.screens[xZ][1] + 'px'); }
        else if (contains(xZ, 'up')) { start.push('min-width:' + greps.screens[xZ][0] + 'px'); }
        else { start.push('min-width:' + greps.screens[xZ][0] + 'px) and (max-width:' + greps.screens[xZ][1] + 'px'); }
        start.push(') {');
    }
    else if (contains(xZ, '?')) {
        var kE = xZ.split('?', 2);
        start.push('@media screen and (min-width:' + kE[0] + 'px) and (max-width:' + kE[1] + 'px) {');
    }
    else if (greps.screenTypes.includes(xZ)) {
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

if (typeof window !== 'undefined') {
    window.$know = function (key) { return new knowCSSProto(key); };
    var knowCSSProto = function (key) { this.key = key || "[" + knowID + "]"; };
    knowCSSProto.prototype = knowCSS;
    if (["interactive", "complete"].includes(document.readyState)) { $know().init(); }
    else { document.addEventListener('DOMContentLoaded', function () { $know().init(); }); }
}
else if (typeof module !== 'undefined') { module.exports = knowCSS; }