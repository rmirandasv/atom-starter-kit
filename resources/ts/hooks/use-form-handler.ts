import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormHandlerOptions = {
  method?: "post" | "put" | "patch";
  onSuccess?: () => void;
  onError?: (errors: Record<string, string>) => void;
};

export default function useFormHandler<T extends z.ZodSchema<any>>(schema: T, url: string, defaultValues?: z.infer<T>, options?: FormHandlerOptions) {
  type FormValues = z.infer<T>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || schema.parse({}),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (values: FormValues) => {
      router[options?.method || "post"](url, values, {
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
        onError: (errors) => {
          Object.keys(errors)
            .filter((key) => key in form.getValues())
            .forEach((key) => {
              form.setError(key as any, {
                type: "manual",
                message: errors[key],
              });
            });
        },
      });
    },
    [url, form],
  );

  return {
    form,
    loading,
    handleSubmit,
  };
}
