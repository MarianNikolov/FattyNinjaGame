function regulateSound(){

    var soundButton = document.getElementById('soundBtn');
    var audioElement = document.getElementById('music');
    var onImage = document.getElementById('soundOnImg');

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
