import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { DataBlocks } from "../../../../types/page";
import { DropIndicator } from "./DropIndicator";
import { DropRow } from "./DropRow";
import clsx from "clsx";

interface BlockProps {
  blocks: DataBlocks[][][];
};

export const Blocks = ({ blocks }: BlockProps) => {

  // const [blocks, setBlocks] = useState<GroupedBlocks>([]);

  const {
    setNodeRef: setRowLastRef,
    isOver: isRowLastOver,
  } = useDroppable({ id: `row-${blocks.length + 1}` });

  // useEffect(() => {
  //   console.log('>> ', data)
  //   setBlocks([...data]);
  // }, [data])

  return (
    <div className="flex flex-col gap-2 group/row">
      <DragOverlay>
        <span className="bg-red-500 text-white p-3 rounded-md">
          :Block:
        </span>
      </DragOverlay>
      {(blocks ?? []).map((row, _r) => (
        <DropRow key={_r} row={row} rowIndex={_r} />
      ))}
      <DropIndicator classNames={clsx("w-full h-1 bg-purple-500 opacity-0", {
        "opacity-0": !isRowLastOver,
        "opacity-100": isRowLastOver,
      })} ref={setRowLastRef} />
    </div>
  );
};
