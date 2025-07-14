import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFormHandler from "@/hooks/use-form-handler";
import { Team } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import route from "ziggy-js";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  role: z.string(),
});

export default function InviteTeamMemberDialog({ team }: { team: Team }) {
  const [open, setOpen] = useState<boolean>(false);
  const { form, loading, handleSubmit } = useFormHandler(
    schema,
    route("settings.teams.invite", team.id),
    {
      email: "",
      role: "user",
    },
    {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast("Team member invited successfully");
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-sm font-semibold text-muted-foreground underline">Invite</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a team member</DialogTitle>
          <DialogDescription>Invite a team member to join your team. You can invite them by entering their email address.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select defaultValue={field.value} onValueChange={field.onChange} disabled={loading}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="lg:col-span-2">
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Loading..." : "Invite"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
