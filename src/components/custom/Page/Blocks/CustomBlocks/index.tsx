// import { Editor } from "../../../../RichEditor";
import { Image } from "./Image";

const Text = ({ content }) => <p>{content}</p>

export const types = {
    text: Text,
    image: Image,
};