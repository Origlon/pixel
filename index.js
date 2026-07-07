// HTML element авах
//         ↓
// Camera асаах
//         ↓
// Video → Canvas руу зураг авах
//         ↓
// Mouse click координат авах
//         ↓
// Canvas-аас 1 pixel унших
//         ↓
// RGB авах
//         ↓
// RGB → HEX хөрвүүлэх
//         ↓
// HTML дээр харуулах




// HTML element авах
//         ↓
// htmleesee swatch gdg element avah 
// htmleesee hexText gdg element avah 
// htmleese rgbText gdg element avah 
// htmleese video gdg element avah 
// htmleese canvas gdg element avah 
// ctx gdg elemntiig htmlees avsan canvas dotoroos avah 
const swatch = document.getElementById("swatch");
const hexText = document.getElementById("hex");
const rgbText = document.getElementById("rgb");
const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// Camera асаах
//  
// camera asaah js bichih ,  , .getUserMedia , .mediadevices       ↓
navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
//   videog gargah js bichne => stream , bas dotor n canvasiin undur urgun videonii undur urguntei tentsuu baih ystoi 
  .then((stream) => {
      video.srcObject = stream;
      
      video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        };
    })
    // ajilahgui bol error gdg element bas davhar bichne
    .catch((error) => {
      console.log("Camera error:", error);
    });
// Mouse click координат авах
//         ↓
// .addEventListener gej ehluuled , mousenii typenudaas clickiig songoh
video.addEventListener("click", function (event) {
    // delgetsen deer darsan undur urgunii bairlaliig bodoj oloh 
  const x = event.offsetX * (canvas.width / video.clientWidth);
  const y = event.offsetY * (canvas.height / video.clientHeight);

  console.log("Canvas position:", x, y);
// Video → Canvas руу зураг авах
//         ↓
// damjuulsan dursnees canvas ruu zurag avah , 
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// Canvas-аас 1 pixel унших
//         ↓
  const pixel = ctx.getImageData(x, y, 1, 1);

  const data = pixel.data;
// RGB авах
//         ↓
  console.log("Red:", data[0]);
  console.log("Green:", data[1]);
  console.log("Blue:", data[2]);
  console.log("Alpha:", data[3]);

  const hex = rgbToHex(data[0], data[1], data[2],);

  console.log("HEX:", hex);
  swatch.style.background = hex;

hexText.textContent = hex;

rgbText.textContent = 
`RGB(${data[0]}, ${data[1]}, ${data[2]})`;
});// RGB → HEX хөрвүүлэх
//         ↓
function rgbToHex(r, g, b) {
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  ).toUpperCase();
}
