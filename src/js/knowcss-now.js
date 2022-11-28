'use strict'

var KwOg = {};

function KwUp(text) {
    let elem = KwLy("highlighting-content");
    if (text[text.length - 1] == "\n") {
        text += " ";
    }
    window.localStorage.setItem(typeof knowNowKey !== 'undefined' ? knowNowKey : 'knowcssnow', text);
    elem.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;");
    Prism.highlightElement(elem);
}
function KwSs(element) {
    let elem = KwLy("highlighting");
    elem.scrollTop = element.scrollTop;
    elem.scrollLeft = element.scrollLeft;
}
function KwCt(element, event) {
    if (event.key == "Tab") {
        let code = element.value;
        event.preventDefault();
        let before_tab = code.slice(0, element.selectionStart);
        let after_tab = code.slice(element.selectionEnd, element.value.length);
        let cursor_pos = element.selectionStart + 1;
        element.value = before_tab + "\t" + after_tab;
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        KwUp(element.value);
    }
}
function KwLy(eA) {
    return document.getElementById(eA);
}
function KwEn(eA) {
    return eA.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').toString();
}
function KwIt(hL) {
    var hE = (hL in KwOg) ? KwOg[hL] : $know().startup();
    hE = KwEn(hE.replace(/\n\t/gi, '\n'));
    return hE;
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
function KwAe(dO, dT) {
    dO.innerHTML = dT;
    var dS = [];
    var dR = dO.childNodes;
    for (var i = 0; dR[i]; i++) {
        if (dS && KwNd(dR[i], 'script') && (!dR[i].type || dR[i].type.toLowerCase() === 'text/javascript')) { dS.push(dR[i].parentNode ? dR[i].parentNode.removeChild(dR[i]) : dR[i]); }
    }
    for (var dA in dS) {
        if (typeof dA === 'string') { KwEs(dS[dA]); }
    }
}
function KwAp(hA, hB, hF) {
    var hC = KwLy(hB);
    if (hC) {
        if (hF || KwOg[hB] !== hA.value) {
            KwOg[hB] = hA.value;
            KwAe(hC, hA.value);
            $know().render("[know]");
        }
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    var eP = document.createElement('style');
    eP.innerHTML = css;
    document.body.appendChild(eP);
    var eH = '';
    try { eH = window.localStorage.getItem(typeof knowNowKey !== 'undefined' ? knowNowKey : 'knowcssnow'); }
    catch(e) { eH = ''; }
    if (!eH || eH.trim().length == 0) { eH = KwLy('root').innerHTML; }
    var eD = KwLy('editing');
    eD.value = eH;
    KwUp(eH);
    KwCt(eD, event);
    for (var i=0; i<=1; i++) { KwAp(eD, 'root', true); }
    eD.focus();
});