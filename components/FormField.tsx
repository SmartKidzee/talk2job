import React, { useState } from 'react'
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Controller, FieldValues, Control, Path} from "react-hook-form";
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues>({ control, name, label, placeholder, type="text" }: FormFieldProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Controller control={control} name={name} render={({field}) => (
            <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input 
                            className={`input ${type === 'password' ? 'pr-10' : ''}`}
                            placeholder={placeholder} 
                            type={type === 'password' ? (showPassword ? 'text' : 'password') : type} 
                            {...field} 
                        />
                        {type === 'password' && (
                            <Button 
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-muted-foreground hover:text-primary"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5" />
                                ) : (
                                    <Eye className="size-5" />
                                )}
                            </Button>
                        )}
                    </div>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
    />
)};
export default FormField

