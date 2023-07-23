const InputText = ({
    type = "text",
    name = "",
    value = "",
    className = "",
    placeholder = "",
    required = false,
    disabled = false,
    processing = false,
    handleChange,
    handleKeyDown,
    handleBlur,
    handlePaste,
    rest
}) => {
    return (
        <input type={type} name={name} value={value} className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className} placeholder={placeholder} required={required} disabled={disabled || processing ? true : false} 
        onChange={handleChange ? (e) => handleChange(e) : null} 
        onKeyDown={handleKeyDown ? (e) => handleKeyDown(e) : null} 
        onBlur={handleBlur ? (e) => handleBlur(e) : null}
        onPaste={handlePaste ? (e) => handlePaste(e) : null}
        {...rest} />
    )
}

export default InputText