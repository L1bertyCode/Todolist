import { ButtonHTMLAttributes } from "react";

interface ButtonPropsType
 extends ButtonHTMLAttributes<HTMLButtonElement> {
 title: string;
 className?: string;
}

export const Button = (props: ButtonPropsType) => {
 const { title, className, ...otherProps } = props;
 return (
  <button className={className} {...otherProps}>
   {title}
  </button>
 );
};
