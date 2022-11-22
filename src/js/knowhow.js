'use strict'

const cssValue = (val) => {
    var cL = val.split(val.indexOf('=') > -1 ? '=' : '-');
    var cV = cL.pop();
    return cL.join('-') + ': ' + cV.replace(/\//g, " ");
};

var knowHow = {
    config: function(key) {
        return key || (typeof knowHowConfig !== 'undefined' ? knowHowConfig : {});
    },
    init: function(key) {
        if (typeof knowHowConfig !== 'undefined') {
            this.render(this.config(key), this.key);
            if (typeof $know !== 'undefined') { $know().render(); }
        }
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
        for (var key in keys) {
            keys[key].forEach(function (val) {
                html.push('<div know="[bx] [hr]">');
                if ("head" in val && val.head) { html.push('<div know="[hd]">' + val.head + '</div>'); }
                html.push('<div know="[mt] [ft]">');
                if ("desc" in val && val.desc) { html.push('<div>' + val.desc + '</div>'); }
                if ("more" in val && val.more) { html.push('<div know="[mt]">' + val.more + '</div>'); }
                if ("list" in val && val.list) {
                    tagLoops = "possible" in val ? (typeof val.possible === 'string' ? $know().lists()[val.possible] : val.possible) : ["main"];
                    tagSplits = "split" in val ? val.split : [""];
                    html.push('<div know="[mt] [ct]"><div know="[cd]"><div know="[nt]">');
                    val.list.forEach(function (vals) {
                        tag = vals.length > 2 ? vals[2] : 'div';
                        tagUse = vals.length > 3 ? vals[3] : 'span';
                        tagLoops.forEach(function (tagLoop) {
                            tagSuffixes = [];
                            if (key in knowHowValues) {
                                if (tagLoop in knowHowValues[key]) {
                                    tagCheck = knowHowValues[key][tagLoop];
                                    tagSuffixes = typeof tagCheck === 'string' ? [tagCheck]: tagCheck;
                                }
                            }
                            if (tagSuffixes.length == 0) { tagSuffixes.push(''); }
                            tagSuffixes.forEach(function(tagSuffix) {
                                tagHyphen = tagSuffix.length > 0 ? '-' : '';
                                tagSplits.forEach(function(tagSplit) {
                                    tagActual = vals[0].replace('$1', tagLoop + tagHyphen + tagSuffix);
                                    tagActual = tagActual.replace('$2', tagSplit);
                                    html.push('<div><span know="[blue]">&lt;' + tag + ' <span know="[orange]">know=</span><span know="[pink]">&quot;' + tagActual + '&quot;</span>&gt;</span><' + tagUse + ' know="' + tagActual + '">' + vals[1].replace('$1', tagLoop) + '</' + tag + '><span know="[blue]">&lt;/' + tag + '&gt;</span></div>');
                                });
                            });
                        });
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
                        html.push('<div know="[space]"><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + sD + ' ' + vals + sH + '&quot;</span>&gt;</span><span' + sA + '>{' + cssValue(sG) + '}</span><span know="[blue]">&lt;/div&gt;</span></div>');
                    };
                    html.push('</div></div>');
                }
                if ("reverts" in val && val.reverts) {
                    html.push('</div></div><div know="[mt] [ft]"><div>Reversions:</div><div know="[mt] [ct]"><div know="[cd]"><div know="[nt]">');
                    ["unset", "revert", "initial", "inherit"].forEach(function(vals) {
                        html.push('<div know="[space]"><span know="[blue]">&lt;div <span know="[orange]">know=</span><span know="[pink]">&quot;' + key + '-' + vals + '&quot;</span>&gt;</span><span>{' + cssValue(key + '-' + vals) + '}</span><span know="[blue]">&lt;/div&gt;</span></div>');
                    });
                    html.push('</div></div>');
                }
                html.push('</div></div>');
            });
        }
        //html.forEach(function(val) {
        //    console.log(val);
        //});
        document.getElementById(id).innerHTML = html.join('');
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