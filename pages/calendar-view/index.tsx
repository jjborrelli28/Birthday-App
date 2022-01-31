import React, { useEffect } from "react";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Title from "../../components/title";
import { useAuthContext } from "../../hooks/useAuthContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  getEventStyleGetter,
  formatDate,
  getDates,
  getEvents,
  localizer,
  getURL,
} from "../../helpers/helpers";
import { BirthdayElement } from "../../modules/home-management/interfaces";
import { GetServerSideProps } from "next";
import Button from "../../components/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserEdit, FaUserSlash } from "react-icons/fa";
import { Modal } from "../../components/modal";
import { useModalContext } from "../../hooks/useModalContext";
import Alert from "../../components/alert";
import {
  initialState,
  reducer,
} from "../../modules/calendar-management/reducer";
import { Calendar, SlotInfo } from "react-big-calendar";

type DataProps = {
  birthdays: BirthdayElement[];
  url: string;
};

const CalendarView = ({ birthdays, url }: DataProps) => {
  const { auth } = useAuthContext();

  const router = useRouter();

  const modal = useModalContext();

  const { active, text, variant, payload, isRefreshing, setModal } = modal;

  if (isRefreshing) {
    router.replace(router.asPath);
  }

  useEffect(() => {
    setModal({ ...modal, isRefreshing: false });
  }, [birthdays]);

  const [{ select, date, user }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const events = getEvents(birthdays);

  const onSelectSlot = (slotInfo: SlotInfo) => {
    dispatch({
      type: "unselect",
      payload: {
        date: slotInfo.slots[0].toString(),
      },
    });
  };

  const onSelectEvent = (e: {
    title: string;
    start: Date;
    end: Date;
    notes: string;
    user: {
      id: string;
      fullName: string;
    };
  }) => {
    dispatch({
      type: "select",
      payload: {
        id: e.user.id,
        fullName: e.user.fullName,
      },
    });
  };

  return (
    <Layout
      title="Birthday App | Calendar View"
      description="Calendar view page"
      auth={auth}
    >
      <Container>
        <Title>Calendar View</Title>
        <Line />
        <div className={styles.menu}>
          <Button
            variant="secondary"
            shadow={true}
            onClick={() => router.push("/home")}
          >
            <IoMdArrowRoundBack />
          </Button>
          <div className={styles.options}>
            <Button
              variant="danger"
              shadow={true}
              onClick={(e: Event) => {
                e.preventDefault();
                setModal({
                  ...modal,
                  active: true,
                  text: "Do you want to delete this birthday? ",
                  payload: { id: user.id, name: user.fullName },
                  setModal,
                });
                dispatch({ type: "unselect", payload: { date: "" } });
              }}
              disabled={!select}
            >
              <FaUserSlash />
            </Button>
            <Button
              variant="warning"
              shadow={true}
              onClick={() => router.push(`/edit?id=${user.id}`)}
              disabled={!select}
            >
              <FaUserEdit />
            </Button>
            <Button
              variant="success"
              shadow={true}
              onClick={() =>
                router.push(date ? `/add?date=${formatDate(date)}` : "/add")
              }
            >
              <IoPersonAddSharp />
            </Button>
          </div>
        </div>
        <Line />
        <Calendar
          events={events}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={getEventStyleGetter}
          style={{ height: 500 }}
          selectable={true}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          views={["month", "day"]}
        />
        <Modal show={active}>
          <Modal.Header>{`Removing birthday from: ${payload.name}`}</Modal.Header>
          <Modal.Body>
            <Alert variant={variant}>{text}</Alert>
          </Modal.Body>
          <Modal.Footer url={url} />
        </Modal>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  const url = getURL(req.headers.host);

  const res = await fetch(`${url}/birthdays`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  let { birthdays } = await res.json();

  const { birthdayCurrentYear } = getDates();

  birthdays = birthdays.map((item: BirthdayElement) => {
    return {
      ...item,
      birthday: birthdayCurrentYear(item.birthday),
    };
  });

  return {
    props: { birthdays, url },
  };
};

export default CalendarView;
