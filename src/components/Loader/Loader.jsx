// import pikachuGif from "../../assets/pikachu-running.gif";
// або
// import pikachuGif from "/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests/images/gif/pikachu-running.gif"; //! так НЕ ПРАЦЮЄ на GitHub!!!

import css from "./Loader.module.css";


export const Loader = () => {
    return (
        <div className={css.loaderBox} >
            {/* <p className={css.loaderText} >Зачекай трохи...</p> */}
            <img
                className={css.loaderImage}
                // src={pikachuGif}
                src={`${import.meta.env.BASE_URL}images/gif/pikachu-running.gif`}
                alt="Пикачу біжить"
            />
        </div>
    );
};
