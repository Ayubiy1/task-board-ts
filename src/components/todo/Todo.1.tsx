import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Button, Form, Input, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  setCollapsed,
  setData,
  setDeleteData,
  setEditModal,
  setListId,
} from "../../redux/reducers";
import { DataTypes, data } from "../../data";
import { useLocalStorageState } from "ahooks";
import EditModal from "./edit-modal";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../api-creat";

export interface TodoProps {
  collapsed: boolean;
  activeBoard: number;
}

export interface onFinishValues {
  title: string;
}

type FieldType = {
  title?: string;
};

export type TodoItem = {
  id: string;
  title: string;
};

export const Todo = ({ collapsed, activeBoard }: TodoProps) => {
  const boardId = useAppSelector((state) => state.boardId);
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery("repoData", () => {
    return api.get("/todo");
  });

  const {
    mutate,
    isLoading: isLoadingMutate,
    isError: isErrorMutate,
  } = useMutation(
    (data: TodoItem) => api.post("http://localhost:3004/data", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  const state = useAppSelector((state) => state?.dataa);
  const [editActiv, setEditActive] = useState(false);
  const [dataTodo, setDataTodo] = useLocalStorageState<DataTypes>("DataTodo", {
    defaultValue: state,
  });

  const dispatch = useAppDispatch();

  const onFinish = (values: { title: string }) => {
    dispatch(setData(values.title));
    console.log(boardId);
  };

  if (isLoading) <>Loading...</>;
  return (
    <>
      <Form className="w-[600px] flex items-center mx-auto" onFinish={onFinish}>
        <Form.Item<FieldType>
          name="title"
          rules={[{ required: true, message: "Iltimos tas!" }]}
        >
          <Input
            className="w-[555px] rounded-l-2xl rounded-r-none"
            placeholder="Task name edit"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center bg-blue-600 rounded-r-2xl rounded-l-none text-white"
          >
            Add task
          </Button>{" "}
        </Form.Item>
      </Form>

      <div className="w-[100%] flexflex-wrap gap-10 items-center justify-center h-[73vh] overflow-y-scroll p-2">
        {data?.data
          ?.filter((i: DataTypes) => i.id == activeBoard)
          ?.map((item: DataTypes) => {
            return item?.lists.map((list) => {
              return (
                <div
                  className="mt-5 p-3 flex items-center justify-between rounded-xl bg-white"
                  key={list?.id}
                  style={{
                    boxShadow: "1px 0px 16px -3px rgba(34, 60, 80, 0.32)",
                  }}
                >
                  {editActiv ? (
                    <Input placeholder="Add a Todo..." />
                  ) : (
                    <Typography>{list?.title}</Typography>
                  )}
                  <div className="flex items-center gap-5">
                    <Button
                      className="bg-blue-600 flex items-center text-white"
                      onClick={() => {
                        dispatch(setEditModal(true));
                        dispatch(setListId(list?.id));
                      }}
                    >
                      <EditOutlined />
                    </Button>

                    <EditModal listId={list.id} />

                    <Button
                      className="bg-red-600 flex items-center text-white"
                      onClick={() => dispatch(setDeleteData(list?.id))}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              );
            });
          })}
      </div>
    </>
  );
};
