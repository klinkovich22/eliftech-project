export const deleteNull = (obj) =>{
  const readyObj = Object.assign({}, obj); 
  for (const [key, value] of Object.entries(readyObj)) {
    if (value===null){
      delete readyObj[key];
    }
  }
  return readyObj;
}