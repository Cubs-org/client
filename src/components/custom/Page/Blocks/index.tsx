import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { DataBlocks } from "../../../../interfaces/page";
import { DropIndicator } from "./DropIndicator";
import { DropRow } from "./DropRow";
import clsx from "clsx";
import createGroupedBlocks from "../../../../utils/dnd/blocks/createGroupedBlocks";
import { useEffect, useState } from "react";

interface BlockProps {
  blocks: DataBlocks[];
};

export const Blocks = ({ blocks }: BlockProps) => {
  const {
    setNodeRef: setRowLastRef,
    isOver: isRowLastOver,
  } = useDroppable({ id: `row-${blocks.length + 1}` });

  const [groupedBlocks, setGroupedBlocks] = useState<DataBlocks[][][] | null>(null);

  useEffect(() => {
    setGroupedBlocks(createGroupedBlocks(blocks)); // Define o estado com a cópia profunda
  }, [blocks]);

  return (
    <div className="flex flex-col gap-2 group/row">
      <DragOverlay>
        <span className="bg-red-500 text-white p-3 rounded-md">
          :Block:
        </span>
      </DragOverlay>
      {(groupedBlocks ?? []).map((row, _r) => (
        <DropRow key={_r} row={row} rowIndex={_r} />
      ))}
      <DropIndicator classNames={clsx("w-full h-1 bg-purple-500 opacity-0", {
        "opacity-0": !isRowLastOver,
        "opacity-100": isRowLastOver,
      })} ref={setRowLastRef} />
    </div>
  );
};
