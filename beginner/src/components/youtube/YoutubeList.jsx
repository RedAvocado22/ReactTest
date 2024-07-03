import { YoutubeData } from "../../data/YoutubeData";
import YoutubeItem from "./YoutubeItem";
import "../App.css";

export default function YoutubeList(props) {
  return (
    <div className="youtube-list">
      {props.children}
      {YoutubeData.map((item) => (
        <YoutubeItem
          key={item.id}
          image={item.image}
          author={item.author}
          avatar={item.avatar}
          title={item.title}
        />
      ))}
    </div>
  );
}
