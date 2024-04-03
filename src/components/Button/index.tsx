import style from "./style.module.scss";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}
export default function Button({
  type = "button",
  children,
  className = "",
  disabled = false,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${style.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
