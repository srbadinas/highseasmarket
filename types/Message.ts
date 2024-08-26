export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'primary' | 'default'

export type Message = {
    type: MessageType,
    content: string,
};