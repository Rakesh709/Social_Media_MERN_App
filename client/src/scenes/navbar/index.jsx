import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";


import { useDispatch, useSelector } from "react-redux";
import { setMode,setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";




const Nabar=()=>{

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user);
    const isNotMobileScreens= useMediaQuery("(min-width:1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.Light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight= theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    
    const fullName= `${user.firstName} ${user.lastName}`;




    return(
        <FlexBetween padding="1rem 6%" background={alt}   >
            <FlexBetween gap="1.75rem">
                <Typography  
                fontWeight="bold"
                fontSize="clamp(1rem,2rem,2.25rem)" 
                color="primary"
                onClick={()=>navigate("/home")}
                sx={{
                    "&:hover":{
                        color:primaryLight,
                        curser:"pointer",
                    },
                }}
                 >
                    Socilapedia
                </Typography>
                {isNotMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" >
                        <InputBase  placeholder="Search..."  />
                        <IconButton>
                           <Search/> 
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {/* Desktop Nav */}
            {isNotMobileScreens ? (<FlexBetween gap="2rem" >
                <IconButton onClick={()=> dispatch(setMode())}>
                    {theme.palette.mode==="dark" ?(
                        <DarkMode sx={{fontSize:"25px"}} />
                    ):(
                        <LightMode sx={{ color:dark ,fontSize:"25px"}}/>
                    )}
                </IconButton>
            </FlexBetween>
            ) : (
                <IconButton></IconButton>)}
        </FlexBetween>
    )
}

export default Nabar;