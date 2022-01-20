import { useState } from "react";

export const useLoadState = () => {
  const [loadState, setLoadState] = useState(false);

  return { loadState, setLoadState };
};
