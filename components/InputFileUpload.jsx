import React from 'react'

const InputFileUpload = ({
    name = "",
    value,
    accept = "image/png, image/jpeg",
    multiple = false,
    required = false,
    disabled = false,
    processing = false,
    handleChange,
    rest
}) => {
    return (
        <input type="file" name={name} value={value} className="w-full border border-dashed border-gray-300 rounded px-3 py-4 " accept={accept} multiple={multiple} required={required} disabled={disabled || processing ? true : false} onChange={(e) => handleChange(e)} {...rest} />
    )
}

export default InputFileUpload