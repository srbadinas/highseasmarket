import { ChangeEvent, Dispatch, HTMLProps, SetStateAction } from "react"


export type InputSelectOption = {
    value: string,
    label: string
}

interface InputSelectProps extends HTMLProps<HTMLSelectElement> {
    options: InputSelectOption[],
    hasDefaultOption?: boolean,
    defaultOptionText?: string,
    processing?: boolean,
    onValueChange: Dispatch<SetStateAction<string>>
}

const InputSelect = ({
    className = "",
    options,
    hasDefaultOption = true,
    defaultOptionText = "- Select -",
    disabled,
    processing = false,
    onValueChange,
    ...rest
}: InputSelectProps) => {

    const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        onValueChange(evt.target.value);
    }

    return (
        <select
            className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 cursor-pointer focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className}
            disabled={disabled || processing}
            onChange={handleChange}
            {...rest}
        >
            {hasDefaultOption && <option value="">{defaultOptionText}</option>}
            {
                options.map(({ value, label }) => {
                    return (
                        <option key={`${label.toLowerCase().replace(' ', '-')}-${value}`} value={value}>{label}</option>
                    )
                })
            }
        </select>
    )
}

export default InputSelect