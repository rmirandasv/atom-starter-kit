import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import route from "ziggy-js";
import useFormHandler from "@/hooks/use-form-handler";

const schema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 characters long")
    .max(6, "Code must be 6 characters long"),
});

export default function TwoFactorAuthPage() {
  const { form, loading, handleSubmit } = useFormHandler(
    schema,
    route("two-factor.login.store"),
    {
      code: "",
    }
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-sm flex flex-col">
        <Heading
          title="Two-Factor Authentication"
          description="Enter the code from your authenticator app."
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your code"
                      {...field}
                      autoFocus
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
