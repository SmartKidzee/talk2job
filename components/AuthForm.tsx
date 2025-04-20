"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/client";
import {signIn, signUp} from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),
    })
}

const AuthForm = ({ type }: {type: FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === 'sign-up') {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

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
            } else{
                const { email, password } = values;

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
            }
        }catch (error: any) {
            console.error("Authentication Error:", error);
            let errorMessage = "An unexpected error occurred. Please try again.";
            
            if (error.code) {
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = "Invalid email address format.";
                        break;
                    case 'auth/user-disabled':
                        errorMessage = "This user account has been disabled.";
                        break;
                    case 'auth/user-not-found':
                    case 'auth/invalid-credential':
                        errorMessage = "Invalid email or password. Please check your credentials.";
                        break;
                    case 'auth/wrong-password':
                        errorMessage = "Incorrect password. Please try again.";
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = "An account already exists with this email address.";
                        break;
                    case 'auth/weak-password':
                        errorMessage = "Password is too weak. Please choose a stronger password.";
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = "Email/password accounts are not enabled.";
                        break;
                     case 'auth/too-many-requests':
                         errorMessage = "Too many attempts. Please try again later.";
                         break;
                    default:
                        errorMessage = `An error occurred: ${error.message}`;
                }
            }

            toast.error(errorMessage);
        }
    }

    const isSignIn = type === 'sign-in';

    return (
        <div className="card-border lg:min-w-[566px] rounded-2xl shadow-xl bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/10 dark:border-black/20 transition-all duration-300 overflow-hidden">
            <div className="flex flex-col gap-6 card py-14 px-10 bg-transparent">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.png" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">Talk2Job</h2>
                </div>

                <h3>Practice job interviews with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && (
                            <FormField control={form.control} name="name" label="Name" placeholder="Your Name"/>
                        )}
                        <FormField control={form.control} name="email" label="Email" placeholder="Your email address" type="email"/>
                        <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password"/>
                        <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
                    </form>
                </Form>

                <p className="text-center">{isSignIn ? 'No account yet?' : 'Have an account already?'}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default AuthForm
