import Link from "next/link";

const ApplicationLogo = ({ href = "/", className = "" }) => {
  return (
    <Link
      href={href}
      className={
        "text-3xl font-extrabold drop-shadow-lg text-default-1 text-center " +
        className
      }>
      HighSeasMarket
    </Link>
  );
};

export default ApplicationLogo;
