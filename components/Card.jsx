const Card = ({ className = "", children }) => {
    return (
        <div className={'relative bg-white rounded shadow flex flex-col items-center border border-gray-300 p-5 ' + className}>{children}</div>
    )
}

export default Card