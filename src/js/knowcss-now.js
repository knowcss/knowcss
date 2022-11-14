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
function KwEd(hL) {
    var hA = KwLy(hL);
    if (hA) {
        var hW = window.open("", "KnowCSS Now", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=" + (screen.height - 200) + ",top=50,left=" + (screen.width - 600));
        var hE = (hL in KwOg) ? KwOg[hL] : $know().startup();
        hE = KwEn(hE.replace(/\n\t/gi, '\n'));

          var property = '#384ef4';
          var selector = '#b65b0c';
          var operator = '#c83b82';
          var attr = '#c83b82';
          var regex = 'orange';
          var punc = '#384ef4';

          var css = `html,body{padding:0;margin:0;height:100%}
          #editing,#highlighting{margin:0;padding:10px;border:0;height:100vh;width:100vw;box-sizing:border-box}
          #editing,#highlighting,#highlighting *{font-size:10pt;font-family:monospace;line-height:11pt;tab-size:2}
          #editing,#highlighting{position:absolute;top:0;left:0}
          #editing{z-index:1}
          #highlighting{z-index:0;background:#fff;height:100vh;width:100vw}
          #editing{color:transparent;background:transparent;caret-color:#000;height:100vh;width:100vw;outline:none!important}
          #editing:focus{outline:none!important}
          #editing,#highlighting{overflow:auto;white-space:nowrap}
          #editing{resize:none}
          *{font-family:monospace}
          p code{border-radius:2px;background-color:#eee;color:#111}
          code[class*="language-"],pre[class*="language-"]{font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}
          pre[class*="language-"]{padding:.4em .8em;margin:.5em 0;overflow:auto}
          code[class*="language-"]{background:#fff;color:#000}
          :not(pre)>code[class*="language-"]{padding:.2em;border-radius:.3em;box-shadow:none;white-space:normal}
          .token.comment,.token.prolog,.token.doctype,.token.cdata{color:#aaa}
          .token.punctuation{color:` + punc + `}
          .token.namespace{opacity:.7}
          .token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol{color:` + property + `}
          .token.selector,.token.attr-name,.token.string,.token.char,.token.builtin{color:` + selector + `}
          .token.operator,.token.entity,.token.url,.language-css .token.string,.token.variable,.token.inserted{color:` + operator + `}
          .token.atrule,.token.attr-value,.token.keyword{color:` + attr + `}
          .token.regex,.token.important{color:` + regex + `}
          .token.important,.token.bold{font-weight:700}
          .token.italic{font-style:italic}
          .token.entity{cursor:help}
          .token.deleted{color:red}
          pre.diff-highlight.diff-highlight>code .token.deleted:not(.prefix),pre>code.diff-highlight.diff-highlight .token.deleted:not(.prefix){background-color:rgba(255,0,0,.3);display:inline}
          pre.diff-highlight.diff-highlight>code .token.inserted:not(.prefix),pre>code.diff-highlight.diff-highlight .token.inserted:not(.prefix){background-color:rgba(0,255,128,.3);display:inline}
          `;

        hW.document.body.innerHTML = `<style>` + css + `</style>
        <textarea placeholder="Enter HTML Source Code" id="editing" spellcheck="false" oninput="window.opener.update(this.value, document); window.opener.sync_scroll(this, document); window.opener.$knowGo(this, '` + hL + `');" onscroll="window.opener.sync_scroll(this, document);" onkeydown=" window.opener.check_tab(this, event);">` + hE + `</textarea>
        <pre id="highlighting" aria-hidden="true"><code class="language-html" id="highlighting-content"></code></pre>`;
            var eP = hW.document.createElement('script');
            eP.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js';
            eP.onload = function() {
                hW.opener.Prism = hW.window.Prism;
                hW.opener.update(hW.document.querySelector('#editing').value, hW.document);
            };
            hW.document.body.appendChild(eP);
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
else if (typeof module !== 'undefined') { module.exports = KwEd; }