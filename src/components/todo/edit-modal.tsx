import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DataTypes, ListsTypes } from "../../data";
import useSelection from "antd/es/table/hooks/useSelection";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setEditModal } from "../../redux/reducers";
import { api } from "../api-creat";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ListType } from "./Todo.1";
import axios from "axios";

interface EditModalType {
  listId: number;
}

const EditModal = ({}: EditModalType) => {
  const queryClient = useQueryClient();

  const editModal = useAppSelector((state) => state?.editModal);
  const listID = useAppSelector((state) => state?.listId);

  const { isLoading, isError, data } = useQuery("repoData", () => {
    return api.get("/todo");
  });

  // Get Edit modal List
  const { data: listsData } = useQuery("listsEdit", () => api.get(`/lists`));

  // Put List
  const { mutate: putList, isLoading: isLoadingPut } = useMutation(
    (putData: ListType) => {
      return axios.put(`http://localhost:3004/lists/${listID}`, putData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listsJson");
        dispatch(setEditModal(false));
      },
    }
  );

  const [listData, setListData] = useState({});

  const dispatch = useAppDispatch();

  const handleOk = () => {
    dispatch(setEditModal(false));
  };

  const handleCancel = () => {
    dispatch(setEditModal(false));
  };

  const onFinissh = (values: { title: string }) => {
    const newData: ListType = {
      boardId: listsData?.data[listID].boardId,
      title: values.title,
      isActive: listsData?.data[listID].isActive,
      id: listsData?.data[listID].id,
    };
    console.log(newData);

    putList(newData);
  };

  return (
    <>
      {listsData?.data
        .filter((boardD: ListType, index: number) => boardD?.id == listID)
        .map((list: ListType) => {
          return (
            <Modal
              title="Basic Modal"
              open={editModal}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={false}
              key={list?.id}
            >
              <Form initialValues={list} onFinish={onFinissh}>
                <Form.Item name={"title"}>
                  <Input value={list.title} />
                </Form.Item>

                <Form.Item className="text-right">
                  <Button htmlType="submit">Change</Button>
                </Form.Item>
              </Form>
            </Modal>
          );
        })}
    </>
  );
};

export default EditModal;
