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

const USABILITY_OPTIONS = [
    "not_at_all_useful",
    "somewhat_useful",
    "moderately_useful",
    "highly_useful",
    "very_useful",
]

const EASY_OF_USE_OPTIONS = ["very_hard", "hard", "neutral", "easy", "very_easy"];

const ENJOYMENT_OF_USE_OPTIONS = [
    "strongly_disagree",
    "disagree",
    "neither_agree_nor_disagree",
    "agree",
    "strongly_agree",
]

const formSchema = z.object({
    easyOfUse: z.enum(["very_hard", "hard", "neutral", "easy", "very_easy"], {
        required_error: "please select how easy it is to use .",
    }),
    usability: z.enum(
        [
            "not_at_all_useful",
            "somewhat_useful",
            "moderately_useful",
            "highly_useful",
            "very_useful",
        ],
        {
            required_error: "please select how useful it is to use.",
        }
    ),
    enjoymentOfUse: z.enum(
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
                    easy_of_use: getEnumIndex(values.easyOfUse, EASY_OF_USE_OPTIONS) + 1,
                    usability: getEnumIndex(values.usability, USABILITY_OPTIONS) + 1,
                    enjoyment_of_use: getEnumIndex(values.enjoymentOfUse, ENJOYMENT_OF_USE_OPTIONS) + 1,
                    additional_comments: values.aditionalComments,
                },
            })

            resetSession();
            closeDialog();
            toast.success("Logout successful");
            router.push("/");
        } catch (e) {
            toast.error("Log out failed, please try again");
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
                        name="easyOfUse"
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormLabel>How easy was it to use the tool?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex justify-between"
                                    >
                                        <FormItem
                                            className="flex-1 flex flex-col items-start justify-center space-y-3 text-center">
                                            <FormControl className="mx-auto">
                                                <RadioGroupItem value="very_hard"/>
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto">
                                                Very hard
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex-1 flex items-start justify-center space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="hard"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex-1 flex items-start justify-center space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="neutral"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex-1 flex items-start justify-center space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="easy"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex-1 flex flex-col items-start justify-center space-y-3">
                                            <FormControl>
                                                <RadioGroupItem value="very_easy" className="mx-auto"/>
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto">
                                                Very easy
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
                        name="usability"
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormLabel>How useful was the tool?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex justify-between"
                                    >
                                        <FormItem className="flex justify-center flex-col items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="not_at_all_useful"
                                                    className="mx-auto"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-center">
                                                Not at all useful
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex justify-center items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem value="somewhat_useful"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex justify-center items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem value="moderately_useful"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex justify-center items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem value="highly_useful"/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem className="flex justify-center flex-col items-start space-y-3 flex-1">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="very_useful"
                                                    className="mx-auto"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal mx-auto text-center">
                                                Very useful
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
                        name="enjoymentOfUse"
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormLabel>
                                    Rate your agreement: I enjoyed using the tool?
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
                                            <FormLabel className="font-normal mx-auto text-center">
                                                Strongly disagree
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
                                            <FormLabel className="font-normal mx-auto text-center">
                                                Strongly agree
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
                        <Button type="submit">Submit and end session</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
