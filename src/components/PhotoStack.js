import React, { useState } from "react";

import { useLockBodyScroll } from "@custom-react-hooks/use-lock-body-scroll";

import { motion, AnimatePresence } from "framer-motion";

import PolaroidPhoto from "./PolaroidPhoto";
import "./PhotoStack.css";

const MotionPolaroidPhoto = motion.create(PolaroidPhoto);

const DELAY_DIFFERENCE = 0.02;
function getPhotoDelay(photoIndex) {
  return photoIndex * DELAY_DIFFERENCE;
}

function getReversedPhotoDelay(photoIndex, itemsLength) {
  return (itemsLength - photoIndex) * DELAY_DIFFERENCE;
}

function getRotationMultiplier(i) {
  return (i + 1) % 2 === 0 ? 1 : -1;
}

const PHOTO_STACK_ANIMATION_DURATION = 0.6;
let currentTopTimer = null;

export default function PhotoStack({ photos, stackId, stackName }) {
  const [showPreview, setShowPreview] = useState(false);
  const [currentTop, setCurrentTop] = useState(false);

  useLockBodyScroll(showPreview);

  function togglePreview() {
    setShowPreview((previousValue) => {
      clearTimeout(currentTopTimer);
      if (!previousValue) {
        setCurrentTop(true);
      } else {
        currentTopTimer = setTimeout(() => {
          setCurrentTop(false);
        }, PHOTO_STACK_ANIMATION_DURATION * 1000);
      }
      return !previousValue;
    });
  }

  const [currentImage, setCurrentImage] = useState(null);

  function zoomImage(e, image, index) {
    e.stopPropagation();
    if (image) {
      setCurrentImage({ ...image, index });
    } else {
      setCurrentImage(null);
    }
  }

  return (
    <>
      <div
        className="photo-stack"
        onClick={togglePreview}
        key={`${stackId}-photo-stack`}
        style={{
          zIndex: currentTop ? 100 : null,
          "--stack-animation-duration": `${PHOTO_STACK_ANIMATION_DURATION}s`,
        }}
      >
        <AnimatePresence initial={false}>
          {!showPreview &&
            photos.map((photo, i) => {
              return (
                <MotionPolaroidPhoto
                  photoUrl={photo.url}
                  photoText={photo.text}
                  index={i}
                  photoData={photo}
                  initial={{ rotate: getRotationMultiplier(i) * -45 }}
                  animate={{ rotate: 0 }}
                  layoutId={`${photo.text}-${stackId}-${i}`}
                  key={`${photo.text}-${stackId}-${i}-stack`}
                  transition={{
                    delay: getPhotoDelay(i),
                    type: "spring",
                    bounce: 0,
                    duration: PHOTO_STACK_ANIMATION_DURATION,
                  }}
                />
              );
            })}
        </AnimatePresence>

        <div className="polaroid-photo dummy">
          <div className={"photo-stack-info" + (showPreview ? " hide" : "")}>
            <span className="info-name">{`${stackName}`}</span>
            <span className="info-count">{`${photos.length}`}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPreview && (
          <>
            <div
              className="photo-stack-preview-wrapper"
              key={`${stackId}-preview-wrapper`}
              onClick={togglePreview}
            >
              <div className="photo-stack-preview">
                {photos.map((photo, i) => {
                  return (
                    <MotionPolaroidPhoto
                      photoUrl={photo.url}
                      photoText={photo.text}
                      index={i}
                      photoData={photo}
                      initial={{
                        rotate: getRotationMultiplier(i) * 30,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: currentImage?.index === i ? 0 : 1,
                      }}
                      layoutId={`${photo.text}-${stackId}-${i}`}
                      key={`${photo.text}-${stackId}-${i}-preview`}
                      transition={{
                        delay: getReversedPhotoDelay(i, photos.length),
                        type: "spring",
                        bounce: 0,
                        duration: PHOTO_STACK_ANIMATION_DURATION,
                      }}
                      onClick={(e) => zoomImage(e, photo, i)}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            className={
              "preview-wrapper-backdrop " + (currentImage ? "zoomed" : "")
            }
            onClick={togglePreview}
            key={`${stackId}-backdrop`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
          ></motion.div>
        )}
      </AnimatePresence>

      {showPreview && currentImage && (
        <div
          className="zoom-container"
          onClick={(e) => zoomImage(e, null, null)}
        >
          <MotionPolaroidPhoto
            photoUrl={currentImage.url}
            photoText={currentImage.text}
            photoData={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6 } }}
            exit={{ opacity: 0 }}
          />
        </div>
      )}
      <div
        className={"photo-stack-preview__info " + (showPreview ? "open" : "")}
      >
        <span className="info-container">
          <span>{`${photos.length} images`}</span>
        </span>
      </div>
    </>
  );
}
