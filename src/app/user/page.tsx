import { Flex } from "antd";

import Feedback from "@/components/home/customer_feedback";
import Doctor from "@/components/home/expect_doctor";
import Faq from "@/components/home/faq/faq";
import Hero from "@/components/home/hero";
import WhyChooseUs from "@/components/home/whychoose";
import PostItems from "@/components/medicalNews/Post";
import { questions } from "@/interfaces/temp_data";
import PostItem_HomePage from "@/components/medicalNews/PostItem_HomePage";
import PostHomePage from "@/components/medicalNews/Post_Homepage";
export default function HomePage() {
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Hero />

      <Doctor />

      <Feedback />

      <WhyChooseUs />
      <Faq data={questions} />
      {/* <HealthConsultant /> */}
      <div style={{ backgroundColor: "#FFFFF", padding: "24px 96px" }}>
        <PostHomePage />
      </div>
    </Flex>
  );
}
