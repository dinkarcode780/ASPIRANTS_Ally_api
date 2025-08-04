// export const generateTransactionId = (slug) => {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
//   const randomPart = Array.from({ length: 4 }, () =>
//     letters.charAt(Math.floor(Math.random() * letters.length))
//   ).join('');

//   return `${slug}-${randomPart}`;
// };


export const generateTransactionId = (slug,title) => {
  return `${slug}-${title ? title.toLowerCase().replace(/\s+/g,'-'):''}`;
};










