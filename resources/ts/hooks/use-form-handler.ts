import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { DefaultValues, FieldPath, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

type FormHandlerOptions = {
  method?: "post" | "put" | "patch";
  onSuccess?: () => void;
  onError?: (errors: Record<string, string>) => void;
};

type ZodObjectSchema<T> = z.ZodSchema<T> & {
  shape?: Record<string, z.ZodTypeAny>;
};

export default function useFormHandler<TSchema extends ZodObjectSchema<TFormValues>, TFormValues extends FieldValues = z.infer<TSchema>>(
  schema: TSchema,
  url: string,
  defaultValues?: DefaultValues<TFormValues>,
  options?: FormHandlerOptions,
) {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || (schema.parse({}) as DefaultValues<TFormValues>),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (values: TFormValues) => {
      router[options?.method || "post"](url, values, {
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
        onError: (errors: Record<string, string>) => {
          Object.keys(errors)
            .filter((key): key is string => key in form.getValues())
            .forEach((key) => {
              form.setError(key as FieldPath<TFormValues>, {
                type: "manual",
                message: errors[key],
              });
            });
        },
      });
    },
    [url, form, options?.method],
  );

  return {
    form,
    loading,
    handleSubmit,
  };
}
