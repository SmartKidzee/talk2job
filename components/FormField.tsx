import React, { useState } from 'react'
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Controller, FieldValues, Control, Path} from "react-hook-form";
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils";

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
        <Controller 
            control={control} 
            name={name} 
            render={({field, fieldState: { error }}) => (
            <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                    <div className="relative">
                        {type === 'password' ? (
                            <>
                                {/* Single Input for password, type toggles */} 
                                <Input 
                                    className={cn(
                                        `input pr-10`, // Keep padding for button
                                        error && 'border-destructive-100'
                                    )}
                                    placeholder={placeholder} 
                                    // Toggle type directly
                                    type={showPassword ? "text" : "password"} 
                                    {...field} // Pass all field props from react-hook-form
                                    aria-invalid={!!error}
                                />
                                
                                {/* Toggle Button remains the same */} 
                                <Button 
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-muted-foreground hover:text-primary"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </Button>
                            </>
                        ) : (
                            // Standard Input for non-password fields
                            <Input 
                                className={cn(`input`, error && 'border-destructive-100')}
                                placeholder={placeholder} 
                                type={type}
                                {...field} 
                                aria-invalid={!!error}
                            />
                        )}
                    </div>
                </FormControl>
                {error && (
                    <FormMessage className="text-destructive-100 font-medium">
                        {error.message}
                    </FormMessage>
                )}
            </FormItem>
        )}
    />
)};
export default FormField

