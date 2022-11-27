const knowHowNav = {
    "index": ["Getting Started", "The Basics of KnowCSS"],
    "installation": ["Installation", "The Simplicity of KnowCSS", false, "know"],

    //"knowmotion": ["KnowMotion&trade;", "The Animation Add-On", true],
    //"knowparent": ["KnowParent&trade;", "The Parent Selector"],
    //"knownow": ["KnowCSS Now&trade;", "The In-Browser IDE"],

    //"screen": ["Screens", "TODO -- Screen Size, Breakpoints, Media Queries", true],
    //"template": ["Templates", "TODO -- Variables, Mixins, Shorthand, Runtime"],
    //"variant": ["Variants", "TODO -- Conditionals, Random, Sessions"],
    //"nested": ["Nested", "TODO -- Grouping, Modifiers, Selectors, Actions"],
    //"webkit": ["Cross-Browser", "TODO -- Webkit, Auto-Prefix"],
    //"icon": ["Icons", "Bootstrap, TODO -- Font Awesome, SVG"],
    //"function": ["Functions", "TODO -- Var, Enc, Calc, Not, Lang, Min, Max"],
    //"normalize": ["Compatibility", "TODO -- Accessibility, Normalization, Auditing"],
    //"events": ["Environment", "TODO -- Browser, OS, Screen, Mobile, Orientation"],
    //"feature": ["Features", "TODO -- Media, Screen, Print, Speech"],
    //"global": ["Global", "TODO -- Initial, Inherit, Revert, Unset"],
    "box": ["Box Model", "Margin, Border, Padding, Overflow"],
    "cursor": ["Pointer", "Pointer, Selection, Cursors"],
    "font": ["Typography", "Family, Size, Weight, Space, Wrap, Style, Variant"],
    "modifier": ["Psuedo Elements", "Modifiers, Selectors, Actions"],
    "presentation": ["Presentation", "Display, Visibility, Position, Align"], //Clear, Float, Stack
    "dimension": ["Dimensions", "Height, Width"],
    //"target": ["Targeting", "TODO -- All, Children, Adjacents, Siblings, Parents"],
    "color": ["Style", "Color, Heading, Common Colors", false, "know", function() {
        var aH = [];
        for (var aX in hexColors) { aH.push('<div know="[bw]"><span><div know="[bc] background-color-' + aX + '"></div></span><span know="[bd]">#' + hexColors[aX] + '</span><span know="[bd]">' + aX + '</span></div>'); }
        document.getElementById('colors').innerHTML = aH.join('');
        $know().render();
    }], // Hue, Saturation
    //"background": ["Background", "TODO -- Color, Image, Poster, Picture"],
    //"layout": ["Layout", "TODO -- Table, Grid, Flex", false, "know"],
    //"outline": ["Highlight", "TODO -- Outline, Shadow, Blur, Gradient"],
    //"animation": ["Animation", "TODO -- Transition, Transform, Translate, Keyframe, Scale"],
    //"link": ["Link", "TODO -- Decoration, URL, Alt, Title"],
    //"list": ["Block Model", "TODO -- Heading, List, Set, Description, Blockquote, Paragraph"]
};