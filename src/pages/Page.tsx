import React, { useEffect, useState } from "react";

import { IconPicker } from "../components/IconPicker";
import { TextArea } from "../components/TextArea";
import { NewTool } from "../components/custom/Page/NewTool/NewTool";
import { DataBlocks } from "../interfaces/page";
import { Blocks } from "../components/custom/Page/Blocks";
import { Header } from "../components/custom/Page/Header";
import { usePage } from "../contexts/pageContext";
import { DndContext, MouseSensor, PointerSensor, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";

import { branch } from "../lib/skeleton.json";
import { SortableContext } from "@dnd-kit/sortable";

const twiconsPath = "/twicons/";

const blocks: DataBlocks[] = [
    {
        type: 'text',
        id: '123',
        orderY: 1,
        orderX: 1,
        row: 1,
        content: `
            <h1>Apple Computers</h1>
            <p><strong>Apple Inc.</strong> is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.</p>
        `,
    },
    {
        type: 'text',
        id: '124',
        orderY: 2,
        orderX: 1,
        row: 2,
        content: `
            <h2>Founding and Early History</h2>
            <p>Apple was founded by <strong>Steve Jobs</strong>, <strong>Steve Wozniak</strong>, and <strong>Ronald Wayne</strong> in April 1976 to develop and sell Wozniak's Apple I personal computer.</p>
            <p>The company was incorporated as Apple Computer, Inc., in January 1977, and sales of its computers, including the Apple II, grew quickly.</p>
        `,
    },
    {
        type: 'image',
        id: '125',
        data: {
            align: 'center',
        },
        orderX: 1,
        orderY: 3,
        row: 3,
        url: 'https://via.placeholder.com/400x200?text=Apple+I+Image',
    },
    {
        type: 'text',
        id: '126',
        orderY: 1,
        orderX: 1,
        row: 3,
        content: `
            <h3>Apple I</h3>
            <p>The Apple I, also known as the Apple-1, was the first product launched by Apple in 1976. Unlike modern computers, the Apple I was sold as a motherboard (with CPU, RAM, and basic textual-video chips) with no keyboard, monitor, or case.</p>
        `,
    },
    {
        type: 'text',
        id: '127',
        orderY: 2,
        orderX: 1,
        row: 3,
        content: `
            <h2>Apple's Growth in the 1980s</h2>
            <p>Following the success of the Apple II, Apple quickly became one of the most profitable companies in the world. The introduction of the Macintosh in 1984, with its iconic 1984 commercial directed by Ridley Scott, revolutionized personal computing.</p>
        `,
    },
    {
        type: 'text',
        id: '128',
        orderY: 1,
        orderX: 2,
        row: 3,
        content: `
            <div style="display: flex; justify-content: space-between;">
                <div style="flex: 1; margin-right: 10px;">
                    <h3>The Macintosh</h3>
                    <p>The original Macintosh was the first mass-market personal computer that featured a graphical user interface, built-in screen, and mouse. It was launched in January 1984.</p>
                </div>
                <div style="flex: 1; margin-right: 10px;">
                    <h3>Apple's First Logo</h3>
                    <p>The first logo of Apple was designed by Ronald Wayne and depicted Isaac Newton sitting under an apple tree. It was soon replaced by the more familiar rainbow-colored silhouette of an apple.</p>
                </div>
                <div style="flex: 1;">
                    <h3>Apple's Product Line Expansion</h3>
                    <p>Throughout the 1980s, Apple expanded its product line, introducing the Apple III, the Lisa, and the Macintosh Plus, each marking significant advancements in personal computing.</p>
                </div>
            </div>
        `,
    },
    {
        type: 'image',
        id: '129',
        data: {
            align: 'center',
        },
        orderX: 1,
        orderY: 1,
        row: 4,
        url: 'https://via.placeholder.com/400x200?text=Macintosh+Image',
    },
    {
        type: 'text',
        id: '130',
        orderY: 1,
        orderX: 1,
        row: 5,
        content: `
            <h2>The Return of Steve Jobs</h2>
            <p>In 1997, Steve Jobs returned to Apple after the company had been struggling. His return marked a significant turnaround for Apple, leading to the development of groundbreaking products like the iMac, iPod, iPhone, and iPad.</p>
        `,
    },
    {
        type: 'image',
        id: '189',
        orderY: 1,
        orderX: 2,
        row: 5,
        url: "https://igotoffer.com/apple/wp-content/uploads/2016/08/history-apple-1997-1998-first-imac.jpg"
    },
    {
        type: 'text',
        id: '987',
        orderY: 2,
        orderX: 2,
        row: 5,
        content: `Steve Jobs (1997-1998)`,
    },
    {
        type: 'image',
        id: '131',
        data: {
            align: 'right',
        },
        orderX: 1,
        orderY: 2,
        row: 9,
        url: 'https://via.placeholder.com/200x200?text=Steve+Jobs+Image',
    },
    {
        type: 'text',
        id: '132',
        orderY: 2,
        orderX: 1,
        row: 9,
        content: `
            <p><strong>The "Think Different" Campaign</strong> - One of Apple's most famous ad campaigns, launched in 1997, featured a series of print and TV ads that emphasized the creativity of people who "think different."</p>
        `,
    },
    {
        type: 'text',
        id: '133',
        orderY: 1,
        orderX: 1,
        row: 10,
        content: `
            <h2>Apple in the 21st Century</h2>
            <p>Under Jobs' leadership, Apple introduced the iPod in 2001, the iPhone in 2007, and the iPad in 2010, redefining consumer electronics and influencing how technology is used in everyday life.</p>
        `,
    },
    {
        type: 'image',
        id: '134',
        data: {
            align: 'center',
        },
        orderX: 1,
        orderY: 3,
        row: 11,
        url: 'https://via.placeholder.com/400x200?text=iPhone+Image',
    },
    {
        type: 'text',
        id: '135',
        orderY: 1,
        orderX: 1,
        row: 12,
        content: `
            <h3>Modern Apple Products</h3>
            <ul>
                <li><strong>iPhone:</strong> A revolutionary smartphone that combines a phone, iPod, and internet communicator.</li>
                <li><strong>iPad:</strong> A tablet computer that has become a major tool for business, education, and personal use.</li>
                <li><strong>MacBook:</strong> Apple's line of laptop computers, known for their sleek design and powerful performance.</li>
                <li><strong>Apple Watch:</strong> A smartwatch that integrates with Apple's ecosystem of products.</li>
            </ul>
        `,
    },
    {
        type: 'image',
        id: '136',
        data: {
            align: 'center',
        },
        orderX: 1,
        orderY: 3,
        row: 13,
        url: 'https://via.placeholder.com/400x200?text=Apple+Watch+Image',
    },
    {
        type: 'text',
        id: '137',
        orderY: 1,
        orderX: 1,
        row: 14,
        content: `
            <h2>Conclusion</h2>
            <p>Apple's impact on technology and culture is undeniable. From its humble beginnings in a garage to becoming one of the most valuable companies in the world, Apple's products have changed the way people live, work, and play.</p>
        `,
    }
];


function Page() {

    const {
        currentPage,
        setPageData,
        setBranch,
        setMembers,
        titleVisible,
        // setTitleVisible
    } = usePage();

    const { title, data: { icon } } = currentPage;

    const [loading, setLoading] = useState<boolean>(true);

    const sensors = useSensors(
        useSensor(MouseSensor), 
        useSensor(PointerSensor)
    );

    const generateSortableItems = (blocks) => {
        return blocks.map((block) => {
          const rowIndex = block.row - 1;
          const colIndex = block.orderX - 1;
          const blockIndex = block.orderY - 1;
          const blockId = block.id;
          return `${rowIndex}-${colIndex}-${blockIndex}-${blockId}`;
        });
      };

    useEffect(() => {
        document.title = title || "Sem título";
        if (icon !== '') {
            let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
            // link.href = pageData.data.icon;
            link.href = `${twiconsPath}/${icon}.svg`;
        }
    }, [currentPage]);

    useEffect(() => {
        if (loading) {
            setBranch(branch);
            setPageData(branch[0])
            setMembers([
                { name: "Helder Martins", icon: "cervo", email: "helder@gmail.com" },
                { name: "Gabriel Nogueira", icon: "gorila", email: "nogs@gmail.com" },
                { name: "Augusto Kawashima", icon: "panda", email: "gutin@hotmail.com" }
            ])
            // if (titleVisible === true) setTitleVisible(false)
            setLoading(false)
        }
    }, [loading])

    return (
        <React.Fragment>
            <Header />
            {titleVisible && <div className="px-4 flex items-center gap-x-3 my-3">
                {icon && <IconPicker
                    icon={icon}
                    setIcon={(icon) => {
                        setPageData({
                            data: {
                                icon: icon as string
                            }
                        })
                    }}
                    size={42}
                    classNames={"p-1 rounded-md text-2xl hover:bg-light-300 dark:hover:bg-dark-700 flex items-center justify-center cursor-pointer"}
                    hide={!icon}
                />}

                <TextArea
                    value={currentPage.title}
                    placeholder={"Sem título"}
                    handle={(title) => setPageData({ title })}
                    classNames="!w-[calc(100%-48px)] text-4xl font-bold break-words !px-0"
                    outlineDisabled
                />
            </div>}

            <main>
                <DndContext 
                    sensors={sensors} 
                    collisionDetection={rectIntersection}
                    onDragEnd={({ active, over }) => console.log(active.id, over?.id)}
                >
                    <SortableContext items={generateSortableItems(blocks)}>
                        <Blocks blocks={blocks} />
                    </SortableContext>
                </DndContext>
            </main>

            <NewTool />
        </React.Fragment>
    )
}

export default Page;