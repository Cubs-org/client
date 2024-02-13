import { formatDate } from "../profilePage";

const formatTime = (time:string) => {
    return String(time).trim().split(":").slice(0, 2).join(":");
}

export default function formatDatetime (date:string) {
    let dt:any = date.split(" ");
    let dateFormatted = `${formatDate(dt[0])} às ${formatTime(dt[1])}`;

    return dateFormatted;
}