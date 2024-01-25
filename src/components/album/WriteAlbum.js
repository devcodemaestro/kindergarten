import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload, Modal } from "antd";
import { PageTitle } from "../../styles/basic";
import { GreenBtn, PinkBtn } from "../../styles/ui/buttons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SearchBar } from "../../styles/album/album";

const WriteAlbum = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleChange = info => {
    let fileList = [...info.fileList];
    setFileList(fileList);
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelConfirmation = () => {
    Modal.confirm({
      title: "정말 취소할까요?",
      content: "작성된 내용은 저장되지 않습니다.",
      onOk: handleCancleOk,
      okText: "확인",
      cancelText: "취소",
      onCancel: () => {},
    });
  };

  const onFinish = () => {
    form
      .validateFields()
      .then(() => {
        const { Input, TextArea } = form.getFieldsValue();
        if (!Input || !TextArea) {
          Modal.warning({
            title: "입력 오류",
            content: "제목과 내용을 입력해주세요.",
          });
        } else {
          showModal();
        }
      })
      .catch(errorInfo => {
        console.log("Validation failed:", errorInfo);
      });
  };
  const handleCancleOk = () => {
    // 여기에 삭제 처리 로직을 추가할 수 있습니다.

    // 예시: 삭제 처리 후 /notice 페이지로 이동
    navigate("/notice");

    setIsModalVisible(false);
  };
  return (
    <div>
      <PageTitle>활동앨범</PageTitle>
      <div
        style={{
          width: "100%",
          height: 560,
          padding: 16,
          borderTop: "1.5px solid #00876D",
          borderBottom: "1.5px solid #00876D",
          background: "#FAFAFA",
          marginTop: 30,
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="Input"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요!",
              },
            ]}
          >
            <Input placeholder="제목 입력" />
          </Form.Item>

          <Form.Item
            style={{ height: "150px" }}
            name="TextArea"
            rules={[
              {
                required: true,
                message: "내용을 입력해주세요!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="내용 입력"
              style={{ height: "150px" }}
            />
          </Form.Item>

          <Upload
            action="http://localhost:3000/notice/write"
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            customRequest={customRequest}
            className="upload-list-inline"
            maxCount={3}
          >
            <Button icon={<UploadOutlined />}>업로드 (최대 3개 파일)</Button>
          </Upload>
        </Form>
      </div>
      <div
        style={{
          marginTop: 35,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <GreenBtn htmlType="submit" onClick={onFinish}>
          등록
        </GreenBtn>
        <PinkBtn onClick={handleCancelConfirmation} style={{ marginLeft: 20 }}>
          취소
        </PinkBtn>
      </div>

      <Link to="/notice">
        <Modal
          title="등록 완료"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="확인"
          cancelButtonProps={{ style: { display: "none" } }}
          width={350}
        >
          <p>성공적으로 등록되었습니다.</p>
        </Modal>
      </Link>
    </div>
  );
};

export default WriteAlbum;