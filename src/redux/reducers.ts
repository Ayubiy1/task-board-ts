import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data, DataTypes, ListsTypes } from "../data";

interface CounterState {
  value: number;
  collapsed: boolean;
  dataa: any;
  boardId: number;
  deleteId: number;
  editModal: boolean;
  listId: number;
}

const initialState: CounterState = {
  value: 0,
  collapsed: false,
  dataa: data,
  boardId: 0,
  deleteId: 0,
  editModal: false,
  listId: 1,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = true;
    },

    setData: (state, action: PayloadAction<string>) => {
      const maxIdInLists = data.reduce(
        (max, current) =>
          current.lists.reduce(
            (innerMax, innerCurrent) =>
              innerCurrent.id > innerMax ? innerCurrent.id : innerMax,
            max
          ),
        0
      );

      state?.dataa[state?.boardId].lists.push({
        title: action?.payload,
        id: state?.dataa[state?.boardId].lists.length + 1,
        isActive: false,
      });
    },

    setBoardId: (state, action: PayloadAction<number>) => {
      state.boardId = action.payload;

      const boardID = state?.dataa.map((i: DataTypes) => i?.id);
    },

    setBoard: (state, action: PayloadAction<string>) => {
      const maxId = data.reduce(
        (max, current) => (current.id > max ? current.id : max),
        0
      );

      state?.dataa.push({
        boardName: action?.payload,
        id: state.dataa.length + 1,
        lists: [],
      });
    },

    setDeleteData: (state, action: PayloadAction<number>) => {
      state.deleteId = action.payload;
      state.dataa[state.boardId].lists = state.dataa[
        state.boardId
      ].lists.filter((i: DataTypes) => i.id !== state.deleteId);
    },

    setEditModal: (state, action: PayloadAction<boolean>) => {
      state.editModal = action.payload;
    },

    setListId: (state, action: PayloadAction<number>) => {
      state.listId = action.payload;
    },
  },
});

export const {
  setCollapsed,
  setData,
  setBoardId,
  setBoard,
  setDeleteData,
  setEditModal,
  setListId,
} = counterSlice.actions;
export default counterSlice.reducer;
