import "../index.css";
import { setNotification } from "../reducers/notificationReducer";
import { useSelector } from "react-redux";

const Notification = () => {
  const notificationState = useSelector((state) => state.notification);

  return (
    <>
      {!!notificationState.message ? (
        <div className={notificationState.type}>
          {notificationState.message}
        </div>
      ) : null}
    </>
  );
};

export default Notification;
