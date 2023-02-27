import {useEffect} from 'react';
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
// import {tracks} from './tracks';
/**
 *
 *
 */
export const initializePlayer = async (tracks: any) => {
  try {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.add(tracks);

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      // stopWithApp: false, // false=> music continues in background even when app is closed
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });

    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracks);
  } catch (e) {
    console.log(e);
    // to-do handle error
  }
};

/**
 * Handling the state for the toggling
 */
export const playBackStateToggling = async () => {
  try {
    console.log('Playing');
    const trackState = await TrackPlayer?.getState();
    console.log('?????????', trackState);
    if (trackState !== State?.Playing) {
      await TrackPlayer.play();
      console.log('play');
    } else {
      await TrackPlayer?.pause();
      console.log('pause');
    }
  } catch (error) {
    console.log('check your playBackStateToggling function');
  }
};

/**
 *
 * @param {*} value
 */
export const seekToTrack = async (value: any) => {
  try {
    await TrackPlayer?.seekTo(value);
  } catch (error) {
    alert('check your seekToTrack function');
  }
};

/**
 *
 * @param {*} trackIndex
 */
export const skipToNextPreviousTrack = async (trackIndex: number) => {
  try {
    await TrackPlayer.skip(trackIndex);
  } catch (error) {
    alert('check your skipToNextPreviousTrack function');
  }
};

/**
 *
 * @param {*} trackTime
 * @param {*} conditionalValues
 * @returns
 */
export const secondsToHHMMSS = (seconds: number | string) => {
  // credits - https://stackoverflow.com/a/37096512
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${scnds}`;
};

/**
 * Play track
 */
export const PlayTrack = async () => {
  try {
    await TrackPlayer.play();
  } catch (err) {
    console.log(err);
  }
};

export const PauseTrack = async () => {
  try {
    await TrackPlayer.pause();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} index
 * @param {*} callback
 */
export const SkipTo = async (index: number, callback: any) => {
  try {
    await TrackPlayer.skip(index, 0);
    callback();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} callback
 */
export const NextTrack = async (callback: any) => {
  try {
    await TrackPlayer.skipToNext();
    callback();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} callback
 */
export const PreviousTrack = async (callback: any) => {
  try {
    await TrackPlayer.skipToPrevious();
    callback();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} time
 */
export const SeekTo = async (value: any) => {
  try {
    await TrackPlayer.seekTo(Array.isArray(value) ? value[0] : value);
  } catch (err) {
    console.log(err);
  }
};

export const getState = async () => {
  try {
    const res = await TrackPlayer.getState();
    console.log('state', res);
  } catch (err) {
    console.log('state Error', err);
  }
};

/**
 *
 * @param {*} callback
 */
export const getCurrentQueue = async (callback: any) => {
  try {
    const queue = await TrackPlayer.getQueue();
    console.log('Queue', queue);
    callback(queue);
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} callback
 */
export const getCurrentTrackIndex = async (callback: any) => {
  try {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    callback(currentTrackIndex);
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} callback
 * @param {*} trackIndex
 */
export const getCurrentTrack = async (callback: any, trackIndex: number) => {
  console.log('trackindex', trackIndex);
  try {
    const track = await TrackPlayer.getTrack(trackIndex);
    console.log(track);
    callback(track);
  } catch (err) {
    console.log(err);
  }
};

export const repeatTrack = async () => {
  try {
    TrackPlayer.setRepeatMode(RepeatMode.Track);
  } catch (err) {
    console.log(err);
  }
};

export const repeatQueue = async () => {
  try {
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (err) {
    console.log(err);
  }
};
export const errorHandling = () => {};

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
