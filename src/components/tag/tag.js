import React from "react";
import style from "./tag.module.css";

const Tag = (props) => {

    return (
        <div key={props.key} className={style.tag}
            style={{
                margin: props.margin ? props.margin : "1rem"
            }}
        ><p className={style.tagContent}>
            <span className={style.tagColor}
                style={{
                    backgroundColor: props.color ? props.color : 'black'
                }}
            ></span>{props.text}</p>
        </div>
    )
};

export default Tag;
