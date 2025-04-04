import React from 'react'
import {FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control, Controller, FieldValues,Path} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "file";
}

const FormField = <T extends FieldValues>({control, name,label,placeholder,type}:FormFieldProps<T>) => (
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="label">{label}</FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} {...field} type={type ?? "text"} className="input"/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
)

export default FormField
