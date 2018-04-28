/*
 * Copyright (C) The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.android.gms.samples.vision.face.photo;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Log;
import android.util.SparseArray;
import android.view.View;

import com.google.android.gms.samples.vision.face.patch.DetectorMain;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.Frame;
import com.google.android.gms.vision.face.Face;
import com.google.android.gms.vision.face.FaceDetector;

import java.io.InputStream;

/**
 * Demonstrates basic usage of the GMS vision face detector by running face landmark detection on a
 * photo and displaying the photo with associated landmarks in the UI.
 */
//This was referenced from: https://github.com/googlesamples/android-vision/tree/master/visionSamples/photo-demo
public class ImageDisplay extends Activity {
    private static final String TAG = "PhotoViewerActivity";
    public String smile = "smile";
    public String leftEye = "left";
    public String rightEye = "right";
    public FaceView face1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_display);

        InputStream streamMain = getResources().openRawResource(R.raw.download1);
        Bitmap bitmap = BitmapFactory.decodeStream(streamMain);
        FaceDetector detector = new FaceDetector.Builder(getApplicationContext())
                .setTrackingEnabled(false)
                .setClassificationType(FaceDetector.ALL_CLASSIFICATIONS)
                .setLandmarkType(FaceDetector.ALL_LANDMARKS)
                .build();
        Detector<Face> safeDetector = new DetectorMain(detector);

        // Create a frame from the bitmap and run face detection on the frame.
        Frame frame = new Frame.Builder().setBitmap(bitmap).build();
        SparseArray<Face> faces = safeDetector.detect(frame);

        face1 = (FaceView) findViewById(R.id.faceView);

        face1.setContent(bitmap, faces);

    }

    public void nextPage(View v)
    {
        Intent loginPage = new Intent(ImageDisplay.this,Results.class);
        Log.i("LEFT EYE", face1.leftEye);
        Log.i("Right EYE", face1.rightEye);
        Log.i("Smile", face1.smileMain);
        loginPage.putExtra("LEye",face1.leftEye);
        loginPage.putExtra("REye",face1.rightEye);
        loginPage.putExtra("Smile",face1.smileMain);
        startActivity(loginPage);
    }
}
