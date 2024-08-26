interface PageHeaderProps {
    text: string,
    subHeader?: string[],
}

const PageHeader = ({ text, subHeader = [] }: PageHeaderProps) => {
    return (
        <div className="flex items-center border-b border-zinc-200 text-gray-500 py-2 mb-5">
            <span className="text-base md:text-2xl pr-4">{text}</span>
            {
                subHeader.length > 0 && <h6 className="text-sm md:text-base border-l border-gray-400 pl-4">{subHeader}</h6>
            }
        </div>
    )
}

export default PageHeader