package rashmi.umkc.edu.samplecalendarapp;

import java.util.Calendar;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.TextView;

import com.example.displaycalendareventintent.R;

public class MainActivity extends Activity {
     private TextView text;
     private CalendarView cal ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

         super.onCreate(savedInstanceState);
         setContentView(R.layout.activity_main);
        text = (TextView)findViewById(R.id.textView5);
        cal = (CalendarView)findViewById(R.id.calendarView2);
        Calendar startTime = Calendar.getInstance();
        String a= startTime.get(Calendar.DAY_OF_MONTH)+"/"+startTime.get(Calendar.MONTH)+ "/"+startTime.get(Calendar.YEAR);
        text.setText(a);

        cal.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(@NonNull CalendarView calendarView, int i, int i1, int i2) {
                String s= i2+"/"+i1+"/"+i;
                text.setText( s);
            }
        });


    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

}