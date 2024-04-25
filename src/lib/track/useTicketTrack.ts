import useSessionStore from "@/store/sessionStore";
import useUpdateEvent from "@/lib/requests/useUpdateEvent";
import {EEventAction, ETicketEventName, TTicketEventData} from "@/lib/track/track";

const useTicketTrack = () => {
    const {sessionId, currentRelatedTicketId} = useSessionStore();
    const {mutate: updateEvent} = useUpdateEvent();

    const track = <T extends TTicketEventData>(
        {
            eventName,
            data,
            action = EEventAction.CLICK
        }: {
            eventName: ETicketEventName,
            data: T
            action?: EEventAction
        }
    ) => {
        updateEvent({
            sessionId,
            relatedTicketId: currentRelatedTicketId,
            updateField: {
                name: eventName,
                action: action,
                data
            }
        })
    }

    return {
        track
    }
}

export default useTicketTrack;
