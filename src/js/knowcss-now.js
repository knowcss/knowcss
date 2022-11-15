'use strict'

function update(text, ref_document) {
    let result_element = ref_document.querySelector("#highlighting-content");
    if(text[text.length-1] == "\n") {
      text += " ";
    }
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;");
    Prism.highlightElement(result_element);
  }

  function sync_scroll(element, ref_document) {
    let result_element = ref_document.querySelector("#highlighting");
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  }

  function check_tab(element, event) {
    if(event.key == "Tab") {
      let code = element.value;
      event.preventDefault();
      let before_tab = code.slice(0, element.selectionStart);
      let after_tab = code.slice(element.selectionEnd, element.value.length);
      let cursor_pos = element.selectionStart + 1;
      element.value = before_tab + "\t" + after_tab;
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      update(element.value);
    }
  }

var KwOg = {};
function KwLy(eA) {
    return document.getElementById(eA);
}
function KwEn(eA) {
    return eA.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').toString();
}
function KwIt (hL) {
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
function KwAp(hA, hB) {
    console.log('kWap - ' + hB);
    var hC = KwLy(hB);
    if (hC) {
        console.log('kWap2');
        if (KwOg[hB] !== hA.value) {
            console.log('kWap3');
            KwOg[hB] = hA.value;
            KwAe(hC, hA.value);
            $know().render("[know]", true);
        }
    }
}

/*
if (typeof window !== 'undefined') {
    window.$knowGo = KwAp;
    window.$knowWhere = KwIt;
}
else if (typeof module !== 'undefined') { module.exports = KwEd; }
*/