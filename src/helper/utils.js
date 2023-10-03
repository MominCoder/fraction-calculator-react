export const isValidKeyPress = (key) => {
  const keyCodes = ["Backspace", "Delete", "Enter", "Escape"];

  //eslint-disable-next-line
  if (/^[0-9=\.\+\-\*/()]$/.test(key)) {
    return true;
  } else if (keyCodes.includes(key)) {
    return true;
  } else {
    return false;
  }
};
