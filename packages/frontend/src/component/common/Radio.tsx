import React, { PropsWithChildren, useState } from 'react';

interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

interface RadioGroupProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function Group({
  defaultValue,
  onChange,
  children,
}: PropsWithChildren<RadioGroupProps>) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === Radio) {
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: child.props.value === selectedValue,
            onChange: handleChange,
          });
        }
        return child;
      })}
    </div>
  );
}

function Radio({
  value,
  checked = false,
  onChange,
  children,
}: PropsWithChildren<RadioProps>) {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <label>
      <input type="radio" checked={checked} onChange={handleChange} />
      {children}
    </label>
  );
}

Radio.Group = Group;
export default Radio;
