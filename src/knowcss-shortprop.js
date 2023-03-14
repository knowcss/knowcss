const knowVars = {
    "one": "border-top-1px"
};

const knowMixins = {
    /* grid model */
    "container": "width-100% padding-right-15px padding-left-15px margin-right-auto margin-left-auto max-width-100% 1230{max-width-1550} 1200{max-width-1140} 1024{max-width-940} 768{max-width-720}",
    "container-fluid": "width-100% padding-right-15px padding-left-15px margin-right-auto margin-left-auto",
    "row": "width-100% display=-webkit-box display=-ms-flexbox display-flex -ms-flex-wrap-wrap flex-wrap-wrap"
};

const knowVariable = {
    /* transform translate */
    "translateY": "transform=translateY($1)",
    "translateX": "transform=translateX($1)",
    "translateXY": "transform=translate($1,$2)"
};

const knowComponents = {
    "tlbr": "top-$1 left-$1 bottom-$3 right-$4",
    "sq": "top-$1 left-$1 bottom-$3 right-$4 width-$5 height-$6",
    "wh": "width-$1 height-$2",
    "hw": "height-$1 width-$2"
};

const knowProp = {
    /* dimensions */
    "w": "width",
    "h": "height",
    "mw": "min-width",
    "mh": "min-height",
    "xw": "max-width",
    "xh": "max-height",

    /* padding */
    "p": "padding",
    "pt": "padding-top",
    "pb": "padding-bottom",
    "pl": "padding-left",
    "pr": "padding-right",

    /* margin */
    "m": "margin",
    "mt": "margin-top",
    "mb": "margin-bottom",
    "ml": "margin-left",
    "mr": "margin-right",

    /* border */
    "bd": "border",
    "bt": "border-top",
    "bb": "border-bottom",
    "bl": "border-left",
    "br": "border-right",
    "rad": "border-radius",
    "bs": "border-spacing",

    /* color */
    "c": "color",
    "bg": "background-color",

    /* font */
    "px": "font-size",
    "f": "font-family",
    "fw": "font-weight",
    "fs": "font-style",

    /* view */
    "d": "display",
    "v": "visibility",

    /* position */
    "pos": "position",
    "t": "top",
    "l": "left",
    "r": "right",
    "b": "bottom",

    /* text */
    "indent": "text-indent",
    "space": "letter-spacing",
    "line": "line-height",
    "word": "word-spacing",

    /* misc */
    "cr": "cursor",
    "of": "overflow",
    "zi": "z-index",
    "fl": "float",
    "cl": "clear"
};

const knowShort = {
    /* h tags */
    "h16": "margin-top-0 margin-bottom-0.5rem font-weight-500 line-height-1.2",
    "h1": "h16 font-size-calc(1.375rem/+/1.5vw)",
    "h2": "h16 font-size-calc(1.325rem/+/0.9vw)",
    "h3": "h16 font-size-calc(1.3rem/+/0.6vw)",
    "h4": "h16 font-size-calc(1.275rem/+/0.3vw)",
    "h5": "h16 font-size-1.25rem",
    "h6": "h16 font-size-1rem",


    /* viewport */
    "100vh": "height-100vh",
    "100vw": "width-100vw",

    /* interaction */
    "notouch": "pointer-events-none user-select-none",
    "touch": "pointer-events-all user-select-all",
    "noselect": "user-select-none",
    "select": "user-select-all",
    "nopoint": "pointer-events-none",
    "point": "pointer-events-all",
    "nohighlight": "user-select-none touch-callout-none tap-highlight-color-transparent",

    /* normalize */
    "border-box": "box-sizing=border-box",
    "tight": "m-0 p-0",

    /* table */
    "tr": "display=table-row",
    "td": "display=table-cell",

    /* transform */
    "origin": "transform-origin",

    /* text-transform */
    "capitalize": "text-transform=capitalize",
    "uppercase": "text-transform=uppercase",
    "lowercase": "text-transform=lowercase",
    "full-width": "text-transform=full-width",
    "kana": "text-transform=full-size-kana",

    /* text style */
    "italic": "font-style-italic",
    "oblique": "font-style-oblique",
    "underline": "text-decoration-underline",
    "nounderline": "text-decoration-none",

    /* text variant */
    "small-caps": "font-variant-caps=small-caps",
    "all-small-caps": "font-variant-caps=all-small-caps",
    "petite-caps": "font-variant-caps=petite-caps",
    "all-petite-caps": "font-variant-caps=all-petite-caps",
    "unicase": "font-variant-caps=unicase",
    "titling-caps": "font-variant-caps=titling-caps",

    /* font-weight */
    "thin": "font-weight-100",
    "extralight": "font-weight-200",
    "light": "font-weight-300",
    "normal": "font-weight-400",
    "medium": "font-weight-500",
    "semibold": "font-weight-600",
    "bold": "font-weight-700",
    "extrabold": "font-weight-800",

    /* visibility */
    "collapse": "visibility-collapse",
    "hidden": "visibility-hidden",
    "visible": "visibility-visible",

    /* position */
    "static": "position-static",
    "absolute": "position-absolute",
    "fixed": "position-fixed",
    "relative": "position-relative",
    "sticky": "position-sticky",

    /* alignment */
    "centered": "display-table margin-0/auto text-align-center",
    "center": "margin-0/auto",
    "aligncenter": "text-align-center",
    "alignleft": "text-align-left",
    "alignright": "text-align-right",
    "aligntop": "vertical-align-top",
    "alignmiddle": "vertical-align-middle",
    "alignbottom": "vertical-align-bottom",

    /* width % */
    "full": "width-100%",
    "half": "width-50%",
    "third": "width-33.3333%",
    "quarter": "width-25%",

    /* display */
    "div": "display=block",
    "span": "display=inline",
    "none": "display=none",
    "inline": "display=inline",
    "block": "display=block",
    "contents": "display=contents",
    "inline-block": "display=inline-block",
    "li": "display=list-item",
    "list": "display=list-item",
    "list-item": "display=list-item",
    "run-in": "display=run-in",
    "initial": "display=initial",
    "revert": "display=revert",
    "unset": "display=unset",

    /* tables, flex, grid */
    "table": "display=table",
    "collapse": "border-collapse-collapse",
    "separate": "border-collapse-separate",
    "table-row": "display=table-row",
    "table-cell": "display=table-cell",
    "cell": "display=table-cell",
    "col": "display=table-cell",
    "colgroup": "display=table-column-group",
    "column": "display=table-column",
    "thead": "display=table-header-group",
    "tfoot": "display=table-footer-group",
    "tbody": "display=table-row-group",
    "caption": "display=table-caption",
    "inline-flex": "display=inline-flex",
    "inline-grid": "display=inline-grid",
    "inline-table": "display=inline-table",
    "grid": "display=grid",

    /* cursors */
    "alias": "cursor=alias",
    "all-scroll": "cursor=all-scroll",
    "auto": "cursor=auto",
    "context-menu": "cursor=context-menu",
    "col-resize": "cursor=col-resize",
    "copy": "cursor=copy",
    "crosshair": "cursor=crosshair",
    "default": "cursor=default",
    "e-resize": "cursor=e-resize",
    "ew-resize": "cursor=ew-resize",
    "grab": "cursor=grab",
    "grabbing": "cursor=grabbing",
    "help": "cursor=help",
    "move": "cursor=move",
    "n-resize": "cursor=n-resize",
    "ne-resize": "cursor=ne-resize",
    "nesw-resize": "cursor=nesw-resize",
    "ns-resize": "cursor=ns-resize",
    "nw-resize": "cursor=nw-resize",
    "nwse-resize": "cursor=nwse-resize",
    "no-drop": "cursor=no-drop",
    "not-allowed": "cursor=not-allowed",
    "pointer": "cursor=pointer",
    "progress": "cursor=progress",
    "row-resize": "cursor=row-resize",
    "s-resize": "cursor=s-resize",
    "se-resize": "cursor=se-resize",
    "sw-resize": "cursor=sw-resize",
    "text": "cursor=text",
    "w-resize": "cursor=w-resize",
    "wait": "cursor=wait",
    "zoom-in": "cursor=zoom-in",
    "zoom-out": "cursor=zoom-out",

    /* object-cover */
    "fill": "object-cover-fill",
    "contain": "object-cover--contain",
    "cover": "object-cover-cover",
    "scale-down": "object-cover=scale-down",
    "scale": "object-cover=scale-down",

    /* white-space */
    "nowrap": "white-space-nowrap",
    "pre": "white-space-pre",
    "pre-line": "white-space=pre-line",
    "pre-wrap": "white-space=pre-wrap",
    "break-word": "overflow-wrap=break-word",
    "anywhere": "overflow-wrap-anywhere",

    /* overflow */
    "clip": "overflow-clip",
    "scroll": "overflow-scroll",
    "auto": "overflow-auto"
};

const knowBrackets = {};

const knowConditionals = {};

const knowColors = {
    "pink": "ffc0cb",
    "lightpink": "ffb6c1",
    "palevioletred": "db7093",
    "hotpink": "ff69b4",
    "deeppink": "ff1493",
    "mediumvioletred": "c71585",
    "lavender": "e6e6fa",
    "thistle": "d8bfd8",
    "plum": "dda0dd",
    "orchid": "da70d6",
    "violet": "ee82ee",
    "fuchsia": "ff00ff",
    "magenta": "ff00ff",
    "mediumorchid": "ba55d3",
    "darkorchid": "9932cc",
    "darkviolet": "9400d3",
    "blueviolet": "8a2be2",
    "darkmagenta": "8b008b",
    "purple": "800080",
    "mediumpurple": "9370db",
    "mediumslateblue": "7b68ee",
    "slateblue": "6a5acd",
    "darkslateblue": "483d8b",
    "rebeccapurple": "663399",
    "indigo ": "4b0082",
    "lightsalmon": "ffa07a",
    "salmon": "fa8072",
    "darksalmon": "e9967a",
    "lightcoral": "f08080",
    "indianred ": "cd5c5c",
    "crimson": "dc143c",
    "red": "ff0000",
    "firebrick": "b22222",
    "darkred": "8b0000",
    "orange": "ffa500",
    "darkorange": "ff8c00",
    "coral": "ff7f50",
    "tomato": "ff6347",
    "orangered": "ff4500",
    "gold": "ffd700",
    "yellow": "ffff00",
    "lightyellow": "ffffe0",
    "lemonchiffon": "fffacd",
    "lightgoldenrodyellow": "fafad2",
    "papayawhip": "ffefd5",
    "moccasin": "ffe4b5",
    "peachpuff": "ffdab9",
    "palegoldenrod": "eee8aa",
    "khaki": "f0e68c",
    "darkkhaki": "bdb76b",
    "greenyellow": "adff2f",
    "chartreuse": "7fff00",
    "lawngreen": "7cfc00",
    "lime": "00ff00",
    "limegreen": "32cd32",
    "palegreen": "98fb98",
    "lightgreen": "90ee90",
    "mediumspringgreen": "00fa9a",
    "springgreen": "00ff7f",
    "mediumseagreen": "3cb371",
    "seagreen": "2e8b57",
    "forestgreen": "228b22",
    "green": "008000",
    "darkgreen": "006400",
    "yellowgreen": "9acd32",
    "olivedrab": "6b8e23",
    "darkolivegreen": "556b2f",
    "mediumaquamarine": "66cdaa",
    "darkseagreen": "8fbc8f",
    "lightseagreen": "20b2aa",
    "darkcyan": "008b8b",
    "teal": "008080",
    "aqua": "00ffff",
    "cyan": "00ffff",
    "lightcyan": "e0ffff",
    "paleturquoise": "afeeee",
    "aquamarine": "7fffd4",
    "turquoise": "40e0d0",
    "mediumturquoise": "48d1cc",
    "darkturquoise": "00ced1",
    "cadetblue": "5f9ea0",
    "steelblue": "4682b4",
    "lightsteelblue": "b0c4de",
    "lightblue": "add8e6",
    "powderblue": "b0e0e6",
    "lightskyblue": "87cefa",
    "skyblue": "87ceeb",
    "cornflowerblue": "6495ed",
    "deepskyblue": "00bfff",
    "dodgerblue": "1e90ff",
    "royalblue": "4169e1",
    "blue": "0000ff",
    "mediumblue": "0000cd",
    "darkblue": "00008b",
    "navy": "000080",
    "midnightblue": "191970",
    "cornsilk": "fff8dc",
    "blanchedalmond": "ffebcd",
    "bisque": "ffe4c4",
    "navajowhite": "ffdead",
    "wheat": "f5deb3",
    "burlywood": "deb887",
    "tan": "d2b48c",
    "rosybrown": "bc8f8f",
    "sandybrown": "f4a460",
    "goldenrod": "daa520",
    "darkgoldenrod": "b8860b",
    "peru": "cd853f",
    "chocolate": "d2691e",
    "olive": "808000",
    "saddlebrown": "8b4513",
    "sienna": "a0522d",
    "brown": "a52a2a",
    "maroon": "800000",
    "white": "ffffff",
    "snow": "fffafa",
    "honeydew": "f0fff0",
    "mintcream": "f5fffa",
    "azure": "f0ffff",
    "aliceblue": "f0f8ff",
    "ghostwhite": "f8f8ff",
    "whitesmoke": "f5f5f5",
    "seashell": "fff5ee",
    "beige": "f5f5dc",
    "oldlace": "fdf5e6",
    "floralwhite": "fffaf0",
    "ivory": "fffff0",
    "antiquewhite": "faebd7",
    "linen": "faf0e6",
    "lavenderblush": "fff0f5",
    "mistyrose": "ffe4e1",
    "gainsboro": "dcdcdc",
    "lightgray": "d3d3d3",
    "silver": "c0c0c0",
    "darkgray": "a9a9a9",
    "dimgray": "696969",
    "gray": "808080",
    "lightslategray": "778899",
    "slategray": "708090",
    "darkslategray": "2f4f4f",
    "black": "000000"
};