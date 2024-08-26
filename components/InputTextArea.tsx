import { ChangeEvent, Dispatch, HTMLProps, SetStateAction } from "react"

interface InputTextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    processing?: boolean,
    onValueChange: Dispatch<SetStateAction<string>>,
}


const InputTextArea = ({ className = "", processing, disabled, onValueChange, ...rest }: InputTextAreaProps) => {

    const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
        onValueChange(evt.target.value);
    }

    return (
        <textarea
            className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className}
            disabled={disabled || processing}
            onChange={handleChange}
            {...rest}
        ></textarea>
    )
}

export default InputTextArea