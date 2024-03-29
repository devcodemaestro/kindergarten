import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, TreeSelect, Checkbox } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../api/config";
import {
  getIndchildrenList,
  postIndNotice,
  postIndParentNotice,
} from "../../api/individualNotice/indivNoticeApi";
import { FileListStyle, WriteWrap } from "../../styles/album/album";
import { PageTitle } from "../../styles/basic";
import { BtnWrap, GreenBtn, PinkBtn } from "../../styles/ui/buttons";
import ModalOneBtn from "../ui/ModalOneBtn";
import { Cascader } from "antd";
import useCustomLogin from "../../hooks/useCustomLogin";
import ModalTwoBtn from "../ui/ModalTwoBtn";
import MyClass from "../user/MyClass";
import {
  IndClass,
  IndDetailTop,
} from "../../styles/individualNotice/inddetail";

const path = `${SERVER_URL}/api/notice`;
const { SHOW_CHILD } = Cascader;

export const initData = [
  {
    ikid: 0,
    inotice: 0,
    iclass: 0,
    noticeTitle: "",
    noticeContents: "",
    noticePics: [],
    kidNm: "",
  },
];

const IndWriteComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const ikid = searchParams.get("ikid");
  const kidNm = searchParams.get("kidNm");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  // const [indList, setIndList] = useState(initData);
  const navigate = useNavigate();
  const [noticeCheck, setNoticeCheck] = useState(0);
  const [selectedKids, setSelectedKids] = useState([]);
  const [showExceedLimitModal, setShowExceedLimitModal] = useState(false); // 파일 제한 초과 경고 모달 상태

  // 모달 상태 관리
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);

  // 로그인 회원 정보에서 아이 리스트 추출
  const {
    loginState,
    isLogin,
    isParentLogin,
    isTeacherLogin,
    isAdminLogin,
    isAccept,
  } = useCustomLogin();
  // console.log("loginState", loginState);

  const iclass = isAdminLogin ? 0 : loginState.iclass;

  useEffect(() => {
    fetchChildrenList();
  }, []);

  const beforeUpload = (file, fileList) => {
    const totalFiles =
      fileList.length + fileList.filter(f => f.status === "done").length;
    if (totalFiles > 5) {
      setShowExceedLimitModal(true); // 경고 모달 표시
      return Upload.LIST_IGNORE; // 파일 업로드 중단
    }
    return true; // 파일 추가를 계속 진행
  };

  const handleExceedLimitModalOk = e => {
    setShowExceedLimitModal(false); // 경고 모달 닫기
    e.stopPropagation(); // 이벤트가 상위 엘리먼트에 전달되지 않게 막기
  };

  const fetchChildrenList = async () => {
    try {
      const response = await getIndchildrenList({
        product: {},
        successFn: handleChildrenListSuccess,
        failFn: handleChildrenListFail,
        errorFn: handleChildrenListError,
      });
    } catch (error) {
      // console.error("Error fetching children list:", error);
    }
  };

  const handleChildrenListSuccess = data => {
    // console.log("data", data);
    const groupedData = groupChildrenByClass(data);
    // console.log("groupedData", groupedData);
    const treeData = groupedData.map(classItem => ({
      title: getClassTitle(classItem.classNumber),
      value: classItem.classNumber,
      key: classItem.classNumber,
      children: classItem.children.map(child => ({
        title: child.kidNm,
        value: child.ikid,
        key: child.ikid,
      })),
    }));
    setTreeData(treeData);
  };
  // console.log("treeData 확인", treeData);
  // console.log("treeData", treeData.key === isTeacherLogin.iclass);
  const getClassTitle = classNumber => {
    switch (classNumber) {
      case 1:
        return "무궁화반";
      case 2:
        return "해바라기반";
      case 3:
        return "장미반";
      default:
        return "";
    }
  };

  const onChange = e => {
    setNoticeCheck(e.target.checked ? 1 : 0); // 중요 체크를 했을 때 1, 안 했을 때 0으로 설정
  };

  const handleChildrenListFail = errorMessage => {
    // console.error("Failed to fetch children list:", errorMessage);
  };

  const handleChildrenListError = error => {
    // console.error("Error while fetching children list:", error);
  };

  const formRef = useRef();

  const handleGreenButtonClick = () => {
    formRef.current.submit();
  };

  const handleChange = info => {
    let newFileList = [...info.fileList].filter(file => !!file.status);
    if (newFileList.length > 5) {
      // 파일 리스트의 길이가 5개를 초과할 경우 모달 창을 띄움
      setIsModalVisible(true);
      // 5개를 초과한 파일은 제외하고 설정
      newFileList = newFileList.slice(-5);
    }
    setFileList(newFileList);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const customRequest = ({ onSuccess }) => {
    onSuccess("ok");
  };

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false);
    navigate(
      isParentLogin
        ? `/ind/details/${pageNumber}?year=2024&page=1&ikid=${ikid}`
        : `/ind/details/${pageNumber}?year=2024&page=1&iclass=${iclass}`,
    );
  };

  // 취소 확인 모달 핸들러
  const handleCancelConfirmModalOk = () => {
    setShowCancelConfirmModal(false);
  };

  const handleCancelConfirmation = () => {
    setShowCancelConfirmModal(true); // 취소 확인 모달 표시
  };
  const [pageNumber, setPageNumber] = useState("");
  const returnPage = listNumber => {
    setPageNumber(listNumber.result[0]);
  };

  const onFinish = async data => {
    // console.log("data", data);
    const formData = new FormData();

    fileList.forEach(file => {
      formData.append("pics", file.originFileObj);
    });

    // JSON 데이터 추가
    const ikids = isLogin ? selectedKids : [ikid];
    const dto = {
      ikids: ikids, // ikids 필드 추가
      noticeTitle: data.noticeTitle,
      noticeContents: data.noticeContents,
      noticeCheck: noticeCheck ? 1 : 0,
    };
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" }),
    );
    isLogin
      ? postIndNotice({
          product: formData,
          successFn: listNumber => {
            setShowSuccessModal(true), returnPage(listNumber);
          }, // 성공 모달 표시
          failFn: handleFail,
          errorFn: handleError,
        })
      : postIndParentNotice({
          product: formData,
          successFn: listNumber => {
            setShowSuccessModal(true), returnPage(listNumber);
          }, // 성공 모달 표시
          failFn: handleFail,
          errorFn: handleError,
        });
  };

  const handleCancelOk = () => {
    navigate(`/ind?year=2024&page=1&iclass=0`);
    setIsModalVisible(false);
  };

  const handleCancelConfirmModalCancel = e => {
    // 모달을 닫음
    setShowCancelConfirmModal(false);
    e.stopPropagation();
  };

  const handleSuccess = () => {
    setIsModalVisible(true);
  };

  const handleFail = errorMessage => {
    Modal.error({
      title: "알림장 업로드 실패",
      content: errorMessage,
    });
  };

  const handleError = error => {
    // console.error("오류", error);
    Modal.error({
      title: "오류",
      content: error,
      onOk: () => {
        navigate(`/ind?year=2024&page=1&ikid=${ikid}`);
      },
    });
  };

  const groupChildrenByClass = children => {
    const grouped = children.reduce((acc, child) => {
      const { iclass } = child;
      if (!acc[iclass]) {
        acc[iclass] = [];
      }
      acc[iclass].push(child);
      return acc;
    }, {});
    return Object.keys(grouped).map(classNumber => ({
      classNumber: parseInt(classNumber),
      children: grouped[classNumber],
    }));
  };

  return (
    <div>
      <PageTitle>알림장</PageTitle>
      <WriteWrap>
        {isAdminLogin ? (
          <TreeSelect
            style={{ width: "100%" }}
            treeData={treeData}
            placeholder="유치원생 선택"
            treeCheckable={true}
            showCheckedStrategy={SHOW_CHILD}
            onChange={value => {
              if (Array.isArray(value)) {
                setSelectedKids(value);
              } else {
                setSelectedKids([value]);
              }
            }}
          />
        ) : isTeacherLogin ? (
          <TreeSelect
            style={{ width: "100%" }}
            treeData={treeData.filter(item => item.value === loginState.iclass)} // 본인의 반만 필터링하여 사용
            placeholder="유치원생 선택"
            treeCheckable={true}
            showCheckedStrategy={SHOW_CHILD}
            onChange={value => {
              if (Array.isArray(value)) {
                setSelectedKids(value);
                // console.log("value check", value);
              } else {
                setSelectedKids([value]);
              }
            }}
          />
        ) : (
          <IndDetailTop>
            <IndClass>
              <h4>{kidNm}</h4>
            </IndClass>
          </IndDetailTop>
        )}
        <Checkbox onChange={onChange} style={{ margin: "1rem 0" }}>
          중요
        </Checkbox>
        <Form ref={formRef} form={form} onFinish={onFinish}>
          <Form.Item
            name="noticeTitle"
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
            name="noticeContents"
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
          <FileListStyle>
            <Upload.Dragger
              action={`${path}`}
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              customRequest={customRequest}
              className="upload-list-inline"
              maxCount={5}
              multiple={true}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>업로드(최대 5개)</Button>
            </Upload.Dragger>
          </FileListStyle>
        </Form>

      </WriteWrap>
      <BtnWrap right>
        <GreenBtn type="button" onClick={handleGreenButtonClick}>
          등록
        </GreenBtn>
        <PinkBtn type="button" onClick={handleCancelConfirmation}>
          취소
        </PinkBtn>
      </BtnWrap>
      
      {/* 모달창 */}
      {/* 등록 성공 모달 */}
      {showSuccessModal && (
        <ModalOneBtn
          isOpen={showSuccessModal}
          handleOk={handleSuccessModalOk}
          title="등록 완료"
          subTitle="성공적으로 등록되었습니다."
        />
      )}

      <Link
        to={
          isParentLogin
            ? `/ind?year=2024&page=1&ikid=${ikid}`
            : `/ind?year=2024&page=1&iclass=${iclass}`
        }
      >
        {/* 취소 확인 모달 */}
        {showCancelConfirmModal && (
          <ModalTwoBtn
            isOpen={showCancelConfirmModal}
            handleOk={handleCancelConfirmModalOk}
            handleCancel={handleCancelConfirmModalCancel}
            title="정말 취소할까요?"
            subTitle="작성된 내용은 저장되지 않습니다."
            maskClosable={false}
          />
        )}

        {/* 파일 제한 초과 경고 모달 */}
        <ModalOneBtn
          isOpen={showExceedLimitModal}
          handleOk={handleExceedLimitModalOk}
          title="파일 업로드 제한 초과"
          subTitle="최대 5개까지만 업로드할 수 있습니다."
        />
      </Link>
    </div>
  );
};

export default IndWriteComponent;
