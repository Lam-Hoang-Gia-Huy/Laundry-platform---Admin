import React, { useState, useEffect } from "react";
import { Select, Input, Button, Flex } from "antd";
import { AppContext } from "../../ContextProvider";
import { useContext } from "react";
import { Typography } from "antd";

const { Title } = Typography;

const TagManagement = () => {
  const { material, setMaterial } = useContext(AppContext);
  const { cloth, setCloth } = useContext(AppContext);
  const materialOptions = material.map((item) => item.name);
  const clothOptions = cloth.map((item) => item.name);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions);
  const [selectedCloth, setSelectedCloth] = useState(clothOptions);
  const [inputMaterialValue, setInputMaterialValue] = useState("");
  const [inputClothValue, setInputClothValue] = useState("");
  const filteredMaterialOptions = materialOptions.filter(
    (o) => !selectedMaterial.includes(o)
  );
  const filteredClothOptions = clothOptions.filter(
    (o) => !selectedCloth.includes(o)
  );

  const handleAddMaterial = () => {
    setMaterial([...material, { name: inputMaterialValue }]);
    setInputMaterialValue("");
  };
  const handleAddCloth = () => {
    setCloth([...cloth, { name: inputClothValue }]);
    setInputClothValue("");
  };

  const handleMaterialDeselect = (deselectedOption) => {
    setMaterial(material.filter((item) => item.name !== deselectedOption));
  };
  const handleClothDeselect = (deselectedOption) => {
    setCloth(cloth.filter((item) => item.name !== deselectedOption));
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div style={{ flexGrow: "1" }}>
          <Title>Material tag</Title>
          <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedMaterial}
            onChange={setSelectedMaterial}
            onDeselect={handleMaterialDeselect}
            style={{ marginBottom: "10px", maxWidth: "350px" }}
            options={filteredMaterialOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          />
          <Input
            value={inputMaterialValue}
            onChange={(e) => setInputMaterialValue(e.target.value)}
            placeholder="Add a new option"
            style={{ marginBottom: "10px", width: "200px", display: "Flex" }}
          />
          <Button onClick={handleAddMaterial}>Add material</Button>
        </div>
        <div style={{ flexGrow: "1" }}>
          <Title>Cloth tag</Title>
          <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedCloth}
            onChange={setSelectedCloth}
            onDeselect={handleClothDeselect}
            style={{ marginBottom: "10px", maxWidth: "350px" }}
            options={filteredClothOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          />
          <Input
            value={inputClothValue}
            onChange={(e) => setInputClothValue(e.target.value)}
            placeholder="Add a new option"
            style={{ marginBottom: "10px", width: "200px", display: "Flex" }}
          />
          <Button onClick={handleAddCloth}>Add cloth</Button>
        </div>
      </div>
    </div>
  );
};

export default TagManagement;
