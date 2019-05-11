export const animatePlayer1 = (card,length) => {
     card.animateTo({
        delay: 1000 +  length * 10  * 10,
        duration: 500,
        ease: 'quartOut',
        x: 250 + length * 10,
        y: 0})

};

export const animatePlayer2 = (card,length) => {
    card.animateTo({
        delay: 1000 +  length * 10  * 10,
        duration: 500,
        ease: 'quartOut',
        x: -10 + length * 10,
        y: window.innerHeight - window.innerHeight + 250
    });
};

export const animatePlayer3 = (card,length) => {
    card.animateTo({
        delay: 1000 +  length * 10,
        duration: 500,
        ease: 'quartOut',
        x: window.innerHeight - window.innerHeight - 250 + length * 10,
        y: 0
    });
};

export const animatePlayer4 = (card,length) => {
    card.animateTo({
        delay: 1000 + length  * 10,
        duration: 500,
        ease: 'quartOut',
        x: -10 + length * 10,
        y: window.innerHeight - window.innerHeight - 250
    });
};

export const animatePlayingCard = (card) => {
    card.animateTo({
        delay: 500,
        duration: 500,
        ease: 'quartOut',
        x: 100,
        y: 0
    });
}


