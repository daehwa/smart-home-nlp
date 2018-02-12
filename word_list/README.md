This uses One-hot encoding method

```bash
0: TurnOn
1: TurnOff
2: SetBrightness
3: IncreaseBrightness
4:DecreaseBrightness
5: SetColortemp
6: IncreaseColortemp
7: DecreaseColortemp
```


```bash
"낮춰": "00001001"
```

I means __"낮춰"__ can be used both DecreaseBrightness and DecreaseBrightness.


After read a sentence, we use highest possibility one (one-hot)
