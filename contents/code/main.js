// SPDX-License-Identifier: MPL-2.0

console.log("Meow!")
const s = JSON.stringify;

function chromeplace() {
    var wnds = workspace.stackingOrder

    const outputs = {};
    for (const [idx, wnd] of wnds.entries()) {
        if (wnd.resourceName != "chromium") {
            continue;
        };

        if (!(wnd.output.name in outputs)) {
            outputs[wnd.output.name] = [];
        };
        outputs[wnd.output.name].push(idx);
    };

    const rowN = 2;
    for (let wndlist in outputs) {
        wndlist = outputs[wndlist]
        let column = 0
        let row = 0

        const width = Math.ceil(wnds[wndlist[0]].output.geometry.width * rowN / wndlist.length)
        const height = Math.ceil(wnds[wndlist[0]].output.geometry.height / rowN);
        const start = wnds[wndlist[0]].output.geometry.x
        for (let wnd of wndlist) {

            var geometry = {
                "x": (width * column) + start, "y": height * row, width, height,
            };
            print(JSON.stringify({ geometry, row, column, width, height }))
            wnds[wnd].frameGeometry = geometry

            if (row >= (rowN - 1)) { column += 1; row = 0 } else { row++ }
        }
    }
}

let ret = registerShortcut("chromeplace", "", "Meta+Alt+C", chromeplace)
console.log(`registered shortcut! ${ret}`)

ret = registerUserActionsMenu(function (wnd) {
    if (wnd.resourceName != "chromium") {
        return;
    };
    return {
        text: "chromeplace",
        checkable: false,
        checked: false,
        triggered: chromeplace
    }
})
console.log(`registered menu! ${ret}`)