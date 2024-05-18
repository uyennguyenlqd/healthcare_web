import Image from "next/image";
import Link from "next/link";
import { Divider, Flex, Typography } from "antd";
import Title from "antd/es/typography/Title";

export const footerLinks = [
  {
    title: "About UTE Health",
    links: [
      { title: "Home", url: "/" },
      { title: "About us", url: "/" },
      { title: "Services", url: "/" },
    ],
  },
  {
    title: "Medical Services",
    links: [
      { title: "Online Counselling", url: "/" },
      { title: "Chat with Doctor", url: "/" },
      { title: "Book an Appointment", url: "/" },
    ],
  },
  // {
  //   title: "Hỗ trợ",
  //   links: [
  //     { title: "Điều Khoản Sử Dụng", url: "/" },
  //     { title: "Chính sách giải quyết khiếu nại", url: "/" },
  //     { title: "Chính Sách Bảo Mật", url: "/" },
  //   ],
  // },
  {
    title: "Support",
    links: [
      { title: "Terms of use", url: "/" },
      { title: "Complaints Handling Policy", url: "/" },
      { title: "Privacy Policy", url: "/" },
    ],
  },
];
const Footer: React.FC = () => {
  return (
    <footer
      style={{
        flexDirection: "column",
        padding: "8px 96px ",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Flex
        style={{
          flexWrap: "wrap",
          justifyContent: "space-between",

          gap: "5px",
        }}
      >
        <Flex gap={10} style={{ flexDirection: "column", marginTop: "8px" }}>
          <Flex>
            <Title
              style={{
                fontSize: 26,
                fontWeight: "bold",
                margin: 0,
                color: "#1677FF",
                marginRight: "5px",
              }}
              level={4}
            >
              UTE
            </Title>

            <Title
              style={{
                fontSize: 26,
                fontWeight: "bold",
                margin: 0,
                color: "#10217D",
              }}
              level={4}
            >
              Health
            </Title>
          </Flex>
          <Flex
            style={{
              flexDirection: "column",
              color: "#121212",

              letterSpacing: "0.3px",
              gap: "10px",
            }}
          >
            <Typography>
              {/* Địa chỉ : 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí
              Minh */}
              Address : 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí
              Minh
            </Typography>
            <Typography>Hotline : 0123456789</Typography>
            <Typography>Website : https://utehealth.vn/</Typography>
            <Typography>Email : utehealth@gmail.com</Typography>
          </Flex>
          <Flex gap={10}>
            <Image
              src="/icons/facebook.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <Image
              src="/icons/instagram.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <Image src="/icons/twitter.svg" alt="icon" width={30} height={30} />
          </Flex>
        </Flex>

        <Flex
          gap={100}
          style={{ justifyContent: "space-evenly", marginRight: "10px" }}
        >
          {footerLinks.map((item) => (
            <div key={item.title}>
              <h3 style={{ fontWeight: "bold", color: "#10217D" }}>
                {item.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {item.links.map((link, idx) => (
                  //TODO :change color when hover
                  <Link key={idx} href={link.url} style={{ color: "#121212" }}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Flex>
      </Flex>

      <Divider />
      <Typography style={{ textAlign: "center" }}>
        {" "}
        Copyright @ MSFT Pro {new Date().getFullYear()}{" "}
      </Typography>
    </footer>
  );
};
export default Footer;
