import style from "./style.module.scss";

interface InputProps {
  children: React.ReactNode;
  error?: any;
}
export default function Input(props: InputProps) {
  return (
    <div className={`${style.input} ${props.error && style.error}`}>
      {props.children}
    </div>
  );
}
