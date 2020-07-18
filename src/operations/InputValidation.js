function inputValidation(fileLines) {
  const isValid = /^\d+, \d+, \d{4}-\d{2}-\d{2}, \d{4}-\d{2}-\d{2}$/gm;
  const isValidForNULL = /^\d+, \d+, \d{4}-\d{2}-\d{2}, NULL$/gm;
  let isTrue = true;
  let counter = 0;
  fileLines.forEach((el) => {
    if (!isValid.test(el) && !isValidForNULL.test(el)) {
      counter++;
    }
  });
  if (counter > 0) {
    isTrue = false;
  }
  return isTrue;
}

export default inputValidation;
