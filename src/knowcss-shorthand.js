const shorterHand = {
    "w": "width",
    "h": "height",
    "p": "padding",
    "px": "font-size",
    "d": "display",
    "v": "visibility",
    "pos": "position"
};

const globalMixins = {
    "h16": "margin-top-0 margin-bottom-0.5rem font-weight-500 line-height-1.2"
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

    "c": "color",

    "tr": "display=table-row",
    "td": "display=table-cell",

    "p": "padding",
    "pt": "padding-top",
    "pb": "padding-bottom",
    "pl": "padding-left",
    "pr": "padding-right",

    "px": "font-size",

    /* white-space */
    "nowrap": "white-space-nowrap",
    "pre": "white-space-pre",

    /* transform */
    "origin": "transform-origin",

    /* text style */
    "italic": "font-style-italic",
    "underline": "text-decoration-underline",
    "nounderline": "text-decoration-none",

    /* background */
    "bg": "background-color",
    "bg-color": "background-color",
    "back": "background-color",

    /* font-weight */
    "light": "font-weight-300",
    "normal": "font-weight-400",
    "medium": "font-weight-500",
    "semibold": "font-weight-600",
    "bold": "font-weight-700",

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
    "alias": "cursor-alias",
    "all-scroll": "cursor-all-scroll",
    "auto": "cursor-auto",
    "context-menu": "cursor-context-menu",
    "col-resize": "cursor-col-resize",
    "copy": "cursor-copy",
    "crosshair": "cursor-crosshair",
    "default": "cursor-default",
    "e-resize": "cursor-e-resize",
    "ew-resize": "cursor-ew-resize",
    "grab": "cursor-grab",
    "grabbing": "cursor-grabbing",
    "help": "cursor-help",
    "move": "cursor-move",
    "n-resize": "cursor-n-resize",
    "ne-resize": "cursor-ne-resize",
    "nesw-resize": "cursor-nesw-resize",
    "ns-resize": "cursor-ns-resize",
    "nw-resize": "cursor-nw-resize",
    "nwse-resize": "cursor-nwse-resize",
    "no-drop": "cursor-no-drop",
    "not-allowed": "cursor-not-allowed",
    "pointer": "cursor-pointer",
    "progress": "cursor-progress",
    "row-resize": "cursor-row-resize",
    "s-resize": "cursor-s-resize",
    "se-resize": "cursor-se-resize",
    "sw-resize": "cursor-sw-resize",
    "text": "cursor-text",
    "w-resize": "cursor-w-resize",
    "wait": "cursor-wait",
    "zoom-in": "cursor-zoom-in",
    "zoom-out": "cursor-zoom-out",

    /* object-cover */
    "fill": "object-cover-fill",
    "contain": "object-cover--contain",
    "cover": "object-cover-cover",
    "scale-down": "object-cover=scale-down",
    "scale": "object-cover=scale-down"
};
if (typeof window !== 'undefined') { }
else if (typeof module !== 'undefined') {
	module.exports.shortHand = shortHand;
	module.exports.shorterHand = shorterHand;
    module.exports.globalMixins = globalMixins;
}