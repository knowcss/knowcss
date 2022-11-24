'use strict'

const cssValue = (val) => {
    var cL = val.split(val.indexOf('=') > -1 ? '=' : '-');
    var cV = cL.pop();
    return cL.join('-') + ': ' + cV.replace(/\//g, " ");
};
const knowElem = (key) => { return document.getElementById(key); };

var knowCache = {};

var knowHow = {
    init: function(key) { return this.hamburger().switch(); },
    nav: async function (key) {
        if (key in knowCache == false && key in knowHowNav) {
            const data = await fetch('./' + key + '.json');
            knowCache[key] = await data.json();
        }
        return this.render(knowCache[key], this.key).reveal();
    },
    switch: function(key) { return this.nav(key || "index"); },
    reveal: function(key) {
        knowElem('root').style.visibility = 'visible';
        return this;
    },
    hamburger: function() {
        var nav = knowElem('nav');
        var elem = null;
        var elemVals = [];
        for (var key in knowHowNav) {
            elemVals = knowHowNav[key];
            elem = document.createElement('div');
            elem.id = key;
            elem.setAttribute('know', 'cursor-pointer' + (elemVals.length > 2 && elemVals[2] ? ' border-top-2px/solid/#f3f3f3' : ''));
            elem.innerHTML = '<span know="notouch">' + elemVals[0] + '</span>' + (elemVals.length > 1 ? ' <span know="[sm] notouch">' + elemVals[1] + '</span>' : '');
            elem.onclick = (event) => { this.switch(event.target.id); };
            nav.appendChild(elem);
        }
        var hamburger = knowElem('hamburger');
        hamburger.onclick = (event) => {
            // JAA TODO - add toggle{} selector
            const navCol = knowElem('navwrap');
            const navClass = navCol.classList;
            var navWidth = 0;
            if (navClass.contains('closed')) {
                navClass.remove('closed');
                navWidth = '300px';
            }
            else {
                navClass.add('closed');
            }
            navCol.style.width = navWidth;
        };
        return this;
    },
    render: function(keys, id) {
        var html = [];
        var tag = 'div';
        var tagUse = 'span';
        var tagLoops = [];
        var tagSuffix = "";
        var tagSuffixes = [];
        var tagCheck = "";
        var tagActual = "";
        var tagHyphen = "";
        var tagSplits = [];
        var tagSplit = "";
        var useVales = typeof knowHowValues !== 'undefined';
        for (var key in keys) {
            keys[key].forEach(function (val) {
                html.push('<div know="[bx]">');
                if ("head" in val && val.head) { html.push('<div know="[hd]">' + val.head + '</div>'); }
                html.push('<div know="[xt] [ft]">');
                if ("desc" in val && val.desc) { html.push('<div>' + val.desc + '</div>'); }
                if ("more" in val && val.more) { html.push('<div know="[xt]">' + val.more + '</div>'); }
                if ("list" in val && val.list) {
                    tagLoops = "possible" in val ? (typeof val.possible === 'string' ? $know().lists()[val.possible] : val.possible) : ["main"];
                    tagSplits = "split" in val ? val.split : [""];
                    html.push('<div know="[xt] [ct]"><div know="[cd]"><div know="[nt]">');
                    val.list.forEach(function (vals) {
                        tag = vals.length > 2 ? vals[2] : 'div';
                        tagUse = vals.length > 3 ? vals[3] : 'span';
                        tagLoops.forEach(function (tagLoop) {
                            tagSuffixes = [];
                            if (useVales && key in knowHowValues) {
                                if (tagLoop in knowHowValues[key]) {
                                    tagCheck = knowHowValues[key][tagLoop];
                                    tagSuffixes = typeof tagCheck === 'string' ? [tagCheck]: tagCheck;
                                }
                            }
                            if (tagSuffixes.length == 0) { tagSuffixes.push(''); }
                            tagSuffixes.forEach(function(tagSuffix) {
                                tagHyphen = tagSuffix.length > 0 ? '-' : '';
                                tagSplits.forEach(function(tagSplit) {
                                    tagActual = vals[0].replace('$1', tagLoop + tagHyphen + tagSuffix).replace('$2', tagSplit);
                                    html.push('<div><span know="[blue]">&lt;' + tag + ' <span know="[orange]">know=</span><span know="[pink]">&quot;' + tagActual + '&quot;</span>&gt;</span><' + tagUse + ' know="' + tagActual + '">' + vals[1].replace('$1', tagLoop) + '</' + tagUse + '><span know="[blue]">&lt;/' + tag + '&gt;</span></div>');
                                });
                            });
                        });
                    });
                    html.push('</div></div>');
                }
                if ("reference" in val && val.reference) {
                    html.push('</div></div><div know="[xt] [ft]">');
                    if ("head" in val.reference && val.reference.head) { html.push('<div>' + val.reference.head + '</div>'); }
                    html.push('<div know="[xt] [ct]"><div know="[cd]"><div know="[nt]">');
                    for (var vals in val.reference.list) {
                        var sG = val.reference.list[vals];
                        var sO = sG;
                        var sD = sG.replace('=', '-');
                        var sH = '';
                        var sV = '';
                        if ("values" in val.reference) {
                            sV = val.reference.values;
                            vals += '-' + sV;
                            if (!isNaN(sV)) { sV += 'px'; }
                            sG += '-' + sV;
                        }
                        else if ("short" in val.reference) { sH = ' ' + sD.replace(key + '-', val.reference.short + '-'); }
                        var sA = val.reference.apply ? ' know="' + vals + '"' : '';
                        html.push('<div know="[space]"><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + sO + ' ' + vals + sH + '&quot;</span>&gt;</span><span' + sA + '>{' + cssValue(sG) + '}</span><span know="[blue]">&lt;/div&gt;</span></div>');
                    };
                    html.push('</div></div>');
                }
                if ("reverts" in val && val.reverts) {
                    html.push('</div></div><div know="[xt] [ft]"><div>Reversions:</div><div know="[xt] [ct]"><div know="[cd]"><div know="[nt]">');
                    ["unset", "revert", "initial", "inherit"].forEach(function(vals) {
                        html.push('<div know="[space]"><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + key + '-' + vals + '&quot;</span>&gt;</span><span>{' + cssValue(key + '-' + vals) + '}</span><span know="[blue]">&lt;/div&gt;</span></div>');
                    });
                    html.push('</div></div>');
                }
                html.push('</div></div>');
            });
        }
        knowElem(id).innerHTML = html.join('');
        if (typeof $know !== 'undefined') { $know().render(); }
        return this;
    },

    constructor: knowHowProto
};

if (typeof window !== 'undefined') {
    window.$knowhow = function (key) {
        return new knowHowProto(key);
    };
    var knowHowProto = function (key) {
        this.key = key || "knowhow";
        this.debugging = false;
    };
    knowHowProto.prototype = knowHow;

    if (['complete','interactive'].includes(document.readyState)) { $knowhow().init(); }
    else { document.addEventListener('DOMContentLoaded', function () { $knowhow().init(); }); }
}
else if (typeof module !== 'undefined') { module.exports = knowHow; }