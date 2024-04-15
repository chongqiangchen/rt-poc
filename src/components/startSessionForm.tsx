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
import { Input } from "@/components/ui/input";
import useSessionStore from "@/store/sessionStore";
import useSession from "@/lib/requests/useSession";

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
  const { mutate: createSession } = useSession();

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    createSession(
      { email: formData.email },
      {
        onSuccess: (data) => {
          console.log(data);
          setEmail(formData.email);
          setSessionId(data.sessionId);
          toast.success("Session has started");
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center item-center">
              <div className="flex">
                <FormLabel className="my-auto text-primary">
                  Agent Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-r-none focus-visible:ring-0"
                    placeholder="Enter your email to begin"
                    {...field}
                  />
                </FormControl>
              </div>

              <FormMessage className="ml-auto" />
            </FormItem>
          )}
        />
        <Button className="rounded-l-none" type="submit">
          Start session
        </Button>
      </form>
    </Form>
  );
}
