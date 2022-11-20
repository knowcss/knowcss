'use strict'

const cssValue = (val) => {
    var cL = val.split(val.indexOf('=') > -1 ? '=' : '-');
    return cL.shift() + ': ' + cL.join('-');
};
const knowHowRender = (keys, id) => {
    var html = [];
    for (var key in keys) {
        keys[key].forEach(function (val) {
            html.push('<div know="[bx] [hr]">');
            if ("head" in val && val.head) { html.push('<div know="[hd]">' + val.head + '</div>'); }
            html.push('<div know="[mt] [ft]">');
            if ("desc" in val && val.desc) { html.push('<div>' + val.desc + '</div>'); }
            if ("list" in val && val.list) {
                html.push('<div know="[mt] [ct]"><div know="[cd]"><div know="[nt]">');
                val.list.forEach(function (vals) {
                    html.push('<div><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + vals[0] + '&quot;</span>&gt;</span><span know="' + vals[0] + '">' + vals[1] + '</span><span know="[blue]">&lt;/div&gt;</span></div>');
                });
                html.push('</div></div>');
            }
            if ("reference" in val && val.reference) {
                html.push('</div></div><div know="[mt] [ft]">');
                if ("head" in val.reference && val.reference.head) { html.push('<div>' + val.reference.head + '</div>'); }
                html.push('<div know="[mt] [ct]"><div know="[cd]"><div know="[nt]">');
                for (var vals in val.reference.list) {
                    var sG = val.reference.list[vals];
                    var sD = sG.replace('=', '-');
                    var sH = sD.replace(key + '-', val.reference.short + '-');
                    html.push('<div><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + sD + ' ' + vals + ' ' + sH + '&quot;</span>&gt;</span><span>{' + cssValue(sG) + '}</span><span know="[blue]">&lt;/div&gt;</span></div>');
                };
                html.push('</div></div>');
            }
            html.push('</div></div>');
        });
    }
    document.getElementById(id).innerHTML = html.join('');
};
const knowHowInit = () => {
    if (typeof knowHow !== 'undefined') {
        knowHowRender(knowHow, "knowhow");
        $know().render();
    }
};

if (typeof window !== 'undefined') {
    if (['interactive','complete'].includes(document.readyState)) { knowHowInit(); }
    else { document.addEventListener('DOMContentLoaded', knowHowInit); }
}
else if (typeof module !== 'undefined') { module.exports = knowHowInit; }