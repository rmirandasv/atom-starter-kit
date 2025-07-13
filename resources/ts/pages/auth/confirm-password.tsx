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
  password: z.string().nonempty("Password is required"),
});

export default function ConfirmPassword() {
  const { form, loading, handleSubmit } = useFormHandler(
    schema,
    route("password.confirm.store", {
      password: "",
    })
  );

  return (
    <div className="flex flex-col space-y-6 min-h-screen justify-center">
      <div className="px-8 lg:px-0 flex flex-col w-full max-w-sm mx-auto">
        <Heading
          size="small"
          title="Confirm Password"
          description="Please enter your password to confirm your identity."
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Confirm Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
