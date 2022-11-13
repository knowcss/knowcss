'use strict';

const enableLog = false;

const passiveHandlers = {
    "touchstart": function (opt) { return !opt.prevent; },
    "touchmove": function (opt) { return !opt.prevent; },
    "mousewheel": function (opt) { return !opt.prevent; },
    "wheel": function (opt) { return !opt.prevent; }
};

var debugMode = {
    "handlers": false,
    "swipes": false,
    "drags": false
};

const userGroupHandlers = {
    "user": ["blur", "click", "contextmenu", "dblclick", "focus", "keydown", "keypress", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "submit", "touchcancel", "touchend", "touchmove", "touchstart", "DOMMouseScroll", "MozMousePixelScroll"],
    "mouse": ["mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    "wheeled": ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    "touch": ["touchcancel", "touchend", "touchmove", "touchstart"],
    "press": ["click", "dblclick", "touchstart"],
    "hover": ["mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchcancel", "touchend", "touchmove", "touchstart"],
    "unpress": ["mouseup", "touchend", "blur", "focusout"],
    "value": ["keydown", "keypress", "keyup", "change"],
    "populated": ["keydown", "keypress", "keyup", "change", "input"],
    "caret": ["blur", "focus", "focusin", "focusout"],
    "ready": ["load", "DOMContentLoaded"],
    "swipe": ["swipeup", "swipedown", "swipeleft", "swiperight"],
    "drag": ["dragup", "dragdown", "dragleft", "dragright"],
    "dragdrop": ["dragover", "drop", "dragenter", "dragleave", "dragexit"],
    "scrolled": ["scrollstart", "scrollend", "scroll", "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    "focuschange": ["mousedown", "mouseup", "touchstart", "touchend"],
    "render": ["resize", "DOMContentLoaded", "load"],
    "enter": ["keydown", "keypress", "keyup"],
    "modal": ["show.bs.modal", "shown.bs.modal", "hide.bs.modal", "hidden.bs.modal"]

    // Experimental disabled until further video tag testing
    //"media": ["playing", "waiting", "seeking", "seeked", "ended", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "durationchange", "timeupdate", "play", "pause", "ratechange", "volumechange", "suspend", "emptied", "stalled"]

    // Experimental disabled until further testing
    //"innerhtml": ["DOMSubtreeModified", "DOMNodeInserted", "DOMNodeRemoved"]
};
const optionsDefault = {
    "parent": "",
    "priority": 0, // JAA TODO set stack priority of handler over others
    "keys": [], // List of keyCodes that may trigger this action
    "key": "", // keyCode that may trigger this action
    "fingers": 1, // how many fingers may trigger this action - JAA TODO add [min, max] range option
    "duration": 0, // JAA TODO for hold handlers, how long until event is triggered?
    "event": null, // function to trigger when handler has succeeded with passed arguments (event, handler, id, keyCode)
    "bind": false, // JAA TODO bind event directly to target/targets?
    "shortpause": 0, // pause handlers related to event for a short time

    "mobile": true, // run on mobile device?
    "tablet": true, // run on tablet device?
    "desktop": true, // run on desktop device?

    "ios": true, // JAA TODO run on iOS device?
    "android": true, // JAA TODO run on Android device?

    "safari": true, // JAA TODO run in safari?
    "chrome": true, // JAA TODO run in chrome?
    "firefox": true, // JAA TODO run in firefox?
    "edge": true, // JAA TODO run in edge?
    "opera": true, // JAA TODO run in opera?

    "startup": false, // run once immediately on startup?
    "prevent": false, // prevent default event - enabled by default if target or targets is set, pass function name to process true/false realtime
    "execute": true, // execute event - pass function name to process true/false realtime
    "target": "", // run only if target is matching id
    "targets": [], // run only if target is matching ids
    "ready": false, // run only if document is ready
    "dom": false, // run only if interactive is ready
    "jquery": false, // jQuery required to run?
    "once": false, // run once and stop?
    "delay": 0, // prevent initial run before page load delay
    "stutter": 0, // pause before executing trigger after event
    "rate": 0, // prevent subsequent run before delay
    "min-width": 0, // device min width to run
    "max-width": 0, // device max width to run
    "max": 999999999 // max number of run times
};
const startUp = new Date().getTime();
const floodTime = 150;
const floodTimeSame = 350;

var deviceType = "";
var enabledHandlers = {};
var enabledGroupHandlers = {};
var globalFreeze = false;
var injectHandlers = {};
var injectKeys = {};
var trackingKeys = false;
var lastClick = new Date().getTime();
var lastClickID = "";
var pausedHandlers = {};
var humanUser = false;
var humanScrollCheckAdded = false;

var dragEnabled = false;
var dragXY = [0, 0, 0, 0, 0, null, 0];

var swipeEnabled = false;
var swipeScrolling = false;
var swipeXY = [0, 0, 0, 0, 0, null, 0, null, 0, 0];
var swipeInProgress = false;
var firstSwipe = "";
var currentSwipe = "";
var eventSwipe = null;
var preventSwipe = false;
var ignoreSwipeUpDown = false;

var dragReset = function () { dragXY = [0, 0, 0, 0, 0, null, 0]; };
var swipeReset = function () { swipeXY = [0, 0, 0, 0, 0, null, 0, null, 0, 0]; };

const pauseHandlersDo = function (handlers) {
    if (handlers.length > 0) {
        for (var i = 0; i < handlers.length; i++) { pausedHandlers[handlers[i]] = true; }
    }
};
const pauseHandlerDo = function (handler) { pausedHandlers[handler] = true; };
const resumeHandlersDo = function (handlers) {
    if (handlers.length > 0) {
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] in pausedHandlers) { delete pausedHandlers[handlers[i]]; }
        }
    }
};
const resumeHandlerDo = function (handler) {
    if (handler in pausedHandlers) { delete pausedHandlers[handler]; }
};
const shortPauseHandlerDo = function (handler, timeout) {
    pauseHandlerDo(handler);
    setTimeout(function () { resumeHandlerDo(handler); }, timeout || 50);
};

const debug = function (msg) { console.log(msg); };

const addEvent = function (a, b, c) { window.addEventListener(a, b, c); };
const removeEvent = function (a, b) { window.removeEventListener(a, b); };
const addDocEvent = function (a, b, c) { document.addEventListener(a, b, c); };
const getLayer = function (a) { return document.querySelectorAll(a); };

const sendEvent = function (eventType, elem, duration, detail) {
    if (debugMode.swipes || debugMode.drags) { debug(['sendEvent', eventType, elem]); }
    var opt = {
        view: elem || window,
        bubbles: true,
        cancelable: true,
        duration: duration,
        detail: detail
    };
    if (elem) { elem.dispatchEvent(new CustomEvent(eventType, opt)); }
    else { window.dispatchEvent(new CustomEvent(eventType, opt)); }
};

const enableDragListener = function () {
    dragEnabled = true;
    addEvent('mousedown', function (e) {
        if (debugMode.drags) { debug(['mousedown', e]); }
        dragXY = [e.pageX, e.pageY, e.pageX, e.pageY, 1, e.target, new Date().getTime(), e];
    });
    addEvent('mousemove', function (e) {
        if (debugMode.drags) { debug(['mousemove', e]); }
        if (dragXY[4] == 1) {
            dragXY[2] = e.pageX;
            dragXY[3] = e.pageY;
            var elem = dragXY[5];
            var tDiff = new Date().getTime() - dragXY[6];
            sendEvent('dragging', elem, tDiff, dragXY[7]);
        }
        else { dragReset(); }
    });
    addEvent('mouseup', function (e) {
        if (debugMode.drags) { debug(['mouseup', dragXY, e]); }
        if (dragXY[0] != 0 && dragXY[1] != 0 && dragXY[2] != 0 && dragXY[3] != 0 && dragXY[4] > 0) {
            var xDiff = dragXY[0] - dragXY[2];
            var yDiff = dragXY[1] - dragXY[3];
            var elem = dragXY[5];
            var tDiff = new Date().getTime() - dragXY[6];
            if (Math.abs(xDiff) < 20 && Math.abs(yDiff) < 20) {
                if (tDiff > 500) { sendEvent('draghold', elem, tDiff, dragXY[7]); }
                else { sendEvent('dragtap', elem, tDiff, dragXY[7]); }
            }
            else {
                sendEvent('drag', elem, tDiff, dragXY[7]);
                if (Math.abs(xDiff) > Math.abs(yDiff)) {
                    if (xDiff > 0) { sendEvent('dragleft', elem, tDiff, dragXY[7]); }
                    else { sendEvent('dragright', elem, tDiff, dragXY[7]); }
                }
                else {
                    if (yDiff > 0) { sendEvent('dragup', elem, tDiff, dragXY[7]); }
                    else { sendEvent('dragdown', elem, tDiff, dragXY[7]); }
                }
            }
        }
        dragReset();
    });
};

const shouldAllowSwipe = function (e) {
    if (preventSwipe) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    else { return true; }
};
const enableSwipeListener = function () {
    swipeEnabled = true;
    addEvent('touchstart', function (e) {
        if (shouldAllowSwipe(e)) {
            swipeInProgress = true;
            firstSwipe = "";
            eventSwipe = e;
            ignoreSwipeUpDown = false;
            if (debugMode.swipes) { debug(['touchstart', e]); }
            if ("touches" in e && e.touches.length >= 1) {
                swipeXY = [e.touches[0].clientX, e.touches[0].clientY, e.touches[0].clientX, e.touches[0].clientY, e.touches.length, e.target, new Date().getTime(), e, e.touches[0].clientX, e.touches[0].clientY];
                sendEvent('swipingstart', swipeXY[5], 0, swipeXY[7]);
            }
        }
    });
    addEvent('touchmove', function (e) {
        swipeInProgress = true;
        if (debugMode.swipes) { debug(['touchmove', e]); }
        if ("touches" in e && e.touches.length == swipeXY[4]) {
            swipeXY[2] = e.touches[0].clientX;
            swipeXY[3] = e.touches[0].clientY;
            var elem = swipeXY[5];
            var tDiff = new Date().getTime() - swipeXY[6];
            sendEvent('swiping', elem, tDiff, swipeXY[7]);

            var xDiff = swipeXY[0] - swipeXY[2];
            var yDiff = swipeXY[1] - swipeXY[3];
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    if (firstSwipe == "") { firstSwipe = "left"; }
                    currentSwipe = "left";
                    sendEvent('swipingleft', elem, tDiff, swipeXY[7]);
                }
                else {
                    if (firstSwipe == "") { firstSwipe = "right"; }
                    currentSwipe = "right";
                    sendEvent('swipingright', elem, tDiff, swipeXY[7]);
                }
            }
            else {
                if (yDiff > 0) {
                    if (firstSwipe == "") { firstSwipe = "up"; }
                    currentSwipe = "up";
                    sendEvent('swipingup', elem, tDiff, swipeXY[7]);
                }
                else {
                    if (firstSwipe == "") { firstSwipe = "down"; }
                    currentSwipe = "down";
                    sendEvent('swipingdown', elem, tDiff, swipeXY[7]);
                }
                sendEvent('scrollstart', elem, tDiff, swipeXY[7]);
                swipeScrolling = true;
            }
        }
    }, { passive: false });
    addEvent('touchmove', function (e) {
        if (shouldAllowSwipe(e)) {
            if (ignoreSwipeUpDown) {
                e.preventDefault();
                e.stopPropagation();
            }
            swipeInProgress = true;
            if (debugMode.swipes) { debug(['touchmove', e]); }
            if ("touches" in e && e.touches.length == swipeXY[4]) {
                swipeXY[2] = e.touches[0].clientX;
                swipeXY[3] = e.touches[0].clientY;
                var elem = swipeXY[5];
                var tDiff = new Date().getTime() - swipeXY[6];
                sendEvent('swiping', elem, tDiff, swipeXY[7]);
                var xDiff = swipeXY[8] - swipeXY[2];
                var yDiff = swipeXY[9] - swipeXY[3];
                swipeXY[8] = e.touches[0].clientX;
                swipeXY[9] = e.touches[0].clientY;
                eventSwipe = e;
                if (Math.abs(xDiff) > Math.abs(yDiff)) {
                    if (xDiff > 0) {
                        if (firstSwipe == "") { firstSwipe = "left"; }
                        currentSwipe = "left";
                        sendEvent('swipingleft', elem, tDiff, swipeXY[7]);
                    }
                    else {
                        if (firstSwipe == "") { firstSwipe = "right"; }
                        currentSwipe = "right";
                        sendEvent('swipingright', elem, tDiff, swipeXY[7]);
                    }
                }
                else {
                    if (yDiff > 0) {
                        if (firstSwipe == "") { firstSwipe = "up"; }
                        currentSwipe = "up";
                        sendEvent('swipingup', elem, tDiff, swipeXY[7]);
                    }
                    else {
                        if (firstSwipe == "") { firstSwipe = "down"; }
                        currentSwipe = "down";
                        sendEvent('swipingdown', elem, tDiff, swipeXY[7]);
                    }
                    if (["left", "right"].includes(firstSwipe)) {
                        sendEvent('swipingchange', elem, tDiff, swipeXY[7]);
                    }
                }
            }
            else { swipeReset(); }
        }
    }, { passive: false });
    addEvent('touchend', function (e) {
        if (shouldAllowSwipe(e)) {
            if (debugMode.swipes) { debug(['touchend', swipeXY, e]); }
            if (swipeXY[0] != 0 && swipeXY[1] != 0 && swipeXY[2] != 0 && swipeXY[3] != 0 && swipeXY[4] > 0) {
                var xDiff = swipeXY[0] - swipeXY[2];
                var yDiff = swipeXY[1] - swipeXY[3];
                var elem = swipeXY[5];
                var tDiff = new Date().getTime() - swipeXY[6];
                if (Math.abs(xDiff) < 20 && Math.abs(yDiff) < 20) {
                    if (tDiff > 500) { sendEvent('swipehold', elem, tDiff, swipeXY[7]); }
                    else { sendEvent('swipetap', elem, tDiff, swipeXY[7]); }
                }
                else {
                    sendEvent('swipe', elem, tDiff, swipeXY[7]);
                    if (Math.abs(xDiff) > Math.abs(yDiff)) {
                        if (xDiff > 0) { sendEvent('swipeleft', elem, tDiff, swipeXY[7]); }
                        else { sendEvent('swiperight', elem, tDiff, swipeXY[7]); }
                    }
                    else {
                        if (yDiff > 0) { sendEvent('swipeup', elem, tDiff, swipeXY[7]); }
                        else { sendEvent('swipedown', elem, tDiff, swipeXY[7]); }
                    }
                }
                sendEvent('swipingend', elem, tDiff, swipeXY[7]);
            }
            swipeEnded();
        }
    }, { passive: false });
    addEvent('touchcancel', function (e) {
        if (shouldAllowSwipe(e)) { swipeEnded(); }
    }, { passive: false });
};
const swipeEnded = function () {
    if (swipeScrolling) { sendEvent('scrollend', swipeXY[5], 0, swipeXY[7]); }
    swipeScrolling = false;
    swipeReset();
    swipeInProgress = false;
    firstSwipe = "";
    eventSwipe = null;
    ignoreSwipeUpDown = false;
};
const logHandlers = function (msg, force) {
    if (enableLog) {
        if (debugMode.handlers || force) { debug(msg); }
    }
};
const allowRepeat = function (nowTime, lastTime, handler) {
    var oneEvent = handler != 'click' && handlerOneEvent(handler);
    var diff = nowTime - lastTime;
    var ret = true;
    if (oneEvent) {
        var globalDiff = nowTime - lastClick;
        ret = diff > floodTimeSame && globalDiff > floodTime;
    }
    else { ret = diff > floodTimeSame; }
    return ret;
};
const executeHandlerDo = function (handler, id, args, caller) {
    var ret = false;
    try {
        if (handler in injectHandlers && id in injectHandlers[handler]) {
            if (injectHandlers[handler][id].length > 3) {
                var oneEvent = handlerOneEvent(handler);
                var targetedTime = new Date().getTime();
                if (!oneEvent || allowRepeat(targetedTime, injectHandlers[handler][id][3], handler)) {
                    var func = injectHandlers[handler][id][0];
                    var opt = id in injectHandlers[handler] ? injectHandlers[handler][id][1] : {};
                    var arg = args || [];
                    logHandlers("handle handler -> " + handler + '[' + id + '] = ' + arg.length);
                    injectHandlers[handler][id][2]++;
                    if (oneEvent) {
                        lastClick = targetedTime;
                        lastClickID = handler + "__" + id;
                    }
                    var stutter = ("stutter" in opt && parseInt(opt.stutter) > 0) ? opt.stutter : 0;
                    var parentId = ("parent" in opt && opt.parent.length > 0) ? opt.parent : "";
                    if ("max" in opt && parseInt(opt.max) <= 0) { removeHandlerDo(handler, id); }
                    else if (stutter > 0) { setTimeout(function () { dispatchHandler(func, arg, handler, id, parentId, caller); }, stutter); }
                    else { dispatchHandler(func, arg, handler, id, parentId, caller); }
                    if (handler in injectHandlers && id in injectHandlers[handler]) {
                        if (injectHandlers[handler][id].length > 3) {
                            if ("once" in opt && opt.once) { removeHandlerDo(handler, id); }
                            else if ("max" in opt && parseInt(opt.max) <= injectHandlers[handler][id][2]) { removeHandlerDo(handler, id); }
                        }
                    }
                    ret = true;
                    if (handler in injectHandlers && id in injectHandlers[handler]) {
                        if (injectHandlers[handler][id].length > 3) { injectHandlers[handler][id][3] = targetedTime; }
                    }
                }
                else { logHandlers("skip execute handler -> " + handler + '[' + id + ']'); }
            }
            else { logHandlers("bad handler -> " + handler + '[' + id + ']'); }
        }
    }
    catch (e) {
        logHandlers("error handler -> " + handler + '[' + id + '] = ' + e, true);
        debug("error handler -> " + handler + '[' + id + '] = ' + e);
        ret = false;
    }
    return ret;
};
const addHandlersDo = function (handlers) {
    if (typeof handlers !== 'undefined') {
        logHandlers("add multi handlers -> " + handlers.length);
        var args = [];
        for (var i = 0; i < handlers.length; i++) {
            if (handlers.length > i) {
                args = [null, null, null, null];
                for (var j = 0; j < handlers[i].length; j++) {
                    args[j] = (handlers[i].length >= j && handlers[i][j]) ? handlers[i][j] : null;
                }
                addHandlerDo(args[0], args[1], args[2], args[3]);
            }
        }
        logHandlers("added multi handlers -> " + handlers.length);
    }
};
const handleKeyPress = function (e) {
    var keyCode = e.keyCode ? e.keyCode : e.key;
    if (keyCode in injectKeys) {
        for (var handler in injectKeys[keyCode]) {
            if (handler in injectKeys[keyCode]) {
                for (var id in injectKeys[keyCode][handler]) {
                    if (id in injectKeys[keyCode][handler]) {
                        var opt = id in injectHandlers[handler] ? injectHandlers[handler][id][1] : {};
                        logHandlers('executeKey - ' + keyCode + ' - ' + handler + ' - ' + id);
                        var shouldPrevent = false;
                        if (typeof opt.prevent === 'function') { shouldPrevent = opt.prevent.apply(this, [], null, null); }
                        else { shouldPrevent = opt.prevent; }
                        if (shouldPrevent) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        var didExecute = executeHandlerDo(handler, id, null, null);
                        if (didExecute && "event" in opt) {
                            if (typeof opt.event !== 'undefined' && typeof opt.event === 'function') {
                                var parentId = ("parent" in opt && opt.parent.length > 0) ? opt.parent : "";
                                opt.event.apply(this, [e, handler, id, keyCode, parentId], null, null);
                            }
                        }
                    }
                }
            }
        }
    }
};
const injectKey = function (handler, id, key) {
    if (!trackingKeys) {
        addEvent('keydown', handleKeyPress);
        trackingKeys = true;
    }
    if (key in injectKeys === false) { injectKeys[key] = {}; }
    if (handler in injectKeys[key] === false) { injectKeys[key][handler] = {}; }
    injectKeys[key][handler][id] = true;
    logHandlers('injectKey - ' + key + ' - ' + handler + ' - ' + id);
};
const addHandlerKeyDo = function (handler, id) {
    var usedKeys = [];
    var opt = id in injectHandlers[handler] ? injectHandlers[handler][id][1] : {};
    if ("key" in opt && opt.key && parseInt(opt.key) > 0) { usedKeys = [opt.key]; }
    else if ("keys" in opt && opt.keys && opt.keys.length > 0) { usedKeys = opt.keys; }
    if (usedKeys.length > 0) {
        for (var j = 0; j < usedKeys.length; j++) { injectKey(handler, id, usedKeys[j]); }
    }
};
const removeKey = function (handler, id, key) {
    if (key in injectKeys && handler in injectKeys[key] && id in injectKeys[key][handler]) {
        delete injectKeys[key][handler][id];
        if (Object.keys(injectKeys[key][handler]).length == 0) { delete injectKeys[key][handler]; }
        if (Object.keys(injectKeys[key]).length == 0) { delete injectKeys[key]; }
        if (Object.keys(injectKeys).length == 0) {
            injectKeys = {};
            if (trackingKeys) {
                removeEvent('keydown', handleKeyPress);
                trackingKeys = false;
            }
        }
    }
    logHandlers('removeKey - ' + key + ' - ' + handler + ' - ' + id);
};
const removeHandlerKeyDo = function (handler, id) {
    var usedKeys = [];
    var opt = id in injectHandlers[handler] ? injectHandlers[handler][id][1] : {};
    if ("key" in opt && opt.key && parseInt(opt.key) > 0) { usedKeys = [opt.key]; }
    else if ("keys" in opt && opt.keys && opt.keys.length > 0) { usedKeys = opt.keys; }
    if (usedKeys.length > 0) {
        for (var j = 0; j < usedKeys.length; j++) { removeKey(handler, id, usedKeys[j]); }
    }
};
/* const keyBoardHandlers = function () { return ['value', 'caret', 'keydown', 'keypress', 'keyup', 'change', 'blur', 'focus', 'focusin', 'focusout']; }; */
const pressHandlers = function () { return ['press', 'click', 'dblclick']; };
const addHandlerDo = function (handlerArray, id, callback, options) {
    if (typeof handlerArray === 'string') { handlerArray = [handlerArray]; }
    var usedOptions = JSON.parse(JSON.stringify(optionsDefault));
    if (typeof options !== 'undefined' && options != null) {
        if (("target" in options && options.target != null && options.target.length > 0) || ("targets" in options && options.targets != null && options.targets.length > 0)) {
            // JAA TODO - gather all possible targets for quicker matchTarget check later
            if ("prevent" in options === false) {
                var defaultPrevent = false;
                var pressHandlerTypes = pressHandlers();
                for (var i = 0; i < handlerArray.length; i++) {
                    if (pressHandlerTypes.includes(handlerArray[i])) {
                        defaultPrevent = true;
                        break;
                    }
                }
                options.prevent = defaultPrevent;
            }
        }
        if ("once" in options && options.once) { options.max = 1; }
        for (var option in options) {
            if (option in usedOptions) { usedOptions[option] = options[option]; }
        }
    }
    var skipGlobalHandler = false;
    var handler = "";
    var parentId = "";
    if (handlerArray.includes('ready') || handlerArray.includes('load') || handlerArray.includes('DOMContentLoaded')) {
        var fireEventNow = false;
        var readyState = document.readyState;
        if ((handlerArray.includes('ready') || handlerArray.includes('DOMContentLoaded')) && ["interactive", "complete"].includes(readyState)) { fireEventNow = true; }
        else if (["complete"].includes(readyState)) { fireEventNow = true; }
        if (fireEventNow) {
            for (var j = 0; j < handlerArray.length; j++) {
                handler = handlerArray[j];
                usedOptions.startup = false;
                usedOptions.max = 0;
                usedOptions.once = true;
                parentId = ("parent" in usedOptions && usedOptions.parent.length > 0) ? usedOptions.parent : "";
                dispatchHandler(callback, arguments, handler, id, parentId, null);
                skipGlobalHandler = true;
                break;
            }
        }
    }
    if (!skipGlobalHandler) {
        handler = "";
        var handlerStartup = true;
        if ("rate" in usedOptions === false || usedOptions.rate == 0) {
            if (handlerArray.includes('input') || handlerArray.includes('value') || handlerArray.includes('populated')) { usedOptions.rate = 10; }
            else if (handlerArray.includes('focusin') || handlerArray.includes('focusout') || handlerArray.includes('focus') || handlerArray.includes('blur') || handlerArray.includes('caret')) { usedOptions.rate = 10; }
            else if (handlerArray.includes('drop') || handlerArray.includes('dragover')) { usedOptions.rate = 50; }
            else if (handlerArray.includes('click')) { usedOptions.rate = 50; }
            else if (handlerArray.includes('keydown') || handlerArray.includes('keyup') || handlerArray.includes('keypress')) { usedOptions.rate = 10; }
        }
        for (var k = 0; k < handlerArray.length; k++) {
            handler = handlerArray[k];
            if (handler in injectHandlers === false) { injectHandlers[handler] = {}; }
            injectHandlers[handler][id] = [callback, usedOptions, 0, 0];
            addHandlerKeyDo(handler, id);
            if (handlerStartup && "startup" in usedOptions && usedOptions.startup) {
                handlerStartup = false;
                var func = injectHandlers[handler][id][0];
                parentId = ("parent" in usedOptions && usedOptions.parent.length > 0) ? usedOptions.parent : "";
                dispatchHandler(func, arguments, handler, id, parentId, null);
            }
            globalHandlers(handler, id, usedOptions.bind, usedOptions.target, usedOptions.targets);
            logHandlers("added handler -> " + handler + '[' + id + ']');
        }
    }
};
const removeHandlerDo = function (handlerArray, id) {
    if (typeof handlerArray === 'string') { handlerArray = [handlerArray]; }
    var handler = "";
    for (var i = 0; i < handlerArray.length; i++) {
        handler = handlerArray[i];
        logHandlers("remove handler -> " + handler + '[' + id + ']');
        if (handler in injectHandlers && id in injectHandlers[handler]) {
            removeHandlerKeyDo(handler, id);
            delete injectHandlers[handler][id];
            logHandlers("removed handler -> " + handler + '[' + id + ']');
            if (Object.keys(injectHandlers[handler]).length == 0) {
                logHandlers("removed global handler -> " + handler + '[' + id + ']');
                delete injectHandlers[handler];
            }
            if (Object.keys(injectHandlers).length == 0) { injectHandlers = {}; }
        }
    }
};
const removeHandlersDo = function (handlers) {
    logHandlers("remove multi handlers -> " + handlers.length);
    var args = [];
    for (var i = 0; i < handlers.length; i++) {
        if (handlers.length > i) {
            args = [null, null];
            for (var j = 0; j < handlers[i].length; j++) {
                args[j] = (handlers[i].length >= j && handlers[i][j]) ? handlers[i][j] : null;
            }
            removeHandlerDo(args[0], args[1]);
        }
    }
    logHandlers("removed multi handlers -> " + handlers.length);
};
const checkPassiveHandler = function (handler) {
    var ret = false;
    if (handler in passiveHandlers) {
        ret = { "passive": passiveHandlers[handler].apply(this, [{ "prevent": false }], null, null) };
    }
    return ret;
};
const getScrollOffset = function () {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var currentScroll = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    if (currentScroll < 0) { currentScroll = 0; }
    return currentScroll;
};
const humanScrollCheck = function (e) {
    if (getScrollOffset() > 4) {
        logHandlers("executed user scroll handler");
        removeHumanScrollCheck();
        handleHandler(e, 'user');
    }
};
const addHumanScrollCheck = function () {
    if (!humanScrollCheckAdded) {
        logHandlers("added user scroll handler");
        humanScrollCheckAdded = true;
        addEvent('scroll', humanScrollCheck);
    }
};
const removeHumanScrollCheck = function () {
    if (humanScrollCheckAdded) {
        signifyHumanDetection('user');
        logHandlers("removed user scroll handler");
        removeEvent('scroll', humanScrollCheck);
    }
};

const globalHandlers = function (handler, id, bindEnable, bindTarget, bindTargets) {
    for (var injectHandler in injectHandlers) {
        if (injectHandler in enabledHandlers === false) {
            if (handler in userGroupHandlers) {
                var groupHandler = "";
                if (handler == "user") { addHumanScrollCheck(); }
                for (var i = 0; i < userGroupHandlers[handler].length; i++) {
                    groupHandler = userGroupHandlers[handler][i];
                    if (handler + "__" + groupHandler in enabledGroupHandlers === false) {
                        if (groupHandler.indexOf('mouse') > -1 && deviceType == "m") { logHandlers("skip global mouse group handler -> " + handler); }
                        else if (groupHandler.indexOf('touch') > -1 && deviceType == "d") { logHandlers("skip global touch group handler -> " + handler); }
                        else {
                            enabledGroupHandlers[handler + "__" + groupHandler] = true;
                            logHandlers("added global group handler -> " + handler + " - " + groupHandler);
                            if (['drop'].includes(groupHandler)) { addDocEvent(groupHandler, function (e) { handleHandler(e, handler); }, false); }
                            else if (['load', 'DOMContentLoad', 'ready'].includes(groupHandler)) {
                                addDocEvent(groupHandler, function (e) { handleHandler(e, handler); });
                                addEvent(groupHandler, function (e) { handleHandler(e, handler); });
                            }
                            else if (handler == 'enter') {
                                addEvent(groupHandler, function (e) {
                                    var keyCode = e.keyCode ? e.keyCode : e.key;
                                    if (keyCode == 13) { handleHandler(e, handler); }
                                }, false);
                            }
                            else {
                                addEvent(groupHandler, function (e) { handleHandler(e, handler); }, checkPassiveHandler(groupHandler));
                            }
                        }
                    }
                }
            }
            else {
                if (handler.indexOf('mouse') > -1 && deviceType == "m") { logHandlers("skip global mouse handler -> " + handler); }
                else if (handler.indexOf('touch') > -1 && deviceType == "d") { logHandlers("skip global touch handler -> " + handler); }
                else {
                    var didBind = false;
                    logHandlers("added global handler -> " + handler);
                    if (handler == 'drop') { addDocEvent(handler, function (e) { handleHandler(e, handler); }, false); }
                    else if (['load', 'DOMContentLoad', 'ready'].includes(handler)) {
                        addDocEvent(handler, function (e) { handleHandler(e, handler); });
                        addEvent(handler, function (e) { handleHandler(e, handler); });
                    }
                    else {
                        if (bindEnable) {
                            if (handler + '__' + id in enabledHandlers) { didBind = true; }
                            else {
                                var getBinds = null;
                                if (!didBind && bindTarget.length > 0) {
                                    getBinds = getLayer(bindTarget);
                                    if (getBinds != null && getBinds.length > 0) {
                                        for (var l = 0; l < getBinds.length; l++) {
                                            getBinds[l].addEventListener(handler, function (e) { handleHandler(e, handler, id); }, false);
                                            didBind = true;
                                        }
                                    }
                                }
                                if (!didBind && bindTargets.length > 0) {
                                    for (var j = 0; j < bindTargets.length; j++) {
                                        getBinds = getLayer(bindTargets[j]);
                                        if (getBinds != null && getBinds.length > 0) {
                                            for (var k = 0; k < getBinds.length; k++) {
                                                getBinds[k].addEventListener(handler, function (e) { handleHandler(e, handler, id); }, false);
                                                didBind = true;
                                            }
                                        }
                                    }
                                }
                                if (didBind) { enabledHandlers[handler + '__' + id] = true; }
                            }
                        }
                        if (!didBind && handler in enabledHandlers == false) { addEvent(handler, function (e) { handleHandler(e, handler); }, checkPassiveHandler(handler)); }
                    }
                    if (!didBind) { enabledHandlers[handler] = true; }
                }
            }
        }
    }
    if (handler.indexOf('swipe') > -1) {
        if (!swipeEnabled) { enableSwipeListener(); }
    }
    else if (handler.indexOf('drag') > -1) {
        if (!dragEnabled) { enableDragListener(); }
    }
};
const dispatchHandler = function (func, args, handler, id, parentId, caller) {
    if (args.length > 2) {
        args = [].slice.call(args);
        args.pop();
    }
    if (typeof args === 'object') {
        try {
            if (args.length > 0 && typeof args[0] !== 'undefined' && "target" in args[0]) { args[0].originalTarget = caller; }
        }
        catch (e) { }
    }
    try { [].push.call(args, parentId, caller); } catch (e) { }
    logHandlers("dispatch handler -> " + handler + '[' + id + '] = ' + args.length);
    logHandlers([func, args]);
    return func.apply(this, args || []);
};
const handleTarget = function (e, id) {
    var ret = false;
    var caller = null;
    if ("target" in e && e.target) {
        var element = [];
        try { element = getLayer(id); }
        catch (err) { element = []; }
        logHandlers("handle target -> " + id + ' = ' + element.length);
        if (element && element.length > 0) {
            for (var i = 0; i < element.length; i++) {
                try {
                    if (e.target == element[i] || element[i].contains(e.target)) {
                        ret = true;
                        caller = element[i];
                        break;
                    }
                }
                catch (err) { }
            }
        }
    }
    return [ret, caller];
};
const handleTargets = function (e, ids) {
    var ret = false;
    var caller = null;
    if ("target" in e && e.target) {
        if (ids && ids.length > 0) {
            var element = null;
            for (var i = 0; i < ids.length; i++) {
                element = getLayer(ids[i]);
                if (element && element.length > 0) {
                    for (var j = 0; j < element.length; j++) {
                        try {
                            if (e.target == element[j] || element[j].contains(e.target)) {
                                ret = true;
                                caller = element[j];
                                break;
                            }
                        }
                        catch (err) { }
                    }
                    if (ret) { break; }
                }
            }
        }
    }
    return [ret, caller];
};
const handlerOneEvent = function (handler) { return (handler == "click" || handler.indexOf("drag") > -1 || handler.indexOf("swipe") > -1 || handler.indexOf("focusin") > -1); };
const signifyHumanDetection = function (handler) {
    if (handler == 'user' && !humanUser) {
        sendEvent("human:detected", document.body);
        humanUser = true;
    }
};
const handleHandler = function (e, handler, oneID) {
    var skipHandler = globalFreeze || handler in pausedHandlers;
    if (!skipHandler && handler in injectHandlers) {
        logHandlers("handle global handlers -> " + handler);

        var checkOneEvent = false;
        var stopPropagation = false;
        var targetedTime = new Date().getTime();
        var opt = null;
        var matchTarget = true;
        var shouldExecute = false;
        var triggerEvent = false;
        var targetCaller = null;

        signifyHumanDetection(handler);

        if (handler == 'drop') {
            e.preventDefault();
            e.stopPropagation();
        }
        var oneEvent = handlerOneEvent(handler);
        var scanHandlers = oneID ? [oneID] : Object.keys(injectHandlers[handler]);
        var readyState = document.readyState;
        var shouldPrevent = false;
        for (var n = 0; n < scanHandlers.length; n++) {
            var id = scanHandlers[n];
            oneEvent = (id !== "master") && (handler == "click" || handler.indexOf("drag") > -1 || handler.indexOf("swipe") > -1);
            opt = id in injectHandlers[handler] ? injectHandlers[handler][id][1] : {};
            matchTarget = true;
            triggerEvent = false;
            checkOneEvent = true;
            shouldPrevent = false;
            if (handler !== "load" && handler !== "ready") {
                shouldExecute = true;
                if ("execute" in opt) {
                    if (typeof opt.execute === 'function') { shouldExecute = opt.execute.apply(this, [], null, null); }
                    else { shouldExecute = opt.execute; }
                }
                if (shouldExecute) {
                    window.lastTarget = e.target;
                    window.lastEvent = e;
                    if (!stopPropagation && matchTarget && "target" in opt && typeof opt.target !== 'undefined' && opt.target.length > 0) {
                        [matchTarget, targetCaller] = handleTarget(e, opt.target);
                        logHandlers("handle target -> " + opt.target + ' = ' + matchTarget);
                        if (matchTarget && "prevent" in opt) {
                            if (typeof opt.prevent === 'function') { shouldPrevent = opt.prevent.apply(this, [], null, null); }
                            else { shouldPrevent = opt.prevent; }
                            if (shouldPrevent) {
                                if (handler !== 'touchstart') { e.preventDefault(); }
                                e.stopPropagation();
                                stopPropagation = true;
                            }
                            else { checkOneEvent = false; }
                        }
                        if (matchTarget) { triggerEvent = true; }
                    }
                    if (!stopPropagation && matchTarget && "targets" in opt && typeof opt.targets !== 'undefined' && opt.targets.length > 0) {
                        [matchTarget, targetCaller] = handleTargets(e, opt.targets);
                        if (matchTarget && "prevent" in opt) {
                            if (typeof opt.prevent === 'function') { shouldPrevent = opt.prevent.apply(this, [], null, null); }
                            else { shouldPrevent = opt.prevent; }
                            if (shouldPrevent) {
                                if (handler !== 'touchstart') { e.preventDefault(); }
                                e.stopPropagation();
                                stopPropagation = true;
                            }
                            else { checkOneEvent = false; }
                        }
                        if (matchTarget) { triggerEvent = true; }
                    }
                }
                else { matchTarget = false; }
            }
            else { triggerEvent = true; }

            if (!matchTarget) { }
            else if (checkOneEvent && oneEvent && !allowRepeat(targetedTime, injectHandlers[handler][id][3], handler)) {
                logHandlers("skip paused handler direct -> " + handler + '[' + id + ']');
            }
            else if ("delay" in opt && parseInt(opt.delay) > (targetedTime - startUp)) { }
            else if ("rate" in opt && parseInt(opt.rate) > (targetedTime - injectHandlers[handler][id][3])) { }
            else if ("mobile" in opt && !opt.mobile && deviceType == "m") { }
            else if ("tablet" in opt && !opt.tablet && deviceType == "t") { }
            else if ("desktop" in opt && !opt.desktop && deviceType == "d") { }
            else if ("ready" in opt && opt.ready && readyState !== 'complete') { }
            else if ("dom" in opt && opt.ready && readyState !== 'interactive') { }
            else if ("jquery" in opt && opt.jquery && typeof $ === 'undefined') { }
            else if ("max-width" in opt && parseInt(opt["max-width"]) > 0 && parseInt(opt["max-width"]) < window.innerWidth) { }
            else if ("min-width" in opt && parseInt(opt["min-width"]) > 0 && parseInt(opt["min-width"]) > window.innerWidth) { }
            else if (handler.indexOf('swipe') > -1 && "detail" in e && e.detail && "fingers" in opt && opt.fingers > 0 && parseInt(opt.fingers) != e.detail.touches.length) { }
            else if (id in injectHandlers[handler]) {
                var didExecute = executeHandlerDo(handler, id, arguments, targetCaller);
                if (didExecute && triggerEvent && "event" in opt) {
                    if (typeof opt.event !== 'undefined' && typeof opt.event === 'function') {
                        var parentId = ("parent" in opt && opt.parent.length > 0) ? opt.parent : "";
                        opt.event.apply(this, [e, handler, id, "", parentId], null, null);
                    }
                }
                if (didExecute && "shortpause" in opt && opt.shortpause > 0) {
                    shortPauseHandlerDo(handler, opt.shortpause);
                    if (handler.indexOf("focusin") > -1) {
                        e.stopImmediatePropagation();
                        shortPauseHandlerDo('click', opt.shortpause);
                    }
                }
                if (didExecute && handler.indexOf("focusout") > -1) {
                    if (document.activeElement == document.body) {
                        e.stopImmediatePropagation();
                        shortPauseHandlerDo('click', 50);
                    }
                }
                if (oneEvent && didExecute) {
                    if (handler.indexOf("focusin") > -1) {
                        e.stopImmediatePropagation();
                        shortPauseHandlerDo(handler, 50);
                    }
                }
            }
            if (stopPropagation) { break; }
        }
    }
};

const isHandlerPausedDo = function (handler) { return handler in pausedHandlers; };
const isHumanUserDo = function (val) {
    if (typeof val !== 'undefined') {
        humanUser = val;
        return this;
    }
    else { return humanUser; }
};
const debugDo = function (keys) {
    if (typeof keys !== 'undefined') {
        for (var key in keys) {
            if (key in debugMode) { debugMode[key] = keys[key]; }
        }
        return this;
    }
    else { return this.debugMode; }
};

const ears = {
    debug: debugDo,
    isHumanUser: isHumanUserDo,
    addHandlers: addHandlersDo,
    addHandler: addHandlerDo,
    removeHandlers: removeHandlersDo,
    removeHandler: removeHandlerDo,
    executeHandler: executeHandlerDo,
    pauseHandlers: pauseHandlersDo,
    pauseHandler: pauseHandlerDo,
    resumeHandlers: resumeHandlersDo,
    resumeHandler: resumeHandlerDo,
    shortPauseHandler: shortPauseHandlerDo,
    isHandlerPaused: isHandlerPausedDo
};

if (typeof window !== 'undefined') {
    deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";

    window.lastTarget = null;
    window.lastEvent = null;

    window.$ears = function () { return new earsProto(); };
    var earsProto = function () { };
    earsProto.prototype = ears;

    window.handlers = window.handlers || [];
    window.handlers = new Proxy(window.handlers, {
        set: function (target, property, value, receiver) {
            if (typeof value === 'object' && value != null) { window.$ears().addHandlers(value); }
            else { target[property] = value; }
            return true;
        }
    });
    if (window.handlers.length > 0) {
        while (window.handlers.length > 0) { window.$ears.addHandlers(window.handlers.shift()); }
    }
}
else if (typeof module !== 'undefined') { module.exports = ears; }