export const getRandom = (max) => Math.ceil(Math.random() * max);

export function createElement(tag, className){
    const $tag = document.createElement(tag);
    if (className ){
      $tag.classList.add(className);
    };
    return $tag;
};

export function time(){
    const time = new Date();
    const minutes = time.getMinutes();
    return `${time.getHours()}:${minutes > 9 ? minutes : '0' + minutes}`;
};