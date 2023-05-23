import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Switch,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { LanguageContext } from "../LanguageContext";

const OptionsScreen = () => {
  const route = useRoute();
  const toggleSwitch = () => setIsOn((previousState) => !previousState);
  const [isOn, setIsOn] = useState(false);

  const [tags, setTags] = useState("");
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };
  const [limit, setLimit] = useState(5);
  const [time, setTime] = useState(5);

  const [selectedLvl, setSelectedLvl] = useState(null);


  const [lvlText, setLvlText] = useState("");
  const [easyText, setEasyText] = useState("");
  const [mediumText, setMediumText] = useState("");
  const [hardText, setHardText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [TimeLimitText, setTimeLimitText] = useState("");
  const [TimeQText, setTimeQText] = useState("");
  const [nbQ, setNbQText] = useState("");


  const handleTranslate = () => {
    translateText("Number of questions").then((result) => {
      setNbQText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("Seconds per question").then((result) => {
      setTimeQText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("Activate Time Limit").then((result) => {
      setTimeLimitText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("tags").then((result) => {
      setTagsText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("hard").then((result) => {
      setHardText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("medium").then((result) => {
      setMediumText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("level").then((result) => {
      setLvlText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("easy").then((result) => {
      setEasyText(result.charAt(0).toUpperCase() + result.slice(1));
    });
  };
  const handleLvlPress = (lvl) => {
    setSelectedLvl(lvl);
  };
  const { translateText } = useContext(LanguageContext);

  useEffect(() => {
  
    handleTranslate();
  }, []); // Empty dependency array to fetch the scores only once on component mount
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Vous avez choisi {route.params.theme}
        </Text>
      </View>
      <View style={styles.rowTitle}>
        <Text style={styles.rowTitleText}>{lvlText}</Text>
        <View style={styles.niveaux}>
          <TouchableOpacity
            onPress={() => handleLvlPress("Easy")}
            style={{
              backgroundColor: selectedLvl === "Easy" ? "#6d9eeb" : "#c4c4c4",
              marginTop: "5%",
              borderRadius: "15px",
              marginRight: "15%",
            }}
          >
            <Text style={styles.niveauTitle}>{easyText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLvlPress("Medium")}
            style={{
              backgroundColor: selectedLvl === "Medium" ? "#6d9eeb" : "#c4c4c4",
              marginTop: "5%",
              borderRadius: "15px",
              marginRight: "15%",
            }}
          >
            <Text style={styles.niveauTitle}>{mediumText}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLvlPress("Hard")}
            style={{
              backgroundColor: selectedLvl === "Hard" ? "#6d9eeb" : "#c4c4c4",
              marginTop: "5%",
              borderRadius: "15px",
              marginRight: "15%",
            }}
          >
            <Text style={styles.niveauTitle}>{hardText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rowTitle}>
        <Text style={styles.rowTitleText}>{tagsText}</Text>
        <View style={styles.Tags}>
          <TextInput
            placeholder="Linux, Bash, chmod ..."
            style={styles.TagsText}
            value={tags}
            onChangeText={handleTagsChange}
          ></TextInput>
        </View>
      </View>
      <View style={styles.rowTitle}>
        <View style={styles.containerTimeSet}>
          <Text style={styles.rowTitleText}>{TimeLimitText}</Text>

          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            onValueChange={toggleSwitch}
            value={isOn}
          />
        </View>
        <View pointerEvents={ isOn ?  '1' : 'none'} style={{ opacity:  isOn ?  '1' : '0.3' }}>
          <Text style={styles.rowSubTitleText}>{TimeQText} : {time}</Text>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={30}
            value={time}
            onValueChange={(newValue) => setTime(newValue)}
            step={1}
          />
        </View>
      </View>
      <View style={styles.rowTitle}>
        <Text style={styles.rowTitleText}>{nbQ} : {limit}</Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={20}
          value={limit}
          onValueChange={(newValue) => setLimit(newValue)}
          step={1}
        />
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate("Questions", {
            theme: route.params.theme,
            niveau: selectedLvl,
            tags: tags,
            istimeLimit : isOn,
            time : time,
            limit: limit,
          })
        }
        style={styles.footer}
      >
        <Text style={styles.footerTitle}>Valider</Text>
      </Pressable>
    </>
  );
};

export default OptionsScreen;

const styles = StyleSheet.create({
  header: {
    width: "80%",
    backgroundColor: "#0782F9",
    padding: "3%",
    marginLeft: "10%",
    marginTop: "20%",
    borderRadius: "15px",
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
  rowTitle: {
    marginTop: "10%",
    marginLeft: "10%",
  },
  rowTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rowSubTitleText: {
    fontSize: 16,
  },
  niveaux: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  niveau: {
    marginTop: "5%",
    borderRadius: "15px",
    marginRight: "15%",
  },
  niveauTitle: {
    color: "white",
    fontSize: 16,
    padding: "3%",
  },
  containerTimeSet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginRight: "10%",
  },
  Tags: {
    marginTop: "5%",
    backgroundColor: "#D9D9D9",
    borderRadius: "15px",
    marginRight: "15%",
    padding: "3%",
  },
  slider: {
    width: "90%",
  },
  footer: {
    width: "80%",
    backgroundColor: "#0782F9",
    height: "12%",
    margin: "10%",
    borderRadius: "15px",
    justifyContent: 'center', alignItems: 'center'
  },
  footerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    
  },
});
