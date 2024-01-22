import styled from "@emotion/styled";
import { boxStyle, colors } from "../basic";

export const FormWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  padding: 3rem 5rem;
  width: 100%;
  max-width: 450px;
  ${boxStyle}
  background:#fafafa;
  border: 1px solid #f1f1f1;
  h3 {
    text-align: center;
    color: ${colors.greenDeep};
  }
  p {
    margin-top: 2rem;
  }
  a {
    float: right;
    color: ${colors.grayDeep};
    &:hover {
      color: ${colors.black};
    }
  }
  .ant-form-item .ant-form-item-explain-error {
    font-size: 1.2rem;
  }
`;

export const PrivacyWrap = styled.div`
  max-height: 30rem;
  overflow-y: auto;
  background: #fafafa;
  padding: 2rem;
  margin: 3rem 0;
  font-size: 1.3rem;
  div {
    margin-bottom: 1rem;
  }
`;