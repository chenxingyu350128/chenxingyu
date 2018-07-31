var video=document.getElementById('video11');
video.onloadedmetadata=function () {
   let tol=video.duration;
   console.log(tol)
};