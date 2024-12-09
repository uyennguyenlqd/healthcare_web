// "use client";

// import { EllipsisOutlined } from "@ant-design/icons";
// import { Avatar, Button, Layout, Typography } from "antd";

// const DashboardHeader = () => {
//   //TODO

//   return (
//     <Layout.Header
//       style={{
//         display: "flex",
//         alignItems: "center",
//         // justifyContent: "space-between",
//         justifyContent: "flex-end",
//         width: "100%",
//         backgroundColor: "#f0f8ff",
//       }}
//     >
//       {/* <DynamicBreadcrumb /> */}
//       <div
//         style={{
//           display: "flex",
//           gap: "30px",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {/* <Notification /> */}
//         <div
//           style={{
//             padding: "0 10px 0 10px",
//             boxSizing: "border-box",
//             height: 55,
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             borderRadius: 8,
//           }}
//         >
//           {/* <Avatar size="large">{user?.display_name?.[0] ?? ""}</Avatar> */}
//           <Avatar size="large">J</Avatar>
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <Typography.Text style={{ fontSize: 13, fontWeight: 600 }}>
//               {/* {user?.display_name ?? ""} */}
//               Jennie Kim
//             </Typography.Text>
//           </div>
//           <Button
//             type="text"
//             size="small"
//             style={{ height: 36, borderRadius: "50%", marginLeft: 20 }}
//           >
//             <EllipsisOutlined
//               style={{ fontSize: 24, transform: "rotate(90deg)" }}
//             />
//           </Button>
//         </div>
//       </div>
//     </Layout.Header>
//   );
// };

// export default DashboardHeader;
"use client";

import { useSession } from "next-auth/react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Typography } from "antd";

const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        backgroundColor: "#ffff",
        height: "82px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "0 10px 0 10px",
            boxSizing: "border-box",

            display: "flex",
            alignItems: "center",
            gap: 16,
            borderRadius: 8,
          }}
        >
          {/* Hiển thị avatar và tên người dùng */}
          <Avatar
            size="large"
            src={
              session?.user?.image ||
              session?.user?.avatar ||
              "/icons/usericon.jpg"
            }
            style={{
              width: "50px",
              height: "50px",
            }}
          >
            {session?.user?.name?.charAt(0)}
          </Avatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text style={{ fontSize: 18, fontWeight: 600 }}>
              {session?.user?.name}
            </Typography.Text>
          </div>

          {/* Nút menu mở rộng */}
          <Button
            type="text"
            size="small"
            style={{ height: 36, borderRadius: "50%", marginLeft: 20 }}
          >
            <EllipsisOutlined
              style={{ fontSize: 24, transform: "rotate(90deg)" }}
            />
          </Button>
        </div>
      </div>
    </Layout.Header>
  );
};

export default DashboardHeader;
