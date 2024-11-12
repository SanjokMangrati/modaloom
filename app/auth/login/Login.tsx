"use client";
import { signIn } from "next-auth/react";
import { Form } from "@/components/common/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema } from "@/types/zod-schemas.types";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/common/Input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  const { toast } = useToast();

  const methods = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async ({
    email,
    password,
  }) => {
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
    });
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: res?.error,
      });
    }
  };

  return (
    <Form
      className="flex flex-col gap-4 px-4 py-5 sm:w-[450px] w-fit bg-foreground md:gap-6 md:px-6 md:py-8 rounded-md"
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <InputField
        name="email"
        type="email"
        label="Email"
        placeholder="user@example.com"
        className="text-background"
      />
      <InputField
        name="password"
        type="password"
        label="Password"
        className="text-background"
      />
      <Button
        type="submit"
        disabled={!methods.formState.isValid || methods.formState.isSubmitting}
        className="text-sm mt-4 px-8 hover:bg-primary-hover"
      >
        Login
      </Button>
      <div className="text-sm font-medium text-muted-foreground mx-auto">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="underline active:text-blue-400 visited:text-blue-600"
          >
            Register here
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default Login;
