import React, { forwardRef } from "react";
import "./PolaroidPhoto.css";

function defaultClick() {}

const PolaroidPhoto = forwardRef(function PolaroidPhoto(
  { photoUrl, photoText, index, photoData, onClick = defaultClick, style = {} },
  ref
) {
  return (
    <div
      className="polaroid-photo"
      style={{ "--index": index, ...style }}
      ref={ref}
      onClick={onClick}
    >
      <div className="photo-holder">
        <img className="photo" src={photoUrl} alt="Polaroid" />
      </div>
      <div className="photo-bottom">
        <span className="photo-text">{photoText}</span>
      </div>
    </div>
  );
});
export default PolaroidPhoto;
