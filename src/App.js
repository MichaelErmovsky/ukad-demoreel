import {useEffect, useState, useRef} from "react";
import ThreeApp from "./Core/ThreeApp";

import "./App.scss";

function App() {
    const [threeComponents, setThreeComponents] = useState({});
    const appRef = useRef();

    //initialize three
    useEffect(() => {
        if (!appRef.current) {
            return;
        }
        const targetElement = appRef.current;

        const threeApp = new ThreeApp(targetElement);
        threeApp.LoadDemo();
    }, [appRef]);

    // //load model
    // useEffect(() => {
    //     if (!threeComponents.renderer) {
    //         return;
    //     }
    //
    //     const {scene} = threeComponents;
    //
    //
    // }, [threeComponents]);


    return (
        <div className="App" ref={appRef}>

        </div>
    );
}

export default App;
