export default class AutoPause {

  constructor() {
    this.threshold = 0.25;
    this.handlerIntersection = this.handlerIntersection.bind(this)
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
  }

  run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handlerIntersection, {
      threshold: this.threshold
    })

    observer.observe(this.player.media)

    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  handlerIntersection(entries) {
    const entry = entries[0];

    const isVisible = entry.intersectionRatio >= this.threshold;

    (isVisible) ? this.player.play() : this.player.pause();

    console.log(entry);
  }

  handleVisibilityChange() {
    const isVisible = document.visibilityState === 'visible';

    (isVisible) ? this.player.play() : this.player.pause();
  }
}