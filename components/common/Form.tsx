import { FormHTMLAttributes, ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>;
  children: ReactNode;
  wrapperClassName?: string;
}

export const Form = ({
  children,
  methods,
  wrapperClassName,
  ...props
}: FormProps) => {
  return (
    <div className={wrapperClassName}>
      <FormProvider {...methods}>
        <form {...props}>{children}</form>
      </FormProvider>
    </div>
  );
};
