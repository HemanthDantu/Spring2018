package com.stacktips.speechtotext;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Bundle;
import android.content.SharedPreferences;
import android.speech.RecognizerIntent;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.speech.tts.TextToSpeech;
import java.util.ArrayList;
import java.util.Locale;
public class MainActivity extends AppCompatActivity {

    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;
    TTS ttsManager = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ttsManager = new TTS();
        ttsManager.init(this);

        mVoiceInputTv = (TextView) findViewById(R.id.voiceInput);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        mSpeakBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });
    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello");
        ttsManager.Speak("Hello");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);


        } catch (ActivityNotFoundException a) {

        }
    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);



        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {

                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    mVoiceInputTv.setText(result.get(0));

                    if(result.get(0).contains("good")|| result.get(0).contains("feeling") || result.get(0).contains("not")){
                        ttsManager.Speak("I can understand. Please tell your symptoms in short");

                    }
                    if(result.get(0).contains("thank you")|| result.get(0).contains("you") ){
                        ttsManager.Speak("Thank you too.  Hemanth  Take care");
                    }
                    if(result.get(0).contains("what")){
                        ttsManager.Speak("I think you have fever. Please take this medicine");
                    }
                    if(result.get(0).contains("name")){
                        mVoiceInputTv.setText(result.get(1));
                    }




            }

        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        ttsManager.shutDown();
    }
}
