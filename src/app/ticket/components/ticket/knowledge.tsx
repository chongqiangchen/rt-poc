import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {TicketType} from "@/models/schemas/ticketSchema";
import {ThumbsDownIcon, ThumbsUpIcon} from "lucide-react";
import React, {useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function Knowledge({
                                      knowledge,
                                  }: {
    knowledge: TicketType["related_knowledge"][0];
}) {
    const [isExpand, setIsExpand] = useState(false);
    const [evaluation, setEvaluation] = useState<"good" | "bad" | undefined>(
        undefined
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex gap-2">
                    <Link
                        href={knowledge.metadata?.link || ""}
                        target="_blank"
                        className={cn({"underline decoration-dotted underline-offset-4 hover:decoration-solid cursor-pointer": !!knowledge.metadata?.link})}
                    >
                        Source: <span>{knowledge.source}</span>
                    </Link>
                    <div className="flex items-center">
                        <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="w-6 h-6"
                            onClick={() => {
                                console.log(knowledge._id);
                                setEvaluation((evaluation) =>
                                    evaluation === "good" ? undefined : "good"
                                );
                            }}
                        >
                            <ThumbsUpIcon className="w-4 h-4" color={evaluation === "good" ? "green" : "black"}/>
                        </Button>
                        <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="w-6 h-6"
                            onClick={() => {
                                console.log(knowledge._id);
                                setEvaluation((evaluation) =>
                                    evaluation === "bad" ? undefined : "bad"
                                );
                            }}
                        >
                            <ThumbsDownIcon className="w-4 h-4" color={evaluation === "bad" ? "red" : "black"}/>
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Rank: <span>{knowledge.rank}</span> - System: xxx - Source Date
                    2023/11/11
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div>
                    <span>title: </span>
                    <span>{knowledge.metadata?.title}</span>
                </div>

                <p className={!isExpand ? "line-clamp-3" : ""}>{knowledge.content}</p>

                <Button
                    variant="link"
                    className="p-0 underline decoration-1 self-end"
                    onClick={() => {
                        return setIsExpand((isExpand) => !isExpand);
                    }}
                >
                    {!isExpand ? "read more" : "collapse"}
                </Button>
            </CardContent>
        </Card>
    );
}
