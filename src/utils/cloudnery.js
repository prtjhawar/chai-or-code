import {v2 as cloudinary} from "cloudinary";
import fs from "fs"


//file upload krne ki permission confi.. krna hoga
cloudinary.config({ 
    cloud_name: 'drnbg82fg', 
    api_key: '278361899726766', 
    api_secret: 'sOr4yc_HOIRyY_AQ4ERZQ0NuEpA'        
});

const uploadOncloud = async (localFIlePath) =>{
    try {
        if(!localFIlePath) return null
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFIlePath,{
            resource_type :"auto"
        })
        //file has been uploaded successfull
        // console.log("file is uploaded on cloudinry",response.url);
        fs.unlinkSync(localFIlePath)
        return response
        
        
    } catch (error) {
        fs.unlinkSync(localFIlePath)       //remove the locally saved temporary file as the upload operation got failed
        return null
        
    }
}


export  {uploadOncloud}

