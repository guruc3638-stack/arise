const code = `
function __py_in(item, coll) {
  if (coll === null || coll === undefined) return false;
  if (Array.isArray(coll) || typeof coll === "string") return coll.indexOf(item) !== -1;
  if (coll instanceof Set || coll instanceof Map) return coll.has(item);
  return (item in coll);
}

function isValidPacket(frameStr) {
  let stack = [];
  let mapping = {")": "(", "}": "{", "]": "["};
  for (let ch of (frameStr)) {
    if (__py_in(ch, ["(", "{", "["])) {
      stack.push(ch);
    } else {
      if ((!stack || stack.length === 0) || stack.pop() != mapping[ch]) {
        return false;
      }
    }
  }
  return (stack).length == 0;
}

console.log('Test 1 "{[()]}":', isValidPacket("{[()]}"));
console.log('Test 2 "{[(])}":', isValidPacket("{[(])}"));
console.log('Test 3 "()[]{}":', isValidPacket("()[]{}"));
`;

eval(code);
