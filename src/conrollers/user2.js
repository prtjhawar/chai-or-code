const registerUser = asyncHandler( async(req,res)=>{
    // get user details from frontend
    //validation -not empty
    //check if user alredy exists : email , username
    // cheak for images , cheak for avatar
    //upload upload them to cloudnary , avatar
    //create user object = create entry in db
    //remove password and refrsh token filed from response
    //cheack for user creation
    //return res

   const {fullname , email ,username, password} = req.body
  
  //  console.log("email :", email)
   if (
    [fullname , email , username , password].some((filed)=> filed?.trim() === "")
   )
   {
    throw new ApiError(400,"All fields are required")
    
   }
   const existdeUser =await User.findOne({
    $or : [{username} , { email }]
   })

   if ( existdeUser){
    throw new ApiError(409 , "User with email or username already exists")
   }
   
   console.log(req.files.avatar);
   
   const avatarLocalPath = req.files?.avatar[0]?.path;
  //  const coverImageLocatpath = req.files?.coverImage[0]?.path;
  let coverImageLocatpath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocatpath= req.files.coverImage[0].path
  }
  
  

  
   if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required")
   }

   const avatar = await uploadOncloud(avatarLocalPath)
   const coverImage = await uploadOncloud(coverImageLocatpath)
   

   if(!avatar){
    throw new ApiError(400,"avatar file is required")
   }

  const user =  await User.create({
    fullname , 
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createduser) {
    throw new ApiError(500,"Something went wrong while reg. the user")
   }

   return res.status(201).json(
    new ApiResponse(200 ,createduser , "user registered successfully" )
   )

})
