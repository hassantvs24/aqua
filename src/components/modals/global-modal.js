import React from "react";
import Modal from "react-responsive-modal";
import {useDispatch, useSelector} from "react-redux";
import AboutUsModalContent from "./modal-content-about-us";
import ContactUsModalContent from "./modal-content-contact-us";
import {CLOSE_MODAL, closeModalAction} from "../../redux/modal/actions";
import EggModalContent from "./modal-content-egg";
import SmoltModalContent from "./modal-content-smolt";
import PenModalContent from "./modal-content-pen";
import LargeFishModalContent from "./modal-content-large-fish";
import MainMenuPopup from "./modal-content-main-nav";
import EggModalContentNew from "./modal-content-egg-new";

export default function GlobalModal() {
  const dispatch = useDispatch() 
  const modalState = useSelector(state => state.modalState)
 
  const CustomModalContent = () => {
    switch (modalState.contentPath) {
      case "main-menu":
        return <MainMenuPopup />;
      case "about":
        return <AboutUsModalContent />;
      case "eggnew":
        return <EggModalContentNew />;
      case "egg":
        return <EggModalContent />;
      case "smolt":
        return <SmoltModalContent />;
      case "pen":
        return <PenModalContent />;
      case "large-fish":
        return <LargeFishModalContent />;
      default:
        return "Content not found";
    }
  }

  const onCloseModal = () => {
    dispatch(closeModalAction(CLOSE_MODAL))
  }

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 128 128"
    > 
      <path d="M75.4 64l50.24-50.24a8.06 8.06 0 10-11.4-11.4L64 52.6 13.76 2.36a8.06 8.06 0 00-11.4 11.4L52.6 64 2.36 114.24a8.06 8.06 0 0011.4 11.4L64 75.4l50.24 50.24a8.06 8.06 0 0011.4-11.4z" />
    </svg>
  ) 

    return (
      <React.Suspense fallback='Loading content...'>
        <Modal 
          open={modalState.open} onClose={onCloseModal} 
          container={document.getElementById('global-modal-container')} 
          closeIcon={closeIcon} closeOnOverlayClick={true} center
        >
          {CustomModalContent()}
        </Modal>
      </React.Suspense>
    )
}
