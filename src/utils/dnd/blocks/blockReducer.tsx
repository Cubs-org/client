import { DataBlocks } from "../../../types/page";
import { moveRow } from "./moveRow";

type HandleKey = 'LOAD' | 'ADD' | 'REMOVE' | 'UPDATE' | 'MOVEROW' | 'MOVECOL' | 'MOVEBLOCK'
type HandlerFunction = () => any

export type BlockAction = {
    type: HandleKey
    payload: any
}

export const blockReducer = (state: DataBlocks[][][], action: BlockAction) => {
    const { type, payload } = action;

    const actions: Record<HandleKey, HandlerFunction> = {
        LOAD: () => payload.data,
        ADD: () => state,
        REMOVE: () => state,
        UPDATE: () => state,
        MOVEROW: () => {
            const { id, targetRow } = payload;
            const updatedBlocks = moveRow(id, targetRow, state);
            return updatedBlocks;
        },
        MOVECOL: () => state,
        MOVEBLOCK: () => state
    };

    return actions[type]();
}