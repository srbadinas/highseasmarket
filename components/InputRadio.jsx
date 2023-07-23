import generateUniqueId from "@utils/uniqueId";

const InputRadio = ({ name = "", value = "", options, handleChange }) => {
    return (
        <>
            {options &&
                [...options].map((item) => {
                    return (
                        <div
                            key={generateUniqueId(item.value)}
                            className="flex items-center mb-1"
                        >
                            <input
                                type="radio"
                                name={name}
                                value={item.value}
                                className="mr-2 cursor-pointer checked:bg-default-1 checked:hover:bg-default-1 checked:focus:bg-default-1 checked:text-default-1 checked:hover:text-default-1 checked:focus:text-default-1 checked:ring-blue-300 checked:hover:ring-blue-300 checked:focus:ring-blue-300 focus:ring-blue-300"
                                checked={item.value == value ? true : false}
                                onChange={handleChange ? (e) => handleChange(e) : null}
                            />
                            <label className="text-sm text-gray-700">
                                {item.display}
                            </label>
                        </div>
                    );
                })}
        </>
    )
}

export default InputRadio