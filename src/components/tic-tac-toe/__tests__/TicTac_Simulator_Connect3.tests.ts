import Simulator from '../TicTac_Simulator'

describe('Simulator_Connect3', () => {
  describe('methods', () => {
    it('handles turn', () => {
      const Sim = new Simulator()
      Sim.onTurn({y: 0, x: 1})

      expect(Sim.currPlayer).toEqual(2)
      expect(Sim.status).toEqual('dirty')
      expect(Sim.winner).toEqual(0)
    })
    it('winnable', () => {
      // const positions = [
      //   [0, 1, 1],
      //   [2, 2, 0],
      //   [1, 0, 0],
      // ]

      const Sim = new Simulator()
      expect(Sim.status).toEqual('new')
      Sim.onTurn({y: 0, x: 1})
      expect(Sim.status).toEqual('dirty')
      Sim.onTurn({y: 1, x: 1})
      expect(Sim.status).toEqual('dirty')

      Sim.onTurn({y: 0, x: 2})
      expect(Sim.status).toEqual('dirty')
      Sim.onTurn({y: 1, x: 0})
      expect(Sim.status).toEqual('dirty')

      Sim.onTurn({y: 2, x: 0})
      expect(Sim.status).toEqual('inc')
    })
    it('error on duplicateMove', () => {
      // const positions = [
      //   [0, 0, 0],
      //   [0, 1, 0],
      //   [0, 0, 0],
      // ]

      const Sim = new Simulator()
      expect(Sim.status).toEqual('new')
      Sim.onTurn({y: 1, x: 1})
      Sim.onTurn({y: 1, x: 1})
      expect(Sim.error).toEqual(true)
      expect(Sim.currPlayer).toEqual(2)
    })
    // TODO: it('tied game', () => {
    //   // const positions = [
    //   //   [0, 0, 1],
    //   //   [0, 2, 0],
    //   //   [1, 2, 0],
    //   // ]

    //   const Sim = new Simulator()
    //   expect(Sim.status).toEqual('new')
    //   Sim.onTurn({y: 0, x: 1}) // 1
    //   Sim.onTurn({y: 1, x: 1}) // 2

    //   Sim.onTurn({y: 1, x: 2}) // 1
    //   Sim.onTurn({y: 1, x: 0}) // 2

    //   Sim.onTurn({y: 1, x: 2}) // 1
    //   Sim.onTurn({y: 2, x: 2}) // 2

    //   Sim.onTurn({y: 2, x: 0}) // 1
    //   expect(Sim.status).toEqual('tie')
    // })
  })
  describe('player 1 wins', () => {
    it('across', () => {
      // const positions = [
      //   [1, 1, 1],
      //   [2, 2, 0],
      //   [0, 0, 0],
      // ]

      const Sim = new Simulator()
      Sim.onTurn({y: 0, x: 1})
      Sim.onTurn({y: 1, x: 1})

      Sim.onTurn({y: 0, x: 2})
      Sim.onTurn({y: 1, x: 0})

      Sim.onTurn({y: 0, x: 0})

      expect(Sim.status).toEqual('fin')
      expect(Sim.winner).toEqual(1)
    })
    it('down', () => {
      // const positions = [
      //   [1, 2, 0],
      //   [1, 2, 0],
      //   [1, 0, 0],
      // ]

      const Sim = new Simulator()
      Sim.onTurn({y: 0, x: 0})
      Sim.onTurn({y: 1, x: 1})

      Sim.onTurn({y: 1, x: 0})
      Sim.onTurn({y: 0, x: 1})

      Sim.onTurn({y: 2, x: 0})

      expect(Sim.status).toEqual('fin')
      expect(Sim.winner).toEqual(1)
    })
    it('diagonally', () => {
      // const positions = [
      //   [1, 2, 2],
      //   [0, 1, 0],
      //   [0, 0, 1],
      // ]

      const Sim = new Simulator()
      Sim.onTurn({y: 1, x: 1}) // 1
      Sim.onTurn({y: 0, x: 1}) // 2

      Sim.onTurn({y: 2, x: 2}) // 1
      Sim.onTurn({y: 0, x: 2}) // 2

      Sim.onTurn({y: 0, x: 0}) // 1

      expect(Sim.status).toEqual('fin')
      expect(Sim.winner).toEqual(1)
    })
  })
})
