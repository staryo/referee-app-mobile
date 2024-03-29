import { Button, Text } from "@rneui/themed";
import { Vibration, View } from "react-native";
import { useEffect, useState } from "react";
import { finishMatch, getMatch, startMatch } from "../../../../api/matches";

export default function Timer({ navigation, match, setMatch }) {
  const [currentTime, setCurrentTime] = useState(undefined)
  useEffect(() => {
    const start = match?.match?.start_time
    if (!match?.match?.is_period_completed && start) {
      setCurrentTime(() => ({ now: new Date() - new Date(start) }))
      const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        setCurrentTime(() => ({ now: new Date() - new Date(start) }))
      }, 1000)
      return () => clearInterval(intervalId); //This is important
    } else {
      setCurrentTime({ now: 0 })
    }
  }, [match?.match?.start_time, match?.match?.is_period_completed])

  const handleStart = () => {
    startMatch({ id: match.match.id }).then(() => {
      getMatch({ id: match.match.id }).then((res) => {
        setMatch(res)
      })
    })
  }

  const handleFinish = () => {
    finishMatch({ id: match.match.id }).then(() => {
      getMatch({ id: match.match.id }).then((res) => {
        setMatch(res)
      })
    })
  }

  const handleGoal = (teamNumber) => {
    navigation.navigate(
      "RegisterGoal",
      {
        title: match.match.name,
        matchId: match.match.id,
        period: match.match.current_period,
        time: Math.floor((currentTime?.now || 0) / 1000 % 60) +
          Math.floor((currentTime?.now || 0) / 1000 / 60) * 100,
        teamNumber: teamNumber,
        teamId: teamNumber === 1 ? match.match.team1Id : match.match.team2Id,
        setMatch: setMatch,
      },
    )
  }

  const handleEventFirst = () => {
    handleGoal(1)
  }

  const handleEventSecond = () => {
    handleGoal(2)
  }

  let seconds = String(Math.floor((currentTime?.now || 0) / 1000 % 60)).padStart(2, "0")
  let minutes = String(Math.floor((currentTime?.now || 0) / 1000 / 60)).padStart(2, "0")

  if (minutes >= match?.match?.tournament?.default_period_duration) {
    minutes = String(match?.match?.tournament?.default_period_duration).padStart(2, "0")

    seconds = String(0).padStart(2, "0")
    Vibration.vibrate()
  }

  if (minutes < 0) {
    minutes = String(0).padStart(2, "0")

    seconds = String(0).padStart(2, "0")
  }

  return (
    <>
      <View style={{
        width: "90%",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
        <View style={{ flexDirection: "row", gap: 40, justifyContent: "center", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Button size="lg" onPress={handleEventFirst} disabled={match?.match?.is_period_completed}>
              Goal {match?.match?.team1?.team_name}
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button size="lg" onPress={handleEventSecond} disabled={match?.match?.is_period_completed}>
              Goal {match?.match?.team2?.team_name}
            </Button>
          </View>
        </View>
        <Text h4 style={{ color: "white", marginTop: 15 }}>
          {
            (match?.match?.current_period || 0) === 0
              ? "NOT STARTED"
              : `PERIOD No. ${match?.match?.current_period + match?.match?.is_period_completed || 1}`
          }
        </Text>
        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", alignItems: "center" }}>
          <View style={{ flex: 5 }}>
            <Button onPress={handleStart} size="lg" color="secondary">
              {
                match?.match?.is_period_completed
                  ? "START"
                  : "RESTART"
              }
            </Button>
          </View>
          <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
            <Text h1 style={{ color: "white", marginVertical: 15 }}>{minutes}:{seconds}</Text>
          </View>
          <View style={{ flex: 5 }}>
            <Button
              size="lg"
              onPress={handleFinish}
              disabled={match?.match?.is_period_completed}
              color="secondary"
            >
              FINISH
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}