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
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TicketType } from "@/models/schemas/ticketSchema";
import { toast } from "sonner";

export default function Response({ ticket }: { ticket: TicketType }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
        <CardDescription>
          <i>Group: {ticket.group}, Category: xxx</i>
          <i>Customer xxx, Date: 2024/04/08</i>
        </CardDescription>
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
            toast.success("copied");
            console.log(
              "click copy",
              api && ticket.response[api.selectedScrollSnap()]._id,
              api && ticket.response[api.selectedScrollSnap()].answer
            );
          }}
        >
          Copy to clipboard
        </Button>
        <Button
          className="min-w-[200px]"
          onClick={() => {
            console.log(
              "click flag",
              api && ticket.response[api.selectedScrollSnap()]._id
            );
          }}
        >
          Flag as poor response
        </Button>
      </CardFooter>
    </Card>
  );
}
