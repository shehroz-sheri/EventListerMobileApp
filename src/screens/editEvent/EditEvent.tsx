import { Event } from "../../types/types";
import CreateEvent from "../createEvent/CreateEvent";
import { useEditEvent } from "./useEditEvent";

const EditEvent: React.FC = () => {
  const eventParam: Event | undefined = useEditEvent();

  return <CreateEvent eventParam={eventParam} />;
};

export default EditEvent;
