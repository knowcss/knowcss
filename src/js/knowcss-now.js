'use strict'

var KwOg = {};
function KwLy(eA) {
    return document.getElementById(eA);
}
function KwEn(eA) {
    return eA.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').toString();
}
function KwEd(hL) {
    var hA = KwLy(hL);
    if (hA) {
        var hW = window.open("", "KnowCSS Now", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=" + (screen.height - 200) + ",top=50,left=" + (screen.width - 600));
        var hE = (hL in KwOg) ? KwOg[hL] : $know().startup();
        hE = KwEn(hE.replace(/\n\t/gi, '\n'));
        hW.document.body.innerHTML = '<style>body{padding:0px;margin:0px;height:100%;width:100%;}textarea{box-sizing:border-box;font-family:verdana;font-size:12px;border:0px;padding:12px}</style><textarea style="width:100%; height:100%;" onKeyUp="window.opener.$knowGo(this, \'' + hL + '\'); return true;" onkeydown="e=event; if ((e.keyCode==9) || (e.which==9)) { e.preventDefault(); var s = this.selectionStart; this.value = this.value.substring(0,this.selectionStart) + \'\\t\' + this.value.substring(this.selectionEnd); this.selectionEnd = s+1; }">' + hE + '</textarea>';
    }
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
function KwAp(hA, hB) {
    var hC = KwLy(hB);
    if (hC) {
        if (KwOg[hB] !== hA.value) {
            KwOg[hB] = hA.value;
            KwAe(hC, hA.value);
            $know().render("[know]", true);
        }
    }
}

if (typeof window !== 'undefined') {
    window.$knowNow = KwEd;
    window.$knowGo = KwAp;
}
else if (typeof module !== '') { module.exports = KwEd; }