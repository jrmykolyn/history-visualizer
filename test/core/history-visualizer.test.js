import { it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { HistoryVisualizer } from '../../src/core';

chai.use(sinonChai);

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
describe('HistoryVisualizer', () => {
  describe('General', () => {
    it('should be constructable', () => {
      expect(new HistoryVisualizer()).to.be.an.instanceof(HistoryVisualizer);
    });
  });

  describe('Instance methods', () => {
    let instance;
    let api;
    let back;
    let forward;
    let go;
    let win;

    beforeEach(() => {
      back = sinon.spy();
      forward = sinon.spy();
      go = sinon.spy();
      win = { history: {} };
      api = { back, forward, go };
      instance = new HistoryVisualizer();
      instance.window = win;
      instance.originalMethods = api;
    });

    describe('back()', () => {
      it('should invoke the original `back` method', () => {
        instance.back();

        expect(back).to.be.calledOn(win.history);
      });
    });

    describe('forward()', () => {
      it('should invoke the original `forward` method', () => {
        instance.forward();

        expect(forward).to.be.calledOn(win.history);
      });
    });

    describe('go()', () => {
      it('should invoke the original `go` method', () => {
        instance.go(2);

        expect(go).to.be.calledOn(win.history);
        expect(go).to.be.calledWith(2);
      });
    });
  });

  describe('Instance properties', () => {
  });

});
