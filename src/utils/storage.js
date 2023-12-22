import AsyncStorage from "@react-native-async-storage/async-storage";
export const backgroundEnabled = async (value) => {
    try {
      await AsyncStorage.setItem("backgroundEnabled", JSON.stringify(value));
      console.log("Storing to storage: "+value)
    } catch (error) {
      console.log(error);
    }
  };