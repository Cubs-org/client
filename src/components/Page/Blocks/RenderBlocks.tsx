import { types } from "./CustomBlocks";

export const RenderBlocks = ({ type, ...props }) => {
    const Component = types[type];

    return Component ? <Component {...props} /> : null;
};