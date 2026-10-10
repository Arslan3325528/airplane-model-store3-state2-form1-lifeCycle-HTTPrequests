// import pikachuGif from "../../assets/pikachu-running.gif";
// або
import pikachuGif from "/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests/images/gif/pikachu-running.gif";

import css from "./Loader.module.css";


export const Loader = () => {
    return (
        <div className={css.loaderBox} >
            <p className={css.loaderText} >Зачекай трохи...</p>
            <img
                className={css.loaderImage}
                src={pikachuGif}
                alt="Пикачу біжить"
            />
        </div>
    );
};
