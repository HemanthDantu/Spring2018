package com.google.android.gms.samples.vision.face.photo;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

//This is to create the results activity
public class Results extends Activity {

    TextView smileView, reyeView, leyeView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_results);


        smileView = (TextView)  findViewById(R.id.textView);
        reyeView = (TextView)  findViewById(R.id.textView2);
        leyeView = (TextView)  findViewById(R.id.textView3);
        Intent intent = getIntent();
        String rightEye = intent.getStringExtra("REye");
        String leftEye = intent.getStringExtra("LEye");
        String smile = intent.getStringExtra("Smile");
        smileView.setText("Happiness : " + smile);
        reyeView.setText("Right Eye : " + rightEye);
        leyeView.setText("Left Eye : " + leftEye);



    }
}
