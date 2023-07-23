import InputText from "./InputText";

const InputNumber = ({ name = "", value = "", className = "", min = "0", placeholder = "", required = false, processing = false, handleChange, rest }) => {
    const onHandleFocus = (e) => {
        if (e.target.value === "0") {
            e.target.value = "";
        }
    };

    const onHandleBlur = (e) => {
        if (e.target.value === "") {
            e.target.value = 0;
        }
    };

    const onHandleKeyDown = (e) => {
        if (!/^[0-9\\t]$/.test(e.key)) {
            if (e.keyCode === 8) {
                return false;
            }

            e.preventDefault();
        }
    };

    return (
        <InputText
            type="number"
            name={name}
            value={value}
            className={className}
            min={min}
            placeholder={placeholder}
            required={required}
            disabled={processing}
            handleChange={handleChange}
            onFocus={(e) => onHandleFocus(e)}
            onBlur={(e) => onHandleBlur(e)}
            onKeyDown={(e) => onHandleKeyDown(e)}
            {...rest}
        />
    )
}

export default InputNumber