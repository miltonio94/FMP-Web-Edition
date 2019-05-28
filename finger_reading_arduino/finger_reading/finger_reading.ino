// Sketch uses Teensy Bounce library and Teensy MIDI features, will not work with other microcontrollers
// Authered by Milton J. De Paula 


#include <Bounce.h>

// defining pins for left fingers
#define LF5 5
#define LF4 4
#define LF3 3
#define LF2 2
#define LF1 1

// defining pins for right fingers
#define RF5 10
#define RF4 9
#define RF3 8
#define RF2 7
#define RF1 6


const byte debounce = 500;
const byte numberOfFingers = 10;

// creating an array of Bounce objects for each finger, takes pin number and debounce time as arguments
Bounce fingerStates[] = {
      Bounce(LF1, debounce),
      Bounce(LF2, debounce),
      Bounce(LF3, debounce),
      Bounce(LF5, debounce),
      Bounce(LF4, debounce),
      Bounce(RF1, debounce),
      Bounce(RF2, debounce),
      Bounce(RF3, debounce),
      Bounce(RF5, debounce),
      Bounce(RF4, debounce)
  };

void setup() {
  // turning on serial for debugin
  Serial.begin(9600);
  // setting up pin mode 
  pinMode(LF1, INPUT_PULLUP);
  pinMode(LF2, INPUT_PULLUP);
  pinMode(LF3, INPUT_PULLUP);
  pinMode(LF4, INPUT_PULLUP);
  pinMode(LF5, INPUT_PULLUP);
  pinMode(RF1, INPUT_PULLUP);
  pinMode(RF2, INPUT_PULLUP);
  pinMode(RF3, INPUT_PULLUP);
  pinMode(RF4, INPUT_PULLUP);
  pinMode(RF5, INPUT_PULLUP);

}

void loop() {
  // looping through array of Bounce objects 
  for(int i = 0; i < numberOfFingers; i++){
    if(fingerStates[i].update()){ // updating state of each button
      if(fingerStates[i].risingEdge()){ //looking for a low to high transition
        usbMIDI.sendNoteOff(i + 1, 99, 0); // sending MIDI message of note off takes note, velocity and channel as arguments

        // Serial.print("f");
        // Serial.print(i+1);
        // Serial.print(": ");
        // Serial.print("DE-PRESSED");
        // Serial.print("\n");        
      }else if(fingerStates[i].fallingEdge()){ //looking for a high to low transition
        usbMIDI.sendNoteOn(i + 1, 99, 0); // sending MIDI message of note on takes note, velocity and channel as arguments
        
        // Serial.print("f");
        // Serial.print(i+1);
        // Serial.print(": ");
        // Serial.print("PRESSED");
        // Serial.print("\n");
      }
    }
  }

}
