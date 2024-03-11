#include "SSD1306Ascii.h"
#include "SSD1306AsciiAvrI2c.h"
#define I2C_ADDRESS 0x3C
#define RST_PIN -1
SSD1306AsciiAvrI2c oled;

//引入ESP8266.h头文件
#include "ESP8266.h"
#include "SoftwareSerial.h"
//配置ESP8266WIFI设置
#define SSID "Deetus"    //SSID
#define PASSWORD "99983043"//密码
#define HOST_NAME "api.heclouds.com"
#define DEVICE_ID "1051693554"        //OneNet设备ID
#define HOST_PORT (80)                //API端口，连接到OneNET平台，无需修改
String APIKey = "cijiFHdRzPyvd1G1HVeMTGMSf=A="; //与设备绑定的APIKey
SoftwareSerial mySerial(3, 2);
ESP8266 wifi(mySerial);
void setup()
{
  mySerial.begin(115200); //初始化软串口
  Serial.begin(9600);     //初始化串口
  Serial.print("setup begin\r\n");

  //以下为ESP8266初始化的代码
  Serial.print("FW Version: ");
  Serial.println(wifi.getVersion().c_str());

  if (wifi.setOprToStation()) {
    Serial.print("to station ok\r\n");
  } else {
    Serial.print("to station err\r\n");
  }

  //ESP8266接入WIFI
  if (wifi.joinAP(SSID, PASSWORD)) {
    Serial.print("Join AP success\r\n");
    Serial.print("IP: ");
    Serial.println(wifi.getLocalIP().c_str());
  } else {
    Serial.print("Join AP failure\r\n");
  }

  Serial.println("");
  mySerial.println("AT+UART_CUR=9600,8,1,0,0");
  mySerial.begin(9600);
  #if RST_PIN >= 0
  oled.begin(&Adafruit128x64, I2C_ADDRESS, RST_PIN);
#else // RST_PIN >= 0
  oled.begin(&Adafruit128x64, I2C_ADDRESS);
#endif // RST_PIN >= 0
  // Call oled.setI2cClock(frequency) to change from the default frequency.

  oled.setFont(System5x7);
  oled.clear();
  oled.print("Hello world!");
  
}

void loop(){
  uint8_t buffer[512] = {0};
  String getJson="";
    Serial.println("");

    if (wifi.createTCP(HOST_NAME, HOST_PORT)) { //建立TCP连接，如果失败，不能发送该数据
      Serial.print("create tcp ok\r\n");

      //拼接get请求字符串
      String getString = "GET /devices/";
      getString += DEVICE_ID;
      getString += "/datapoints?datastream_id=words HTTP/1.1";
      getString += "\r\n";
      getString += "api-key:";
      getString += APIKey;
      getString += "\r\n";
      getString += "Host:api.heclouds.com\r\n";
      getString += "Connection:close\r\n";
      getString += "\r\n";
      getString += "\r\n";

      const char *getArray = getString.c_str(); //将str转化为char数组
      Serial.println(getArray);
      wifi.send((const uint8_t *)getArray, strlen(getArray)); //send发送命令，参数必须是这两种格式，尤其是(const uint8_t*)
      Serial.println("send success");
      
      uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
      if (len > 0) {
          Serial.print("Received:");
          for(uint32_t i = 0; i < len; i++) {
              if((char)buffer[i]=='u'&&(char)buffer[i+1]=='e'&&(char)buffer[i]=='u'&&(char)buffer[i+2]=='"'){
                  for(uint32_t j=i+5;j<len;j++){
                    if((char)buffer[j]=='"'){
                      break;
                    }
                    getJson+=((char)buffer[j]);
                  }
                
              }
              

          }
          Serial.print(getJson);
          Serial.print("\r\n");
      }
      
  
      if (wifi.releaseTCP()) { //释放TCP连接
        Serial.print("release tcp ok\r\n");
      } else {
        Serial.print("release tcp err\r\n");
      }
      getArray = NULL; //清空数组，等待下次传输数据
    } else {
      Serial.print("create tcp err\r\n");
    }
    oled.setFont(X11fixed7x14);
    oled.clear();
    oled.setRow(3);
    oled.print(getJson.c_str());
    Serial.println("");
    delay(1000);
    
  }