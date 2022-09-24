import React, {useEffect, useRef, useState} from 'react'
import './App.css';
import './styles/editor.css'
import './styles/style.css'

function App() {

    ///////////отправить на бэк
    const [timeSegments, setTimeSegments] = useState([[], []])
    ///////////

    const vid = useRef(null);

    const [width, setWidth] = useState(window.innerWidth)
    const [screens, setScreens] = useState(Array(15).fill(0))
    const [videos, setVideos] = useState(Array(1).fill(0))

    const [play, setPlay] = useState(false)

    const [soundBlock, setSoundBlock] = useState(false)
    const [opaccityBlock, setOpaccityBlock] = useState(false)
    const [sizeBlock, setSizeBlock] = useState(false)
    const [saveBlock, setSaveBlock] = useState(false)
    const [formatBlock, setFormatBlock] = useState(false)
    const [textEditor, setTextEditor] = useState(false)

    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrenTime] = useState(0)

    const [selectSingle, setSelectSingle] = useState(false)
    const [selectSingle2, setSelectSingle2] = useState(false)

    // Кнопка звук
    const soundBtn = () => {
        setSoundBlock(s => !s)
        setOpaccityBlock(false)
        setSizeBlock(false)
        setSaveBlock(false)
        setFormatBlock(false)
        setTextEditor(false)
    };

    // Кнопка прозрачность лого
    const opaccityBtn = () => {
        setOpaccityBlock(s => !s)
        setSoundBlock(false)
        setSizeBlock(false)
        setSaveBlock(false)
        setFormatBlock(false)
        setTextEditor(false)
    };

    // Кнопка размера
    const sizeBtn = () => {
        setSizeBlock(s => !s)
        setSoundBlock(false)
        setOpaccityBlock(false)
        setSaveBlock(false)
        setFormatBlock(false)
        setTextEditor(false)
    };

    // Кнопка Сохранить
    const saveBtn = () => {
        setSaveBlock(s => !s)
        setSoundBlock(false)
        setOpaccityBlock(false)
        setSizeBlock(false)
        setFormatBlock(false)
        setTextEditor(false)
    }

    const textBtn = () => {
        setTextEditor(s => !s)
        setSoundBlock(false)
        setOpaccityBlock(false)
        setSizeBlock(false)
        setFormatBlock(false)
        setSaveBlock(false)
    }

    // Выбор качества
    const saveBlockListElem = () => {
        setFormatBlock(true)
        setSoundBlock(false)
        setOpaccityBlock(false)
        setSizeBlock(false)
        setTextEditor(false)
        setSaveBlock(false)
    }

    // Выбор формата
    const saveFormatListElem = () => {
        setFormatBlock(false)
    }

    // Toggle menu
    const selectSingle_title = () => {
        setSelectSingle(s => !s)
        setSelectSingle2(false)
    }

    // Close when click to option
    const selectSingle_labels = (e) => {
        setSelectSingle(false)
        document.querySelector('.__select__title').textContent = e.target.textContent
    }

    // Toggle menu
    const selectSingle_title2 = () => {
        setSelectSingle2(s => !s)
        setSelectSingle(false)
    }

    // Close when click to option
    const selectSingle_labels2 = (e) => {
        setSelectSingle2(false)
        document.querySelector('.__select__title2').textContent = e.target.textContent
    }

    useEffect(() => {
        let videoTrack = document.querySelector('.video-track'),
            time = document.querySelector('.timeLine');

        document.querySelector('.play').addEventListener("click", function () {
            setPlay(true)
            vid.current.play()
        });

        document.querySelector('.pause').addEventListener("click", function () {
            setPlay(false)
            vid.current.pause()
        });

        for (let i = 0; i < videos.length; ++i) {
            dragElement(document.getElementById(`2mydiv${i}`));
            dragElement(document.getElementById(`1mydiv${i}`));
            dragElement2(document.getElementById(`kontur${i}`))
        }

        dragElement2(document.getElementById("polzunok"))


        document.getElementById(`my-video`).addEventListener('play', () => {

            let inter = setInterval(() => {
                setCurrenTime((document.getElementById(`my-video`).currentTime))
                document.getElementById(`polzunok`).style.left = (document.getElementById(`my-video`).currentTime / document.getElementById(`my-video`).duration * (screens.length * 147)) + "px"
            }, 10)

            document.getElementById(`my-video`).addEventListener('pause', () => {
                clearInterval(inter)
            })

            document.getElementById(`my-video`).addEventListener('ended', () => {
                clearInterval(inter)
            })
        })

        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })

        document.getElementById(`my-video`).addEventListener('loadeddata', function () {
            setTimeSegments([[0, document.getElementById(`my-video`).duration]])
            console.log([[0, document.getElementById(`my-video`).duration], [document.getElementById(`my-video`).duration, document.getElementById(`my-video`).duration]])
        });

        for (let i = 0; i < videos.length; ++i) {
            for (let j = 0; j < screens.length; ++j) {
                document.getElementById(`${i}screen${j}`).addEventListener('loadeddata', function () {
                    setDuration(vid.current.duration)
                    document.getElementById(`${i}screen${j}`).currentTime = document.getElementById(`${i}screen${j}`).duration / screens.length / 2 + j * document.getElementById(`${i}screen${j}`).duration / screens.length;
                });
            }
        }
    }, [videos, timeSegments])


    function dragElement(elmnt) {
        let video = vid.current;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // в противном случае переместите DIV из любого места внутри DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // получить положение курсора мыши при запуске:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // вызов функции при каждом перемещении курсора:
            document.onmousemove = elementDrag;
            //document.onmousedown = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // вычислить новую позицию курсора:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // установите новое положение элемента:
            let index = Number(elmnt.id.split('mydiv')[1])

            let polz = document.getElementById(`polzunok`)
            let kon = document.getElementById(`kontur${index}`)
            let konh = document.getElementById(`konturheader${index}`)
            let scree = document.getElementById(`screens${index}`)
            let scree2 = document.getElementById(`screens2${index}`)

            let shag = (elmnt.offsetLeft - pos1 < screens.length * 147 + 29 ? (elmnt.offsetLeft - pos1 > 51 ? (elmnt.offsetLeft - pos1) : 51) : screens.length * 147 + 29)

            if (elmnt.id === `2mydiv${index}`) {
                let elleft = Number(document.getElementById(`1mydiv${index}`).style.left.split("px")[0])

                let razn = shag - 51 - Number(kon.style.left.split("px")[0])

                let sdvig = (elleft > shag - 40 ? shag - 40 : elleft)
                elmnt.style.left = sdvig + "px";

                if (elleft > shag - 40) {
                    polz.style.left = shag - 51 + "px";

                    video.currentTime = video.duration * (shag - 51) / (screens.length * 147)
                    setCurrenTime((document.getElementById(`my-video`).currentTime))


                    let ts = timeSegments
                    ts[index][0] = video.duration * (shag - 51) / (screens.length * 147)
                    console.log(ts)
                    setTimeSegments(ts)

                    kon.style.left = shag - 51 + "px";

                    let w = Number(konh.style.width.split("px")[0] - razn)
                    konh.style.width = w + "px";

                    scree.style.width = w + 6 + "px";
                    scree.style.left = kon.style.left
                    scree2.style.left = -shag + 51 + "px"

                }

            } else {
                let elleft = Number(document.getElementById(`2mydiv${index}`).style.left.split("px")[0])


                let sdvig = (elleft < shag - 40 ? shag - 40 : elleft)
                elmnt.style.left = sdvig + "px";


                if (elleft < shag - 40) {
                    polz.style.left = shag - 29 + "px";

                    video.currentTime = video.duration * (shag - 29) / (screens.length * 147)
                    setCurrenTime((document.getElementById(`my-video`).currentTime))

                    let ts = timeSegments
                    ts[index][1] = video.duration * (shag - 51) / (screens.length * 147)
                    console.log(ts)
                    setTimeSegments(ts)


                    konh.style.width = shag - 35 - Number(kon.style.left.split("px")[0]) + "px";

                    scree.style.width = shag - 29 - Number(kon.style.left.split("px")[0]) + "px";
                }
            }
        }

        function closeDragElement() {
            // остановка перемещения при отпускании кнопки мыши:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function dragElement2(elmnt) {
        let video = vid.current;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        if (document.getElementById(elmnt.id + "header")) {
            // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // в противном случае переместите DIV из любого места внутри DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // получить положение курсора мыши при запуске:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // вызов функции при каждом перемещении курсора:
            document.onmousemove = elementDrag;
            //document.onmousedown = elementDrag;
        }

        function elementDrag(e) {

            e = e || window.event;
            e.preventDefault();
            // вычислить новую позицию курсора:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // установите новое положение элемента:
            let polz = document.getElementById(`polzunok`)
            let scroll = document.getElementById('scroller').scrollLeft

            polz.style.left = e.clientX + scroll - 40 + "px";

            video.currentTime = video.duration * (e.clientX + scroll - 40) / (screens.length * 147)
            setCurrenTime((document.getElementById(`my-video`).currentTime))
        }

        function closeDragElement() {
            // остановка перемещения при отпускании кнопки мыши:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function color() {
        document.querySelector('.video__left_panel__mixer__range').addEventListener("change", function () {
            let val = this.value
            document.querySelector('.video__left_panel__mixer__range').style.background = `-moz-linear-gradient(left, #000 0%, #000 ${val}%, $grey ${val}%, $grey 100%) !important`
            console.log(val)
        });
    }


    useEffect(() => {
        if (videos.length > 1) {
            let polz = document.getElementById(`polzunok`)

            let kon0 = document.getElementById(`kontur${0}`)
            let konh0 = document.getElementById(`konturheader${0}`)
            let scree0 = document.getElementById(`screens${0}`)
            let scree20 = document.getElementById(`screens2${0}`)
            let el0 = document.getElementById(`1mydiv${0}`)
            let el20 = document.getElementById(`2mydiv${0}`)

            let kon1 = document.getElementById(`kontur${1}`)
            let konh1 = document.getElementById(`konturheader${1}`)
            let scree1 = document.getElementById(`screens${1}`)
            let scree21 = document.getElementById(`screens2${1}`)
            let el1 = document.getElementById(`1mydiv${1}`)
            let el21 = document.getElementById(`2mydiv${1}`)


            konh0.style.width = Number(konh0.style.width.split('px')[0]) / 2 - 3 + 'px';
            konh1.style.width = konh0.style.width

            kon1.style.left = Number(konh0.style.width.split('px')[0]) + 6 + Number(kon0.style.left.split('px')[0]) + 'px';

            scree0.style.width = Number(scree0.style.width.split('px')[0]) / 2 + 'px';
            scree1.style.width = scree0.style.width

            scree1.style.left = Number(scree0.style.width.split('px')[0]) + Number(kon0.style.left.split('px')[0]) + 'px';

            scree21.style.left = -Number(konh0.style.width.split('px')[0]) - 6 - Number(kon0.style.left.split('px')[0]) + 'px';


            el21.style.left = Number(scree0.style.width.split('px')[0]) + 12.5 + Number(kon0.style.left.split('px')[0]) + 'px';

            el1.style.left = Number(el21.style.left.split('px')[0]) + Number(konh1.style.width.split('px')[0]) - 18.5 + 'px';


            el0.style.left = Number(scree0.style.width.split('px')[0]) - 12.5 + Number(kon0.style.left.split('px')[0]) + 'px';

            // scree20.style.width = Number(scree20.style.width.split('px')[0]) / 2 + 'px';
            // scree21.style.width = Number(scree21.style.width.split('px')[0]) / 2 + 'px';
        }
    }, [videos])


    const cut = () => {
        if (videos.length == 1) {
            setVideos(Array(2).fill(0))
            let ts = timeSegments
            ts = [
                [ts[0][0], (ts[0][1] + ts[0][0]) / 2],
                [(ts[0][1] + ts[0][0]) / 2, ts[0][1]]
            ]
            console.log(ts)
            setTimeSegments(ts)
        }
    }

    const deleteVideo = () => {
        setVideos(Array(1).fill(0))
    }

    return (
        <div className="App">
            <header>
                <section className="header">
                    <div className="container">
                    </div>
                </section>
            </header>
            <main>
                <section className="main">
                    <div className="container">
                        <div className="video">
                            <div className="video__left_panel">
                                <div className="video__left_panel__mixer" style={{display: soundBlock ? '' : 'none'}}>
                                    <input type="range" min={0} max={100} step={1} onInput={color}
                                           className="video__left_panel__mixer__range"/>
                                </div>
                                <button className="video__left_panel__sound" onClick={() => soundBtn()} data-title='звук'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16 21C19.527 19.453 21.999 16.091 21.999 12C21.999 7.909 19.527 4.547 16 3V5C18.387 6.386 19.999 9.047 19.999 12C19.999 14.953 18.387 17.614 16 19V21Z"
                                            fill="black"/>
                                        <path
                                            d="M16 6.99997V17C17.225 15.9 18 13.771 18 12C18 10.229 17.225 8.09997 16 6.99997ZM4 17H6.697L12.445 20.832C12.5958 20.9321 12.7708 20.9896 12.9516 20.9984C13.1324 21.0072 13.3122 20.967 13.472 20.882C13.6316 20.7965 13.765 20.6693 13.858 20.514C13.951 20.3587 14.0001 20.181 14 20V3.99997C13.9999 3.81909 13.9508 3.64162 13.8578 3.48646C13.7648 3.3313 13.6315 3.20427 13.472 3.11889C13.3125 3.03351 13.1329 2.99299 12.9522 3.00163C12.7715 3.01027 12.5966 3.06776 12.446 3.16797L6.697 6.99997H4C2.897 6.99997 2 7.89697 2 8.99997V15C2 16.103 2.897 17 4 17ZM4 8.99997H7C7.033 8.99997 7.061 8.98397 7.093 8.98097C7.22601 8.96741 7.35509 8.928 7.473 8.86497C7.499 8.84997 7.53 8.84797 7.555 8.83197L12 5.86797V18.132L7.555 15.168C7.53 15.151 7.499 15.148 7.473 15.135C7.35491 15.0707 7.22491 15.0312 7.091 15.019C7.059 15.016 7.032 15 7 15H4V8.99997Z"
                                            fill="black"/>
                                    </svg>
                                </button>
                                <button className="video__left_panel__cut" onClick={cut} data-title='разделить'>
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.22917 12.4167C2.37958 12.4167 0.875 13.9212 0.875 15.7708C0.875 17.6204 2.37958 19.125 4.22917 19.125C6.07875 19.125 7.58333 17.6204 7.58333 15.7708C7.57958 15.231 7.4437 14.7003 7.18754 14.225L9.61021 11.9662L11.8316 14.1877C11.5632 14.6724 11.4205 15.2167 11.4167 15.7708C11.4167 17.6204 12.9212 19.125 14.7708 19.125C16.6204 19.125 18.125 17.6204 18.125 15.7708C18.125 13.9212 16.6204 12.4167 14.7708 12.4167C14.1949 12.4167 13.6611 12.5757 13.1877 12.8326L11.0142 10.6581L16.3243 5.70833C16.8635 5.16929 17.1665 4.43814 17.1667 3.67571V0.916666L6.16308 13.0396C5.61492 12.6505 4.95079 12.4167 4.22917 12.4167ZM5.66667 15.7708C5.66667 16.5634 5.02171 17.2083 4.22917 17.2083C3.43663 17.2083 2.79167 16.5634 2.79167 15.7708C2.79167 14.9783 3.43663 14.3333 4.22917 14.3333C5.02171 14.3333 5.66667 14.9783 5.66667 15.7708ZM16.2083 15.7708C16.2083 16.5634 15.5634 17.2083 14.7708 17.2083C13.9783 17.2083 13.3333 16.5634 13.3333 15.7708C13.3333 14.9783 13.9783 14.3333 14.7708 14.3333C15.5634 14.3333 16.2083 14.9783 16.2083 15.7708Z"
                                            fill="black"/>
                                        <path
                                            d="M2.67563 5.70832L6.90571 9.26086L8.26079 7.90578L1.83325 0.916656V3.6757C1.83341 4.43813 2.13642 5.16928 2.67563 5.70832Z"
                                            fill="black"/>
                                    </svg>
                                </button>
                                <button className="video__left_panel__delete" onClick={deleteVideo} data-title='удалить'>
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.91667 17.25C1.91667 17.7583 2.1186 18.2458 2.47805 18.6053C2.83749 18.9647 3.325 19.1667 3.83333 19.1667H13.4167C13.925 19.1667 14.4125 18.9647 14.772 18.6053C15.1314 18.2458 15.3333 17.7583 15.3333 17.25V5.75H17.25V3.83333H13.4167V1.91667C13.4167 1.40833 13.2147 0.920823 12.8553 0.561379C12.4958 0.201934 12.0083 0 11.5 0H5.75C5.24167 0 4.75416 0.201934 4.39471 0.561379C4.03527 0.920823 3.83333 1.40833 3.83333 1.91667V3.83333H0V5.75H1.91667V17.25ZM5.75 1.91667H11.5V3.83333H5.75V1.91667ZM4.79167 5.75H13.4167V17.25H3.83333V5.75H4.79167Z"
                                            fill="black"/>
                                        <path
                                            d="M5.75 7.66663H7.66667V15.3333H5.75V7.66663ZM9.58333 7.66663H11.5V15.3333H9.58333V7.66663Z"
                                            fill="black"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="video__center">
                                <div className="video__show">
                                    <video className="video__show__clip" ref={vid} id="my-video" width="720"
                                           height="405">
                                        <source src={require('./vid.mp4')} type='video/mp4'/>
                                    </video>
                                </div>
                                <div id="controls" className="video__controls">
                                    <div className="video__show__clip__buttons">
                                        <div className="video__show__clip__time-line">
                                            {/*< REACT выводить время -->*/}
                                            <p>{currentTime.toFixed(2)} / {duration.toFixed(2)}</p>
                                        </div>
                                        <div className="video__show__clip__arrows">
                                            <button className="video__show__clip__arrows__back" data-title='отменить'>
                                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.62516 9.58329H14.3752C15.9602 9.58329 17.2502 10.8732 17.2502 12.4583C17.2502 14.0434 15.9602 15.3333 14.3752 15.3333H11.5002V17.25H14.3752C17.0173 17.25 19.1668 15.1004 19.1668 12.4583C19.1668 9.81617 17.0173 7.66663 14.3752 7.66663H8.62516V4.79163L3.8335 8.62496L8.62516 12.4583V9.58329Z"
                                                        fill="black"/>
                                                </svg>
                                            </button>
                                            <button className="video__show__clip__arrows__next" data-title='повторить'>
                                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M14.3748 9.58329H8.62484C7.03975 9.58329 5.74984 10.8732 5.74984 12.4583C5.74984 14.0434 7.03975 15.3333 8.62484 15.3333H11.4998V17.25H8.62484C5.98271 17.25 3.83317 15.1004 3.83317 12.4583C3.83317 9.81617 5.98271 7.66663 8.62484 7.66663H14.3748V4.79163L19.1665 8.62496L14.3748 12.4583V9.58329Z"
                                                        fill="black"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <button className="video__show__clip__buttons__play">
                                        <svg className="play" style={{display: play ? 'none' : ''}} width="33"
                                             height="33"
                                             viewBox="0 0 33 33" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.625 8.25V24.75L23.375 16.5L9.625 8.25Z" fill="black"/>
                                        </svg>
                                        <svg className="pause" style={{display: play ? '' : 'none'}} width="33"
                                             height="33"
                                             viewBox="0 0 33 33"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 9.625H15.125V23.375H11V9.625ZM17.875 9.625H22V23.375H17.875V9.625Z"
                                                fill="black"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="video__right_panel">
                                <div className="video__right_panel__mixer"
                                     style={{display: opaccityBlock ? '' : 'none'}}>
                                    <input type="range" min="0" max="100" step="1" value="100"
                                           className="video__right_panel__mixer__range"/>
                                </div>
                                <button className="video__right_panel__sound" onClick={opaccityBtn} data-title='прозрачность'>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.2609 0.280793C10.172 0.191627 10.0664 0.120914 9.95015 0.0727235C9.83387 0.0245335 9.7092 -0.000181555 9.58333 1.00402e-06H0.958333C0.704167 1.00402e-06 0.460412 0.100968 0.280689 0.28069C0.100967 0.460413 0 0.704169 0 0.958334V9.58333C0 9.83825 0.100625 10.0817 0.280792 10.2609L7.94746 17.9275C8.03625 18.0168 8.14182 18.0877 8.2581 18.1361C8.37438 18.1844 8.49907 18.2093 8.625 18.2093C8.75093 18.2093 8.87562 18.1844 8.9919 18.1361C9.10818 18.0877 9.21375 18.0168 9.30254 17.9275L17.9275 9.30254C18.0166 9.21362 18.0873 9.10801 18.1355 8.99175C18.1837 8.87549 18.2085 8.75086 18.2085 8.625C18.2085 8.49914 18.1837 8.37451 18.1355 8.25825C18.0873 8.14199 18.0166 8.03638 17.9275 7.94746L10.2609 0.280793ZM8.625 15.8949L1.91667 9.18658V1.91667H9.18658L15.8949 8.625L8.625 15.8949Z"
                                            fill="#646464"/>
                                        <path
                                            d="M5.44229 6.88458C6.23885 6.88458 6.88458 6.23885 6.88458 5.44229C6.88458 4.64574 6.23885 4 5.44229 4C4.64574 4 4 4.64574 4 5.44229C4 6.23885 4.64574 6.88458 5.44229 6.88458Z"
                                            fill="#646464"/>
                                    </svg>
                                </button>
                                <button className="video__right_panel__cut" onClick={textBtn} data-title='текст'>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.7915 7.66671H6.70817V5.75004H9.82467L7.35984 17.25H4.7915V19.1667H12.4582V17.25H10.3L12.7648 5.75004H16.2915V7.66671H18.2082V3.83337H4.7915V7.66671Z"
                                            fill="#646464"/>
                                    </svg>
                                </button>
                                <button className="video__right_panel__delete" onClick={sizeBtn} data-title='размер холста'>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20.125 5.75C20.125 4.16492 18.8351 2.875 17.25 2.875C16.6574 2.87668 16.0799 3.06185 15.5969 3.40505C15.1138 3.74826 14.7489 4.23266 14.5523 4.79167H8.44771C8.25111 4.23266 7.8862 3.74826 7.40314 3.40505C6.92007 3.06185 6.34257 2.87668 5.75 2.875C4.16492 2.875 2.875 4.16492 2.875 5.75C2.875 6.99775 3.67904 8.05096 4.79167 8.44771V14.5513C4.23281 14.7485 3.74862 15.1136 3.40548 15.5968C3.06233 16.0799 2.87704 16.6574 2.875 17.25C2.875 18.8351 4.16492 20.125 5.75 20.125C6.34257 20.1233 6.92007 19.9382 7.40314 19.5949C7.8862 19.2517 8.25111 18.7673 8.44771 18.2083H14.5513C14.7481 18.7673 15.113 19.2516 15.596 19.5948C16.0791 19.938 16.6565 20.1232 17.249 20.125C18.8341 20.125 20.124 18.8351 20.124 17.25C20.122 16.6574 19.9367 16.0799 19.5936 15.5968C19.2504 15.1136 18.7662 14.7485 18.2074 14.5513V8.44867C18.7665 8.25181 19.251 7.88673 19.5943 7.40355C19.9376 6.92036 20.123 6.34275 20.125 5.75ZM17.25 4.79167C17.4398 4.79148 17.6254 4.8476 17.7833 4.95294C17.9412 5.05827 18.0643 5.20808 18.137 5.38341C18.2098 5.55874 18.2288 5.7517 18.1919 5.93787C18.1549 6.12404 18.0635 6.29506 17.9293 6.42928C17.7951 6.5635 17.624 6.65488 17.4379 6.69186C17.2517 6.72885 17.0587 6.70977 16.8834 6.63704C16.7081 6.56432 16.5583 6.44122 16.4529 6.28331C16.3476 6.12541 16.2915 5.93981 16.2917 5.75C16.2917 5.22196 16.721 4.79167 17.25 4.79167ZM14.5523 16.2917H8.44771C8.30523 15.8906 8.0752 15.5263 7.77433 15.2253C7.47346 14.9243 7.10931 14.694 6.70833 14.5513V8.44867C7.10931 8.30597 7.47346 8.07574 7.77433 7.7747C8.0752 7.47367 8.30523 7.10939 8.44771 6.70833H14.5513C14.694 7.10931 14.9243 7.47346 15.2253 7.77433C15.5263 8.0752 15.8906 8.30523 16.2917 8.44771V14.5513C15.8907 14.694 15.5265 14.9243 15.2257 15.2253C14.9248 15.5263 14.6948 15.8906 14.5523 16.2917ZM5.75 4.79167C5.93981 4.79148 6.12541 4.8476 6.28331 4.95294C6.44122 5.05827 6.56432 5.20808 6.63704 5.38341C6.70977 5.55874 6.72885 5.7517 6.69186 5.93787C6.65488 6.12404 6.5635 6.29506 6.42928 6.42928C6.29506 6.5635 6.12404 6.65488 5.93787 6.69186C5.7517 6.72885 5.55874 6.70977 5.38341 6.63704C5.20808 6.56432 5.05827 6.44122 4.95294 6.28331C4.8476 6.12541 4.79148 5.93981 4.79167 5.75C4.79167 5.22196 5.221 4.79167 5.75 4.79167ZM5.75 18.2083C5.50325 18.1973 5.27026 18.0915 5.09956 17.913C4.92885 17.7345 4.83358 17.497 4.83358 17.25C4.83358 17.003 4.92885 16.7655 5.09956 16.587C5.27026 16.4085 5.50325 16.3027 5.75 16.2917C5.99675 16.3027 6.22974 16.4085 6.40044 16.587C6.57115 16.7655 6.66642 17.003 6.66642 17.25C6.66642 17.497 6.57115 17.7345 6.40044 17.913C6.22974 18.0915 5.99675 18.1973 5.75 18.2083ZM17.25 18.2083C17.0032 18.1973 16.7703 18.0915 16.5996 17.913C16.4288 17.7345 16.3336 17.497 16.3336 17.25C16.3336 17.003 16.4288 16.7655 16.5996 16.587C16.7703 16.4085 17.0032 16.3027 17.25 16.2917C17.4968 16.3027 17.7297 16.4085 17.9004 16.587C18.0712 16.7655 18.1664 17.003 18.1664 17.25C18.1664 17.497 18.0712 17.7345 17.9004 17.913C17.7297 18.0915 17.4968 18.1973 17.25 18.2083Z"
                                            fill="black"/>
                                    </svg>
                                </button>
                                <div className="video__right_panel__size" style={{display: sizeBlock ? '' : "none"}}>
                                    <h4 className="video__right_panel__size_h">Размер холста</h4>
                                    <div className="video__right_panel__size__block">
                                        <button className="video__right_panel__size__block__btn">16:9</button>
                                        <button className="video__right_panel__size__block__btn">9:16</button>
                                        <button className="video__right_panel__size__block__btn">1:1</button>
                                        <button className="video__right_panel__size__block__btn">Свой</button>
                                    </div>
                                </div>
                                <div className="text-editor__block" style={{display: textEditor ? '' : 'none'}}>
                                    <div className="text-editor__block__font">
                                        <h3 className="text-editor__block__font__h">Шрифт</h3>
                                        <form>
                                            <div className='__select' data-state={selectSingle ? 'active' : ''}>
                                                <div onClick={selectSingle_title} className="__select__title"
                                                     data-default="Open Sans">Open Sans
                                                </div>
                                                <div className="__select__content">
                                                    <input id="singleSelect10" className="__select__input" type="radio"
                                                           name="singleSelect" checked/>
                                                    <label htmlFor="singleSelect10" className="__select__label"
                                                           onClick={selectSingle_labels}>Open Sans</label>
                                                    <input id="singleSelect0" className="__select__input" type="radio"
                                                           name="singleSelect"/>
                                                    <label htmlFor="singleSelect0" className="__select__label"
                                                           onClick={selectSingle_labels}>Open Sans
                                                    </label>
                                                    <input id="singleSelect1" className="__select__input" type="radio"
                                                           name="singleSelect"/>
                                                    <label htmlFor="singleSelect1" className="__select__label"
                                                           onClick={selectSingle_labels}>Noto Serif
                                                    </label>
                                                    <input id="singleSelect3" className="__select__input" type="radio"
                                                           name="singleSelect"/>
                                                    <label htmlFor="singleSelect3" className="__select__label"
                                                           onClick={selectSingle_labels}>EB Garamond
                                                    </label>
                                                    <input id="singleSelect4" className="__select__input" type="radio"
                                                           name="singleSelect"/>
                                                    <label htmlFor="singleSelect4" className="__select__label"
                                                           onClick={selectSingle_labels}>Kalam
                                                    </label>
                                                    <input id="singleSelect5" className="__select__input" type="radio"
                                                           name="singleSelect"/>
                                                    <label htmlFor="singleSelect5" className="__select__label"
                                                           onClick={selectSingle_labels}>Space Mono
                                                    </label>
                                                    <input id="singleSelect6" className="__select__input" type="radio"
                                                           name="singleSelect"/>
                                                    <label htmlFor="singleSelect6" className="__select__label"
                                                           onClick={selectSingle_labels}>Cookie
                                                    </label>
                                                    <input id="singleSelect7" className="__select__input" type="radio"
                                                           name="singleSelect"/>
                                                    <label htmlFor="singleSelect7" className="__select__label"
                                                           onClick={selectSingle_labels}>Montserrat
                                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="text-editor__block__font__etc">
                                            <form>
                                                <div className="__select2" data-state={selectSingle2 ? 'active' : ''}>
                                                    <div onClick={selectSingle_title2} className="__select__title2"
                                                         data-default="Open Sans">32
                                                    </div>
                                                    <div className="__select__content2">
                                                        <input id="singleSelect10" className="__select__input2"
                                                               type="radio"
                                                               name="singleSelect" checked/>
                                                        <label htmlFor="singleSelect10"
                                                               className="__select__label2"
                                                               onClick={selectSingle_labels2}>14</label>
                                                        <input id="singleSelect0" className="__select__input2"
                                                               type="radio"
                                                               name="singleSelect" checked/>
                                                        <label htmlFor="singleSelect0"
                                                               className="__select__label2"
                                                               onClick={selectSingle_labels2}>14</label>
                                                        <input id="singleSelect1" className="__select__input2"
                                                               type="radio"
                                                               name="singleSelect"/>
                                                        <label htmlFor="singleSelect1"
                                                               className="__select__label2"
                                                               onClick={selectSingle_labels2}>18</label>
                                                        <input id="singleSelect3" className="__select__input2"
                                                               type="radio"
                                                               name="singleSelect"/>
                                                        <label htmlFor="singleSelect3"
                                                               className="__select__label2"
                                                               onClick={selectSingle_labels2}>24</label>
                                                        <input id="singleSelect4" className="__select__input2"
                                                               type="radio"
                                                               name="singleSelect"/>
                                                        <label htmlFor="singleSelect4"
                                                               className="__select__label2"
                                                               onClick={selectSingle_labels2}>32</label>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="text-editor__block__font__etc__side">
                                                <button>
                                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M3.8335 18.2083H19.1668V20.125H3.8335V18.2083ZM3.8335 14.375H14.3752V16.2917H3.8335V14.375ZM3.8335 10.5417H19.1668V12.4583H3.8335V10.5417ZM3.8335 2.875H19.1668V4.79167H3.8335V2.875ZM3.8335 6.70833H14.3752V8.625H3.8335V6.70833Z"
                                                            fill="black"/>
                                                    </svg>
                                                </button>
                                                <button>
                                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M3.8335 18.2083H19.1668V20.125H3.8335V18.2083ZM6.7085 14.375H16.2918V16.2917H6.7085V14.375ZM3.8335 10.5417H19.1668V12.4583H3.8335V10.5417ZM3.8335 2.875H19.1668V4.79167H3.8335V2.875ZM6.7085 6.70833H16.2918V8.625H6.7085V6.70833Z"
                                                            fill="black"/>
                                                    </svg>
                                                </button>
                                                <button>
                                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M3.8335 18.2083H19.1668V20.125H3.8335V18.2083ZM8.62516 14.375H19.1668V16.2917H8.62516V14.375ZM3.8335 10.5417H19.1668V12.4583H3.8335V10.5417ZM3.8335 2.875H19.1668V4.79167H3.8335V2.875ZM8.62516 6.70833H19.1668V8.625H8.62516V6.70833Z"
                                                            fill="black"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-editor__block__font__etc__design">
                                                <button>
                                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.3501 10.7525C16.9298 10.0069 17.2463 9.09029 17.25 8.14584C17.25 5.76822 15.3151 3.83334 12.9375 3.83334H5.75V18.2083H13.4167C15.7943 18.2083 17.7292 16.2735 17.7292 13.8958C17.7279 13.3052 17.6047 12.7212 17.3675 12.1804C17.1302 11.6395 16.7838 11.1534 16.3501 10.7525ZM12.9375 6.70834C13.73 6.70834 14.375 7.3533 14.375 8.14584C14.375 8.93839 13.73 9.58334 12.9375 9.58334H8.625V6.70834H12.9375ZM13.4167 15.3333H8.625V12.4583H13.4167C14.2092 12.4583 14.8542 13.1033 14.8542 13.8958C14.8542 14.6884 14.2092 15.3333 13.4167 15.3333Z"
                                                            fill="black"/>
                                                    </svg>
                                                </button>
                                                <button>
                                                    <svg width="11" height="15" viewBox="0 0 11 15" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.4248 14.6025L6.30664 15H0.3125L0.462891 14.6025C1.06445 14.5882 1.46191 14.5381 1.65527 14.4521C1.97038 14.3304 2.20312 14.1621 2.35352 13.9473C2.58984 13.6107 2.83333 13.0091 3.08398 12.1426L5.61914 3.35547C5.83398 2.625 5.94141 2.07357 5.94141 1.70117C5.94141 1.51497 5.89486 1.35742 5.80176 1.22852C5.70866 1.09961 5.56543 1.00293 5.37207 0.938477C5.18587 0.866862 4.81706 0.831055 4.26562 0.831055L4.39453 0.433594H10.0234L9.90527 0.831055C9.44694 0.823893 9.10677 0.874023 8.88477 0.981445C8.5625 1.12467 8.31543 1.32878 8.14355 1.59375C7.97884 1.85872 7.764 2.44596 7.49902 3.35547L4.97461 12.1426C4.74544 12.9518 4.63086 13.4674 4.63086 13.6895C4.63086 13.8685 4.67383 14.0225 4.75977 14.1514C4.85286 14.2731 4.99609 14.3698 5.18945 14.4414C5.38997 14.5059 5.80176 14.5596 6.4248 14.6025Z"
                                                            fill="black"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-editor__block__color">
                                            <h3 className="text-editor__block__color__h">Цвет</h3>
                                            <div className="text-editor__block__color__txt">
                                                <h4 className="text-editor__block__color__txt__h">Текст</h4>
                                                {/*< REACT/ вставить API с выбором цвета -->*/}
                                            </div>
                                            <div className="text-editor__block__color__back">
                                                <h4 className="text-editor__block__color__back__h">Фон</h4>
                                                {/*< REACT/ вставить API с выбором цвета -->*/}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="save">
                                <button className="save_btn" onClick={saveBtn}>Сохранить</button>
                                <div className="save__block" style={{display: saveBlock ? '' : 'none'}}>
                                    <h4 className="save__block_h">Выберите качество</h4>
                                    <ul className="save__block__list">
                                        <li data-path="480" className="save__block__list__elem"
                                            onClick={saveBlockListElem}>
                                            <p className="save__block__list__elem__str">Низкое</p>
                                            <p className="save__block__list__elem__num">До 480р</p>
                                        </li>
                                        <li data-path="720" className="save__block__list__elem"
                                            onClick={saveBlockListElem}>
                                            <p className="save__block__list__elem__str">Среднее</p>
                                            <p className="save__block__list__elem__num">До 720р</p>
                                        </li>
                                        <li data-path="1080" className="save__block__list__elem"
                                            onClick={saveBlockListElem}>
                                            <p className="save__block__list__elem__str">Высокое</p>
                                            <p className="save__block__list__elem__num">До 1080р</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="save__format" style={{display: formatBlock ? '' : 'none'}}>
                                    <h4 className="save__format__h">Выберите формат</h4>
                                    <ul className="save__format__list">
                                        <li data-path="MP4" className="save__format__list__elem"
                                            onClick={saveFormatListElem}>MP4
                                        </li>
                                        <li data-path="AVI" className="save__format__list__elem"
                                            onClick={saveFormatListElem}>AVI
                                        </li>
                                        <li data-path="MKV" className="save__format__list__elem"
                                            onClick={saveFormatListElem}>MKV
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{marginTop: 92}}>
                    <div id="scroller" className="container" style={{
                        height: 120,
                        width: width - 80,
                        overflowY: 'hidden',
                        display: 'flex',
                        padding: '0 20px',
                        margin: '0 20px',
                    }}>
                        <div style={{width: 0}}>
                            <div style={{position: 'relative', width: screens.length * 147 + 20, top: 10, height: 83}}>
                                <div
                                    style={{width: screens.length * 147, height: 83, backgroundColor: '#707070'}}></div>
                            </div>
                        </div>


                        {
                            videos.map((item, index) => {

                                return (
                                    <>
                                        <div style={{width: 0}}>
                                            <div id={`screens${index}`} style={{
                                                display: 'flex',
                                                position: 'relative',
                                                width: screens.length * 147,
                                                height: 83,
                                                overflow: 'hidden',
                                                top: 10,
                                                borderRadius: 9
                                            }}>

                                                <div id={`screens2${index}`} style={{
                                                    display: 'flex',
                                                    position: 'relative',
                                                    width: screens.length * 147,
                                                    height: 83,
                                                }}>
                                                    {
                                                        screens.map((item, ix) => {
                                                            return (
                                                                <video id={`${index}screen${ix}`} width="147"
                                                                       height="83"
                                                                       style={{position: 'relative'}}>
                                                                    <source src={require('./vid.mp4')}
                                                                            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                                                                </video>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div id={`kontur${index}`} className="kontur" style={{left: 0, top: 10}}>
                                            <div id={`konturheader${index}`} className="konturheader" style={{
                                                height: 77,
                                                width: screens.length * 147 - 6,
                                                borderRadius: 9,
                                                border: '3px solid #31BE00',
                                            }}></div>
                                        </div>

                                        <div id={`1mydiv${index}`} className="mydiv1"
                                             style={{left: screens.length * 147 - 11, top: 26.5}}>
                                            <div id={`1mydiv${index}header`} className="mydiv1header">
                                                <div style={{
                                                    cursor: 'ew-resize',
                                                    height: 83,
                                                    width: 20,
                                                    transform: 'translateX(-50%)',
                                                    position: 'relative',
                                                    top: -18.5,
                                                }}></div>
                                            </div>
                                        </div>
                                        <div id={`2mydiv${index}`} className="mydiv2" style={{left: 11, top: 26.5}}>
                                            <div id={`2mydiv${index}header`} className="mydiv2header">
                                                <div style={{
                                                    cursor: 'ew-resize',
                                                    height: 83,
                                                    width: 20,
                                                    transform: 'translateX(-50%)',
                                                    position: 'relative',
                                                    top: -18.5
                                                }}>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }


                        <div style={{width: 0}}>
                            <div id="polzunok" style={{left: 0, top: 0}}></div>
                        </div>

                    </div>
                </div>
            </main>
            <footer>
                <section className="footer">
                    <div className="container">
                        <p className="footer__description">© KomandniyDuh, 2022</p>
                    </div>
                </section>
            </footer>
        </div>
    );
}

export default App;