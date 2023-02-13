// ******************************
export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "logo":
      validateLogo(values.logo, errors);
      break;
    case "name":
      validateName(values.name, errors);
      break;
    case "type":
      validateType(values.type, errors);
      break;
    case "description":
      validateDescription(values.description, errors);
      break;
    case "dueDate":
      validateDueDate(values.dueDate, errors);
      break;
    case "notifications":
      validateNotifications(values.notifications, errors);
      break;
    case "status":
      validateStatus(values.status, errors);
      break;
    default:
  }
  return errors;
};

function validateLogo(logo, errors) {
  let result = true;

  if (!logo) {
    errors.email = "Logo is Required";
    result = false;
  } else {
    // 네임 벨리데이션 
  }
  return result;
}

function validateName(name, errors) {
  let result = true;

  if (!name) {
    errors.email = "Name is Required";
    result = false;
  } else {
    // 네임 벨리데이션 
  }
  return result;
}


function validateType(type, errors) {
  let result = true;

  if (!type) {
    errors.type = "Type is Required";
    result = false;
  } else {
    // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // result = re.test(String(email).toLowerCase());
    // if (!result) errors.email = "Invalid Email address";
  }
  return result;
}


function validateDescription(description, errors) {
  let result = true;

  if (!description) {
    errors.description = "description is Required";
    result = false;
  } else {
    // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // result = re.test(String(email).toLowerCase());
    // if (!result) errors.email = "Invalid Email address";
  }
  return result;
}

function validateDueDate(dueDate, errors) {
  let result = true;

  if (!dueDate) {
    errors.dueDate = "DueDate is Required";
    result = false;
  } else {
    
  }
  return result;
}


// ******************************
function validateNotifications(notifications, errors) {
  let result = true;

  if (!notifications) {
    errors.notifications = "Notifications is Required";
    result = false;
  } else {
  }
  return result;
}

// ******************************
function validateStatus(status, errors) {
  let result = true;

  if (!status) {
    errors.status = "Status is Required";
    result = false;
  } else {
  }
  return result;
}