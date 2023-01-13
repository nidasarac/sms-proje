import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View, Fragment, SafeAreaView, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as SMS from 'expo-sms';



const App = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('');
  const [responseMessage, setResponse] = useState('');

//apikey:AIzaSyBIZpaIoO_RnO4QDJPh9TCXgyIzlJZYQQ8

  function postTranslateService(message) {

    const apiKey = 'AIzaSyBIZpaIoO_RnO4QDJPh9TCXgyIzlJZYQQ8';
    const sourceLanguage = 'tr';
    const targetLanguage = 'en';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&source=${sourceLanguage}&target=${targetLanguage}&q=${(message)}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const responseMessage = res.data.translations[0].translatedText;
        console.log(responseMessage);
        setResponse(responseMessage);
      })
      .catch((error) => {
        console.log(error)
      });
  };



  useEffect(() => {
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);

  const sendSms = async () => {
    const { uri } = await Print.printToFileAsync({
      
    });

    console.log(uri);

    const contentUri = await FileSystem.getContentUriAsync(uri);
    console.log(contentUri);

    const {result} = await SMS.sendSMSAsync(
      recipients,
      responseMessage
    );

    console.log(result);
  };

  const addNumber = () => {
    let newRecipients = [...recipients];
    newRecipients.push(phoneNumber);
    setRecipients(newRecipients);
    setPhoneNumber(undefined);
  };

  const showRecipients = () => {
    if (recipients.length === 0) {
      return <Text style={styles.info}>No recipients added!</Text>
    }

    return recipients.map((recipient, index) => {
      return <Text key={index}>{recipient}</Text>;
    });
  };
  


  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView
      contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
        
          <Text style={{fontSize: 30,fontWeight: 'bold',
              marginTop: 10,marginBottom: 10,color: 'black'}}>Kaynak Dil: "tr" </Text>
          <Text style={{fontSize: 30,fontWeight: 'bold',
              marginTop: 10,marginBottom: 10,color: 'black'}}>Hedef Dil: "en" </Text>
          <TextInput style={styles.textInput} value={phoneNumber} placeholder="phone number" 
            onChangeText={(value) => setPhoneNumber(value)} />
            <Button style={styles.button} title='ADD NUMBER' onPress={addNumber} />
          <TextInput style={styles.message}  
              numberOfLines={5}
              multiline={true}
              onChangeText={message => setMessage(message)}
               placeholder="your message"
            ></TextInput>
          <Button style={styles.button}
              title="TRANSLATE"
              onPress={() => postTranslateService(message)}
            />
          
          <Text style={styles.ceviri}> {'translate: ' +responseMessage}</Text>
          <Button style={styles.button} title="CLEAR TRANSLATE" onPress={() => setResponse([]) }/>
          
          <Text style={styles.recipients}> Recipient phone number: {showRecipients()}
              </Text>
              
            
          <Button style={styles.button} title="CLEAR RECIPIENTS" onPress={() => setRecipients([])} />
            {isAvailable ? <Button style={styles.button} title="SEND SMS" onPress={sendSms} /> :
          <Text>sms not avaiable</Text>}
          
      
          <StatusBar style="auto" />
        </View> 
      </ScrollView>
    </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
    width: 200,
    height: 50,
    borderRadius: 10,
    color: 'black',
    overflow: 'hidden'

  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
    width: 200,
    height: 100,
    borderRadius: 10,
    color: 'black',
    overflow: 'hidden'
  },
  recipients: {
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    justifyContent:'space-between',
 
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "#ff6600",
    backgroundColor: "#ff6600",
    borderRadius: 10,
    padding: 10,
    width: 200,
    height: 100,
    overflow: 'hidden'
    
   
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },

  ceviri: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
    width: 200,
    height: 100,
    borderRadius: 10,
    color: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'

  }
});

export default App;