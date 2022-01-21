import { ModalContextProps } from "../contexts/modal/interfaces";

type DeleteBirthdayProps = {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  payload: { id: string; name: string };
  setLoadState: any;
  setModal: any;
  modal: ModalContextProps;
};

export const deleteBirthday = ({
  e,
  payload,
  setLoadState,
  setModal,
  modal,
}: DeleteBirthdayProps) => {
  e.preventDefault();

  setLoadState(true);

  fetch(`${process.env.NEXT_PUBLIC_API_V1}/john/birthdays/${payload.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setModal({
          ...modal,
          text: "The birthday was removed ✔",
          variant: "success",
        });
      } else {
        setModal({
          ...modal,
          text: `Error deleting birthdays: ${data.message}`,
          variant: "danger",
        });
      }
    })
    .catch((error) =>
      setModal({
        ...modal,
        text: `Error deleting birthdays: ${error}`,
        variant: "danger",
      })
    );
  setTimeout(() => {
    setModal({
      ...modal,
      active: false,
      isRefreshing: true,
    });
    setLoadState(false);
  }, 2000);
};
