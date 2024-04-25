import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TicketType } from "@/models/schemas/ticketSchema";
import { toast } from "sonner";
import FlagForm from "./flagForm";

export default function Response({ ticket }: { ticket: TicketType }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPoorResponseFormOpen, setIsPoorResponseFormOpen] = useState(false);

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
      await navigator.clipboard.writeText(text);
      toast.success("copied");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle className="flex justify-center items-center gap-4">
          <Button
            variant={"ghost"}
            size={"icon"}
            className={!api?.canScrollPrev() ? "text-gray-300" : ""}
            disabled={!api?.canScrollPrev()}
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft />
          </Button>
          Response {current}/{count}
          <Button
            variant={"ghost"}
            size={"icon"}
            className={!api?.canScrollNext() ? "text-gray-300" : ""}
            disabled={!api?.canScrollNext()}
            onClick={() => api?.scrollNext()}
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
