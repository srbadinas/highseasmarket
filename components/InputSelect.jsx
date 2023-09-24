const InputSelect = ({
    name = "",
    value = "",
    className = "",
    options,
    hasDefaultOption = true,
    defaultOptionText = "- Select -",
    required = false,
    processing = false,
    handleChange,
    children
}) => {
    return (
        <select 
        name={name} 
        value={value} 
        className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className} 
        required={required} 
        disabled={processing} 
        onChange={(e) => handleChange(e)}>
            {hasDefaultOption && <option value="">{defaultOptionText}</option>}
            {
                children
            }
        </select>
    )
}

export default InputSelect