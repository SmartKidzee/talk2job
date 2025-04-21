"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/client";
import {signIn, signUp} from "@/lib/actions/auth.action";
import GoogleAuthButton from "./GoogleAuthButton";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3, "Name must be at least 3 characters.") : z.string().optional(),
        email: z.string()
            .min(1, "Email is required.")
            .email("Please enter a valid email address."),
        password: z.string()
            .min(1, "Password is required.")
            .min(8, "Password must be at least 8 characters.")
            .refine(
                (password) => /[A-Z]/.test(password),
                "Password must contain at least one uppercase letter."
            )
            .refine(
                (password) => /[0-9]/.test(password),
                "Password must contain at least one number."
            ),
        termsAccepted: type === 'sign-up' 
            ? z.boolean().refine(val => val === true, { message: "You must accept the Terms and Privacy Policy." }) 
            : z.boolean().optional(),
    })
}

const AuthForm = ({ type }: {type: FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            termsAccepted: false,
        },
        mode: "onBlur",
    })

    const termsValue = form.watch('termsAccepted');
    const isSignIn = type === 'sign-in';
    const isDisabled = !isSignIn && !termsValue;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === 'sign-up') {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
                    .catch((error) => {
                        if (error.code === 'auth/email-already-in-use') {
                            form.setError('email', { 
                                type: 'manual', 
                                message: 'This email is already registered. Please sign in instead.' 
                            });
                        } else if (error.code === 'auth/weak-password') {
                            form.setError('password', { 
                                type: 'manual', 
                                message: 'This password is too weak. Choose a stronger password.' 
                            });
                        } else {
                            console.error("Signup Error:", error);
                            toast.error("Failed to create account. Please try again.");
                        }
                        throw error;
                    });

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                })

                if(!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success('Account created successfully. Please sign in.');
                router.push('/sign-in')
            } else {
                const { email, password } = values;

                try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();

                if (!idToken) {
                    toast.error('There was an error signing in.');
                    return;
                }

                await signIn({
                    email, idToken
                })

                toast.success('Signed in successfully.');
                router.push('/')
                } catch (error: any) {
                    console.error("Login Error:", error.code, error.message);
                    
                    // Handle error codes more specifically
                    if (error.code === 'auth/user-not-found') {
                        // Only show "account not found" for this specific error
                        form.setError('email', { 
                            type: 'manual', 
                            message: 'No account found with this email.' 
                        });
                    } 
                    else if (error.code === 'auth/wrong-password') {
                        // Specifically handle wrong password error
                        form.setError('password', { 
                            type: 'manual', 
                            message: 'Incorrect password. Please try again.' 
                        });
                    }
                    else if (error.code === 'auth/invalid-credential') {
                        // For invalid-credential, only set error on password field
                        // This is typically a password issue if the email exists
                        form.setError('password', { 
                            type: 'manual', 
                            message: 'Incorrect password. Please try again.' 
                        });
                    }
                    else if (error.code === 'auth/too-many-requests') {
                        toast.error('Too many login attempts. Please try again later or reset your password.');
                    } 
                    else if (error.code === 'auth/invalid-email') {
                        form.setError('email', {
                            type: 'manual',
                            message: 'Please enter a valid email address.'
                        });
                    }
                    else {
                        // Generic error for other cases
                        toast.error('Sign-in failed. Please check your credentials and try again.');
                    }
                    throw error;
                }
            }
        } catch (error: any) {
            console.error("Authentication Error:", error);
            if (!form.formState.errors.email && !form.formState.errors.password) {
            let errorMessage = "An unexpected error occurred. Please try again.";
                toast.error(errorMessage);
        }
    }
    }

    return (
        <div className="card-border lg:min-w-[566px] rounded-2xl shadow-xl bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/10 dark:border-black/20 transition-all duration-300 overflow-hidden">
            <div className="flex flex-col gap-6 card py-10 px-10 bg-transparent">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.png" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">Talk2Job</h2>
                </div>

                <h3>Practice job interviews with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 form">
                        {!isSignIn && (
                            <FormField control={form.control} name="name" label="Name" placeholder="Your Name"/>
                        )}
                        <FormField control={form.control} name="email" label="Email" placeholder="your.email@example.com" type="email"/>
                        <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password"/>
                        
                        {!isSignIn && (
                            <div className="text-xs text-muted-foreground px-2">
                                Password must be at least 8 characters and include an uppercase letter and a number.
                            </div>
                        )}
                        
                        {!isSignIn && (
                            <Controller
                                control={form.control}
                                name="termsAccepted"
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border/50 p-4 shadow">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value ?? false}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                className="form-checkbox h-4 w-4 text-primary-200 border-gray-300 rounded focus:ring-primary-200 cursor-pointer" 
                                                aria-invalid={!!error}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"> 
                                                I agree to the{' '}
                                                <Link href="/terms" className="font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                                                    Terms of Service
                                                </Link>{' '}
                                                and{' '}
                                                <Link href="/privacy" className="font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                                                    Privacy Policy
                                                </Link>
                                                .
                                            </FormLabel>
                                            {error && <FormMessage>{error.message}</FormMessage>}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        )}
                        
                        {isSignIn && (
                          <div className="flex justify-end -mt-2 mb-2">
                            <Link href="/forgot-password" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-4">
                              Forgot Password?
                            </Link>
                          </div>
                        )}

                        <Button className="w-full cursor-pointer" type="submit" size="lg" disabled={isDisabled}>
                            {isSignIn ? 'Sign in' : 'Create an Account'}
                        </Button>
                        
                        {(form.formState.errors.email || form.formState.errors.password || form.formState.errors.name) && (
                            <div className="p-3 rounded-md bg-destructive-100/10 border border-destructive-100/30 mt-2">
                                <p className="text-sm font-medium text-destructive-100 mb-1">Please fix the following errors:</p>
                                <ul className="text-sm text-destructive-100 list-disc list-inside">
                                    {form.formState.errors.name && <li>{form.formState.errors.name.message}</li>}
                                    {form.formState.errors.email && <li>{form.formState.errors.email.message}</li>}
                                    {form.formState.errors.password && <li>{form.formState.errors.password.message}</li>}
                                </ul>
                            </div>
                        )}
                    </form>
                </Form>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <GoogleAuthButton mode={isSignIn ? 'login' : 'signup'} disabled={isDisabled} />

                <p className="text-center text-sm text-muted-foreground mt-4">
                    {isSignIn ? 'No account yet?' : 'Have an account already?'}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-semibold text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline ml-1">
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default AuthForm
