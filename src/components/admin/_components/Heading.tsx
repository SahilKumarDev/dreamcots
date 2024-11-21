const Heading = ({ text, className }: { text: string; className?: string }) => {
  return <h2 className={`${className} leading-7`}>{text}</h2>;
};

export default Heading;
