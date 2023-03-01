import classnames from "classnames";

export default function Heading2({ children, className }) {
  return (
    <h2 className={classnames("text-4xl lg:text-6xl font-black", className)}>
      {children}
    </h2>
  );
}
