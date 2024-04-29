"use client";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import useSessionStore from "@/store/sessionStore";

import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {any, z} from "zod";
import {DialogHeader, DialogTitle} from "./ui/dialog";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Separator} from "./ui/separator";
import useUpdateSurvey from "@/lib/requests/useUpdateSurvey";
import {Slider} from "@/components/ui/slider";

const reasonItems = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
    },
    {id: "other", label: "Other"},
] as const;

const OPTIONS = [
    "strongly_disagree",
    "disagree",
    "neither_agree_nor_disagree",
    "agree",
    "strongly_agree",
]

const formSchema = z.object({
    effectiveness: z.enum([
        "strongly_disagree",
        "disagree",
        "neither_agree_nor_disagree",
        "agree",
        "strongly_agree",
    ], {
        required_error: "please select how easy it is to use .",
    }),
    efficiency: z.enum(
        [
            "strongly_disagree",
            "disagree",
            "neither_agree_nor_disagree",
            "agree",
            "strongly_agree",
        ],
        {
            required_error: "please select how useful it is to use.",
        }
    ),
    satisfaction: z.enum(
        [
            "strongly_disagree",
            "disagree",
            "neither_agree_nor_disagree",
            "agree",
            "strongly_agree",
        ],
        {
            required_error: "please select how enjoyable it is to use.",
        }
    ),
    time: z.number(),
    aditionalComments: z.string().optional(),
});

const getEnumIndex = (value: string, list: string[]) => {
    return list.indexOf(value);
}

export default function SurveyForm({closeDialog}: { closeDialog: Function }) {
    const {resetSession, sessionId, currentRelatedTicketId} = useSessionStore();
    const {mutateAsync: updateSession} = useUpdateSession();
    const {mutateAsync: updateSurvey} = useUpdateSurvey();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            aditionalComments: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateSession(
                {
                    sessionId,
                    updateField: {
                        endTime: new Date(),
                        currentTicket: currentRelatedTicketId ? {
                            ticket_id: currentRelatedTicketId,
                            end_time: new Date(),
                        } : undefined
                    },
                }
            );

            await updateSurvey({
                sessionId,
                updateField: {
                    effectiveness: getEnumIndex(values.effectiveness, OPTIONS),
                    efficiency: getEnumIndex(values.efficiency, OPTIONS),
                    satisfaction: getEnumIndex(values.satisfaction, OPTIONS),
                    time: values.time,
                    additional_comments: values.aditionalComments,
                },
            })

            resetSession();
            closeDialog();
            toast.success("Logout successful");
            router.push("/");
        } catch (e) {
            resetSession();
            closeDialog();
            toast.success("Logout successful");
            router.push("/");
        }
    }

    return (
        <>
            <DialogHeader className="mb-4">
                <DialogTitle>End of session survey</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="effectiveness"
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Effectiveness - The AI Assistant was useful in helping me answer tickets: ?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex justify-between"
                                    >
                                        <FormItem
                                            className="flex-1 flex flex-col items-start justify-center space-y-3 text-center">
                                            <FormControl className="mx-auto">
                                                <RadioGroupItem value="strongly_disagree"/>
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-xs text-gray-500 text-center">
                                                Strongly Disagree
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex-1 flex items-start justify-center space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="disagree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex-1 flex items-start justify-center space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="neither_agree_nor_disagree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex-1 flex items-start justify-center space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="agree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex-1 flex flex-col items-start justify-center space-y-3">
                                            <FormControl>
                                                <RadioGroupItem value="strongly_agree" className="mx-auto"/>
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-xs text-gray-500 text-center">
                                                Strongly<br />Agree
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4"/>
                    <FormField
                        control={form.control}
                        name="efficiency"
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Efficiency - Using the assistant made it easy to answer tickets:</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex justify-between"
                                    >
                                        <FormItem className="flex justify-center flex-col items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="strongly_disagree"
                                                    className="mx-auto"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-xs text-gray-500 text-center">
                                                Strongly Disagree
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex justify-center items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem value="disagree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex justify-center items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem value="neither_agree_nor_disagree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex justify-center items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem value="agree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex justify-center flex-col items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="strongly_agree"
                                                    className="mx-auto"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-xs text-gray-500 text-center">
                                                Strongly<br />Agree
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4"/>
                    <FormField
                        control={form.control}
                        name="satisfaction"
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormLabel>
                                    Satisfaction - I enjoyed using the assistant:
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex justify-between"
                                    >
                                        <FormItem className="flex flex-col items-start justify-center space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem
                                                    className="mx-auto"
                                                    value="strongly_disagree"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-xs text-gray-500 text-center">
                                                Strongly Disagree
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start justify-center space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem className="mx-auto" value="disagree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex items-start justify-center space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem
                                                    className="mx-auto"
                                                    value="neither_agree_nor_disagree"
                                                />
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex items-start justify-center space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem className="mx-auto" value="agree"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex flex-col items-start justify-center space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem
                                                    className="mx-auto"
                                                    value="strongly_agree"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-xs text-gray-500 text-center">
                                                Strongly<br />Agree
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time"
                        render={({field}) => (
                            <FormItem className="my-4">
                                <FormLabel>Time - I think that using the assistant could help me reduce time spent per ticket by…</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            {...field}
                                            value={field.value ? [field.value] : [0]}
                                            onValueChange={e => field.onChange(e[0])}
                                            defaultValue={[0]}
                                            max={100}
                                            step={10}
                                        />
                                        <span className="whitespace-nowrap text-xs">{field.value} %</span>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="aditionalComments"
                        render={({field}) => (
                            <FormItem className="my-4">
                                <FormLabel>Additional comments: (optional)</FormLabel>
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
                        <Button type="submit">Submit and Logout</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
