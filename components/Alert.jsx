const Alert = ({ className = "", type = "default", message }) => {
    let alertStyle = '';
    
    switch(type) {
        case 'success':
            alertStyle = 'bg-[#d1e7dd] text-[#0f5132] border-[#badbcc]';
            break;
        case 'error':
            alertStyle = 'bg-[#f8d7da] text-[#842029] border-[#f5c2c7]';
            break;
        case 'info':
            alertStyle = '';
            break;
        case 'warning':
            alertStyle = '';
            break;
        case 'primary':
            alertStyle = '';
            break;
        default:
            alertStyle = '';
            break;
    }

    return (
        <div className={"w-full text-sm px-3 py-4 mb-4 border rounded " + alertStyle + ' ' + className}>{message}</div>
    )
}

export default Alert