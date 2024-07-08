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

export default function CalendarPage() {

  const socket = io(SOCKET_URL);
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