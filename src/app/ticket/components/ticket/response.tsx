import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {ChevronLeft, ChevronRight} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog";

import {Carousel, CarouselApi, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
import {TicketType} from "@/models/schemas/ticketSchema";
import {toast} from "sonner";
import FlagForm from "./flagForm";
import useTicketTrack from "@/lib/track/useTicketTrack";
import {ETicketEventName, TResponseCopyEventParams, TResponseSwitchEventParams} from "@/lib/track/track";

export default function Response({ ticket }: { ticket: TicketType }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPoorResponseFormOpen, setIsPoorResponseFormOpen] = useState(false);
  const {track} = useTicketTrack();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const copyToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      track<TResponseCopyEventParams>({
        eventName: ETicketEventName.RESPONSE_COPY,
        data: {
          currentResponseId: ticket.response[current - 1].id,
          dbCurrentId: ticket.response[current - 1]._id
        }
      })
      await navigator.clipboard.writeText(text);
      toast.success("copied");
    }
  };

  const handlePrev = () => {
    track<TResponseSwitchEventParams>({
      eventName: ETicketEventName.RESPONSE_SWITCH,
      data: {
        targetResponseId: ticket.response[current - 2].id,
        dbTargetId: ticket.response[current - 2]._id,
        currentResponseId: ticket.response[current - 1].id,
        dbCurrentId: ticket.response[current - 1]._id,
        type: 'prev'
      }
    })
    api?.scrollPrev()
  }

  const handleNext = () => {
    track<TResponseSwitchEventParams>({
      eventName: ETicketEventName.RESPONSE_SWITCH,
      data: {
        targetResponseId: ticket.response[current].id,
        dbTargetId: ticket.response[current]._id,
        currentResponseId: ticket.response[current - 1].id,
        dbCurrentId: ticket.response[current - 1]._id,
        type: 'next'
      }
    })
    api?.scrollNext()
  }

  return (
    <Card>
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle className="flex justify-center items-center gap-4">
          <Button
            variant={"ghost"}
            size={"icon"}
            className={!api?.canScrollPrev() ? "text-gray-300" : ""}
            disabled={!api?.canScrollPrev()}
            onClick={handlePrev}
          >
            <ChevronLeft />
          </Button>
          Response {current}/{count}
          <Button
            variant={"ghost"}
            size={"icon"}
            className={!api?.canScrollNext() ? "text-gray-300" : ""}
            disabled={!api?.canScrollNext()}
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          className="w-full min-h-28"
          setApi={setApi}
          opts={{
            align: "start",
            duration: 20,
          }}
        >
          <CarouselContent>
            {ticket.response.map((res) => (
              <CarouselItem key={res._id}>{res.answer}</CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="min-w-[200px]"
          onClick={() => {
            console.log(api && ticket.response[api.selectedScrollSnap()]._id);

            api &&
              copyToClipboard(ticket.response[api.selectedScrollSnap()].answer);
          }}
        >
          Copy to clipboard
        </Button>

        <Dialog open={isPoorResponseFormOpen}>
          <DialogTrigger asChild>
            <Button
              className="min-w-[200px]"
              onClick={() => {
                setIsPoorResponseFormOpen(true);
                console.log(
                  "click flag",
                  api && ticket.response[api.selectedScrollSnap()]._id
                );
              }}
            >
              Flag as poor response
            </Button>
          </DialogTrigger>
          <DialogContent>
            <FlagForm
              closeDialog={() => {
                setIsPoorResponseFormOpen(false);
              }}
              responseId={
                (api && ticket.response[api.selectedScrollSnap()]._id) || ""
              }
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
