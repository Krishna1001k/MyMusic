package com.mymusic;
import static com.facebook.react.common.ReactConstants.TAG;

import android.database.Cursor;
import android.media.MediaMetadataRetriever;

import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.reactnativegooglesignin.PromiseWrapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class MediaModule extends ReactContextBaseJavaModule {
    public MediaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @ReactMethod
    public void getAudioFiles(Promise promise) {

        WritableArray musicList = new WritableNativeArray();
        try {
            String[] projection = {MediaStore.Audio.Media.DATA};
            Cursor cursor = getReactApplicationContext().getContentResolver().query(
                    MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                    projection,
                    null,
                    null,
                    null);

            int id=1;
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    int columnIndex = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA);
                    String url=cursor.getString(columnIndex);

                    MediaMetadataRetriever metadataRetriever = new MediaMetadataRetriever();
                    metadataRetriever.setDataSource(url);
                    String title = metadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);
                    String artist = metadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST);
                    String album = metadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM);
                    int duration = Integer.parseInt(metadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION));
//                    String genre = metadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_GENRE);
//                    String year = metadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_YEAR);
                    byte[] artworkBytes = metadataRetriever.getEmbeddedPicture();
                    String artwork = null;
                    if (artworkBytes != null) {
                        artwork = Base64.encodeToString(artworkBytes, Base64.DEFAULT);
                    }
                    metadataRetriever.release();
                    WritableMap musicMap = new WritableNativeMap();
                    musicMap.putInt("id",id);
                    musicMap.putString("title",title);
                    musicMap.putString("artist",artist);
                    musicMap.putString("album",album);
                    musicMap.putInt("duration",duration);
                    musicMap.putString("url","file://"+url);
                    musicMap.putString("artwork",artwork);
                    musicList.pushMap(musicMap);

                    id++;
                }
                cursor.close();
            }

            Log.d(TAG, "getAudioFiles: "+musicList);
            promise.resolve(musicList);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", e.getMessage());
            promise.reject(e);
        }
    }


    @Override
    public String getName() {
        return "MusicMetadataModule";
    }
}