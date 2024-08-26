import { ChangeEvent, Dispatch, HTMLProps, SetStateAction } from "react"
import InputLabel from "./InputLabel"

interface InputCheckboxProps extends HTMLProps<HTMLInputElement> {
    label?: string,
    forInput?: string,
    processing?: boolean,
    onValueChange?: Dispatch<SetStateAction<string>>
}

const InputCheckbox = ({
    label = "",
    forInput = "",
    required = false,
    processing,
    onValueChange,
    ...rest
}: InputCheckboxProps) => {

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        onValueChange && onValueChange(evt.target.value);
    }

    return (
        <div className="flex gap-x-1 items-center">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-default-1 shadow-sm checked:bg-default-1 checked:hover:bg-default-1 checked:focus:bg-default-1 focus:ring-default-1"
                required={required}
                disabled={processing}
                onChange={handleChange}
                {...rest}
            />
            <InputLabel
                forInput={forInput}
            >
                {label}
            </InputLabel>
        </div>
    )
}

export default InputCheckbox