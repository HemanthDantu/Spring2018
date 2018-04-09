package com.example.pru.a1_lab;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.ArrayList;

public class Signinactivity extends AppCompatActivity {
    EditText email1, password1;
    Button signin;
    static String Admin_Email = "abc@gmail.com";
    static String Admin_password = "1234";
    static ArrayList<pair> data;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sign_in);
        email1 = (EditText) findViewById(R.id.email_signin);
        password1 = (EditText) findViewById(R.id.password_signin);
        signin = (Button) findViewById(R.id.sing_in_button);


        signin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (email1.getText().toString().isEmpty() || password1.getText().toString().isEmpty()) {
                    Toast.makeText(Signinactivity.this, "check email / password ",
                            Toast.LENGTH_LONG).show();

                } else{

                    for (pair datum : data) {
                        if (datum.email.equals(email1.getText().toString())&&datum.password.equals(password1.getText().toString())) {


                            Toast.makeText(Signinactivity.this, "sucessfully logedin ",
                                    Toast.LENGTH_LONG).show();

                            Intent i1 = new Intent(Signinactivity.this, MainActivity.class);
                            startActivity(i1);


                        }

                    }


                }


            }


        });
    }


    public static void data_put(String email, String password) {
        pair sample = new pair(email, password);
        data.add(sample);

    }




}


