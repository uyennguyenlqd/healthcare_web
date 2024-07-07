"use client";
import { useEffect, useState } from "react";
import { Flex, Radio, RadioChangeEvent } from "antd";
import Search from "antd/es/input/Search";

import { DoctorApi } from "@/app/api/doctor";
import { Specialty } from "@/interfaces/models/doctors";
interface DoctorFilterProps {
  onFilter: (value: string) => void;
}
const DoctorFilter: React.FC<DoctorFilterProps> = ({ onFilter }) => {
  const [specialties, setSpecialty] = useState<Specialty[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(1);
  const handleOnSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await DoctorApi.getAllSpecialty();
        if (response && response.data && response.data.data) {
          setSpecialty(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    };

    fetchSpecialties();
  }, []);
  const handleOnChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    onFilter(e.target.value);
  };
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Search
        placeholder="Search By ......"
        allowClear
        onSearch={handleOnSearch}
      />
      <Radio.Group
        onChange={handleOnChange}
        value={value}
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <Radio key="none" value="">
          None
        </Radio>
        {specialties.map((specialty) => (
          <Radio key={specialty._id} value={specialty._id}>
            {specialty.name_specialty}
          </Radio>
        ))}
      </Radio.Group>
    </Flex>
  );
};
export default DoctorFilter;
