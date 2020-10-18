import React, { useState, useEffect } from 'react';
import InsertBoard from './InsertBoard';
import axios from "axios";

const Modify = (props) => {
    let postId = props.match.params.id;
    const [post, setPost] = useState({});

    const postCall = () => {
        const postApiUrl = `http://localhost:8000/api/posts/${postId}`;
        axios
          .get(postApiUrl)
          .then((response) => {
            console.log("조회목록데이터:", response.data);
            setPost(response.data);
          })
          .catch((response) => {
            console.error(response);
          });
      }

    useEffect(()=>{
        postCall()
    },[])



    return (
        <InsertBoard modifyPost={post} />
    );
};

export default Modify;