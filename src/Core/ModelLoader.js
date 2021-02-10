import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";

const OBJL = new OBJLoader();
const MTLL = new MTLLoader();

const loadModel = (folder, objName, mtlName) => {
    console.log(folder, objName, mtlName);
    return new Promise((resolve, reject)=>{
        try{
            MTLL.setPath(folder);
            MTLL.load(mtlName, (material)=>{
                material.preload();

                OBJL.setMaterials(material);
                OBJL.setPath(folder);
                OBJL.load(objName, (objInstance)=>{
                    return resolve(objInstance);
                });
            });
        }catch(e){
            reject(e);
        }
    });
}

export {loadModel};
