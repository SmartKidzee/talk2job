import React, { useState, useRef, useEffect } from 'react'
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
    const [passwordValue, setPasswordValue] = useState("");
    const [maskedPassword, setMaskedPassword] = useState("");
    const lastCharTimerRef = useRef<NodeJS.Timeout | null>(null);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Function to handle password changes and implement the "show last character briefly" behavior
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: any) => {
        const newValue = e.target.value;
        setPasswordValue(newValue);
        onChange(newValue); // Update the form field value
        
        // Clear any existing timer
        if (lastCharTimerRef.current) {
            clearTimeout(lastCharTimerRef.current);
        }
        
        // If typing (adding characters)
        if (newValue.length > passwordValue.length) {
            // Create masked password with last character visible
            const maskedPart = '•'.repeat(newValue.length - 1);
            const lastChar = newValue.charAt(newValue.length - 1);
            setMaskedPassword(maskedPart + lastChar);
            
            // Set timer to mask the last character after a brief delay
            lastCharTimerRef.current = setTimeout(() => {
                setMaskedPassword('•'.repeat(newValue.length));
            }, 600); // 600ms delay before masking the last character
        } else {
            // If deleting, just show dots
            setMaskedPassword('•'.repeat(newValue.length));
        }
    };

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (lastCharTimerRef.current) {
                clearTimeout(lastCharTimerRef.current);
            }
        };
    }, []);

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
                                {/* Visible but transparent input (for actual value tracking) */}
                                <Input 
                                    className={`input ${type === 'password' ? 'pr-10' : ''} ${error ? 'border-destructive-100' : ''} ${!showPassword ? 'absolute opacity-0' : ''}`}
                                    placeholder={placeholder} 
                                    type={showPassword ? "text" : "password"}
                                    value={field.value || ""}
                                    onChange={(e) => {
                                        if (!showPassword) {
                                            handlePasswordChange(e, field.onChange);
                                        } else {
                                            field.onChange(e); // Normal handling when password is visible
                                        }
                                    }}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    aria-invalid={!!error}
                                />
                                
                                {/* Display input - only shown when password is hidden */}
                                {!showPassword && (
                                    <Input 
                                        className={`input ${type === 'password' ? 'pr-10' : ''} ${error ? 'border-destructive-100' : ''}`}
                                        placeholder={placeholder}
                                        type="text"
                                        value={maskedPassword}
                                        readOnly
                                        tabIndex={-1}
                                        aria-hidden="true"
                                    />
                                )}
                            </>
                        ) : (
                        <Input 
                                className={`input ${error ? 'border-destructive-100' : ''}`}
                            placeholder={placeholder} 
                                type={type}
                            {...field} 
                                aria-invalid={!!error}
                        />
                        )}
                        
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

