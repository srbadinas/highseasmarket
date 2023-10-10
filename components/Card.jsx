const Card = ({ className = "", children }) => {
    return (
        <div className={'relative bg-white rounded shadow flex flex-col items-center border border-gray-300 p-5 ' + className}>{children}</div>
    )
}

const Title = ({ children }) => {
    return <div className="w-full flex justify-start text-xl font-semibold text-gray-700 mb-5">
        {children}
    </div>
}

Card.Title = Title;

export default Card