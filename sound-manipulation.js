function regulateSound(){

    let soundButton = document.getElementById('soundBtn');
    let audioElement = document.getElementById('music');
    let onImage = document.getElementById('soundOnImg');

    soundButton.addEventListener('click', function(){
        if(!audioElement.muted){
            audioElement.muted = true;
            onImage.src = "./images/soundOff.png";
        }
        else{
            audioElement.muted = false;
            onImage.src = "./images/sound.png";
        }
    });
}