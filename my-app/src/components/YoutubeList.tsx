import { YoutubeData } from "../data/YoutubeData";
import YoutubeItem from "./YoutubeItem";
import "../App.css";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export default function YoutubeList(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
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
