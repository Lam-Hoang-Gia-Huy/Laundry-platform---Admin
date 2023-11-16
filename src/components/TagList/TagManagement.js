import React, { useState } from "react";
import { Input, Button } from "antd";
import { AppContext } from "../../ContextProvider";
import { useContext } from "react";
import { Typography } from "antd";
import axios from "axios";
import { config } from "../axios/auth-header";
import { Tag, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./TagManagement.css";

const { Title } = Typography;

const TagManagement = () => {
  const { material, setMaterial } = useContext(AppContext);
  const { cloth, setCloth } = useContext(AppContext);
  const [inputMaterialValue, setInputMaterialValue] = useState("");
  const [inputClothValue, setInputClothValue] = useState("");

  const handleAddMaterial = async () => {
    const newMaterial = { id: material.length + 1, name: inputMaterialValue };
    setMaterial([...material, newMaterial]);
    setInputMaterialValue("");
    try {
      const response = await axios.post(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/material/create",
        newMaterial,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCloth = async () => {
    const newCloth = { id: cloth.length + 1, name: inputClothValue };
    setCloth([...cloth, newCloth]);
    setInputClothValue("");

    try {
      const response = await axios.post(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/cloth/create",
        newCloth,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMaterialDeselect = (deselectedOption) => {
    setMaterial(material.filter((item) => item.name !== deselectedOption));
  };
  const handleClothDeselect = (deselectedOption) => {
    setCloth(cloth.filter((item) => item.name !== deselectedOption));
  };

  return (
    <div className="tag-management-container">
      <div className="tag-management-row">
        <div className="tag-management-column">
          <Title>Material tag</Title>
          {material.map((item, index) => (
            <Space size={[0, 8]} wrap>
              <Tag
                className="tag-management-tag"
                closeIcon={<CloseCircleOutlined />}
              >
                {item.name}
              </Tag>
            </Space>
          ))}
          <br />
          <Input
            className="tag-management-input"
            value={inputMaterialValue}
            onChange={(e) => setInputMaterialValue(e.target.value)}
            placeholder="Add a new option"
          />
          <Button className="tag-management-button" onClick={handleAddMaterial}>
            Add material
          </Button>
        </div>
        <div className="tag-management-column">
          <Title>Cloth tag</Title>
          {cloth.map((item, index) => (
            <Tag
              className="tag-management-tag"
              closeIcon={<CloseCircleOutlined />}
            >
              {item.name}
            </Tag>
          ))}
          <br />
          <Input
            className="tag-management-input"
            value={inputClothValue}
            onChange={(e) => setInputClothValue(e.target.value)}
            placeholder="Add a new option"
          />
          <Button className="tag-management-button" onClick={handleAddCloth}>
            Add cloth
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagManagement;
