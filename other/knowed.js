const missing = 'undefined';
const defined = (obj) => typeof obj !== missing && obj != null && obj ? true : false;
const possible = (obj) => typeof obj !== missing && obj != null ? true : false;

const gatherParent = (id, parentElem) => {
    var ret = [];
    try {
        var parentDiv = parentElem.getElementById(id);
        if (defined(parentDiv)) { ret = [parentDiv]; }
    }
    catch (e) { }
    return ret;
};
const gather = (id, parentElem) => {
    var elem = false;
    if (!defined(parentElem)) { parentElem = document; }
    if (defined(id)) {
        if (typeof id === 'function') { id.apply(this, [this]); }
        else {
            var objFound = false;
            try {
                var obj = typeof id === 'object';
                if (obj && 'knowed' in id) { elem = id; }
                else if (obj && 'nodeType' in id) { elem = [id]; }
                else if (obj && 'originalTarget' in id && possible(id.originalTarget)) { elem = [id.originalTarget]; }
                else if (obj && 'target' in id) { elem = [id.target]; }
                if (elem) { objFound = true; }
            } catch (e) { objFound = false; }
            if (objFound) { }
            else if (id.constructor.name == 'Array') {
                elem = [];
                var div = null;
                id.forEach((val) => {
                    try { div = parentElem.querySelector(val) || parentElem.getElementById(val); }
                    catch (e) { div = null; }
                    if (defined(div)) { elem.push(div); }
                });
                if (elem.length == 0) { elem = false; }
            }
            else if (id == document || id == "document") { elem = [document]; }
            else if (id == document.body || id === "body") { elem = [document.body]; }
            else if (id == document.head || id === "head") { elem = [document.head]; }
            else if (id == window || id == "window") { elem = [window]; }
            else if (typeof id === 'string') {
                var ids = [id];
                var ix = '';
                elem = [];
                var elems = [];
                for (var i = 0; i < ids.length; i++) {
                    ix = ids[i];
                    try {
                        if (ix.indexOf('<') > -1 && ix.indexOf('>') > -1) {
                            if (ix.indexOf('\n') > -1 || ix.indexOf('\r') > -1 || ix.indexOf('><') > -1) {
                                var dummy = document.createElement('div');
                                dummy.innerHTML = ix;
                                elems = [dummy.firstChild];
                            }
                            else { elems = [document.createElement(ix.replace('<', '').replace('>', ''))]; }
                        }
                        else if (ix.indexOf(',') > -1 || ix.indexOf('#') > -1 || ix.indexOf('.') > -1 || ix.indexOf('[') > -1) {
                            if (ix.length > 1) {
                                try { elems = parentElem.querySelectorAll(ix); }
                                catch (e) { elems = []; }
                            }
                        }
                        else {
                            elems = gatherParent(ix, parentElem);
                            if (elems.length == 0) {
                                try { elems = parentElem.querySelectorAll(ix); }
                                catch (e) { elems = []; }
                            }
                        }
                    }
                    catch (e) { elems = []; }
                    if (elems.length > 0) {
                        if (ids.length == 1) { elem = elems; }
                        else { elem.push.apply(elem, Array.prototype.slice.call(elems)); }
                    }
                }
                if (elem.length == 0) { elem = false; }
            }
            else { elem = [id]; }
            if (elem.length == 1 && elem[0] == null) { elem = false; }
        }
    }
    else { elem = false; }
    if (!elem || !defined(elem)) { elem = []; }
    return elem;
};

const knowedProto = function (id, parentElem) {
    this.knowed = true;
    this.nodes = gather(id, parentElem);
    this.length = this.nodes.length;
};

const knowedCore = knowedProto.prototype;

knowedCore.each = (callback) => {
    if (this.length > 0) { this.nodes.forEach(callback); }
    return this;
};

if (typeof $knowedExtend !== missing) {
    for (var key in $knowedExtend) { knowedCore[key] = $knowedExtend[key]; }
}

if (typeof window !== missing) {
    window.$knowed = (key, parentElem) => new knowedProto(key, parentElem);
}
else if (typeof module !== missing) { module.exports = knowedCore; }