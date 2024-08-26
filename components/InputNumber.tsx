import { Dispatch, FocusEvent, HTMLProps, KeyboardEvent, SetStateAction } from "react";
import InputText from "./InputText";

interface InputNumber extends HTMLProps<HTMLInputElement> {
    processing?: boolean,
    onValueChange: Dispatch<SetStateAction<string>>
}

const InputNumber = ({ className = "", disabled, processing, onValueChange, ...rest }: InputNumber) => {
    const handleFocus = (evt: FocusEvent<HTMLInputElement>) => {
        if (evt.target.value === "0") {
            evt.target.value = "";
        }
    };

    const handleBlur = (evt: FocusEvent<HTMLInputElement>) => {
        if (evt.target.value === "") {
            evt.target.value = "0";
        }
    };

    const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (!/^[0-9\\t]$/.test(evt.key)) {
            if (evt.keyCode === 8) {
                return false;
            }

            evt.preventDefault();
        }
    };

    return (
        <InputText
            type="number"
            className={className}
            disabled={disabled || processing}
            onValueChange={onValueChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            {...rest}
        />
    )
}

export default InputNumber