import Image from "next/image";
import { Carousel, Divider, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
const Feedback: React.FC = () => {
  const feedbacks = [
    {
      id: 1,

      feedback:
        "UTE Mental Health has completely transformed how I approach and manage my mental health. I feel more at ease knowing that I can easily connect with licensed therapists 24/7, from attending therapy sessions to accessing mental wellness resources. Whenever I experience anxiety or stress, I can quickly reach out and receive support from dedicated and compassionate professionals. Additionally, the platform's interface is extremely user-friendly and intuitive, allowing me to easily book appointments and manage my therapy sessions. UTE Mental Health has become an integral part of my mental health journey, providing me with constant support and peace of mind.",
      name: "Anjali Sharma",
      title: "MSFT Pro Customer",
    },
    {
      id: 2,
      feedback:
        "My experience with UTE Mental Health has been nothing short of amazing. This is not just a platform for therapy services but also an invaluable resource that has helped me better understand and take care of my mental health. The therapists I’ve worked with are attentive, empathetic, and always make me feel heard. The scheduling system is flexible, and I can easily book sessions at times that fit into my busy schedule. I'm so grateful to have found UTE Mental Health, where I can find continuous support in my emotional well-being journey.",
      name: "John Doe",
      title: "Regular Customer",
    },
    {
      id: 3,
      feedback:
        // eslint-disable-next-line max-len
        "UTE Mental Health is a fantastic platform that offers not only quality therapy services but also a community of care and understanding. With this platform, I can easily access top-tier therapists without having to leave home, which saves me time and makes me feel more secure. I’m particularly impressed by the counseling programs and self-care resources UTE Mental Health provides, allowing me to proactively manage my mental wellness. It's a powerful tool to help me cope with stress and anxiety, especially when life becomes overwhelming and hectic. I'm incredibly thankful to have UTE Mental Health by my side as I work to improve my mental health.",
      name: "Maria Garcia",
      title: "Health Enthusiast",
    },
  ];
  return (
    <div style={{ background: "#F0F8FF", padding: "0 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "36px" }}>
        What Customers Say About Us
      </h3>
      {/* TODO ADD CAROUSEL */}

      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Image
          src="/icons/customer.png"
          alt="doctor"
          width={600}
          height={600}
          style={{
            position: "relative",
            objectFit: "contain",
          }}
        />
        <Carousel
          autoplay
          style={{
            maxWidth: "800px",
            marginTop: "48px",
          }}
        >
          {feedbacks.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "0 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "22px",
                  color: "#121212",
                  lineHeight: "2rem",
                  letterSpacing: "0.3px",
                }}
              >
                “{item.feedback}”
              </Typography>
              <Divider />
              <Flex style={{ flexDirection: "column", marginTop: "24px" }}>
                <Typography
                  style={{
                    color: "#121212",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Typography>
                <br />
                <Typography style={{ color: "#696969", fontSize: "20px" }}>
                  {item.title}
                </Typography>
              </Flex>
            </div>
          ))}
        </Carousel>
      </div>
      <style>{`
  .slick-dots.slick-dots-bottom {
    bottom: 0;
    
  }
     .slick-dots li button {
          background-color: #bbb !important;
        
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s ease;
        }
    .slick-dots li.slick-active button {
          background: #10217D !important;
           height:4px;

         
        }
`}</style>
    </div>
  );
};
export default Feedback;
