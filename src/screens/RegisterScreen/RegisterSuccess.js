
import React, { useState } from 'react';
import { Button, Overlay, Text } from 'react-native-elements';

export const RegisterSuccess = () => {
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text h1>Rejestracja zakończona pomyślnie</Text>
        <Text h3> Na podany adres została wysłana wiadomość z linkiem aktywacyjnym.
                Przed zalogowaniem konieczna jest aktywacja.</Text>
      </Overlay>
    </View>
  );
};


