import classnames from "classnames";
export default function Lead({ children, className }) {
  return (
    <h2 className={classnames("text-xl lg:text-2xl", className)}>{children}</h2>
  );
}
