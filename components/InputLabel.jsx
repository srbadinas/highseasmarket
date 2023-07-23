const InputLabel = ({ forInput = "", className = "", required = false, children, rest }) => {
    return (
        <label htmlFor={forInput} className={"block text-gray-700 font-medium text-sm " + className} {...rest}>{children} {(required ? <span className="text-red-500">*</span> : "")}</label>
    )
}

export default InputLabel