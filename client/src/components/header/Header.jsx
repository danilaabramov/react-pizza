import "./header.css";
import logo from './pizza2.png'
import list from './list.png'
import list2 from './list2.png'
import pomodoro from './pomodoro.png'
import pomodoro2 from './pomodoro2.png'
import grib from './Mushrooms.png'
import {useEffect, useState} from "react";

export default function Header() {

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        setInterval(() => {
            setWidth(window.innerWidth)
        }, 0.1)
    })

  return (
    <div className="header">
        <img className="headerImg list2" src={list2} alt=""/>
        <img className="headerImg" src={logo} alt=""/>
        <img className="headerImg list" src={list} alt=""/>
        <img className="headerImg pomodoro" src={pomodoro} alt=""/>
        <img className="headerImg pomodoro2" src={pomodoro2} alt=""/>
        <img className="headerImg grib" src={grib} alt=""/>
        <div className="headerTitles">
            <span className="headerTitleSm">Насладитесь вкусом</span>
            <span className="headerTitleLg">ИТАЛЬЯНСКОЙ ПИЦЦЫ</span>
            <span className="headerTitleSm">у себя дома</span>
            <div className="btn" style={{width: 200, height: 50, lineHeight: '50px',
            fontSize: 20, border: '2px solid lightyellow', color: 'lightyellow',
                backgroundColor: 'rgba(255, 105, 0, .9)',
            marginTop: 70}}
            onClick={()=>window.scrollTo({
                top: width > 912 ? 513 : width > 681 ? 830 : width > 400 ? 530 : 470,
                behavior: "smooth"
            })}>Выбрать пиццу</div>
        </div>
    </div>
  );
}
