import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {TicketType} from "@/models/schemas/ticketSchema";
import {ThumbsDownIcon, ThumbsUpIcon} from "lucide-react";
import React, {useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import useTicketTrack from "@/lib/track/useTicketTrack";
import {
    ETicketEventName,
    TSourceLinkClickEventParams,
    TSourceShowMoreEventParams, TSourceThumbsClickEventParams,
} from "@/lib/track/track";

export default function Knowledge({
                                      knowledge,
                                  }: {
    knowledge: TicketType["related_knowledge"][0];
}) {
    const [isExpand, setIsExpand] = useState(false);
    const [evaluation, setEvaluation] = useState<"good" | "bad" | undefined>(
        undefined
    );
    const {track} = useTicketTrack();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex justify-between gap-2">
                    <Link
                        href={knowledge.metadata?.link || ""}
                        target="_blank"
                        className={cn("truncate", {
                            "underline decoration-dotted underline-offset-4 hover:decoration-solid cursor-pointer": !!knowledge.metadata?.link
                        })}
                        onClick={() => track<TSourceLinkClickEventParams>({
                            eventName: ETicketEventName.SOURCE_LINK_CLICK,
                            data: {
                                url: knowledge.metadata?.link || "",
                                rank: knowledge.rank,
                                dbSourceId: knowledge._id
                            }
                        })}
                    >
                        {knowledge.rank === 101 || knowledge.rank === 102 ? "Similiar Ticket: " : "Source: "}{knowledge.metadata?.link}
                    </Link>
                    <div className="flex items-center">
                        <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="w-6 h-6"
                            onClick={() => {
                                track<TSourceThumbsClickEventParams>({
                                    eventName: ETicketEventName.SOURCE_THUMBS_CLICK,
                                    data: {
                                        dbSourceId: knowledge._id,
                                        rank: knowledge.rank,
                                        type: "up"
                                    }
                                })

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
                                track<TSourceThumbsClickEventParams>({
                                    eventName: ETicketEventName.SOURCE_THUMBS_CLICK,
                                    data: {
                                        dbSourceId: knowledge._id,
                                        rank: knowledge.rank,
                                        type: "down"
                                    }
                                })

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
                    <i>
                        Id: <span>{knowledge.rank}</span>, System: {knowledge.source}, Source Date: 20xx/xx/xx
                    </i>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <p className={!isExpand ? "line-clamp-3" : ""}>{knowledge.content}</p>
                <Button
                    variant="link"
                    className="p-0 underline decoration-1 self-end"
                    onClick={() => {
                        track<TSourceShowMoreEventParams>({
                            eventName: ETicketEventName.SOURCE_SHOW_MORE,
                            data: {
                                rank: knowledge.rank,
                                dbSourceId: knowledge._id,
                            }
                        })
                        return setIsExpand((isExpand) => !isExpand);
                    }}
                >
                    {!isExpand ? "read more" : "collapse"}
                </Button>
            </CardContent>
        </Card>
    );
}
