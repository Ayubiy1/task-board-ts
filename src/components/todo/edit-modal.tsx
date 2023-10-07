import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DataTypes, ListsTypes } from "../../data";
import useSelection from "antd/es/table/hooks/useSelection";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setEditModal } from "../../redux/reducers";
import { api } from "../api-creat";
import { useMutation, useQuery } from "react-query";

interface EditModalType {
  listId: number;
}

const EditModal = ({ listId }: EditModalType) => {
  const { isLoading, isError, data } = useQuery("repoData", () => {
    return api.get("/todo");
  });

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return api.post("/todo", newTodo);
    },
  });

  const todoData = useAppSelector((state) => state?.dataa);
  const todoDataId = useAppSelector((state) => state?.boardId);
  const editModal = useAppSelector((state) => state?.editModal);
  const listID = useAppSelector((state) => state?.listId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(setEditModal(true));
  };

  const handleOk = () => {
    dispatch(setEditModal(false));
  };

  const handleCancel = () => {
    dispatch(setEditModal(false));
  };

  const onFinissh = (values: { title: string }) => {
    console.log(values);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={editModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form>
          {todoData
            .filter((boardD: DataTypes, index: number) => index == todoDataId)
            .map((i: DataTypes) => {
              return i.lists.map((list) => {
                if (list.id == listID) {
                  return (
                    <Form initialValues={list} onFinish={onFinissh}>
                      <Form.Item name={"title"}>
                        <Input value={list.title} />
                      </Form.Item>

                      <Form.Item className="text-right">
                        <Button htmlType="submit">Change</Button>
                      </Form.Item>
                    </Form>
                  );
                }
              });
            })}
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
