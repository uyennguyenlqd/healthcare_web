import Image from "next/image";
import Link from "next/link";
import { Divider, Flex, Typography } from "antd";
import Title from "antd/es/typography/Title";

export const footerLinks = [
  {
    title: "About UTE Health",
    links: [
      { title: "Home", url: "/user" },
      { title: "About us", url: "/user/footer/about-us" },
      { title: "Contact", url: "/user/contact" },
    ],
  },
  {
    title: "Medical Services",
    links: [
      { title: "Online Counselling", url: "/user/online-counselling" },
      { title: "Chat with Doctor", url: "/" },
      { title: "Book an Appointment", url: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Terms of use", url: "/user/footer/term-of-use" },
      {
        title: "Complaints Handling Policy",
        url: "/user/footer/complaint-handling-policy",
      },
      { title: "Privacy Policy", url: "/user/footer/privacy-policy" },
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
              Address : 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí
              Minh
            </Typography>
            <Typography>Hotline : 0123456789</Typography>
            <Typography>Website : https://utehealth.vn/</Typography>
            <Typography>Email : utehealth@gmail.com</Typography>
          </Flex>
          <Flex gap={10}>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/facebook.svg"
                alt="icon"
                width={30}
                height={30}
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/instagram.svg"
                alt="icon"
                width={30}
                height={30}
              />
            </a>
            <a
              href="https://x.com/?lang=vi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/twitter.svg"
                alt="icon"
                width={30}
                height={30}
              />
            </a>
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
