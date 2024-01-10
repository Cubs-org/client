import b from "../../lib/default_animal_images.json";

function fetchAvatarImg(image) {
    const defaultDir = "/animals/";

    if (b.animals.includes(image))
        return defaultDir + image + ".png";
    
    return image;
}

export default fetchAvatarImg;