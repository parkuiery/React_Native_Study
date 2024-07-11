import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";
import PrimaryButton from "../components/ui/PrimaryButton";

let minBoundary = 1;
let maxBoundary = 100;

function generateRandomBetween(min, max, exclude) {
    const rnNum = Math.floor(Math.random() * (max - min)) + min;

    if(rnNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rnNum;
    }
}

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [ guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver();
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(op) {
        if(
            (op === "+" && currentGuess > userNumber) ||
            (op === "-" && currentGuess < userNumber)
        ) {
            Alert.alert("Don't lie", "You know that is wrong...", [ 
                { text: "Sorry!", style: "cancel" },
            ]);
            return;
        }

        if(op === "+") {
            minBoundary = currentGuess + 1;
        } else if (op === "-") {
            maxBoundary = currentGuess;
        }
        const nextGuess = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess,
        );
        setGuessRounds((prevGuessRounds) => [nextGuess, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Card>
                    <InstructionText>
                        Higer or lower?
                    </InstructionText>
                    <View style={styles.bottonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "+")}>
                                <Ionicons name="add" size={24} color="white" />
                            </PrimaryButton>
                        </View>
                        <View style={styles.bottonsContainer}> 
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "-")}>
                            <Ionicons name="remove" size={24} color="white" />
                            </PrimaryButton>
                        </View>
                    </View>
                </Card>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    keyExtractor={(item) => item.toString()}
                    renderItem={( itemData ) => (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}
                        />
                    )}
                />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    instructionText: {
        marginBottom: 12,
    },
    bottonsContainer: {
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
});