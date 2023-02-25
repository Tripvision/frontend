import { useState, useEffect } from "react";

// ******************************
const useForm = ({ initState, callback, validator, checkBox, saveImgFile }) => {
  const [checkedItems, setCheckedItems] = useState(() => {
    if (checkBox === true) {
      return new Set();
    }
  });
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  // ******************************
  useEffect(() => {
    const isValidErrors = () =>
      Object.values(errors).filter(error => typeof error !== "undefined")
        .length > 0;
    if (isSubmited && !isValidErrors()) callback();
  }, [errors]);
  // ******************************
  const handleChange = e => {
    const { name, value } = e.target;
    if(name === 'projectLogoUrl') {
      encodeFileToBase64(e.target)
      saveImgFile()
    }
    // Due Date 세팅하기
    setState(() => ({
      ...state,
      [name]: value
    }));
  };

  const handleClear = () => {
    setState({})
    setCheckedItems([]);
  }

  const handleStatus = (e) => {
    setState({
      ...state,
      status : e.target.value
    })
  }

  const handleCheckedItemHandler = (name, checked) => {
    if (checked) {
      checkedItems.add(name);
      setCheckedItems(checkedItems);
    } else if (!checked && checkedItems.has(name)) {
      checkedItems.delete(name);
      setCheckedItems(checkedItems);
    }
  };


  const encodeFileToBase64 = (target) => {
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    let file = target.files[0]
    return new Promise((resolve) => {
      reader.onload = () => {
        setState({
          ...state,
          [target.name] : URL.createObjectURL(file),
          //[target.name] : reader.result,
        });
        resolve();
        target.value = ""; //같은 파일을 올리면 인지못해서 초기화
      };
    });
  };

  // ******************************
  const handleBlur = e => {
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0]
    }));
  };

  // ******************************
  const handleSubmit = e => {
    setIsSubmited(false);
    e.preventDefault();
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0]
    }));
    setIsSubmited(true);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    handleClear,
    handleStatus,
    handleCheckedItemHandler,
    state,
    checkedItems,
    errors,
    isSubmited,
  };
};

export default useForm;
