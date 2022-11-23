const cssVars = {
    "box": "box-sizing=border-box",
    "red": "color-933",
    "orange": "color-B65B0C",
    "pink": "color-C83B82",
    "blue": "color-384EF4",
    "black": "color-000",
    "family": "font-family-Helvetica",
    "css": '<span know="[go]">CSS</span>',
    "html": '<span know="[go]">HTML</span>',
    "knowcss": '<a href="https://github.com/knowcss/knowcss" rel="noreferrer" target="_blank" know="nounderline"><span know="[no]">KnowCSS</span></a>'
};
const mixins = {
    "hamburger": [
    	"centered",
    	">span{bg-$1 block w-33px h-4px mb-5px relative br-3px origin-4px/0px}",
    	"first-child>span{origin-0%/0%}",
    	"last-child>span{origin-0%/100%}"
    ],
    /*
    <div know="hamburger-anycolor">
        <span></span>
        <span></span>
        <span></span>
    </div>
    */

    "sm": "block font-size-13px color-b65b0c",
    "bi": "font-size-48px margin-3px color-333 margin-left-10px all{color-333} width-48px height-55px",
    "no": "color-2D862D font-weight-400",
    "nt": "color-000 font-weight-400 line-height-20px",
    "go": "color-339 font-weight-400",
    "hd": "font-size-32px normal!", //aligncenter
    "mt": "margin-10px/0 margin-top-10px-! full",
    "mx": "center",
    "ft": "font-size-16px",
    "hr": "border-top-3px/solid/#f3f3f3 center",
    "hb": "border-bottom-3px/solid/#f3f3f3 center",
    "bx": "padding-25px/5px {{$box}}",
    "hx": "margin-20px/auto/10px/auto padding-0",
    "ic": "padding-5px/5px all{color-666}",
    "na": "hover>a{color-933}",
    "ni": "hover>i{color-933} min-width-48px min-height-55px display=inline-block",
    "nv": "color-666 font-size-18px nounderline",
    "ys": "aligncenter center",
    "ml": "padding-left-20px",
    "mm": "padding-left-40px",
    "cd": "cell center text-align-left border-1px/solid/#eee border-radius-6px background-color-fefefe padding-10px",
    "ct": "table center aligncenter margin-top-10px max-width-96%",
    "bn": "inline-block border-radius-10px padding-5px/10px margin-5px font-size-18px white-space-nowrap",
    "blue": "{{$blue}}",
    "orange": "{{$orange}}",
    "pink": "{{$pink}}",
    "red": "{{$red}}",
    "black": "{{$black}}",
    "space": "margin-bottom-2px",
    "bw": "table-row padding-left-10px padding-bottom all>span{table-cell vertical-align-middle text-align-left padding-right-1px}",
    "bc": "width-16px height-16px max-width-16px max-height-16px border-1px/solid/black",
    "bd": "color-666 padding-left-4px",
    "code": "inline-block border-1px/solid/#eee background-color-fefefe font-size-14px margin-2px/0px padding-0px/4px"
};

const knowHowValues = {
    "media": {
        /* deprecated */
        /*
        "device-width": "480px",
        "device-height": "480px",
        "device-aspect-ratio": "16/9",
        "min-device-aspect-ratio": "16/9",
        */

        /* mouse */
        "any-hover": ["none", "hover"],
        "hover": ["none", "hover"],
        "any-pointer": ["none", "coarse", "fine"],
        "pointer": ["none", "coarse", "fine"],

        /* screen size */
        "min-width": "480px",
        "max-width": "480px",
        "width": "480px",
        "min-height": "480px",
        "max-height": "480px",
        "height": "480px",
        "orientation": ["landscape", "portrait"],
        "min-aspect-ratio": "1/1",
        "max-aspect-ratio": "1/1",
        "aspect-ratio": "1/1",

        /* colors */
        "color-gamut": ["srgb", "p3", "rec2020"],
        "min-color-index": "256",
        "min-color": "256",
        "max-color-index": "256",
        "max-color": "256",
        "color-index": "256",
        "forced-colors": ["none", "active"],
        "inverted-colors": ["none", "inverted"],
        "color": "",
        "max-monochrome": ["", "0"],
        "min-monochrome": ["", "0"],
        "monochrome": ["", "0"],

        /* monitor */
        "display-mode": ["fullscreen", "standalone", "minimal-ui", "browser", "window-controls-overlay"],
        "dynamic-range": ["standard", "high"],
        "scan": ["interlace", "progressive"],
        "update": ["none", "slow", "fast"],
        "light-level": ["normal", "dim", "washed"],
        "video-dynamic-range": ["standard", "high"],
        "max-resolution": ["150dpi", "72dpi", "300dpi"],
        "min-resolution": ["150dpi", "72dpi", "300dpi"],
        "resolution": ["150dpi", "72dpi", "300dpi"],

        /* accessibility */
        "prefers-color-scheme": ["light", "dark"],
        "prefers-contrast": ["no-preference", "more", "less", "custom"],
        "prefers-reduced-motion": ["no-preference", "reduce"],

        /* misc */
        "grid": ["0", "1"],
        "overflow-block": ["none", "scroll", "optional-paged", "paged"],
        "overflow-inline": ["none", "scroll"],
        "scripting": ["none", "initial-only", "enabled"]
    }
};