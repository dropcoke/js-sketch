// MySynth copyright Shumatz https://twitter.com/shumatz
// 
class MySynth {
    constructor() {
        try {
            // AudioContext インスタンス生成
            this.audioContext = new AudioContext();
            // AudioContextが使えないブラウザ対応用
            this.enabled = true;
        } catch(e) {
            alert(e);
            // AudioCOntextが使えない場合はfalseにして呼出し側で処理をでいないようにしてあげる
            this.enabled = false;
        }
    }
    // 音設定
    setSound(volume, hz, oscillatorType) {
        // オシレータ生成
        this.oscillator = this.audioContext.createOscillator();
        // オシレータタイプを設定
        this.oscillator.type = oscillatorType;
        // 音程を設定
        this.oscillator.frequency.value = hz;
        // 音量を設定
        this.gain = this.audioContext.createGain();
        this.gain.gainValue = volume;
        // 音量をオシレータに設定
        this.oscillator.connect(this.gain);
        this.gain.connect(this.audioContext.destination);
    }
    // play with volume(0-100), hz, oascilator type(String like 'sine', 'square', 'sawtooth', 'triangle')
    play(volume, hz, oscillatorType) {
        try {
            // 再生前に停止
            this.stop();
            // 音量、音程、オシレータを設定
            this.setSound(volume, hz, oscillatorType);
            // 再生
            this.oscillator.start();
            return true;
        } catch (e) {
            alert(e);
            // 正しく再生しない場合はfalseを返す
            return false;
        }
    }
    // 停止
    stop() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.gain.disconnect();
            this.oscillator.disconnect();
        }
    }
}