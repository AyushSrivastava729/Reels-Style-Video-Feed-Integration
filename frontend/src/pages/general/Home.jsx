import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [ videos, setVideos ] = useState([])
     const navigate = useNavigate();
    // Autoplay behavior is handled inside ReelFeed

    
  useEffect(() => {
    axios.get("https://reels-style-video-feed-integration.onrender.com/api/food", { withCredentials: true })
      .then(response => {
        setVideos(response.data.foodItems);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert("Please login to view the feed.");
          // Optionally redirect to login page:
           navigate("/user/login");
        }
      });
  }, []);



  //   useEffect(() => {
       // axios.get("http://localhost:3000/api/food", { withCredentials: true })
       //     .then(response => {
//
                //console.log(response.data);
//
                //setVideos(response.data.foodItems)
 //           })
        //    .catch(() => { /* noop: optionally handle error */ })
   // }, [])

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    async function likeVideo(item) {

        const response = await axios.post("https://reels-style-video-feed-integration.onrender.com/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {
        const response = await axios.post("https://reels-style-video-feed-integration.onrender.com/api/food/save", { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home
