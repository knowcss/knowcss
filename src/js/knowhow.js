'use strict'

const cssValue = (val) => {
    var cL = val.split(val.indexOf('=') > -1 ? '=' : '-');
    var cV = cL.pop();
    return cL.join('-') + ': ' + cV.replace(/\//g, " ");
};
const knowElem = (key) => { return document.getElementById(key); };

const knowHardCache = true;

var knowCache = {};

var knowHow = {
    init: function (key) { return this.hamburger().switch(); },
    nav: async function (key) {
        if (key in knowHowNav) {
            var dataNav = knowHowNav[key];
            window.location.hash = '#' + key;
            if (knowHardCache && key + '__html' in knowCache) { knowElem(this.key).innerHTML = knowCache[key + '__html']; }
            else {
                const dataType = dataNav.length > 3 ? dataNav[3] : 'json';
                if (key in knowCache == false) {
                    const data = await fetch('./' + key + '.' + dataType);
                    if (dataType == 'json') { knowCache[key] = await data.json(); }
                    else { knowCache[key] = await data.text(); }
                }
                if (dataType == 'json') { this.render(knowCache[key], this.key).reveal('root'); }
                else {
                    knowElem(this.key).innerHTML = knowCache[key];
                    if (typeof $know !== 'undefined') { $know().render(); }
                    this.reveal('root');
                }
                if (knowHardCache) { knowCache[key + '__html'] = knowElem(this.key).innerHTML; }
            }
            if (dataNav.length > 4) { dataNav[4].apply(this, []); }
            if (window.innerWidth < 768) {
                knowElem('toggle-hamburger').checked = false;
                this.toggle();
                window.scrollTo(0, 0);
            }
        }
        return this;
    },
    switch: function (key) {
        var hash = window.location.hash;
        if (hash) {
            hash = hash.replace('#', '');
            if (hash in knowHowNav == false) { hash = "index"; }
        }
        return this.nav(key || hash || "index"); },
    reveal: function (key) {
        knowElem(key).style.visibility = 'visible';
        return this;
    },
    toggle: function() {
        // JAA TODO - add toggle{} selector
        const navCheck = knowElem('toggle-hamburger').checked;
        const navMobile = window.innerWidth < 768;
        var navWidth = navMobile ? "100%" : 0;
        var navBlock = ['none', 'hidden'];
        if (!navCheck) {
            if (!navMobile) { navWidth = '300px'; }
        }
        else {
            if (navMobile) { navBlock = ['block', 'visible']; }
            else { navBlock = ['table-cell', 'visible']; }
        }
        if (navMobile) {
            const navCol = knowElem('navcol');
            [navCol.style.display, navCol.style.visibility] = navBlock;
        }
        knowElem('navwrap').style.width = navWidth;
    },
    hamburger: function () {
        var nav = knowElem('nav');
        var elem = null;
        var elemVals = [];
        var elemPre = 'nav-';
        for (var key in knowHowNav) {
            elemVals = knowHowNav[key];
            elem = document.createElement('div');
            elem.id = elemPre + key;
            elem.setAttribute('know', 'cursor-pointer' + (elemVals.length > 2 && elemVals[2] ? ' border-top-2px/solid/#f3f3f3' : ''));
            elem.innerHTML = '<div know="[sh] notouch">' + elemVals[0] + '</div>' + (elemVals.length > 1 ? '<div know="[sm] notouch">' + elemVals[1] + '</div>' : '');
            elem.onclick = (event) => { this.switch(event.target.id.replace(elemPre, '')); };
            nav.appendChild(elem);
        }
        var hamburger = knowElem('hamburger');
        hamburger.onclick = (event) => { $knowhow().toggle(); };
        setTimeout(function() { knowElem('navwrap').style.visibility = 'visible'; }, 10);
        return this;
    },
    render: function (keys, id) {
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
        var useValues = typeof knowHowValues !== 'undefined';
        var useVal = "";
        var useValOriginal = "";
        var useParts = [];
        var useApply = true;
        var useBreak = false;
        for (var key in keys) {
            keys[key].forEach(function (val) {
                useBreak = false;
                html.push('<div know="[bx]">');
                if ("head" in val && val.head) { html.push('<div know="[hd]">' + val.head + '</div>'); }
                html.push('<div know="[xt] [ft]">');
                if ("desc" in val && val.desc) { html.push('<div>' + (typeof val.desc === 'string' ? val.desc : val.desc.join('<br><br>')) + '</div>'); useBreak = true; }
                if ("more" in val && val.more) { html.push('<div know="[xt]">' + val.more + '</div>'); useBreak = true; }
                if ("list" in val && val.list) {
                    useBreak = true;
                    tagLoops = "possible" in val ? (typeof val.possible === 'string' ? $know().lists()[val.possible] : val.possible) : ["main"];
                    tagSplits = "split" in val ? val.split : [""];
                    useApply = "apply" in val ? val.apply : true;
                    html.push('<div know="[xt] [ct]"><div know="[cd]"><div know="[nt]">');
                    val.list.forEach(function (vals) {
                        tag = vals.length > 2 ? vals[2] : 'div';
                        tagUse = vals.length > 3 ? vals[3] : 'span';
                        tagLoops.forEach(function (tagLoop) {
                            tagSuffixes = [];
                            if (useValues && key in knowHowValues) {
                                if (tagLoop in knowHowValues[key]) {
                                    tagCheck = knowHowValues[key][tagLoop];
                                    tagSuffixes = typeof tagCheck === 'string' ? [tagCheck] : tagCheck;
                                }
                            }
                            useValOriginal = vals[1].replace('$1', tagLoop);
                            if (tagSuffixes.length == 0) { tagSuffixes.push(''); }
                            tagSuffixes.forEach(function (tagSuffix) {
                                tagHyphen = tagSuffix.length > 0 ? '-' : '';
                                tagSplits.forEach(function (tagSplit) {
                                    tagActual = vals[0].replace('$1', tagLoop + tagHyphen + tagSuffix).replace('$2', tagSplit);
                                    useVal = useValOriginal;
                                    if (useVal.length == 0) {
                                        useParts = tagActual.split('-');
                                        useVal = useParts.pop();
                                        useVal = '{' + useParts.join('-') + ': ' + useVal + ';}';
                                    }
                                    html.push('<div><span know="[blue]">&lt;' + tag + ' <span know="[orange]">know=</span><span know="[pink]">&quot;' + tagActual + '&quot;</span>&gt;</span><' + tagUse + ' know="' + (useApply ? tagActual : '') + '">' + useVal + '</' + tagUse + '><span know="[blue]">&lt;/' + tag + '&gt;</span></div>');
                                });
                            });
                        });
                    });
                    html.push('</div></div></div>');
                }
                if ("reference" in val && val.reference) {
                    if (useBreak) { html.push('</div><div know="[xt] [ft]">'); }
                    if ("head" in val.reference && val.reference.head) { html.push('<div>' + val.reference.head + '</div>'); }
                    html.push('<div know="[xt] [ct]"><div know="[cd]"><div know="[nt]">');
                    for (var vals in val.reference.list) {
                        var sG = val.reference.list[vals];
                        if (sG.length == 0) {
                            sG = key + (vals.indexOf('-') > -1 ? '=' : '-') + vals;
                        }
                        var sO = sG;
                        var sD = sG.replace('=', '-');
                        var sH = '';
                        var sV = '';
                        if ("values" in val.reference) {
                            sV = val.reference.values;
                            vals += '-' + sV;
                            if (!isNaN(sV)) { sV += 'px'; }
                            sG += '-' + sV;
                            sO += '-' + sV;
                        }
                        else if ("short" in val.reference) { sH = ' ' + sD.replace(key + '-', val.reference.short + '-'); }
                        if ("alias" in val.reference && !val.reference.alias) { vals = ''; }
                        else if (vals == sO) { sO = ''; }
                        if ("extra" in val.reference) { sH += " " + sG.replace(val.reference.extra, ""); }
                        var sA = val.reference.apply ? ' know="' + vals + '"' : '';
                        html.push('<div know="[space]"><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + (sO + ' ' + vals + sH).trim() + '&quot;</span>&gt;</span><span' + sA + '>{' + cssValue(sG) + '}</span><span know="[blue]">&lt;/div&gt;</span></div>');
                    };
                    html.push('</div></div></div>');
                }
                if ("reverts" in val && val.reverts) {
                    html.push('</div><div know="[xt] [ft]"><div>Reversions:</div><div know="[xt] [ct]"><div know="[cd]"><div know="[nt]">');
                    ["unset", "revert", "initial", "inherit"].forEach(function (vals) {
                        html.push('<div know="[space]"><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + key + '-' + vals + '&quot;</span>&gt;</span><span>{' + cssValue(key + '-' + vals) + '}</span><span know="[blue]">&lt;/div&gt;</span></div>');
                    });
                    html.push('</div></div></div>');
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

    if (['complete', 'interactive'].includes(document.readyState)) { $knowhow().init(); }
    else { document.addEventListener('DOMContentLoaded', function () { $knowhow().init(); }); }
}
else if (typeof module !== 'undefined') { module.exports = knowHow; }