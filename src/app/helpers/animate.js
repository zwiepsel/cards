export const animatePlayer = (card,length, player) => {
    if(player === 1) {
        card.animateTo({
            delay: 1000 +  length * 100 ,
            duration: 500,
            ease: 'quartOut',
            x: 250 + length * 13,
            y: 0})
    }
    if(player === 2){
        card.animateTo({
            delay: 1000 +  length * 100,
            duration: 500,
            ease: 'quartOut',
            x: -10 + length * 13,
            y: window.innerHeight - window.innerHeight + 250
        });
    }
    if(player === 3){
        card.animateTo({
            delay: 1000 +  length * 100,
            duration: 500,
            ease: 'quartOut',
            x: window.innerHeight - window.innerHeight - 250 + length * 13,
            y: 0
        });
    }
    if(player === 4){
        card.animateTo({
            delay: 1000 + length  * 100,
            duration: 500,
            ease: 'quartOut',
            x: -10 + length * 13,
            y: window.innerHeight - window.innerHeight - 250
        });
    }

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


