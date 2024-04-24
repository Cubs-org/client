import clsx from "clsx";
import { DataTools } from "../../../interfaces/page";

interface ToolsProps {
    tools: DataTools[];
  }
  
  /**
   * Tools
   * Tool
   * renderTool
   */
  
  const Title = (props) => {
    const { data } = props.data;
    return <h1 className='font-bold text-3xl'>{data.content}</h1>;
  };

  const Subtitle = (props) => {
    const { data } = props.data;
    return <h1 className='font-bold text-2xl'>{data.content}</h1>;
  };
  
  const Text = (props) => {
    const { data } = props.data;
    return <p>{data.content}</p>;
  };
  
  const Image = (props) => {
    const { data } = props.data;
    return (
      <img
        className="rounded-md resize"
        src={data.content}
        alt={data.content}
      />
    );
  };
  
  const types = {
    text: Text,
    image: Image,
    title: Title,
    subtitle: Subtitle,
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
          <div key={`row-${rowIndex}`} className="flex my-1">
            {row.map((tool, toolIndex) => (
              <div
                key={`tool-${rowIndex}-${toolIndex}`}
                className={clsx('w-full flex items-start gap-3 px-0.5 py-1 rounded-md hover:bg-light-300 group', {
                  'justify-start text-left': tool.data.align === 'left',
                  'justify-end text-right': tool.data.align === 'right',
                  'justify-center text-center col-span-2': tool.data.align === 'center',
                })}
                style={{
                    minWidth: `${tool.data.width}%`,
                    width: `${tool.data.width}%`
                }}
              >
                <span
                    className="w-6 h-6 opacity-0 cursor-grab grid place-content-center rounded-md bg-light-200 text-light-800 text-xs font-bold group-hover:opacity-100"
                >#</span>
                <div className="w-full relative">
                    <RenderTool type={tool.type} data={tool} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </>
    );
  
  };