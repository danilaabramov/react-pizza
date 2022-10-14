import {useState} from "react";
import "./write.css";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";


export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState("");
    const [price1, setPrice1] = useState();
    const [price2, setPrice2] = useState();
    const [price3, setPrice3] = useState();

    const handleSubmit = async () => {
        const newPost = {
            title,
            desc,
            photo,
            price: [Number(price1),
                Number(price2),
                Number(price3)]
        };
        try {
            const res = await axios.post("/pizzas", newPost);
            window.location.replace("/pizza/" + res.data._id);
        } catch (err) {
        }
    };

    return (
        <>
            <TopBar/>
            <div className="write">
                <form className="writeForm" onSubmit={handleSubmit}>
                    <div style={{display: 'flex'}}>
                        <img
                            src={photo ? photo : 'https://dodopizza-a.akamaihd.net/site-static/dist/611f501db3a3369fac31.svg'}
                            alt="" style={{width: 65, height: 65, marginRight: 20}}/>
                        <div className="writeFormGroup">
                            <input
                                type="text"
                                placeholder="Ссылка на фото"
                                className="writeInput"
                                autoFocus={true}
                                onChange={e => setPhoto(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="writeFormGroup">
                        <input
                            type="text"
                            placeholder="Название"
                            className="writeInput"
                            autoFocus={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="writeFormGroup">
          <textarea
              placeholder="Описание"
              type="text"
              className="writeInput"
              onChange={e => setDesc(e.target.value)}
          />
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className="writeFormGroup">
                            <input
                                type="number"
                                placeholder="Цена за маленькую"
                                className="writeInput" style={{marginRight: 10}}
                                autoFocus={true}
                                onChange={e => setPrice1(e.target.value)}
                                min="0"
                            />
                            <input
                                type="number"
                                placeholder="Цена за среднюю"
                                className="writeInput" style={{marginLeft: 5, marginRight: 5}}
                                autoFocus={true}
                                onChange={e => setPrice2(e.target.value)}
                                min="0"
                            />
                            <input
                                type="number"
                                placeholder="Цена за большую"
                                className="writeInput" style={{marginLeft: 10}}
                                autoFocus={true}
                                onChange={e => setPrice3(e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>
                    <button className="writeSubmit" type="submit" style={{width: 200, height: 45}}>
                        Добавить
                    </button>
                </form>
            </div>
        </>
    );
}
