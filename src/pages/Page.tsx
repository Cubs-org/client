import { Page as Pg } from "../components/Page/Content";

function Page() {

    const branch_pages = [
        {
            id:"1",
            title:"A História da Segunda Guerra Mundial",
            icon: "📄"
        },
        {
            id:"2",
            title:"1945",
            icon: "📄"
        },
        {
            id:"3",
            title:"Hitler",
            icon: "📄"
        },
        {
            id:"4",
            title:"Alemanha",
            icon: "📄"
        }
    ];

    const members = [
        {name:"Helder Martins", icon:"cervo", email:"helder@gmail.com"},
        {name:"Gabriel Nogueira", icon:"gorila", email:"nogs@gmail.com"},
        {name:"Augusto Kawashima", icon:"panda", email:"gutin@hotmail.com"}
    ];

    return (
        <div>
            <Pg.Header 
                branch={branch_pages}
                members={members}
            />
        </div>
    )
}

export default Page;