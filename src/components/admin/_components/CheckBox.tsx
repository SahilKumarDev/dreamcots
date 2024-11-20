import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

export interface CheckBoxItem {
  id: string;
  value: string;
  label: string;
}

export interface CheckBoxProps {
  data: CheckBoxItem[];
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  data,
  label,
  value,
  onChange,
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium leading-none text-foreground">
        {label}
      </legend>
      <RadioGroup
        className="flex flex-wrap gap-2"
        value={value || data[0]?.value}
        onValueChange={handleValueChange}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-start gap-4 rounded-lg border border-input p-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                id={item.id}
                value={item.value}
                className="after:absolute after:inset-0"
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  );
};

export default CheckBox;
