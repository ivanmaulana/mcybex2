/**
 * @name MediaPlugin
 * @description
 * @usage
 * ```ts
 * import {MediaPlugin} from 'ionic-native';
 *
 *
 * ...
 *
 *
 * // Playing a file
 * var file = new MediaPlugin("path/to/file.mp3");
 *
 * // play the file
 * file.play();
 *
 * // skip to 10 seconds
 * file.seekTo(10000);
 *
 * // stop plying the file
 * file.stop();
 *
 *
 * ...
 *
 * // Recording to a file
 * var newFile = new MediaPlugin("path/to/file.mp3");
 * newFile.startRecord();
 *
 * newFile.stopRecord();
 *
 *
 *
 * ```
 */
export declare class MediaPlugin {
    static MEDIA_NONE: number;
    static MEDIA_STARTING: number;
    static MEDIA_RUNNING: number;
    static MEDIA_PAUSED: number;
    static MEDIA_STOPPED: number;
    private _objectInstance;
    /**
     * Open a media file
     * @param src {string} A URI containing the audio content.
     */
    constructor(src: string);
    /**
     * Returns the current amplitude of the current recording.
     */
    getCurrentAmplitude(): Promise<any>;
    /**
     * Returns the current position within an audio file. Also updates the Media object's position parameter.
     */
    getCurrentPosition(): Promise<any>;
    /**
     * Returns the duration of an audio file in seconds. If the duration is unknown, it returns a value of -1.
     */
    getDuration(): number;
    /**
     * Starts or resumes playing an audio file.
     */
    play(iosOptions?: {
        numberOfLoops?: number;
        playAudioWhenScreenIsLocked?: boolean;
    }): void;
    /**
     * Pauses playing an audio file.
     */
    pause(): void;
    /**
     * Releases the underlying operating system's audio resources. This is particularly important for Android, since there are a finite amount of OpenCore instances for media playback. Applications should call the release function for any Media resource that is no longer needed.
     */
    release(): void;
    /**
     * Sets the current position within an audio file.
     * @param milliseconds
     */
    seekTo(milliseconds: number): void;
    /**
     * Set the volume for an audio file.
     * @param volume The volume to set for playback. The value must be within the range of 0.0 to 1.0.
     */
    setVolume(volume: number): void;
    /**
     * Starts recording an audio file.
     */
    startRecord(): void;
    /**
     * Stops recording
     */
    stopRecord(): void;
    /**
     * Stops playing an audio file.
     */
    stop(): void;
}
export declare class MediaError {
    static MEDIA_ERR_ABORTED: number;
    static MEDIA_ERR_NETWORK: number;
    static MEDIA_ERR_DECODE: number;
    static MEDIA_ERR_NONE_SUPPORTED: number;
    code: number;
    message: string;
}
