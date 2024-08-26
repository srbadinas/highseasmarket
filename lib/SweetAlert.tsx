import Swal, { SweetAlertOptions } from "sweetalert2";

type SweetAlertButtonTypes = 'success' | 'danger'

interface SweetAlertProps {
    title: string,
    text: string,
    html?: string,
    icon: string,
    showCancelButton?: boolean,
    confirmButtonText?: string,
    confirmButtonType?: SweetAlertButtonTypes,
    reverseButtons?: boolean,
}

export const SweetAlert = ({
    title,
    text,
    html,
    icon,
    showCancelButton = false,
    confirmButtonText,
    confirmButtonType = "success",
    reverseButtons = true,
}: SweetAlertProps) => {
    let confirmButtonClass = "";
    let cancelButtonClass = "border border-transparent rounded text-sm text-white tracking-widest px-4 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-2"

    if (confirmButtonType == "success") {
        confirmButtonClass = "border border-transparent rounded text-sm text-white tracking-widest px-4 py-2 bg-green-600 hover:bg-green-700 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150";
    }

    if (confirmButtonType == "danger") {
        confirmButtonClass = "border border-transparent rounded text-sm text-white tracking-widest px-4 py-2 bg-red-600 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150";
    }

    return Swal.mixin({
        customClass: {
            confirmButton: confirmButtonClass,
            cancelButton: cancelButtonClass,
        },
        buttonsStyling: false
    }).fire({
        title: title,
        text: text,
        html: html,
        icon: icon,
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        reverseButtons: reverseButtons,
        allowOutsideClick: false,
        allowEscapeKey: false,
    } as SweetAlertOptions);
};
