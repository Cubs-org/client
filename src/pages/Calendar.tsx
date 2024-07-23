import {
  useEffect,
  useState
} from "react";
import { useModal } from "../contexts/modalContext";
import { CreateNewItem } from "../components/Calendar/CreateNewItem";
import { Calendar } from "../components/Calendar";

import { useUser } from "../contexts/userContext";
import Loading from "../components/Loading";
import { useSocket } from "../contexts/socketContext";

export default function CalendarPage() {

  const { listener, unsubscribe } = useSocket();

  const { user: { data: { email } } } = useUser();

  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const response = (event) => {
    var dt = event.concat("T00:00:00.000");
    openModal({
      content: <CreateNewItem event={dt} type="task" />
    });
  }

  const loadItems = (data) => setItems(data);

  useEffect(() => {
    if (!listener) return;
    listener.emit("request:getCalendarItems", { email: email });

    return () => {
      unsubscribe("request:getCalendarItems");
    }
  }, []);

  useEffect(() => {
    if (!listener) return;

    listener.on("response:getCalendarItems", loadItems);

    setLoading(false);

    return () => {
      unsubscribe("response:getCalendarItems", loadItems);
    }
  }, [loading, email, listener]);

  return (
    <div className="w-full h-full flex flex-col">
      {!loading ? (
        <Calendar
          event={response}
          items={items}
        />
      ) : <Loading />}
    </div>
  );
}