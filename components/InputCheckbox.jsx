import InputLabel from "./InputLabel"

const InputCheckbox = ({
    name = "",
    value = "",
    className = "",
    forInput = "",
    label = "",
    required = false,
    processing = false,
    handleChange,
    rest
}) => {
    return (
        <div className="flex gap-x-1 items-center">
            <input type="checkbox"
                name={name}
                value={value}
                className={"rounded border-gray-300 text-default-1 shadow-sm checked:bg-default-1 checked:hover:bg-default-1 checked:focus:bg-default-1 focus:ring-default-1 " + className}
                required={required}
                disabled={processing}
                onChange={handleChange ? (e) => handleChange(e) : null}
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