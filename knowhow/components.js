const components = {

    // JAA TODO - add shorthand for flex-direction, justify-content, align-content, align-items, place-items

    "fill-block": [
        "relative",
        "+child{absolute t-50% l-50% translate=-50%_-50% aligncenter}"
    ],
    "fill-rows": [
        "display-flex flex-direction-column justify-content-center align-content-center align-items-center",
        "+child{display-flex justify-content-center align-content-center align-items-center flex-1}"
    ],
    "fill-cols": [
        "display-flex flex-direction-row justify-content-center align-content-center align-items-center",
        "+child{display-flex justify-content-center align-content-center align-items-center flex-1}"
    ],
    "fill-grid": [
        "grid place-items-center grid-auto-flow-column"
    ],
    "fill-table": [
        "table",
        "+child{cell alignmiddle aligncenter}"
    ],
    "fill-inline": [
        "aligncenter",
        "+child{aligncenter}"
    ],
    "fill-img": [
        "block full"
    ],

    "tlbr": ["top-$1 left-$1 bottom-$3 right-$4"],
    "sq": ["top-$1 left-$1 bottom-$3 right-$4 width-$5 height-$6"],
    "wh": ["width-$1 height-$2"],
    "hw": ["height-$1 width-$2"],
    "body": ["attr{bgcolor-$1 text-$2 link-$3 alink-$4 vlink-$5}"],

    "hamburger": [
        "none hidden position-relative xsmdown{visible block}",
        "center aligncenter w-32px h-32px overflow-hidden pt-3px",
        "pointer nohighlight",
        "hover>span{bg-933}",
        ">input{block w-32px h-32px mw-32px mh-32px absolute top=-4px left=-4px cursor-pointer opacity-0 z-index-2}",
        ">span{bg-$1 block w-32px h-4px mb-5px relative br-3px transition=all/.4s/ease-in-out}",
        "first-child>span{origin-0%/0%}",
        "last-child>span{origin-0%/100%}"
    ],
    "toggle-hamburger": [
        "checked~span-nth-last-child-1{transform=rotate(-45deg) translate=-3px/-13px! relative background-933 origin=66.6666%/0}",
        "checked~span-nth-last-child-2{opacity-0}",
        "checked~span-nth-last-child-3{transform=rotate(45deg) translate=0px/13px! relative background-933 origin=66.6666%/0%}",
    ]
}