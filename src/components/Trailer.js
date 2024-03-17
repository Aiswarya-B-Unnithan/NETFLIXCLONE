import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Trailer({ location, movieId }) {
  const [trailerView, setTrailerView] = useState([]);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const showTrailer = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        movieId ? movieId : location?.state?.movie.id
      }/videos?api_key=0cc84d2f457a4059a7d2e10e817c804f&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => setTrailerView(json.results));
  };

  useEffect(() => {
    showTrailer();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        xs={{ color: "black", bgColor: "white" }}
        onClick={openModal}
      >
        PLAY TRAILER
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <YouTube videoId={trailerView && trailerView[0]?.key} />
      </Modal>
    </div>
  );
}

export default Trailer;
