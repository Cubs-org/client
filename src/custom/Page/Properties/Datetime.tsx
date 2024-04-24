import formatDatetime from "../../../utils/datetime/formatDatetime";

export const Datetime = ({ dateValue }) => {

    let value;

    if (dateValue.start === dateValue.end) {
        value = formatDatetime(dateValue.start);
    } else {
        value = `${formatDatetime(dateValue.start)} -> ${formatDatetime(dateValue.end)}`;
    }

    return (
        <div className="flex gap-1 items-center">
            <span className="text-sm md:text-base text-dark-300 dark:text-light-500">
                {value}
            </span>
        </div>
    )
}