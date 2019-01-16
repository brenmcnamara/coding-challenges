/* @flow */

/* eslint-disable no-console */

/**
 * This runs a single simulation of playing the monty hall game. The strategy
 * is determined before-hand of whether the door should be switched or left
 * the same. Returns true if the correct door was selected, false otherwise.
 *
 * @param { string } strategy - The strategy of the simulation, either
 *        "SWITCH_DOOR" or "SAME_DOOR"
 */
function playMontyHall(strategy: 'SWITCH_DOOR' | 'SAME_DOOR'): boolean {
  // Prize behind 1, 2, or 3
  const prizeDoor = Math.floor(Math.random() * 3) + 1;
  // The door initially chosen by the agent, either 1, 2, or 3.
  const pickDoor = Math.floor(Math.random() * 3) + 1;

  // NOTE: BELOW IS A FULL EXPLANATION OF THE SIMULATION. THE SIMULATION CAN BE
  // BOILED DOWN INTO 3 LINES OF CODE ABOVE.
  // Implementing this algorithm down to this boolean check points out something
  // revealing about this problem. If you start off with the strategy of keeping
  // the original door, then you will win if you choose the first door
  // correctly. If you start of with the strategy of switching doors, then your
  // guess is correct if the first door you pick is not correct.
  return strategy === 'SWITCH_DOOR'
    ? pickDoor !== prizeDoor
    : pickDoor === prizeDoor;

  // Monty Hall will reveal one of the doors that was not picked by the
  // agent as not having the goat, and allow the agent the option to choose
  // again. If the agent has the strategy of not switching the doors, we can
  // just skip this step and check if the original door was correct.
  // if (strategy === 'SAME_DOOR') {
  //   return pickDoor === prizeDoor;
  // }

  // Need to switch to the door the agent has not chosen. At that point, we
  // know the agent will switch doors, so they will change to the door they do
  // not own.

  // We know that if the original pick was the prize door, then the strategy
  // will force the agent to choose the wrong door.
  // return prizeDoor !== pickDoor;
}

const NUM_OF_SIMULATIONS = 1000000;

function main() {
  console.log('RUNNING MONTY HALL SIMULATIONS');

  // Map the strategy to the total number of correct guesses.
  const numCorrect = {
    SWITCH_DOOR: 0,
    SAME_DOOR: 0,
  };

  for (let i = 0; i < NUM_OF_SIMULATIONS; ++i) {
    if (i > 0 && i % 100000 === 0) {
      console.log(`Ran ${i} iterations`);
    }

    numCorrect.SWITCH_DOOR += Number(playMontyHall('SWITCH_DOOR'));
    numCorrect.SAME_DOOR += Number(playMontyHall('SAME_DOOR'));
  }

  console.log(
    'SWITCHING DOORS CORRECT :',
    formatNumCorrect(numCorrect.SWITCH_DOOR),
  );
  console.log(
    'SAME DOOR CORRECT       :',
    formatNumCorrect(numCorrect.SAME_DOOR),
  );
}

main();

function formatNumCorrect(numCorrect): string {
  const decimal = numCorrect / NUM_OF_SIMULATIONS;
  // Round to 2 decimal places and put it in percent form.
  const roundedPercent = Math.round(decimal * 1e4) / 1e2;
  return `${roundedPercent}%`;
}
