# How to run?
-  in `my site` folder run `yarn dev`. Yes, I love it, even it  is Python :)
-  in `minesweeper` folder run `yarn install` and then `yarn dev`. ok!

# Initial thoughts/design (whiteboard) 

NOTE! Some of these have changed. 

## apis
   createGame({ rows: number, cols: number }): { id: number }
   - create random bombs
   - calculate values
   - return game id

   getGame({ id: number }): { cells: [][], status: 'lost' | 'won' | 'playing' }
   - return all cells 
      - if game finished, return all bombs and values
      - if not finished, return only played cells
      
   action({ id: number, row: number, col: number, type: 'reveal' | 'flag' | 'unflag' })
   - change cell status
   - if it is revealed and it is bomb, game is over
   - if it has value, reveal it only
   - if it is empty, reveal all connected empty cells
      - remove  the wrong flag status of the empty cell
   - if all non-bomb cells are revealed and bomb cells are flagged, game is won


## data structure
    type game = {
        rows: number,
        cols: number,
        palyer: { name: string },
        status: 'lost' | 'won' | 'playing'
    }

    type cell = {
        hasBomb: boolean, #not returned until finished     
        value: number, 
        action: 'notPlayed' | 'flagged' | 'sweeped',
        result: 'blasted' | 'cleared' | 'rightFlag' | 'wrongFlag' | 'notPlayed' #not returned until finished        
    }  


# TODOS

- Bug! Current spreading sweep algorithm is basic one and could cause maximum recrusion if celss grow. I have to replace it with a BFS algoritm to avoid lots of recrusins.
- Add network exception handlers. Currently I didn't catch network problems.
- Add plenty of tests for both api, ui & integration. Lots of edge cases are around to test!
- Persist Game data in Database. for simplicity, I kept them on memory for now.
- Persist leadership board in database instead of calculating them on fly.
- Add mechanisems (captha, deplays, ...) to not allow robot play games!
- Use Typescript
- Better UI! We have good data (action and result fields) to show the performance of user after the game is finished or during the game.
- Better Animation and design
- A11y & I18n
- Optimize api responses to only return "affected" fields
- Note! You may noticed two api calls, it is because of </React.StrictMode>. Not a performance issue :)
- Stop doing parallel actions (i.e. playCell call). Wait for getting the one's response before doing the next.
- Use routing. Current version just keep both New and Old games rendering in one page and changed the url to support reloading, or continuing the game. With a routing system it is easier to separate scenarios.

# Notes
- I studied Python for ~2 hours before starting this projects. I will defenetiely refactor coding structure by getting more familiar with classess and modules concepts.



