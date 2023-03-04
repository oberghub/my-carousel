import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [imgList, setImgList] = useState([
    'https://picsum.photos/id/237/1000/500',
    'https://picsum.photos/id/238/1000/500',
    'https://picsum.photos/id/239/1000/500',
    'https://picsum.photos/id/240/1000/500'
  ])
  const slideImg = (num) => {

    //Description//
    //ใช้การ slide โดยการนำภาพมาเรียงกันใน flex container แล้วใช้การ transform ภาพไปข้างๆแทน//
    //อ้างอิงการใช้ transform จากภาพแรกสุด//

    //เอา element ของ img มา
    let slider = document.querySelector(".slider");
    let imgs = document.querySelectorAll(".slider img");

    //get image width
    let width = imgs[0].clientWidth;

    //ถ้า Next จนภาพสุดท้ายแล้วก็ set transform ให้มันย้อนกลับมาภาพที่ 1
    if(num > 3){
      slider.style.transform = `translate(${0}px)`
      setCount(0)
    }
    //ถ้า prev จนกลับมาภาพแรกก็จะให้ set transform กลับไปภาพสุดท้าย
    else if(num < 0){
      slider.style.transform = `translate(${-(imgs.length -1) * width}px)`
      setCount(3)
    }
    else{
      slider.style.transform = `translate(${-num * width}px)` 
      console.log(num)
      setCount(num)
    }

    console.log(width)
  }

  return (
    <div className="App">
      <div className='container'>

        <div className="img-container">
            <div id='slide-container' className='slider'>
              {imgList.map((item) => {
                return(
                  <img style={{width : '100%'}} src={item} />
                )
              })}
            </div>
            <img src='./src/assets/left-arrow.png' className="prevbutton" onClick={() => {slideImg(count -1)}} />
            <img src='./src/assets/right-arrow.png' className="nextbutton" onClick={() => {slideImg(count +1)}} />
            <div className='listbutton-container'>
              {imgList.map((item, index) => {
                return(
                  <div className="listbutton" onClick={() => {slideImg(index)}} style={{backgroundColor : count == index ? 'white' : 'gray'}}></div>
                )
              })}
            </div>
        </div>

      </div>
    </div>
  )
}

export default App
