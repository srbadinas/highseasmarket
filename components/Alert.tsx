import { MessageType } from "@/types/Message";

interface AlertProps {
    className?: string,
    type?: MessageType,
    message: string
}

const ALERT_TYPE_MAPPINMG: Record<MessageType, string> = {
    success: 'bg-[#d1e7dd] text-[#0f5132] border-[#badbcc]',
    error: 'bg-[#f8d7da] text-[#842029] border-[#f5c2c7]',
    info: '',
    warning: '',
    primary: '',
    default: ''
}

const Alert = ({ className = "", type = "default", message }: AlertProps) => {
    let alertStyle = ALERT_TYPE_MAPPINMG[type];

    return (
        <div className={"w-full text-sm px-3 py-4 mb-4 border rounded " + alertStyle + ' ' + className}>{message}</div>
    )
}

export default Alert