import { ChangeEvent, Dispatch, HTMLProps, SetStateAction } from "react"

interface InputTextProps extends HTMLProps<HTMLInputElement> {
    processing?: boolean,
    onValueChange: Dispatch<SetStateAction<string>>,
}

const InputText = ({ className = "", processing, disabled, onValueChange, ...rest }: InputTextProps) => {

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        onValueChange(evt.target.value);
    }

    return (
        <input
            className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className}
            disabled={disabled || processing ? true : false}
            onChange={handleChange}
            {...rest}
        />
    )
}

export default InputText