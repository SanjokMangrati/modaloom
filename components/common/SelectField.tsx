import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { capitalize } from '@/lib/utils';
import { Control, Controller } from 'react-hook-form';

interface ISelectFieldProps {
    placeholder: string;
    options: Array<string>;
    control: Control<any>;
    name: string;
    onChange?: (value: string) => void;
}

const SelectField = ({ options, placeholder, control, name, onChange }: ISelectFieldProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select
                    onValueChange={(value) => {
                        field.onChange(value);
                        if (onChange) onChange(value);
                    }}
                    value={field.value}
                >
                    <SelectTrigger className="w-[180px] bg-foreground text-background">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((value, index) => (
                            <SelectItem key={index} value={value}>
                                {capitalize(value)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
};

export default SelectField;
