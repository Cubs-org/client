import { DataBlocks } from "../../../interfaces/page";
import { moveRow } from "./moveRow";

export type BlockAction = {
    type: 'ADD' | 'REMOVE' | 'UPDATE' | 'MOVEROW' | 'MOVECOL' | 'MOVEBLOCK'
    payload: any
}

export const blockReducer = (state: DataBlocks[], action: BlockAction) => {
    const { type, payload } = action;

    const actions = {
        ADD: () => state,
        // REMOVE: () => state,
        // UPDATE: () => state,
        MOVEROW: () => {
            const { id, targetRow } = payload;
            const updatedBlocks = moveRow(id, targetRow, state);
            console.log('updatedBlocks', updatedBlocks);
            return updatedBlocks;
        },
        // MOVECOL: () => state,
        // MOVEBLOCK: () => state
    };

    return actions[type]();
}