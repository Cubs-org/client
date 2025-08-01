import { RxCross2 } from "react-icons/rx";
import clsx from "clsx";

export const Modal = ({ children, visible, closeModal }) => {
    return (
      <>
        <div className={clsx("fixed z-50 top-0 left-0 w-screen h-screen bg-modal backdrop-blur-sm", {
          "flex opacity-100" : visible == true,
          "hidden opacity-0" : visible == false
        })} />
        <div className={
          clsx("min-w-full h-full md:h-fit md:min-w-[450px] md:max-h-screen flex flex-col rounded-lg pb-2 bg-light-200 text-dark-900 dark:bg-dark-900 backdrop-blur-sm dark:text-light-300 shadow-2xl absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 delay-75", {
            "scale-100" : visible == true,
            "scale-0 overflow-hidden" : visible == false
          })}>
          <div
            className="w-full flex flex-row justify-end p-2">
            <RxCross2 
              className="text-xl cursor-pointer text-dark-100"
              onClick={closeModal}
            />
          </div>
          <div className="w-full px-4 py-2">
            {children}
          </div>
        </div>
      </>
    );
}