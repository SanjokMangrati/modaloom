import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { capitalize } from "@/lib/utils"
import { ReactElement } from "react";

interface IProps {
    name: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    label?: string;
    placeholder?: string;
    fieldDescription?: string;
    disabled?: boolean;
    required?: boolean;
    icon?: ReactElement;
}

export const InputField: React.FC<IProps> = ({
    name,
    type,
    label,
    placeholder,
    fieldDescription,
    disabled = false,
    required = false,
    icon
}) => {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div>
                        <FormLabel className="font-medium text-md">{label ?? capitalize(name)}</FormLabel>
                    </div>
                    <FormControl>
                        <div className="flex flex-row items-center gap-2">
                            {icon}
                            <Input
                                className="border-1[px] border-background rounded-md text-sm font-medium bg-foreground caret-black text-background"
                                placeholder={placeholder ?? capitalize(name)}
                                type={type}
                                disabled={disabled}
                                required={required}
                                {...field}
                            />
                        </div>
                    </FormControl>
                    {
                        fieldDescription && (<FormDescription>{fieldDescription}</FormDescription>)
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
