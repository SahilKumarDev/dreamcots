import { Input } from "@/components/ui/input";
import React from "react";

export interface FloatingInputProps {
  placeholder: string;
  type: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  placeholder,
  type,
  id,
  name,
  value,
  onChange,
  required,
}: FloatingInputProps) => {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
      >
        <span className="inline-flex bg-background px-2">{placeholder}</span>
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder=""
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FloatingInput;
