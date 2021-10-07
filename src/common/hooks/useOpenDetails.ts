import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const useOpenDetails = () => {
  const history = useHistory();
  return useCallback(
    (stock: string) => {
      history.push(`/details/${stock}`);
    },
    [history]
  );
};
