import b from "../../lib/default_animal_images.json";

function fetchAvatarImg(image) {

    let isAnimal = false, 
        defaultDir = "/animals/";

    if (b.animals.includes(image)) {
        isAnimal = true;
        let pic = defaultDir + image + ".png";
        return {image: pic, isAnimal};
    }
    
    return { image, isAnimal };
}

export default fetchAvatarImg;