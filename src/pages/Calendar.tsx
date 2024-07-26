import {
  useCallback,
  useEffect,
  useState
} from "react";
import { useModal } from "../contexts/modalContext";
import { CreateNewItem } from "../components/Calendar/CreateNewItem";
import { Calendar } from "../components/Calendar";

import { useUser } from "../contexts/userContext";
import Loading from "../components/Loading";
import { useSocket } from "../contexts/socketContext";
import { useCalendar } from "../contexts/calendarContext";

export default function CalendarPage() {

  const { listener, unsubscribe } = useSocket();
  const { user: { data: { email } } } = useUser();
  const { pages, setPages } = useCalendar();

  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const response = (event) => {
    var dt = event.concat("T00:00:00.000");
    openModal({
      content: <CreateNewItem event={dt} type="task" />
    });
  }

  const onCreate = useCallback((newPage) => {
    setPages(prev => [...prev, newPage])
  }, [pages]);
  
  const load = useCallback((data) => setPages(data), [pages, email]);

  useEffect(() => {
    if (!listener) return;
    
    listener.emit("request:getOwnedItems", { email: email });
    listener.on("response:getOwnedItems", load);

    return () => {
      unsubscribe("response:getOwnedItems", load);
    }
  }, [email, listener]);

  useEffect(() => {
    if (!listener) return;
    listener.on("response:createNewItem", onCreate);

    setLoading(false);

    return () => {
      unsubscribe("response:createNewItem", onCreate);
    }
  }, [loading, email, listener]);

  return (
    <div className="w-full h-full flex flex-col">
      {!loading ? (
        <Calendar
          event={response}
          items={pages as any}
        />
      ) : <Loading />}
    </div>
  );
}