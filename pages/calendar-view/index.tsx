import React, { useEffect } from "react";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Title from "../../components/title";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  eventStyleGetter,
  formatDate,
  getDates,
  getEvents,
} from "../../helpers/helpers";
import { BirthdayElement } from "../../modules/home-management/interfaces";
import { GetServerSideProps } from "next";
import { add, parseISO } from "date-fns";
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
import enUS from "date-fns/locale/en-US";

type BirthdaysProps = {
  birthdays: BirthdayElement[];
};

const CalendarView = ({ birthdays }: BirthdaysProps) => {
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

  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = getEvents(birthdays);

  const onSelectSlot = (e: any) => {
    dispatch({
      type: "unselect",
      payload: {
        date: e.slots[0],
      },
    });
  };

  const onSelectEvent = (e: any) => {
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
            text={<IoMdArrowRoundBack />}
            onClick={() => router.push("/home")}
          />
          <div className={styles.options}>
            <Button
              variant="danger"
              shadow={true}
              text={<FaUserSlash />}
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
            />
            <Button
              variant="warning"
              shadow={true}
              text={<FaUserEdit />}
              onClick={() => router.push(`/edit?id=${user.id}`)}
              disabled={!select}
            />
            <Button
              variant="success"
              shadow={true}
              text={<IoPersonAddSharp />}
              onClick={() =>
                router.push(date ? `/add?date=${formatDate(date)}` : "/add")
              }
            />
          </div>
        </div>
        <Line />
        <Calendar
          events={events}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
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
          <Modal.Footer />
        </Modal>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BDA_API}/birthdays`, {
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
    props: { birthdays },
  };
};

export default CalendarView;
