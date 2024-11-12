"use client"
import { useRouter } from 'next/navigation';
import { Form } from '@/components/common/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerFormSchema } from '@/types/zod-schemas.types';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField } from '@/components/common/Input';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const Register = () => {
    const { toast } = useToast()
    const router = useRouter();

    const methods = useForm<z.infer<typeof registerFormSchema>>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: zodResolver(registerFormSchema)
    })

    const onSubmit: SubmitHandler<z.infer<typeof registerFormSchema>> = async ({ email, password }) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const result = await response.json();

        if (!result.user.id) {
            toast({
                variant: 'destructive',
                title: 'Registration Failed.'
            })
        } else {
            toast({
                title: 'Registration Successful.'
            })
            router.push('/auth/login')
        }
    }

    return (
        <Form
            className='flex flex-col gap-4 px-4 py-5 sm:w-[450px] w-fit bg-foreground md:gap-6 md:px-6 md:py-8 rounded-md'
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
        >
            <InputField
                name='email'
                type='email'
                label='Email'
                placeholder='user@example.com'
                className='text-background'
            />
            <InputField
                name='password'
                type='password'
                label='Password'
                className='text-background'

            />
            <InputField
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                className='text-background'

            />
            <Button type='submit' disabled={!methods.formState.isValid || methods.formState.isSubmitting} className='text-sm mt-4 px-8 hover:bg-primary-hover'>Register</Button>
            <div className='text-sm font-medium text-muted-foreground mx-auto'>
                <p>Already have an account? <Link href="/auth/login" className='underline active:text-blue-400 visited:text-blue-600'>Login here</Link></p>
            </div>
        </Form>
    );
};

export default Register;
