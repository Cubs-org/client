import { DataBlocks } from '../types/page'

export const initialBlocks: DataBlocks[] = [
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
        id: '456',
        orderY: 1,
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
        id: '789',
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
        id: '101112',
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
        id: '131415',
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
        id: '161718',
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
        id: '192021',
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
        id: '222324',
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
        id: '252627',
        orderY: 1,
        orderX: 2,
        row: 5,
        url: 'https://igotoffer.com/apple/wp-content/uploads/2016/08/history-apple-1997-1998-first-imac.jpg',
    },
    {
        type: 'text',
        id: '343536',
        orderY: 2,
        orderX: 1,
        row: 5,
        content: `
            <p><strong>The "Think Different" Campaign</strong> - One of Apple's most famous ad campaigns, launched in 1997, featured a series of print and TV ads that emphasized the creativity of people who "think different."</p>
        `,
    },
    {
        type: 'text',
        id: '282930',
        orderY: 2,
        orderX: 2,
        row: 5,
        content: `Steve Jobs (1997-1998)`,
    },
    {
        type: 'image',
        id: '313233',
        data: {
            align: 'right',
        },
        orderX: 1,
        orderY: 1,
        row: 6,
        url: 'https://via.placeholder.com/200x200?text=Steve+Jobs+Image',
    },
    {
        type: 'text',
        id: '373839',
        orderY: 1,
        orderX: 1,
        row: 7,
        content: `
            <h2>Apple in the 21st Century</h2>
            <p>Under Jobs' leadership, Apple introduced the iPod in 2001, the iPhone in 2007, and the iPad in 2010, redefining consumer electronics and influencing how technology is used in everyday life.</p>
        `,
    },
    {
        type: 'image',
        id: '404142',
        data: {
            align: 'left',
            width: 50,
        },
        orderX: 1,
        orderY: 1,
        row: 8,
        url: 'https://via.placeholder.com/400x200?text=iPhone+Image',
    },
    {
        type: 'text',
        id: '434445',
        orderY: 1,
        orderX: 2,
        row: 8,
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
        id: '464748',
        data: {
            align: 'center',
        },
        orderX: 1,
        orderY: 1,
        row: 9,
        url: 'https://via.placeholder.com/400x200?text=Apple+Watch+Image',
    },
    {
        type: 'text',
        id: '495051',
        orderY: 1,
        orderX: 1,
        row: 10,
        content: `
            <p>lorem ipsum dolor color imet</p>
        `,
    },
    {
        type: 'text',
        id: '525354',
        orderY: 1,
        orderX: 1,
        row: 11,
        content: `
            <h2>Conclusion</h2>
            <p>Apple's impact on technology and culture is undeniable. From its humble beginnings in a garage to becoming one of the most valuable companies in the world, Apple's products have changed the way people live, work, and play.</p>
        `,
    },
]
