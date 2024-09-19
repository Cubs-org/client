import { DragOverlay } from "@dnd-kit/core";
import { DataBlocks } from "../../../../interfaces/page";
import { Editor } from "../../TextEditor";
import { DropIndicator } from "./DropIndicator";
import { DropCol } from "./DropCol";

interface BlockProps {
  blocks: DataBlocks[];
}

const Image = (props) => {
  const { url } = props;
  return (
    <img
      className="rounded-md resize"
      src={url}
      alt={url}
    />
  );
};

const types = {
  text: Editor,
  image: Image,
};

export const RenderRowBlocks = ({ type, ...props }) => {
  const Component = types[type];

  return Component ? <Component {...props} /> : null;
};

export const Blocks = ({ blocks }: BlockProps) => {
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
        <span className="bg-red-500 text-white p-3">
          :Block:
        </span>
      </DragOverlay>
      {groupedBlocks.map((row, _r) => (
        <div key={_r} className="flex flex-col flex-grow">
          <DropIndicator classNames="w-full h-1 bg-purple-500 mt-1" data-dropindicator={`row-${_r}`} />
          <div className="flex justify-between">
            {row.map((col, _c) => {
              const isCol = row.length > 1;
              return (
                <DropCol key={_c} isCol={isCol} rowIndex={_r} colIndex={_c} col={col} />
              );
            })}
            <DropIndicator classNames="min-w-[5px] bg-green-500 ml-1" data-dropindicator={`col-last`} />
          </div>
        </div>
      ))}
      <DropIndicator classNames="w-full h-1 bg-pink-500 mt-1" data-dropindicator={`row-last`} />
    </div>
  );
};
