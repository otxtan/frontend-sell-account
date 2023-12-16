// SelectCustom.js
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const SelectMutipleCustom = (props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      color: 'black', // Thay thế bằng màu chữ bạn muốn sử dụng
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black', // Màu chữ của options
    }),
  };

 
  const handleChange = (newValue, actionMeta) => {
    // Gọi hàm callback từ props và truyền giá trị mới
    if (props.onChange) {
      props.onChange(newValue);
    }
  };
  const handleCreateOption = (inputValue) => {
    // Xử lý sự kiện khi người dùng chọn tạo mới
    console.log('Creating new option:', inputValue);

    // Gọi hàm callback từ props và truyền giá trị mới
    if (props.onCreateOption) {
      props.onCreateOption(inputValue);
    }
  };

  return <CreatableSelect isMulti  options={props.options} value={props.value} onCreateOption={handleCreateOption}  styles={customStyles} onChange={handleChange} />;
};

export default SelectMutipleCustom;
