import { Button, Form } from "antd";
import styled from "styled-components";

export const StyleContainerSign = styled.div`
  width: 60%;
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;

  .ant-form {
    .ant-form-item {
      &.form-item-submit {
        margin-top: 32px;
        margin-bottom: 20px;

        .ant-btn {
          width: 100%;
        }
      }
    }
  }
`;

// export const StyleWrapperLogo = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   margin-bottom: 35px;

//   img {
//     width: 200px;
//   }
// `;

export const StyleLoginTitle = styled.h4`
  margin-bottom: 10px;
  color: #262626;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
`;

export const StyleLoginDescription = styled.div`
  margin-bottom: 32px;
  font-size: 16px;
  font-size: 16px;
  line-height: 19px;
  color: #8d8d8d;
`;

export const StyleFooter = styled.div`
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #000000;
`;

export const StyleMainBody = styled.div`
  width: 100%;
`;

export const StyleForm = styled(Form)`
  .mb-36 {
    margin-bottom: 36px;
  }
  .mb-26 {
    margin-bottom: 26px;
  }

  .form-password {
    .ant-form-item-control-input-content {
      .ant-input-suffix {
        cursor: pointer;
      }
    }
  }
`;

export const StyleWrapperRemember = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.committed--align-center {
    .checkbox-wrapper {
      .ant-row {
        align-items: flex-start;
      }
    }
  }

  .checkbox-wrapper {
    margin-bottom: 0;
    .ant-row {
      display: flex;
      flex-direction: row;
      flex-flow: nowrap;
      align-items: center;

      .ant-form-item-control {
        width: auto;
        margin-right: 15px;
      }

      .ant-form-item-label {
        order: 1;
        > label {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          color: #000000;
        }
      }
    }
  }
`;

export const StyleButton = styled(Button)`
  width: 100%;
  background-color: "#1b61bd";
`;

export const StyleTextOr = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
`;
export const StyleForgotPass = styled.a`
  line-height: 20px;
  color: #1976d2;
  font-size: 16px;
`;
