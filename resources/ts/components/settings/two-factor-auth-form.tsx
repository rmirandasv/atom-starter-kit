import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SharedData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Download, Key, Shield, ShieldCheck, ShieldX, Smartphone } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import route from "ziggy-js";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(6, "The code must be at least 6 characters long"),
});

export default function TwoFactorAuthForm({ status }: { status?: "two-factor-authentication-enabled" | null }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { auth } = usePage<SharedData>().props;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const handleEnableTwoFactor = () => {
    router.post(
      route("two-factor.enable"),
      {},
      {
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
        onSuccess: () => {
          router.reload();
        },
        onError: (error) => {
          console.error("Error enabling two-factor authentication:", error);
          form.setError("code", {
            type: "manual",
            message: "Failed to enable two-factor authentication. Please try again.",
          });
        },
      },
    );
  };

  const handlCompleteTwoFactor = (data: z.infer<typeof schema>) => {
    router.post(
      route("two-factor.confirm"),
      { code: data.code },
      {
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
        onError: () => {
          form.setError("code", {
            type: "manual",
            message: "Invalid code. Please try again.",
          });
        },
      },
    );
  };

  const handleDisableTwoFactor = () => {
    router.delete(route("two-factor.disable"), {
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onSuccess: () => {
        router.reload();
      },
      onError: (error) => {
        console.error("Error disabling two-factor authentication:", error);
        form.setError("code", {
          type: "manual",
          message: "Failed to disable two-factor authentication. Please try again.",
        });
      },
    });
  };

  const handleDownloadRecoveryCodes = async () => {
    setDownloading(true);
    const respone = await axios.get(route("two-factor.recovery-codes"), {
      withCredentials: true,
      headers: {
        "content-type": "application/json",
      },
    });
    const codes = respone.data;
    const blob = new Blob([codes.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  useEffect(() => {
    if (status === "two-factor-authentication-enabled") {
      axios
        .get(route("two-factor.qr-code"), {
          withCredentials: true,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          setQrCode(response.data.svg);
        })
        .catch(() => {
          setQrCode(null);
        });
    }
  }, [status]);

  return (
    <div className="flex flex-col gap-6">
      {!auth.user.two_factor_confirmed_at && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!qrCode && (
              <Fragment>
                <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-4">
                  <Smartphone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    Use an authentication app like Google Authenticator or Authy to generate verification codes.
                  </div>
                </div>
                <Button onClick={handleEnableTwoFactor} disabled={loading} className="w-fit">
                  {loading ? "Enabling..." : "Enable 2FA"}
                </Button>
              </Fragment>
            )}
            {qrCode && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    Setup Required
                  </Badge>
                </div>
                <div className="rounded-lg border bg-white p-6">
                  <div className="mb-4 text-center" dangerouslySetInnerHTML={{ __html: qrCode }} />
                  <p className="text-center text-sm text-muted-foreground">Scan this QR code with your authentication app</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handlCompleteTwoFactor)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            Verification Code
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter 6-digit code" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={loading}>
                      {loading ? "Confirming..." : "Confirm Setup"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {auth.user.two_factor_confirmed_at && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Your account is protected with 2FA</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border bg-green-50 p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-green-600" />
              <div className="text-sm text-green-700">Two-factor authentication is active. Your account is now more secure.</div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={handleDownloadRecoveryCodes} disabled={downloading} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {downloading ? "Downloading..." : "Download Recovery Codes"}
              </Button>
              <Button onClick={handleDisableTwoFactor} variant="destructive" disabled={loading} className="flex items-center gap-2">
                <ShieldX className="h-4 w-4" />
                {loading ? "Disabling..." : "Disable 2FA"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
