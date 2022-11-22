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
        "aspect-ratio": "3/2",

        /* colors */
        "color-gamut": "srgb",
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

const knowHowConfig = {

    "actions": [
        {
            "head": "Actions",
            "apply": true,
            "possible": "actions",
            "list": [
                ["$1{color-orange}", "$1", "a", 'a href="http://www.knowcss.com/"']
            ]
        }
    ],

    "modifiers": [
        {
            "head": "Modifiers",
            "apply": true,
            "possible": "modifiers",
            "list": [
                ["$1{color-orange}", "$1", "a", 'a href="http://www.knowcss.com/"']
            ]
        }
    ],

    "selectors": [
        {
            "head": "Selectors",
            "apply": true,
            "possible": "selectors",
            "list": [
                ["$1{color-orange}", "$1", "a", 'a href="http://www.knowcss.com/"']
            ]
        }
    ],

    "media": [
        {
            "head": "Media Queries",
            "apply": true,
            "possible": "media",
            "list": [
                ["media-$1{color-orange}", "$1", "a", 'a href="http://www.knowcss.com/"'],
                //["media-not-$1{color-orange}", "$1", "a", 'a href="http://www.knowcss.com/"'],
                //["media-only-$1{color-orange}", "$1", "a", 'a href="http://www.knowcss.com/"']
            ]
        }
    ]
};