const InputTextArea = ({ name = "", value = "", className = "", placeholder = "", rows = "4", required = false, processing = false, handleChange, handleKeyDown, rest }) => {
    return (
        <textarea 
        name={name} 
        value={value} 
        className={"w-full border border-gray-300 text-sm rounded shadow transition px-3 py-2 focus:border-blue-300 focus:ring-blue-300 focus-visible:outline-none " + className}
        placeholder={placeholder}
        rows={rows} 
        required={required} 
        disabled={processing} 
        onChange={handleChange ? (e) => handleChange(e) : null} 
        onKeyDown={handleKeyDown ? (e) => handleKeyDown(e) : null}></textarea>
    )
}

export default InputTextArea