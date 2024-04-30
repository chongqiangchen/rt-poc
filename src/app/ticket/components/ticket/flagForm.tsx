"use client";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import useUpdateFlagPoorResponse from "@/lib/requests/useUpdateFlagPoorResponse";
import useSessionStore from "@/store/sessionStore";
import {toast} from "sonner";

const reasonItems = [
    {
        id: "Unclear",
        label: "Unclear",
    },
    {
        id: "Poor tone",
        label: "Poor tone",
    },
    {
        id: "Irrelevant",
        label: "Irrelevant",
    },
    {
        id: "Unprofessional",
        label: "Unprofessional",
    },
    {
        id: "Misleading",
        label: "Misleading",
    },
    {
        id: "Unsafe",
        label: "Unsafe",
    },
    {id: "other", label: "Other"},
] as const;

const formSchema = z.object({
    reasons: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "Please select at least one reason.",
    }),
    otherReason: z.string().optional(),
    aditionalComments: z.string().optional(),
}).refine((data) => {
    if (data.reasons.includes('other')) {
        return data.otherReason && data.otherReason.trim().length > 0;
    }
    return true;
}, {
    message: "Please input the other reason.",
    path: ["otherReason"],
});

export default function FlagForm(
    {
        closeDialog,
        responseId,
    }: {
        closeDialog: Function;
        responseId: string;
    }
) {
    const { sessionId, currentRelatedTicketId} = useSessionStore();
    console.log(sessionId, currentRelatedTicketId)
    const {mutate: updateFlagPoorResponse} = useUpdateFlagPoorResponse();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reasons: [],
            otherReason: "",
            aditionalComments: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(responseId, values);
        updateFlagPoorResponse({
            sessionId,
            updateField: {
                related_ticket_id: currentRelatedTicketId,
                response_id: responseId,
                reasons: values.reasons,
                otherReason: values.otherReason,
                additional_comments: values.aditionalComments,
            }
        }, {
            onSuccess: () => {
                closeDialog();
                console.log("Flag-poor-response submitted");
                toast.success("Flag Poor Response Submitted");
            },
            onError: () => {
                toast.error("Flag Poor Response Submission Failed");
            }
        })
    }

    return (
        <>
            <DialogHeader className="mb-4">
                <DialogTitle>Why wasn&apos;t this response good enough?</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="reasons"
                        render={() => (
                            <FormItem>
                                <div className="grid w-full">
                                    {reasonItems.slice(0, -1).map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="reasons"
                                            render={({field}) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-center space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel
                                                            className="text-sm font-normal cursor-pointer px-2 py-2">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between gap-4 h-[52px] relative">
                        <FormField
                            control={form.control}
                            name="reasons"
                            render={() => (
                                <FormItem>
                                    <div>
                                        {reasonItems.slice(-1).map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="reasons"
                                                render={({field}) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex items-center space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([
                                                                                ...field.value,
                                                                                item.id,
                                                                            ])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== item.id
                                                                                )
                                                                            );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel
                                                                className="text-sm font-normal px-2 py-2 cursor-pointer">
                                                                {item.label}
                                                            </FormLabel>
                                                            <FormMessage
                                                                className="absolute left-0 bottom-0 translate-y-4"/>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="otherReason"
                            render={({field}) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            className="h-10"
                                            placeholder="Please specify"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="aditionalComments"
                        render={({field}) => (
                            <FormItem className="my-4">
                                <FormLabel>“Additional comments (optional) : please provide possible root cause (e.g., insufficient inputs) to help us improve.</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant={"secondary"}
                            onClick={() => {
                                closeDialog();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
