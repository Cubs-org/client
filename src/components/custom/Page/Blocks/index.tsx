import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { DataBlocks } from "../../../../interfaces/page";
import { DropIndicator } from "./DropIndicator";
import { DropRow } from "./DropRow";
import clsx from "clsx";

interface BlockProps {
  blocks: DataBlocks[];
};

export const Blocks = ({ blocks }: BlockProps) => {
  const {
    setNodeRef: setRowLastRef,
    isOver: isRowLastOver,
  } = useDroppable({ id: "row-last" });

  const groupedBlocks = blocks.reduce((acc, cur) => {
    const rowIndex = cur.row - 1;
    const colIndex = cur.orderX - 1;
    const blockIndex = cur.orderY - 1;

    if (!acc[rowIndex]) acc[rowIndex] = [] as DataBlocks[][];
    if (!acc[rowIndex][colIndex]) acc[rowIndex][colIndex] = [] as DataBlocks[];
    if (!acc[rowIndex][colIndex][blockIndex]) acc[rowIndex][colIndex][blockIndex] = {} as DataBlocks;

    acc[rowIndex][colIndex][blockIndex] = cur as DataBlocks;

    return acc;
  }, [] as DataBlocks[][][]);

  return (
    <div className="flex flex-col gap-2 group/row">
      <DragOverlay>
        <span className="bg-red-500 text-white p-3 rounded-md">
          :Block:
        </span>
      </DragOverlay>
      {groupedBlocks.map((row, _r) => (
        <DropRow key={_r} row={row} rowIndex={_r} />
      ))}
      <DropIndicator classNames={clsx("w-full h-1 bg-purple-500 mt-1 opacity-0", {
        "opacity-0": !isRowLastOver,
        "opacity-100": isRowLastOver,
      })} ref={setRowLastRef} />
    </div>
  );
};
