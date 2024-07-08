"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Divider, Flex } from "antd";

import DoctorCard from "@/components/doctor/doctorCard";
import DoctorFilter from "@/components/doctorFilter/doctor_filter";
import HealthConsultant from "@/components/home/heath_consultant";
import SearchSection from "@/components/home/search";
import { userServiceClient } from "@/config/axios/userService";
import { DoctorModel } from "@/interfaces/models/doctors";

export default function OnlineCounselling() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchResults, setSearchResults] = useState<DoctorModel[]>([]);

  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const query = searchParams.get("query") || "";
        const specialtyId = searchParams.get("specialtyId") || "";

        const response = await userServiceClient.get("/doctor/get_all_doctor", {
          params: { query, specialtyId },
        });

        if (response && response.data && response.data.data) {
          setSearchResults(response.data.data);
        }
      } catch (error) {
        console.error("Error searching doctors:", error);
      }
    };

    fetchDoctors();
  }, [searchParams]);

  const handleSearch = (value: string) => {
    params.set("query", value);
    router.push(`/user/online-counselling?${params.toString()}`);
  };
  const handleFilter = (value: string) => {
    // setSelectedSpecialty(value);

    params.set("specialtyId", value);
    router.push(`/user/online-counselling?${params.toString()}`);
  };
  return (
    <Flex
      style={{
        flexDirection: "column",

        backgroundColor: "#F9FBFC",
        gap: "32px",
      }}
    >
      <SearchSection onSearch={handleSearch} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.6fr 0fr 1.4fr",
          gap: "32px",
          padding: "24px 96px",
        }}
      >
        <DoctorFilter onFilter={handleFilter} />
        <Divider type="vertical" style={{ height: "100%" }} />
        <Flex
          style={{
            gap: "32px",
            flexDirection: "column",
          }}
        >
          {searchResults.map((doctor, idx) => (
            <DoctorCard key={idx} doctor={doctor} />
          ))}
        </Flex>
      </div>

      <HealthConsultant />
    </Flex>
  );
}
