import { HTMLProps } from "react"

interface InputLabelProps extends HTMLProps<HTMLLabelElement> {
    forInput?: string,
    className?: string,
    required?: boolean
}

const InputLabel = ({ forInput = "", className = "", required, children, ...rest }: InputLabelProps) => {
    return (
        <label htmlFor={forInput} className={"block text-gray-700 font-medium text-sm " + className} {...rest}>
            {children} {(required ? <span className="text-red-500">*</span> : "")}
        </label>
    )
}

export default InputLabel