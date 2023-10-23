import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () =>{
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const meduim = palette.neutral.meduim;

    return(
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsered
                </Typography>
                <Typography color={meduim}>Create Ad</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/info4.jpeg"
                style={{borderRadius: "0.75rem", margin: "0.75rem 0"}}
                />
            <FlexBetween>
                <Typography color={main}>MikaCosmetics</Typography>
                <Typography color={meduim}>MikaCosmetics</Typography>
            </FlexBetween>
                <Typography color={meduim} m="0.5rem 0">
                    Description here
                </Typography>
        </WidgetWrapper>
    )
};
export default AdvertWidget;