const Switch = ({ name, value, text, processing = false, handleChange }) => {
    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    className="sr-only peer"
                    disabled={processing}
                    onChange={(e) => handleChange(e)}
                    checked={value ? true : false}
                />
                <div className="w-[26px] h-[14px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[12px] after:w-[12px] after:transition-all peer-checked:bg-default-1"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                    {text}
                </span>
            </label>
        </>
    )
}

export default Switch