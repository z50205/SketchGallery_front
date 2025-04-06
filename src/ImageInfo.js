import React, { useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const ImageInfo=()=>{
    const { imageid } = useParams();
    return (
        <>
        <h1>
        { imageid }
        </h1>
        </>
    )
}
export default ImageInfo;
