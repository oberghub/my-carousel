import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [imgList, setImgList] = useState([
    'https://picsum.photos/id/237/1000/500',
    'https://picsum.photos/id/238/1000/500',
    'https://picsum.photos/id/239/1000/500',
    'https://picsum.photos/id/240/1000/500',
    'https://picsum.photos/id/241/1000/500',
    'https://picsum.photos/id/242/1000/500',
    'https://picsum.photos/id/243/1000/500',
    'https://picsum.photos/id/244/1000/500',
    'https://picsum.photos/id/232/1000/500',
  ])

  //Description//
  //ใช้การ slide โดยการนำภาพมาเรียงกันใน flex container แล้วใช้การ transform translate ภาพไปข้างๆแทน//
  //อ้างอิงการใช้ translate จากภาพแรกสุด//


  //function เอาไว้ส่งข้อมูลของ Dom ไปให้ function slide ต่างๆเอาไปใช้
  const getDataElement = () => {
    //เอา element ของ img มา
    let slider = document.querySelector(".slider");

    //get image elements
    let imgs = document.querySelectorAll(".slider img");
    //get image width
    let width = imgs[0].clientWidth;

    const data = {slider : slider, imgWidth : width};
    return data;
  }

  //function สำหรับกดจุดภาพแล้วจะพาไปยังภาพนั้นๆ
  const skipImg = (num) => {
    const element = getDataElement();

    element.slider.style.transform = `translate(${-num * element.imgWidth}px)` 
    setCount(num)
  }


  //function สำหรับไปภาพต่อไป
  const nextImg = () => {
    const element = getDataElement();

    if(count+1 > imgList.length-1){
      element.slider.style.transform = `translate(${0}px)`
      setCount(0)
    }
    else{
      element.slider.style.transform = `translate(${-(count+1) * element.imgWidth}px)` 
      // console.log(num)
      setCount(count => count + 1)
    }
  }

  //function สำหรับกลับไปภาพก่อนหน้า
  const prevImg = () => {
    const element = getDataElement();

    //ถ้า prev จนกลับมาภาพแรกก็จะให้ set transform กลับไปภาพสุดท้าย
    if(count-1 < 0){
      element.slider.style.transform = `translate(${-(imgList.length -1) * element.imgWidth}px)`
      setCount(imgList.length-1)
    }
    else{
      element.slider.style.transform = `translate(${-(count - 1) * element.imgWidth}px)` 
      // console.log(num)
      setCount(count => count - 1)
    }
  }

  return (
    <div className="App">
        <div style={{backgroundColor : 'rgb(25, 25, 25)'}} className='container'>
          <div className="img-container">
              <div id='slide-container' className='slider'>
                {imgList.map((item) => {
                  return(
                    <img style={{width : '100%'}} src={item} />
                  )
                })}
              </div>
              <div className='img-index'>
                <p>
                  {count+1}/{imgList.length}
                </p>
              </div>
              <img src='./src/assets/left-arrow.png' className="prevbutton" onClick={prevImg} />
              <img src='./src/assets/right-arrow.png' className="nextbutton" onClick={nextImg} />
              <div className='listbutton-container'>
                {imgList.map((item, index) => {
                  return(
                    <div className="listbutton" onClick={() => {skipImg(index)}} style={{backgroundColor : count == index ? 'white' : 'gray'}}></div>
                  )
                })}
              </div>
          </div>
        </div>
    </div>
  )
}

export default App
