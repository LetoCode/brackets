module.exports = function check(str, bracketsConfig) {

  let openBrackets = [];
  let closeBrackets = {};
  let odinaryOpenCloseBrackets = [];

  bracketsConfig.forEach(el => {
    openBrackets.push(el[0]);
    closeBrackets[el[1]] = el[0];
    if (el[1] === el[0]) {
      odinaryOpenCloseBrackets.push(el[0]);
    }
  });

  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let strI = str[i];
    if (openBrackets.includes(strI) && !odinaryOpenCloseBrackets.includes(strI)) {
      stack.push(strI);
    } else if (openBrackets.includes(strI) && odinaryOpenCloseBrackets.includes(strI)) {
      if (!stack.includes(strI)) {
        stack.push(strI);
      } else {
        stack = stackPop(stack, closeBrackets, strI);
      }
    } else {
      if (stack.length === 0) {
        return false;
      }
      stack = stackPop(stack, closeBrackets, strI);
    }
  };

  if (stack.length > 0) {
    console.log(false, 'stack.length > 0', stack);
    return false;
  }

  console.log(true);
  return true;
}

function stackPop(stack, closeBrackets, strI) {
  let lastOpenedBracket = stack[stack.length - 1];
  if (closeBrackets[strI] === lastOpenedBracket) {
    console.log(lastOpenedBracket, 'pop1')
    stack.pop();
  };
  return stack;
}
