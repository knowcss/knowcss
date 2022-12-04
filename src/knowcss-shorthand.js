const shorterHand = {
    "w": "width",
    "h": "height",
    "p": "padding",
    "px": "font-size",
    "d": "display",
    "v": "visibility",
    "pos": "position",
    "f": "font-family",
    "fw": "font-weight",
    "fs": "font-style",
    "cr": "cursor",
    "wrap": "overflow-wrap",
    "of": "overflow",
    "zi": "z-index",
    "t": "top",
    "l": "left",
    "fl": "float",
    "cl": "clear"
};

const globalMixins = {
    "h16": "margin-top-0 margin-bottom-0.5rem font-weight-500 line-height-1.2"
};

const shortHandVariable = {
    /* transform translate */
    "translateY": "transform=translateY($1)",
    "translateX": "transform=translateX($1)",
    "translateXY": "transform=translate($1,$2)"
};

const shortHand = {
    "h1": "h16 font-size-calc(1.375rem/+/1.5vw)",
    "h2": "h16 font-size-calc(1.325rem/+/0.9vw)",
    "h3": "h16 font-size-calc(1.3rem/+/0.6vw)",
    "h4": "h16 font-size-calc(1.275rem/+/0.3vw)",
    "h5": "h16 font-size-1.25rem",
    "h6": "h16 font-size-1rem",

    "w": "width",
    "h": "height",

    "tight": "m-0 p-0",

    "100vh": 'height-100vh',
    "100vw": 'width-100vw',

    "notouch": "pointer-events-none user-select-none",
    "touch": "pointer-events-all user-select-all",
    "noselect": "user-select-none",
    "select": "user-select-all",
    "nopoint": "pointer-events-none",
    "point": "pointer-events-all",

    "nohighlight": "user-select-none touch-callout-none tap-highlight-color-transparent",

    "mw": "min-width",
    "mh": "min-height",
    "xw": "max-width",
    "xh": "max-height",

    "m": "margin",
    "mt": "margin-top",
    "mb": "margin-bottom",
    "ml": "margin-left",
    "mr": "margin-right",

    "b": "border",
    "bt": "border-top",
    "bb": "border-bottom",
    "bl": "border-left",
    "br": "border-right",
    "rad": "border-radius",
    "bs": "border-spacing",

    'border-box': 'box-sizing=border-box',

    "c": "color",

    "tr": "display=table-row",
    "td": "display=table-cell",

    "p": "padding",
    "pt": "padding-top",
    "pb": "padding-bottom",
    "pl": "padding-left",
    "pr": "padding-right",

    "px": "font-size",

    /* transform */
    "origin": "transform-origin",

    /* text-transform */
    "capitalize": "text-transform=capitalize",
    "uppercase": "text-transform=uppercase",
    "lowercase": "text-transform=lowercase",
    "full-width": "text-transform=full-width",
    "full-size-kana": "text-transform=full-size-kana",

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

    /* background */
    "bg": "background-color",
    "bg-color": "background-color",
    "back": "background-color",

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

    /* table */
    /*
    "table-auto": "table-layout-auto",
    "table-fixed": "table-layout-fixed",
    */

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

    /* font spacing */
    "indent": "text-indent",
    "space": "letter-spacing",
    "line": "line-height",
    "word": "word-spacing",

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
if (typeof window !== 'undefined') { }
else if (typeof module !== 'undefined') {
    module.exports.shortHand = shortHand;
    module.exports.shorterHand = shorterHand;
    module.exports.globalMixins = globalMixins;
}