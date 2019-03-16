#include <Bounce.h>

#define F5 3
#define F4 4
#define F3 5
#define F2 6
#define F1 7

const byte numberOfFingers = 5;

// Bounce f1 = Bounce(F1, 10),
//        f2 = Bounce(F2, 10),
//        f3 = Bounce(F3, 10),
//        f4 = Bounce(F4, 10),
//        f5 = Bounce(F5, 10);

Bounce fingerStates[] = {Bounce(F1, 10),
      Bounce(F2, 10),
      Bounce(F3, 10),
      Bounce(F5, 10),
      Bounce(F4, 10)};

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(F1, INPUT_PULLUP);
  pinMode(F2, INPUT_PULLUP);
  pinMode(F3, INPUT_PULLUP);
  pinMode(F4, INPUT_PULLUP);
  pinMode(F5, INPUT_PULLUP);

}

void loop() {
  // put your main code here, to run repeatedly:

  for(int i = 0; i < numberOfFingers; i++){
    if(fingerStates[i].update()){
      if(fingerStates[i].fallingEdge()){ //looking for a high to low transition
        usbMIDI.sendNoteOff(i + 1, 99, 0, 0);

        Serial.print("f");
        Serial.print(i+1);
        Serial.print(": ");
        Serial.print("DE-PRESSED");
        Serial.print("\n");        
      }else if(fingerStates[i].risingEdge()){ //looking for a low to high transition
        usbMIDI.sendNoteOn(i + 1, 99, 0, 0);
        
        Serial.print("f");
        Serial.print(i+1);
        Serial.print(": ");
        Serial.print("PRESSED");
        Serial.print("\n");
      }
    }
  }

  // if(f1.update()){
  //   if(f1.fallingEdge()){ //looking for a high to low transition
  //     usbMIDI.sendNoteOn(1, 99, 0, 0)
  //   }else if(f1.risingEdge()){ //looking for a low to high transition
  //     usbMIDI.sendNoteOff(1, 99, 0, 0);
  //   }
  // }

  // f1State = digitalRead(F1);
  // f2State = digitalRead(F2);
  // f3State = digitalRead(F3);
  // f4State = digitalRead(F4);
  // f5State = digitalRead(F5);

 

}
