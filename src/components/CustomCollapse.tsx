import React from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps } from "antd";
import { CollapsibleType } from "antd/es/collapse/CollapsePanel";
import styled from "styled-components";

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean;
  extra?: React.ReactNode;
  collapsible?: CollapsibleType;
}

type CollaseScopeOfWorkProps = CollapseProps & {
  styleIcon?: React.CSSProperties;
};

let CustomCollapse: React.FC<CollaseScopeOfWorkProps> = (props) => {
  return (
    <Collapse
      bordered={false}
      expandIcon={(panelProps: PanelProps) =>
        panelProps?.isActive ? (
          <MinusCircleOutlined
            style={{
              fontSize: "24px",
              ...(props?.styleIcon || {}),
            }}
          />
        ) : (
          <PlusCircleOutlined
            style={{
              fontSize: "24px",
              ...(props?.styleIcon || {}),
            }}
          />
        )
      }
      expandIconPosition="end"
      collapsible="icon"
      defaultActiveKey={props.defaultActiveKey || ["1"]}
      style={{
        background: "white",
      }}
      {...props}
    />
  );
};

CustomCollapse = styled(CustomCollapse)`
  padding: 40px;

  .ant-collapse-item .ant-collapse-header {
    align-items: center;
    padding: 12px 0px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 4px 0px;
  }
`;

export default CustomCollapse;
