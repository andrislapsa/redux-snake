import * as consts from "./config";

export function enabledRenderers() {
    let renderers = ["webgl", "text"];

    if (consts.RENDERING === "both" || renderers.indexOf(consts.RENDERING) === -1) {
        return renderers;
    }

    return [ consts.RENDERING ];
}

export function isRendererEnabled(renderer) {
    return enabledRenderers().indexOf(renderer) !== -1;
}
