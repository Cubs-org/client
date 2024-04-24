import clsx from "clsx";
import { IUserAccount } from "../../interfaces/user";
import { formatDateToPreview } from "../../utils/datetime/formatDateToPreview";

interface IHeaderProfileProps {
    user: IUserAccount;
}

export const HeaderProfile = ({ user }:IHeaderProfileProps) => {

    const { data } = user;

    const userUpdatedAt = data?.updatedAt as string || "00/00/0000";

    // const accountPlan = user.planType as string;
    const accountStatus = data?.status || "active";
    const accountType = data?.accountType || "free";
    // const accountPaymentType = user.paymentType;

    return (
        <header className="w-full flex justify-between  items-center">
            <span className="text-base font-medium text-dark-100 dark:text-light-700">
                Editado em {formatDateToPreview(userUpdatedAt)}
            </span>

            <div className="flex items-center gap-2 hover:bg-light-200 hover:dark:bg-dark-600 px-2 py-1 rounded-md cursor-pointer">
                <span className={clsx("w-2 h-2 rounded-full block", {
                    "bg-green-400": accountStatus === "active",
                    "bg-yellow-400": accountStatus === "pending",
                    "bg-red-400": accountStatus === "inactive",
                })} />
                {accountStatus}/{accountType}
            </div>
        </header>
    )
}