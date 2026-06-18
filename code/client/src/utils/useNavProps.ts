import { useOutletContext } from "react-router";

type SnackbarProps = {
  open: boolean;
  severity: string;
  message: string;
};

export const useNavProps = (): [
  (state: SnackbarProps) => void,
  (state: boolean) => void,
] => {
  return useOutletContext<
    [(state: SnackbarProps) => void, (state: boolean) => void]
  >();
};
