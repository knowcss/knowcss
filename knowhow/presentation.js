const knowHowConfig = {
    "display": [
        {
            "head": "Display",
            "list": [
                ["display-inline-block", "explicit value"],
                ["inline-block", "alias"],
                ["d-inline-block", "shorthand"]
            ],
            "reference": {
                "head": "Variations:",
                "short": "d",
                "list": {
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
                    "table": "display=table",
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
                    "grid": "display=grid"
                }
            }
        }
    ],

    "visibility": [
        {
            "head": "Visibility",
            "list": [
                ["visibility-visible", "block visibility explicit value"],
                ["visible", "block visibility alias"],
                ["v-visible", "block visibility shorthand"]
            ],
            "reference": {
                "head": "Variations:",
                "short": "v",
                "reverts": true,
                "list": {
                    "collapse": "visibility-collapse",
                    "hidden": "visibility-hidden",
                    "visible": "visibility-visible",
                    // Add non-shorthand versions if reverts=true
                    /*
                    "inherit": "visibility-inherit",
                    "initial": "visibility-initial",
                    "revert": "visibility-revert",
                    "unset": "visibility-unset"
                    */
                }
            }
        }
    ],

    "position": [
        {
            "head": "Position",
            "list": [
                ["position-relative", "explicit value"],
                ["relative", "alias"],
                ["pos-relative", "shorthand"]
            ],
            "reference": {
                "head": "Variations:",
                "short": "pos",
                "list": {
                    "static": "position-static",
                    "absolute": "position-absolute",
                    "fixed": "position-fixed",
                    "relative": "position-relative",
                    "sticky": "position-sticky"
                }
            }
        }
    ],

    "alignment": [
        {
            "head": "Alignment",
            "list": [
                ["text-align-center", "explicit value"],
                ["aligncenter", "alias"]
            ],
            "reference": {
                "head": "Variations:",
                "list": {
                    "center": "margin-0/auto",
                    "aligncenter": "text-align-center",
                    "alignleft": "text-align-left",
                    "alignright": "text-align-right",
                    "aligntop": "vertical-align-top",
                    "alignmiddle": "vertical-align-middle",
                    "alignbottom": "vertical-align-bottom"
                }
            }
        }
    ]


};