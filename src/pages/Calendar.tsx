import { useModal } from "../contexts/modalContext";
import { CreateNewItem } from "../components/Calendar/CreateNewItem";
import { Calendar } from "../components/Calendar";
import { 
  // useContext, 
  useEffect, 
  useState 
} from "react";
import { useUser } from "../contexts/userContext";
import Loading from "../components/Loading";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../lib/api";

const socket = io(SOCKET_URL);

export default function CalendarPage() {

  const { user: {data: { email }} } = useUser();

  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.connect();
    socket.emit("getCalendarItems", { email: email});
    socket.on("updateItems", (received_items) => loadItems(received_items));

    setLoading(false);

    return () => {
      socket.off("getCalendarItems");
      socket.off("updateItems");
    }
  }, [loading, email]);

  useEffect(() => {
    socket.connect();

    socket.on("updateCalendarItems", (req) => {
      updateItems(req);
    });

    return () => {
      socket.off("updateCalendarItems");
    }
  }, []);
  
  //   // {
  //   //   title: "Projeto Cub's",
  //   //   owner: "",
  //   //   properties: [
  //   //     { id: "", name: "Descrição", type: "text", data: { value: "Reunião com o cliente para discutir sobre o novo projeto" } },
  //   //     { id: "", name: "Data", type: "datetime", data: { start: "2024-01-25 00:00:00.000", end: "2024-02-25 23:59:00.000" } },
  //   //     { id: "", name: "event", type: "calendar", data: { color: "yellow" } },
  //   //     { id: "", name: "status", type: "checkbox", data: { value: true} },
  //   //   ],
  //   //   createdAt: "2024-01-25 10:30:00.000",
  //   //   updatedAt: "2024-02-05 08:45:00.000",
  //   // },
  //   // {
  //   //   title: "Projeto Cub's (2)",
  //   //   owner: "",
  //   //   properties: [
  //   //     { id: "", name: "Descrição", type: "text", data: { value: "Reunião com o cliente para discutir sobre o novo projeto" } },
  //   //     { id: "", name: "Data", type: "datetime", data: { start: "2024-01-25 00:00:00.000", end: "2024-02-25 23:59:00.000" } },
  //   //     { id: "", name: "task", type: "calendar", data: { color: "pink" } },
  //   //     { id: "", name: "status", type: "checkbox", data: { value: true} },
  //   //   ],
  //   //   createdAt: "2024-01-25 10:30:00.001",
  //   //   updatedAt: "2024-02-05 08:45:00.000",
  //   // },
  // ];  

  // const items:any = [
  //   {
  //     title: "@Hoje",
  //     owner: "",
  //     properties: [
  //       { id: "", name: "Treinar", type: "checkbox", data: { loadOrder: 0, value: true } },
  //       { id: "", name: "Estudar e meditar", type: "checkbox", data: { loadOrder: 1, value: true } },
  //       { id: "", name: "Tomar 2l de água", type: "checkbox", data: { loadOrder: 2, value: true } },
  //       { id: "", name: "Data", type: "datetime", data: { loadOrder: 3, start: "2024-02-01 00:00:00.000", end: "2024-02-01 23:59:00.000" } }
  //     ],
  //     createdAt: "2024-01-25 10:30:00.001",
  //     updatedAt: "2024-02-16 08:45:00.001",
  //   },
  //   {
  //     title: "Rec. ref. Salário",
  //     owner: "",
  //     properties: [
  //       { id: "", name: "Data", type: "datetime", data: { start: "2024-02-29 00:00:00.001", end: "2024-03-02 23:59:00.000" } },
  //       { id: "", name: "Categoria", type: "select", data: {
  //         items: [
  //           { name: "Salário", color: "green" },
  //           { name: "Aluguel", color: "yellow" },
  //           { name: "Luz", color: "blue" },
  //           { name: "Água", color: "orange" }
  //         ],
  //         value: "Salário"
  //       } },
  //       { id: "", name: "Categoria (1)", type: "select", data: {
  //         items: [
  //           { name: "Salário", color: "green" },
  //           { name: "Aluguel", color: "yellow" },
  //           { name: "Luz", color: "blue" },
  //           { name: "Água", color: "orange" }
  //         ],
  //         value: "Luz"
  //       } },
  //       { id: "", name: "Preview", type: "formula", data: { 
  //         value: "(['cama', 'sofa', 'cadeira'].includes('sofa'))?'text=+ R$10.000,00;color=green':'text=- R$10.000,00;color=red'" } },
  //       { id: "", name: "Recebido", type: "checkbox", data: { value: true } },
        
  //     ],
  //     createdAt: "2024-02-18 10:30:00.002",
  //     updatedAt: "2024-03-05 08:45:00.001",
  //   },
  //   {
  //     title: "Rec. ref. Vovó",
  //     owner: "",
  //     properties: [
  //       { id: "", name: "Data", type: "datetime", data: { start: "2024-01-29 00:00:00.001", end: "2024-02-03 23:59:00.000" } },
  //       { id: "", name: "Categoria", type: "select", data: {
  //         items: [
  //           { name: "Salário", color: "green" },
  //           { name: "Aluguel", color: "yellow" },
  //           { name: "Luz", color: "blue" },
  //           { name: "Água", color: "orange" }
  //         ],
  //         value: "Salário"
  //       } },
  //       { id: "", name: "Preview", type: "formula", data: { 
  //         value: "(['cama', 'sofa', 'cadeira'].includes('sofa'))?'text=+ R$10.000,00;color=green':'text=- R$10.000,00;color=red'" } },
  //       { id: "", name: "Recebido", type: "checkbox", data: { value: true } },
        
  //     ],
  //     createdAt: "2024-02-18 10:30:00.005",
  //     updatedAt: "2024-03-05 08:45:00.001",
  //   },
  //   {
  //     title: "@Ontem",
  //     owner: "",
  //     properties: [
  //       { id: "", name: "Treinar", type: "checkbox", data: { loadOrder: 0, value: true } },
  //       { id: "", name: "Estudar e meditar", type: "checkbox", data: { loadOrder: 1, value: true } },
  //       { id: "", name: "Tomar 2l de água", type: "checkbox", data: { loadOrder: 2, value: true } },
  //       { id: "", name: "Data", type: "datetime", data: { loadOrder: 3, start: "2024-03-01 00:00:00.000", end: "2024-03-03 23:59:00.000" } }
  //     ],
  //     createdAt: "2024-01-25 10:30:00.002",
  //     updatedAt: "2024-02-16 08:45:00.002",
  //   },
  //   {
  //     title: "@Ontem",
  //     owner: "",
  //     properties: [
  //       { id: "", name: "Descrição", type: "text", data: { loadOrder: 0, value: "Testando algo" } },
  //       { id: "", name: "Data", type: "datetime", data: { loadOrder: 3, start: "2024-03-01 00:00:00.000", end: "2024-03-03 23:59:00.000" } }
  //     ],
  //     createdAt: "2024-01-25 10:30:00.003",
  //     updatedAt: "2024-02-16 08:45:00.003",
  //   }
  // ];  

  // @ts-ignore
  const { modalState:{ visible, content }, openModal, closeModal } = useModal();

  const response = (event) => {
      var dt = event.concat("T00:00:00.000");
      openModal({
          content: <CreateNewItem event={dt} type="task" onNewItemCreated={updateItems} /> 
      });
  }

  const loadItems = (data) => setItems(data);
  const updateItems = (data) => setItems(prev => [...prev, data]);
  const leftItem = (item) => setItems(items.filter((i) => i !== item));

  return (
    <div className="w-full h-full flex flex-col">
      {!loading ? <Calendar 
        event={response} 
        items={items}
        onNewItemCreated={updateItems}
        onItemDeleted={leftItem}
      /> : <Loading />}
    </div>
  );
}