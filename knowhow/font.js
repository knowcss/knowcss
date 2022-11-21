const knowHowConfig = {
    "font-family": [
        {
            "head": "Font Family",
            "list": [
                ["font-family-Geneva", "explicit value"],
                ["family-Verdana", "alias"],
                ["f-Arial", "shorthand"]
            ]
        }
    ],

    "font-size": [
        {
            "head": "Font Size",
            "desc": "For font-size values, you may set a raw integer/number/float value which will automatically be convered to the expected px and rem sizes.",
            "more": "The 3 variations below will generate: {font-size: 16px; font-size: 1rem!important}",
            "list": [
                ["font-size-16px", "explicit value"],
                ["px-16px", "alias"],
                ["16", "shorthand"]
            ]
        }
    ],

    "font-weight": [
        {
            "head": "Font Weight",
            "list": [
                ["font-weight-300", "explicit value"],
                ["light", "alias"],
                ["fw-300", "shorthand"]
            ],
            "reference": {
                "head": "Variations:",
                "short": "fw",
                "apply": true,
                "list": {
                    "thin": "font-weight-100",
                    "extralight": "font-weight-200",
                    "light": "font-weight-300",
                    "normal": "font-weight-400",
                    "medium": "font-weight-500",
                    "semibold": "font-weight-600",
                    "bold": "font-weight-700",
                    "extrabold": "font-weight-800"
                }
            }
        }
    ]
};