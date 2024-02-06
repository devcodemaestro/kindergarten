import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import IndWriteComponent from "../../components/individualNotice/IndWriteComponent";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import useCustomLogin from "../../hooks/useCustomLogin";

const IndivNotiWrite = () => {
  const navigate = useNavigate();
  const { isLogin, isParentLogin } = useCustomLogin();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    if (!isLogin || isParentLogin) {
      // 로그인하지 않았을 경우
      setIsOpen(true);
      setTitle("관리자 전용 페이지");
      setSubTitle("관리자만 접근 가능합니다.");
    } else {
      // 다른 상황에 대한 처리가 필요한 경우 여기에 추가
      // 예를 들어, 기본 오류 메시지 설정 등
      // setTitle("에러");
      // setSubTitle("리스트를 불러오는 중 오류가 발생했습니다.");
    }
  }, [isLogin, isParentLogin]);

  const handleOk = () => {
    setIsOpen(false);
    if (!isLogin && isParentLogin) {
      navigate("/"); // 메인 페이지로 이동
    }
  };

  return (
    <>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <IndWriteComponent isLogin={isLogin} />
    </>
  );
};

export default IndivNotiWrite;
