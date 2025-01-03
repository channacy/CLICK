import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";

import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {setPosts} from "state";

const MyPostWidget = ({picturePath}) =>{
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const meduimMain = palette.neutral.meduimMain;
    const meduim = palette.neutral.meduim;

    const handlePost = async() =>{
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if(image){
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`,{
            method: "POST",
            headers: {Authorizaton: `Bearer ${token}`},
            body: formData,
        });

        const posts = await response.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setPost("")
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase placeholder="What's on your mind?" 
                            onChange={(e) => setPost(e.target.value)} 
                            value={post}
                            sx={{
                                width: "100%",
                                backgroundColor: palette.neutral.light,
                                borderRadius: "2rem",
                                padding: "1rem 2rem"
                            }}
                             />
                </FlexBetween>
                {isImage && (
                    <Box 
                        border={`1px solid ${meduim}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                        >
                        <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) => setImage("picture", acceptedFiles[0])}
                            >
                                {({ getRootProps, getInputProps }) =>(
                                    <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        width="100%"
                                        sx={{"&:hover": {cursor: "pointer"}}}
                                    >
                                        <input {...getInputProps()}/>
                                        {!image? (
                                            <p>Add Image Here</p>
                                        ): (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined/>
                                            </FlexBetween>
                                        )}
                                    </Box>
                                    {image &&(
                                        <IconButton onClick={() => setImage(null)} sx={{width: "15%"}}><DeleteOutlined />
                                        </IconButton>
                                    )}
                                    </FlexBetween>
                                )} 
                            </Dropzone>
                        </Box>
                )}
        <Divider sx={{margin: "1.25rem 0"}} />
        <FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                <ImageOutlined sx={{color: meduimMain}} />
                <Typography
                    color={meduimMain}
                    sx={{"&:hover": {cursor: "pointer", color: meduim}}}
                >Image
                </Typography>
            </FlexBetween>

            {isNonMobileScreens ? (
                <>
                    <FlexBetween gap="0.25rem">
                        <GifBoxOutlined sx={{color: meduimMain}} />
                        <Typography color={meduimMain}>Clip</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                        <AttachFileOutlined sx={{color: meduimMain}} />
                        <Typography color={meduimMain}>Attachment</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                        <MicOutlined sx={{color: meduimMain}} />
                        <Typography color={meduimMain}>Audio</Typography>
                    </FlexBetween>
                </>
            ): (<FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{color: meduimMain}} />
                </FlexBetween>
                )}
            <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem"
                }}
                >
                POST
            </Button>
        </FlexBetween>
        </WidgetWrapper>
    );
};
export default MyPostWidget;