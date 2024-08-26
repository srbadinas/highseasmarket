import { ChangeEvent, Dispatch, HTMLProps, SetStateAction } from "react"

interface SwitchProps extends HTMLProps<HTMLInputElement> {
    text: string,
    processing?: boolean,
    onValueChange: Dispatch<SetStateAction<boolean>>
}

const Switch = ({ name, value, text, processing = false, checked, onValueChange }: SwitchProps) => {

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        onValueChange(evt.target.checked)
    }

    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    className="sr-only peer"
                    disabled={processing}
                    onChange={handleChange}
                    checked={checked}
                />
                <div className="w-[26px] h-[14px] bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[0px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-[12px] after:w-[12px] after:transition-all peer-checked:bg-default-1"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                    {text}
                </span>
            </label>
        </>
    )
}

export default Switch