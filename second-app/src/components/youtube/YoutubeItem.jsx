import "../css/youtube.css";

const YoutubeItem = (props) => {
  return (
    <div className="youtube-item">
      <div className="youtube-item-image">
        <img src={props.image} alt="" />
      </div>
      <div className="youtube-item-footer">
        <img src={props.avatar} alt="" className="youtube-item-author-avatar" />
        <div className="youtube-item-info">
          <h3 className="youtube-item-title">
            {props.title || "This is the example of title!"}
          </h3>
          <h4 className="youtube-item-author-name">
            {props.author || "This is the example of author's name!"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default YoutubeItem;
