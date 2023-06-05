export const getOtherUsers=(logged,users)=>{
    var arr=[];
    users.forEach((user)=>{
        if(user._id!==logged._id){
            arr.push(user);
        }
    });
    return arr;
}