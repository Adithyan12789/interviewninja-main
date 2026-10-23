"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/FormField";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: string) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
};
const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let toastId: string | number | undefined;
    
    try {
      if (type === "sign-up") {
        toastId = toast.loading("Creating your account...");

        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        })

        if(!result?.success) {
          toast.error(result?.message || "An error occurred while signing up.", { id: toastId });
          return;
        }

        toast.success("Account created successfully! Please sign in.", { id: toastId });
        console.log("Sign Up Values:", values);
        router.push("/sign-in");
        
      } else {
        toastId = toast.loading("Signing in...");

        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredential.user.getIdToken();

        if(!idToken) {
          toast.error("Failed to retrieve ID token. Please try again.", { id: toastId });
          return;
        }

        await signIn({
          email,
          idToken,
        })

        toast.success("Successfully logged in!", { id: toastId });
        console.log("Sign In Values:", values);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`, { id: toastId });
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px] animate-scale-in">
      <div className="flex flex-col gap-6 glass-card py-14 px-10 bg-gradient-to-br from-white/5 to-white/[0.02]">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-3xl font-bold gradient-text-primary">Interview Ninja</h2>
        </div>

        <h3 className="text-center text-gray-300 text-lg">Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form text-white"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full min-h-12 font-bold px-5 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" type="submit">
              {isSignIn ? "Sign In" : "Create An Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-300">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
