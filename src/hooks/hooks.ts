import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RooteState, AppDispach } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispach>();
export const useAppSelector: TypedUseSelectorHook<RooteState> = useSelector;
