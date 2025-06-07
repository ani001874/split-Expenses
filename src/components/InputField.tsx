import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | ReactNode;
  error?:string
}

const InputField = ({ label,error, ...props }: InputFieldProps) => {
  return (
    <div className="flex flex-col ">
      <Label htmlFor={props.id} className="my-2"> {label} </Label>
      <Input {...props}  />
      <p className="text-sm text-red-500 self-start">{error}</p>
    </div>
  );
};

export default InputField;
