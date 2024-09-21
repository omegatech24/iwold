const blackList = new Set();
const addToBlackList =(token) =>{
    blackList.add(token); 
};

module.exports = {blackList, addToBlackList};