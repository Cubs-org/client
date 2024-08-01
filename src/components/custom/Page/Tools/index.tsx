import clsx from "clsx";
import { DataTools } from "../../../../interfaces/page";
import { Editor } from "../../TextEditor";
import { LuGripVertical } from "react-icons/lu";

interface ToolsProps {
  tools: DataTools[];
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

const RenderTool = ({ type, ...props }) => {
  const Component = types[type];

  return Component ? <Component {...props} /> : null;
};

export const Tools = ({ tools }: ToolsProps) => {

  const groupedTools: DataTools[][] = [];
  tools.forEach(tool => {
    const rowIndex = tool.data.y - 1; // Ajustar para índice base 0
    if (!groupedTools[rowIndex]) {
      groupedTools[rowIndex] = [];
    }
    groupedTools[rowIndex].push(tool);
  });

  // Ordenar as ferramentas em cada linha com base na coordenada x
  groupedTools.forEach(row => {
    row.sort((a, b) => (a.data?.x ?? 0) - (b.data?.x ?? 0));
  });

  return (
    <>
      {groupedTools.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex items-start gap-0.5">
          {row.map((tool, toolIndex) => (
            <div
              key={`tool-${rowIndex}-${toolIndex}`}
              className={clsx('max-w-full w-full h-fit p-1 flex items-start rounded-md hover:bg-light-200 dark:hover:bg-dark-800 group', {
                'justify-start text-left': tool.data.align === 'left',
                'justify-end text-right': tool.data.align === 'right',
                'justify-center text-center col-span-2': tool.data.align === 'center',
              })}
              style={{
                minWidth: `${tool.data.width}%`,
                width: `${tool.data.width}%`
              }}
            >
              {/* <span
                className="w-6 h-6 opacity-0 cursor-grab grid place-content-center rounded-md bg-light-200 text-light-800 text-xs font-bold group-hover:opacity-100"
              >#</span> */}
              <LuGripVertical size={24} className="opacity-0 cursor-grab rounded-md hover:bg-light-200 text-light-900 dark:bg-dark-800 dark:text-dark-100 text-xs font-bold group-hover:opacity-100"/>
              <div className="w-full relative">
                <RenderTool {...tool} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );

};