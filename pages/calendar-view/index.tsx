import React from "react";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Title from "../../components/title";
import { useAuthContext } from "../../hooks/useAuthContext";

const CalendarView = () => {
  const { auth } = useAuthContext();

  return (
    <Layout
      title="Birthday App | Calendar View"
      description="Calendar view page"
      auth={auth}
    >
      <Container>
        <Title>Calendar View</Title>
        <Line />
      </Container>
    </Layout>
  );
};

export default CalendarView;
