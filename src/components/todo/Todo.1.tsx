import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Button, Form, Input, Typography, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { setDeleteData, setEditModal, setListId } from "../../redux/reducers";
import EditModal from "./edit-modal";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../api-creat";
import "./loading2.css";
import { useState } from "react";

// Types
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
export type ListPostType = {
  boardId: number;
  title: string;
  isActive: boolean;
};

export type ListType = ListPostType & { id: number };

export const Todo = ({ collapsed, activeBoard }: TodoProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const successPostList = () => {
    messageApi.open({
      type: "success",
      content: "List added successfully",
    });
  };
  const successDeleteList = () => {
    messageApi.open({
      type: "success",
      content: "The List was successfully deleted",
    });
  };

  const queryClient = useQueryClient();

  const boardId = useAppSelector((state) => state?.boardId);
  const deleteID = useAppSelector((state) => state.deleteId);
  const listID = useAppSelector((state) => state?.listId);

  // Get Lists
  const { data: listsData, isLoading } = useQuery("listsJson", () => {
    return api.get("/lists");
  });

  // Post Lists
  const {
    mutate: listPost,
    isLoading: isLoadingMutate,
    isError: isErrorMutate,
  } = useMutation(
    (itemData: ListPostType) => {
      console.log(itemData);

      return api.post(`/lists`, itemData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listsJson");
        successPostList();
      },
    }
  );

  //
  const {
    mutate: listDelete,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
  } = useMutation(
    (deleteIdd: number) => {
      return api.delete(`/lists/${deleteIdd}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listsJson");
        successDeleteList();
      },
    }
  );

  const dispatch = useAppDispatch();

  // Posting new information to ListsPost
  const onFinish = (values: { title: string }) => {
    const newData: ListPostType = {
      boardId: boardId,
      title: values.title,
      isActive: false,
    };
    listPost(newData);
  };

  if (isLoading) <>Loading...</>;
  return (
    <>
      {contextHolder}

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
        {isLoading && (
          <div className="bg-red-500">
            <div className="loader">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>
          </div>
        )}

        {listsData?.data
          ?.filter((listss: ListPostType) => boardId == listss.boardId)

          .map((lisst: ListType, index: number) => {
            return (
              <div
                className="mt-5 p-3 flex items-center justify-between rounded-xl bg-white"
                key={index}
                style={{
                  boxShadow: "1px 0px 16px -3px rgba(34, 60, 80, 0.32)",
                }}
              >
                <Typography>{lisst?.title}</Typography>

                <div className="flex items-center gap-5">
                  <Button
                    className="bg-blue-600 flex items-center text-white"
                    onClick={() => {
                      dispatch(setEditModal(true));
                      dispatch(setListId(lisst?.id));
                      // setListId(lisst?.id);
                    }}
                  >
                    <EditOutlined />
                  </Button>

                  <EditModal listId={lisst?.id} />

                  <Button
                    className="bg-red-600 flex items-center text-white"
                    onClick={() => {
                      // dispatch(setDeleteData(index));
                      // setDeleteId(8);
                      listDelete(lisst?.id);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
