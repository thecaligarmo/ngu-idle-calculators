# ngu-idle-calculators
A next.js website system for calculating things for the idle game: NGU-idle

Current Version: 0.1.4 beta

## About
The calculator was developed by Cali (thecaligarmo on discord) and uses the formulas found in various NGU spreadsheets in order to automatically calculate things instead of having to write everything out by hand.

For any questions, comments, bugs or suggestions, feel free to create an issue on github or reach out to Cali directly.

## Running

```bash
sudo docker build -t nextjs-docker .
sudo docker system prune
sudo docker run -p 3000:3000 nextjs-docker
```