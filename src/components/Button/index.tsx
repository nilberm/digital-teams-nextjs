import style from "./style.module.scss";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function Button({
  type = "button",
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${style.button} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
