import styled from "@emotion/styled";
import { colors, fonts, shadow } from "../basic";

export const TeacherTop = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const TeacherTopRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;
export const TeacherMain = styled.div`
  position: relative;
  min-height: 50vh;
  input {
    margin-right: 0.5rem;
  }
`;
export const TeacherListWrap = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  gap: 1rem;
`;
export const TeacherListItem = styled.li`
  position: relative;
  border-radius: 1rem;
  border-color: #ebebeb;
  width: 32%;
  background: ${colors.white};
  padding: 2rem;
  ${shadow}
  input {
    z-index: 999;
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
`;
export const ListBox = styled.div`
  position: relative;
  width: 100%;
  dl {
    display: flex;
    font-size: 1.5rem;
    font-weight: 300;
    dt {
      color: ${colors.grayDeep};
      margin-right: 3rem;
    }
    dd {
      color: ${colors.black};
    }
  }
`;
export const ListBoxTop = styled.div`
  position: relative;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
  button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

export const TeacherImgInfo = styled.div`
  width: 8rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 115%;
    margin-right: 1rem;
  }
`;
export const TeacherInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  p {
    padding-left: 3rem;
  }
  .sunflower {
    background: url(${process.env.PUBLIC_URL +
      "/images/information/sunflower.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: ${colors.orangeDeep};
  }
  .rose {
    background: url(${process.env.PUBLIC_URL + "/images/information/rose.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: #f5062c;
  }
  .hibiscus {
    background: url(${process.env.PUBLIC_URL +
      "/images/information/hibiscus.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: #ff73a1;
  }
  .discharge {
    background-image: url(${process.env.PUBLIC_URL +
    "/images/user/class_icon_bag.svg"});
    color: ${colors.grayDeep};
  }
  .graduation {
    background-image: url(${process.env.PUBLIC_URL +
    "/images/user/class_icon_graduation.svg"});
    color: ${colors.black};
  }
  .leaf {
    background: url(${process.env.PUBLIC_URL + "/images/information/logo1.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: ${colors.black};
  }
`;

export const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  dl {
    margin-top: 2rem;
    width: 45%;
    dt {
      margin-right: 2rem;
    }
  }
  p {
    margin-top: 2rem;
    color: ${colors.grayDeep};
    font-size: 1.5rem;
    font-weight: 300;
    width: 100%;
  }
  span {
    margin-top: 2rem;
    color: ${colors.black};
    font-size: 1.5rem;
    font-weight: 300;
  }
`;