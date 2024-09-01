<script>
    import Konva from 'konva';

    var width = window.innerWidth;
      var height = window.innerHeight;

      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
      });

      var layer = new Konva.Layer();
      stage.add(layer);

      var video = document.createElement('video');
      video.src =
        'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';

      var image = new Konva.Image({
        image: video,
        draggable: true,
        x: 50,
        y: 20,
      });
      layer.add(image);

      var text = new Konva.Text({
        text: 'Loading video...',
        width: stage.width(),
        height: stage.height(),
        align: 'center',
        verticalAlign: 'middle',
      });
      layer.add(text);

      var anim = new Konva.Animation(function () {
        // do nothing, animation just need to update the layer
      }, layer);

      // update Konva.Image size when meta is loaded
      video.addEventListener('loadedmetadata', function (e) {
        text.text('Press PLAY...');
        image.width(video.videoWidth);
        image.height(video.videoHeight);
      });

      document.getElementById('play')?.addEventListener('click', function () {
        text.destroy();
        video.play();
        anim.start();
      });
      document.getElementById('pause')?.addEventListener('click', function () {
        video.pause();
        anim.stop();
      });

</script>


<body>
    <button id="play">Play</button><button id="pause">Pause</button>
    <div id="container"></div>
</body>