import LoaderImage from '../public/assets/images/loader.svg';
import CustomImage from './CustomImage';

const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={"w-[35px] mx-auto " + className}>
      <CustomImage src={LoaderImage} alt="Loader" />
    </div>
  )
}

export default Loader