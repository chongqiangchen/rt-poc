"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useSessionStore from "@/store/sessionStore";
import useStartSession from "@/lib/requests/useStartSession";

const FormSchema = z.object({
  email: z
    .string({ required_error: "email should be added" })
    .email({ message: "should input a valid email" }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { setEmail, setSessionId } = useSessionStore();
  const { mutate: startSession, isPending: isCreatingSession } =
    useStartSession();

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startSession(
      { email: formData.email },
      {
        onSuccess: (data) => {
          setEmail(formData.email);
          setSessionId(data.sessionId);
          toast.success("Session has started");
        },
      }
    );
  }

  return (
    <Card className="w-[600px] h-[400px] shadow-lg p-8 rounded-lg place-self-center">
      <CardHeader>
        <CardTitle>Welcome to the readytech Ticket Assist trial.</CardTitle>
        <CardDescription>
          Please enter your email to start using Ticket Assist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center item-center w-full">
                  <FormLabel className="my-auto text-primary font-bold">
                    Agent Email
                  </FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input
                        className="rounded-r-none focus-visible:ring-0"
                        placeholder="your.name@readytech.io"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      className="rounded-l-none w-1/4"
                      type="submit"
                      disabled={isCreatingSession}
                    >
                      {isCreatingSession ? (
                        <span>Loading...</span>
                      ) : (
                        <span>Start</span>
                      )}
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          At the end of your session please logout to rate your experience and
          help us improve the tool.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Thanks for participating.
        </p>
      </CardFooter>
    </Card>
  );
}
