const SectionHeader = ({ text }: { text: string }) => {
  return (
    <div className="text-2xl mb-12">
      <span className="border-b-4 border-default-1 pb-1">
        {text}
      </span>
    </div>
  )
}

export default SectionHeader