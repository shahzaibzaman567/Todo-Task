// import {v2 as cloudinary} from "cloudinary"
// import dotenv from "dotenv"

// dotenv.config();

// cloudinary.config({
//   cloud_name:process.env.CLOUD_NAME,
//   api_secret:process.env.API_SECRET,
//   api_key:process.env.API_KEY
// })

// const opts={
//     overwrite:true,
//     invalidate:true,
//     resource_type:"auto"
// }

// export default module=(image)=>{ /// image  = > base 64
//     return new Promise((res,rej)=>{
//         cloudinary.uploader.upload(image,opts,(err,result)=>{
//             if(result && result.secure_url){
//                 console.log(result.secure_url)
//                 return res(result.secure_url);
//             }
//             console.log(err.message)
//             return rej({message:err.message })
//         })
//     })
// }