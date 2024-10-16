import { useState } from "react";
import { initialBlocks } from "../lib/initialBlocks";
import { GroupedBlocks } from "../components/Page/Blocks";

function Test() {

    const [blocks, _] = useState(initialBlocks);

    return (
        <div className="w-full md:w-4/5 lg:w-4/6 m-auto">
            <h1 className="my-3 font-extrabold text-4xl px-4">Untitled</h1>
            <GroupedBlocks blocks={blocks} />
        </div>
    )
}

export default Test;