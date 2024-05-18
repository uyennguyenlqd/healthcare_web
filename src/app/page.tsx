import { Flex } from "antd";

import Feedback from "@/components/home/customer_feedback";
import Doctor from "@/components/home/expect_doctor";
import Expect_Spacialty from "@/components/home/expect_specialty";
import Faq from "@/components/home/faq/faq";
import Hero from "@/components/home/hero";
import WhyChooseUs from "@/components/home/whychoose";
import { questions } from "@/interfaces/temp_data";
import SearchSection from "@/components/home/search";
export default function Home() {
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Hero />

      <Doctor />
      <Expect_Spacialty />
      <Feedback />

      <WhyChooseUs />
      <Faq data={questions} />
      {/* <HealthConsultant /> */}
    </Flex>
  );
}
