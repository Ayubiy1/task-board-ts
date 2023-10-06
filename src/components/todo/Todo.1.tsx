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

export const Todo = ({ collapsed, activeBoard }: TodoProps) => {
  const state = useAppSelector((state) => state?.dataa);
  const deletee = useAppSelector((state) => state?.deleteId);
  const boardIndex = useAppSelector((state) => state?.boardId);

  const [editActiv, setEditActive] = useState(false);
  const [idActiv, IdActive] = useState(false);
  const [dataTodo, setDataTodo] = useLocalStorageState<DataTypes>("DataTodo", {
    defaultValue: state,
  });

  const dispatch = useAppDispatch();

  const onFinish = (values: { title: string }) => {
    dispatch(setData(values.title));
    console.log(state[boardIndex]?.lists);
  };

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
        {state
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
                  {/* <div
                    className="flex items-center gap-3 rounded-lg h-[35px] mt-2 p-1"
                    style={{
                      boxShadow: "1px 1px 7px 0px rgba(34, 60, 80, 0.23)",
                    }}
                  >
                    <div className="my-3 items-start border-solid p-2 rounded-xl border-amber-300 w-[80%]">
                      <Typography>Lorem ipsum</Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button className="flex items-center bg-red-600 text-white">
                        <DeleteOutlined />
                      </Button>
                      <Button className="flex items-center bg-blue-600 text-white">
                        <EditOutlined />
                      </Button>
                    </div>
                  </div> */}
                </div>
              );
            });
          })}
      </div>
    </>
  );
};
