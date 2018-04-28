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

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.util.AttributeSet;
import android.util.Log;
import android.util.SparseArray;
import android.view.View;

import com.google.android.gms.vision.face.Face;
import com.google.android.gms.vision.face.Landmark;

/**
 * View which displays a bitmap containing a face along with overlay graphics that identify the
 * locations of detected facial landmarks.
 */

//This was referenced from: https://github.com/googlesamples/android-vision/tree/master/visionSamples/photo-demo
public class FaceView extends View {
    private Bitmap generalBitMap;
    private SparseArray<Face> faceArray;
    private volatile Face mFace;
    public FaceView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }
    public String leftEye = "leftEye";
    public String rightEye = "rightEye";
    public String smileMain = "smile";
    /**
     * Sets the bitmap background and the associated face detections.
     */
    void setContent(Bitmap bitmap, SparseArray<Face> faces) {
        generalBitMap = bitmap;
        faceArray = faces;
        invalidate();
    }

    /**
     * Draws the bitmap background and the associated face landmarks.
     */
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if ((generalBitMap != null) && (faceArray != null)) {
            double viewWidth = canvas.getWidth();
            double viewHeight = canvas.getHeight();
            double imageWidth = generalBitMap.getWidth();
            double imageHeight = generalBitMap.getHeight();
            double scale = Math.min(viewWidth / imageWidth, viewHeight / imageHeight);
            Rect destBounds = new Rect(0, 0, (int)(imageWidth * scale), (int)(imageHeight * scale));
            canvas.drawBitmap(generalBitMap, null, destBounds, null);
            Paint paint = new Paint();
            paint.setColor(Color.CYAN);
            paint.setStyle(Paint.Style.FILL_AND_STROKE);
            paint.setStrokeWidth(5);
            Log.i("FACES SIZE",String.valueOf(faceArray.size()));
            Face face = faceArray.valueAt(0);

            float smile = face.getIsSmilingProbability();
            float left1 = face.getIsLeftEyeOpenProbability();
            float right1 = face.getIsRightEyeOpenProbability();
            Log.i("Smile", String.valueOf(smile));
            Log.i("Left Eye", String.valueOf(left1));
            Log.i("Right Eye", String.valueOf(right1));
            leftEye = String.valueOf(left1);
            rightEye = String.valueOf(right1);
            smileMain = String.valueOf(smile);
            for (int i = 0; i < faceArray.size(); ++i) {
                for (Landmark landmark : face.getLandmarks()) {
                    int cx = (int) (landmark.getPosition().x * scale);
                    int cy = (int) (landmark.getPosition().y * scale);
                    canvas.drawCircle(cx, cy, 10, paint);
                }
            }
        }
    }

}
