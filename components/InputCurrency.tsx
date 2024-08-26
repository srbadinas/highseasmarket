import { Dispatch, FocusEvent, HTMLProps, SetStateAction } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

interface InputCurrencyProps extends HTMLProps<CurrencyInputProps & HTMLInputElement> {
    processing?: boolean,
    onValueChange: Dispatch<SetStateAction<string>>
}

const InputCurrency = ({
    name = "",
    value = "",
    className = "",
    placeholder = "0.00",
    prefix = "$",
    disabled,
    processing,
    onValueChange,
}: InputCurrencyProps) => {
    const handleChange = (value: string | undefined) => {
        onValueChange(value as unknown as string);
    }

    const handleFocus = (evt: FocusEvent<HTMLInputElement>) => {
        if (evt.target.value === "$0") {
            evt.target.value = "";
        }
    };

    const handleBlur = (evt: FocusEvent<HTMLInputElement>) => {
        if (!evt.target.value) {
            evt.target.value = "$0";
        }
    };

    return (
        <CurrencyInput
            name={name}
            value={value}
            className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className}
            placeholder={placeholder}
            prefix={prefix}
            disabled={disabled || processing}
            onValueChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    )
}

export default InputCurrency